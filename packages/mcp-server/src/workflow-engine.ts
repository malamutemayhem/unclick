export type StepStatus = "pending" | "running" | "completed" | "failed" | "skipped";
export type StepType = "task" | "decision" | "parallel" | "wait";

export interface WorkflowStep {
  id: string;
  type: StepType;
  status: StepStatus;
  handler?: (context: Record<string, unknown>) => boolean;
  branches?: { condition: (ctx: Record<string, unknown>) => boolean; next: string }[];
  parallelSteps?: string[];
  nextStep?: string;
  retries: number;
  maxRetries: number;
}

export class WorkflowEngine {
  private steps = new Map<string, WorkflowStep>();
  private order: string[] = [];
  private context: Record<string, unknown> = {};
  private currentStep: string | null = null;
  private history: Array<{ step: string; status: StepStatus; timestamp: number }> = [];
  private clock = 0;

  addStep(id: string, type: StepType, options: Partial<WorkflowStep> = {}): void {
    this.steps.set(id, {
      id,
      type,
      status: "pending",
      retries: 0,
      maxRetries: options.maxRetries ?? 0,
      ...options,
    });
    this.order.push(id);
  }

  setContext(key: string, value: unknown): void {
    this.context[key] = value;
  }

  getContext(): Record<string, unknown> {
    return { ...this.context };
  }

  start(): boolean {
    if (this.order.length === 0) return false;
    this.currentStep = this.order[0];
    return true;
  }

  executeStep(): StepStatus {
    if (!this.currentStep) return "completed";
    const step = this.steps.get(this.currentStep);
    if (!step) return "failed";

    step.status = "running";

    if (step.type === "task") {
      const success = step.handler ? step.handler(this.context) : true;
      step.status = success ? "completed" : "failed";
      if (step.status === "failed" && step.retries < step.maxRetries) {
        step.retries++;
        step.status = "pending";
      }
    } else if (step.type === "decision") {
      step.status = "completed";
      if (step.branches) {
        for (const branch of step.branches) {
          if (branch.condition(this.context)) {
            this.currentStep = branch.next;
            this.recordHistory(step.id, "completed");
            return "completed";
          }
        }
      }
    } else if (step.type === "parallel") {
      if (step.parallelSteps) {
        for (const pid of step.parallelSteps) {
          const pStep = this.steps.get(pid);
          if (pStep && pStep.handler) {
            pStep.status = pStep.handler(this.context) ? "completed" : "failed";
          }
        }
      }
      step.status = "completed";
    } else if (step.type === "wait") {
      step.status = "completed";
    }

    this.recordHistory(step.id, step.status);

    if (step.status === "completed" && step.nextStep) {
      this.currentStep = step.nextStep;
    } else if (step.status === "completed") {
      const idx = this.order.indexOf(step.id);
      this.currentStep = idx + 1 < this.order.length ? this.order[idx + 1] : null;
    }

    return step.status;
  }

  run(): { completed: number; failed: number } {
    this.start();
    let completed = 0;
    let failed = 0;
    let iterations = 0;
    while (this.currentStep && iterations < 1000) {
      const status = this.executeStep();
      if (status === "completed") completed++;
      if (status === "failed") { failed++; break; }
      iterations++;
    }
    return { completed, failed };
  }

  getStep(id: string): WorkflowStep | undefined {
    return this.steps.get(id);
  }

  getHistory(): Array<{ step: string; status: StepStatus; timestamp: number }> {
    return [...this.history];
  }

  stepCount(): number {
    return this.steps.size;
  }

  isComplete(): boolean {
    return this.currentStep === null;
  }

  private recordHistory(step: string, status: StepStatus): void {
    this.history.push({ step, status, timestamp: this.clock++ });
  }
}
