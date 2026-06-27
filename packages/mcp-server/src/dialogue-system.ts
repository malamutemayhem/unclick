export interface DialogueNode {
  id: string;
  text: string;
  speaker?: string;
  choices?: DialogueChoice[];
  next?: string;
  onEnter?: (state: DialogueState) => void;
  condition?: (state: DialogueState) => boolean;
}

export interface DialogueChoice {
  text: string;
  next: string;
  condition?: (state: DialogueState) => boolean;
}

export interface DialogueState {
  variables: Map<string, unknown>;
  visited: Set<string>;
  history: string[];
}

export class DialogueRunner {
  private nodes: Map<string, DialogueNode>;
  private currentId: string | null = null;
  private state: DialogueState;

  constructor(nodes: DialogueNode[], startId?: string) {
    this.nodes = new Map();
    for (const node of nodes) {
      this.nodes.set(node.id, node);
    }
    this.state = {
      variables: new Map(),
      visited: new Set(),
      history: [],
    };
    if (startId) {
      this.currentId = startId;
    } else if (nodes.length > 0) {
      this.currentId = nodes[0].id;
    }
  }

  current(): DialogueNode | null {
    if (!this.currentId) return null;
    const node = this.nodes.get(this.currentId);
    if (!node) return null;
    if (node.condition && !node.condition(this.state)) return null;
    return node;
  }

  enter(): DialogueNode | null {
    const node = this.current();
    if (!node) return null;
    this.state.visited.add(node.id);
    this.state.history.push(node.id);
    node.onEnter?.(this.state);
    return node;
  }

  availableChoices(): DialogueChoice[] {
    const node = this.current();
    if (!node || !node.choices) return [];
    return node.choices.filter(
      (c) => !c.condition || c.condition(this.state),
    );
  }

  choose(index: number): DialogueNode | null {
    const choices = this.availableChoices();
    if (index < 0 || index >= choices.length) return null;
    this.currentId = choices[index].next;
    return this.enter();
  }

  advance(): DialogueNode | null {
    const node = this.current();
    if (!node || !node.next) return null;
    this.currentId = node.next;
    return this.enter();
  }

  goTo(id: string): DialogueNode | null {
    if (!this.nodes.has(id)) return null;
    this.currentId = id;
    return this.enter();
  }

  setVariable(key: string, value: unknown): void {
    this.state.variables.set(key, value);
  }

  getVariable(key: string): unknown {
    return this.state.variables.get(key);
  }

  hasVisited(id: string): boolean {
    return this.state.visited.has(id);
  }

  getHistory(): string[] {
    return [...this.state.history];
  }

  isFinished(): boolean {
    const node = this.current();
    if (!node) return true;
    return !node.next && (!node.choices || node.choices.length === 0);
  }

  reset(startId?: string): void {
    this.state.variables.clear();
    this.state.visited.clear();
    this.state.history = [];
    this.currentId = startId ?? (this.nodes.keys().next().value ?? null);
  }
}
