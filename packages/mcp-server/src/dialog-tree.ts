export interface DialogChoice {
  text: string;
  nextNodeId: string;
  condition?: string;
}

export interface DialogNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogChoice[];
  onEnter?: string;
}

export class DialogTree {
  private nodes: Map<string, DialogNode> = new Map();
  private startId: string | null = null;
  private currentId: string | null = null;
  private history: string[] = [];
  private variables: Map<string, string | number | boolean> = new Map();

  addNode(node: DialogNode): void {
    this.nodes.set(node.id, node);
    if (!this.startId) this.startId = node.id;
  }

  removeNode(id: string): boolean {
    if (!this.nodes.has(id)) return false;
    this.nodes.delete(id);
    if (this.startId === id) this.startId = null;
    return true;
  }

  setStart(id: string): void {
    this.startId = id;
  }

  start(): DialogNode | null {
    if (!this.startId) return null;
    this.currentId = this.startId;
    this.history = [this.startId];
    return this.nodes.get(this.startId) ?? null;
  }

  current(): DialogNode | null {
    if (!this.currentId) return null;
    return this.nodes.get(this.currentId) ?? null;
  }

  choose(choiceIndex: number): DialogNode | null {
    const node = this.current();
    if (!node) return null;
    const choice = node.choices[choiceIndex];
    if (!choice) return null;
    this.currentId = choice.nextNodeId;
    this.history.push(choice.nextNodeId);
    return this.nodes.get(choice.nextNodeId) ?? null;
  }

  goTo(nodeId: string): DialogNode | null {
    if (!this.nodes.has(nodeId)) return null;
    this.currentId = nodeId;
    this.history.push(nodeId);
    return this.nodes.get(nodeId) ?? null;
  }

  getHistory(): string[] {
    return [...this.history];
  }

  setVariable(key: string, value: string | number | boolean): void {
    this.variables.set(key, value);
  }

  getVariable(key: string): string | number | boolean | undefined {
    return this.variables.get(key);
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  getNode(id: string): DialogNode | undefined {
    return this.nodes.get(id);
  }

  isTerminal(id: string): boolean {
    const node = this.nodes.get(id);
    if (!node) return true;
    return node.choices.length === 0;
  }

  allPaths(maxDepth = 20): string[][] {
    const paths: string[][] = [];
    if (!this.startId) return paths;

    const dfs = (nodeId: string, path: string[], visited: Set<string>) => {
      if (visited.has(nodeId) || path.length > maxDepth) {
        paths.push([...path]);
        return;
      }
      const node = this.nodes.get(nodeId);
      if (!node || node.choices.length === 0) {
        paths.push([...path]);
        return;
      }
      visited.add(nodeId);
      for (const choice of node.choices) {
        dfs(choice.nextNodeId, [...path, choice.nextNodeId], new Set(visited));
      }
    };

    dfs(this.startId, [this.startId], new Set());
    return paths;
  }

  validate(): string[] {
    const errors: string[] = [];
    for (const [id, node] of this.nodes) {
      for (const choice of node.choices) {
        if (!this.nodes.has(choice.nextNodeId)) {
          errors.push(`Node "${id}" has choice pointing to non-existent node "${choice.nextNodeId}"`);
        }
      }
    }
    if (this.startId && !this.nodes.has(this.startId)) {
      errors.push(`Start node "${this.startId}" does not exist`);
    }
    return errors;
  }
}
