export interface TaskNode {
  id: string;
  description: string;
  status: "pending" | "running" | "done" | "failed" | "skipped";
  subtasks: TaskNode[];
  result?: unknown;
  error?: string;
}

export class TaskPlanner {
  private root: TaskNode;
  private counter = 0;

  constructor(description: string) {
    this.root = this.createNode(description);
  }

  private createNode(description: string): TaskNode {
    return { id: `task_${++this.counter}`, description, status: "pending", subtasks: [] };
  }

  addSubtask(parentId: string, description: string): string {
    const parent = this.findNode(parentId);
    if (!parent) throw new Error(`Parent not found: ${parentId}`);
    const node = this.createNode(description);
    parent.subtasks.push(node);
    return node.id;
  }

  complete(id: string, result?: unknown): void {
    const node = this.findNode(id);
    if (node) { node.status = "done"; node.result = result; }
  }

  fail(id: string, error: string): void {
    const node = this.findNode(id);
    if (node) { node.status = "failed"; node.error = error; }
  }

  skip(id: string): void {
    const node = this.findNode(id);
    if (node) node.status = "skipped";
  }

  start(id: string): void {
    const node = this.findNode(id);
    if (node) node.status = "running";
  }

  getNode(id: string): TaskNode | undefined {
    return this.findNode(id);
  }

  getTree(): TaskNode {
    return this.root;
  }

  nextPending(): TaskNode | undefined {
    return this.findPending(this.root);
  }

  progress(): { total: number; done: number; failed: number; pending: number; running: number } {
    const counts = { total: 0, done: 0, failed: 0, pending: 0, running: 0 };
    this.countNodes(this.root, counts);
    return counts;
  }

  isComplete(): boolean {
    const p = this.progress();
    return p.pending === 0 && p.running === 0;
  }

  flatten(): TaskNode[] {
    const result: TaskNode[] = [];
    this.collectNodes(this.root, result);
    return result;
  }

  private findNode(id: string, node: TaskNode = this.root): TaskNode | undefined {
    if (node.id === id) return node;
    for (const sub of node.subtasks) {
      const found = this.findNode(id, sub);
      if (found) return found;
    }
    return undefined;
  }

  private findPending(node: TaskNode): TaskNode | undefined {
    if (node.status === "pending" && node.subtasks.length === 0) return node;
    for (const sub of node.subtasks) {
      const found = this.findPending(sub);
      if (found) return found;
    }
    if (node.status === "pending") return node;
    return undefined;
  }

  private countNodes(node: TaskNode, counts: { total: number; done: number; failed: number; pending: number; running: number }): void {
    counts.total++;
    counts[node.status === "skipped" ? "done" : node.status]++;
    for (const sub of node.subtasks) this.countNodes(sub, counts);
  }

  private collectNodes(node: TaskNode, result: TaskNode[]): void {
    result.push(node);
    for (const sub of node.subtasks) this.collectNodes(sub, result);
  }
}
