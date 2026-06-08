export interface ChainStep<C = unknown> {
  name: string;
  execute: (context: C) => C | Promise<C>;
}

export interface ChainResult<C> {
  success: boolean;
  context: C;
  stepsExecuted: string[];
  failedStep?: string;
  error?: string;
  durationMs: number;
}

export class ConversationChain<C = unknown> {
  private steps: ChainStep<C>[] = [];

  addStep(step: ChainStep<C>): this {
    this.steps.push(step);
    return this;
  }

  removeStep(name: string): boolean {
    const idx = this.steps.findIndex((s) => s.name === name);
    if (idx === -1) return false;
    this.steps.splice(idx, 1);
    return true;
  }

  async run(initialContext: C): Promise<ChainResult<C>> {
    const start = Date.now();
    let context = initialContext;
    const executed: string[] = [];

    for (const step of this.steps) {
      try {
        context = await step.execute(context);
        executed.push(step.name);
      } catch (err) {
        return {
          success: false,
          context,
          stepsExecuted: executed,
          failedStep: step.name,
          error: err instanceof Error ? err.message : String(err),
          durationMs: Date.now() - start,
        };
      }
    }

    return {
      success: true,
      context,
      stepsExecuted: executed,
      durationMs: Date.now() - start,
    };
  }

  get stepCount(): number {
    return this.steps.length;
  }

  stepNames(): string[] {
    return this.steps.map((s) => s.name);
  }

  clear(): void {
    this.steps = [];
  }
}

export function pipe<C>(...steps: ChainStep<C>[]): ConversationChain<C> {
  const chain = new ConversationChain<C>();
  for (const step of steps) chain.addStep(step);
  return chain;
}

export function branch<C>(
  condition: (context: C) => boolean,
  trueBranch: ChainStep<C>,
  falseBranch: ChainStep<C>,
): ChainStep<C> {
  return {
    name: `branch(${trueBranch.name}|${falseBranch.name})`,
    execute: (ctx) => condition(ctx) ? trueBranch.execute(ctx) : falseBranch.execute(ctx),
  };
}
