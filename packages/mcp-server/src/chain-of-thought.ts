export interface ThoughtStep {
  id: string;
  content: string;
  reasoning: string;
  confidence: number;
  parentId?: string;
  timestamp: number;
}

export class ChainOfThought {
  private steps: ThoughtStep[] = [];
  private counter = 0;

  addStep(content: string, reasoning: string, confidence: number, parentId?: string): string {
    const id = `step_${++this.counter}`;
    this.steps.push({ id, content, reasoning, confidence, parentId, timestamp: Date.now() });
    return id;
  }

  getStep(id: string): ThoughtStep | undefined {
    return this.steps.find((s) => s.id === id);
  }

  getChain(leafId?: string): ThoughtStep[] {
    if (!leafId) return [...this.steps];
    const chain: ThoughtStep[] = [];
    let current = this.steps.find((s) => s.id === leafId);
    while (current) {
      chain.unshift(current);
      current = current.parentId ? this.steps.find((s) => s.id === current!.parentId) : undefined;
    }
    return chain;
  }

  getBranches(): ThoughtStep[][] {
    const leaves = this.steps.filter((s) => !this.steps.some((o) => o.parentId === s.id));
    return leaves.map((leaf) => this.getChain(leaf.id));
  }

  bestBranch(): ThoughtStep[] {
    const branches = this.getBranches();
    if (branches.length === 0) return [];
    return branches.reduce((best, branch) => {
      const avgConf = branch.reduce((s, step) => s + step.confidence, 0) / branch.length;
      const bestAvg = best.reduce((s, step) => s + step.confidence, 0) / best.length;
      return avgConf > bestAvg ? branch : best;
    });
  }

  prune(minConfidence: number): number {
    const before = this.steps.length;
    this.steps = this.steps.filter((s) => s.confidence >= minConfidence);
    return before - this.steps.length;
  }

  summarize(): string {
    return this.steps.map((s, i) => `${i + 1}. [${(s.confidence * 100).toFixed(0)}%] ${s.content}`).join("\n");
  }

  get length(): number {
    return this.steps.length;
  }

  clear(): void {
    this.steps = [];
    this.counter = 0;
  }
}
