export interface UndoableAction<T> {
  execute(state: T): T;
  undo(state: T): T;
  description?: string;
}

export class UndoManager<T> {
  private undoStack: UndoableAction<T>[] = [];
  private redoStack: UndoableAction<T>[] = [];
  private state: T;
  private maxHistory: number;

  constructor(initialState: T, maxHistory = 100) {
    this.state = initialState;
    this.maxHistory = maxHistory;
  }

  execute(action: UndoableAction<T>): T {
    this.state = action.execute(this.state);
    this.undoStack.push(action);
    this.redoStack = [];
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    return this.state;
  }

  undo(): T | null {
    const action = this.undoStack.pop();
    if (!action) return null;
    this.state = action.undo(this.state);
    this.redoStack.push(action);
    return this.state;
  }

  redo(): T | null {
    const action = this.redoStack.pop();
    if (!action) return null;
    this.state = action.execute(this.state);
    this.undoStack.push(action);
    return this.state;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  getState(): T {
    return this.state;
  }

  undoCount(): number {
    return this.undoStack.length;
  }

  redoCount(): number {
    return this.redoStack.length;
  }

  history(): string[] {
    return this.undoStack.map((a) => a.description ?? "unnamed action");
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  batch(actions: UndoableAction<T>[]): T {
    const batchAction: UndoableAction<T> = {
      execute: (state: T) => {
        let s = state;
        for (const a of actions) s = a.execute(s);
        return s;
      },
      undo: (state: T) => {
        let s = state;
        for (let i = actions.length - 1; i >= 0; i--) s = actions[i].undo(s);
        return s;
      },
      description: `batch (${actions.length} actions)`,
    };
    return this.execute(batchAction);
  }
}
