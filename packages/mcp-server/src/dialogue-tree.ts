export interface DialogueNode {
  id: string;
  text: string;
  choices: DialogueChoice[];
  onEnter?: string;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  condition?: string;
}

export class DialogueTree {
  private nodes: Map<string, DialogueNode> = new Map();
  private currentId: string | null = null;
  private visited: Set<string> = new Set();
  private flags: Map<string, boolean> = new Map();

  addNode(node: DialogueNode): void {
    this.nodes.set(node.id, node);
  }

  addNodes(nodes: DialogueNode[]): void {
    for (const node of nodes) this.addNode(node);
  }

  start(id: string): DialogueNode | null {
    if (!this.nodes.has(id)) return null;
    this.currentId = id;
    this.visited.add(id);
    return this.nodes.get(id)!;
  }

  current(): DialogueNode | null {
    if (!this.currentId) return null;
    return this.nodes.get(this.currentId) ?? null;
  }

  choose(choiceIndex: number): DialogueNode | null {
    const node = this.current();
    if (!node) return null;

    const available = this.availableChoices();
    if (choiceIndex < 0 || choiceIndex >= available.length) return null;

    const choice = available[choiceIndex];
    if (!this.nodes.has(choice.nextId)) return null;

    this.currentId = choice.nextId;
    this.visited.add(choice.nextId);
    return this.nodes.get(this.currentId)!;
  }

  availableChoices(): DialogueChoice[] {
    const node = this.current();
    if (!node) return [];
    return node.choices.filter(c => {
      if (!c.condition) return true;
      return this.flags.get(c.condition) === true;
    });
  }

  setFlag(key: string, value: boolean): void {
    this.flags.set(key, value);
  }

  getFlag(key: string): boolean {
    return this.flags.get(key) ?? false;
  }

  hasVisited(id: string): boolean {
    return this.visited.has(id);
  }

  visitedNodes(): string[] {
    return [...this.visited];
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    for (const [id, node] of this.nodes) {
      for (const choice of node.choices) {
        if (!this.nodes.has(choice.nextId)) {
          errors.push(`Node "${id}" choice references missing node "${choice.nextId}"`);
        }
      }
    }
    return { valid: errors.length === 0, errors };
  }

  reset(): void {
    this.currentId = null;
    this.visited.clear();
    this.flags.clear();
  }

  serialize(): { currentId: string | null; visited: string[]; flags: Record<string, boolean> } {
    const flags: Record<string, boolean> = {};
    for (const [k, v] of this.flags) flags[k] = v;
    return { currentId: this.currentId, visited: [...this.visited], flags };
  }
}
