export interface Command<S> {
  execute(state: S): S;
  undo(state: S): S;
  description?: string;
}

export class UndoManager<S> {
  private undoStack: Command<S>[] = [];
  private redoStack: Command<S>[] = [];
  private _state: S;
  private maxHistory: number;
  private listeners: ((state: S) => void)[] = [];

  constructor(initialState: S, maxHistory = 100) {
    this._state = initialState;
    this.maxHistory = maxHistory;
  }

  get state(): S {
    return this._state;
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  get undoCount(): number {
    return this.undoStack.length;
  }

  get redoCount(): number {
    return this.redoStack.length;
  }

  execute(command: Command<S>): S {
    this._state = command.execute(this._state);
    this.undoStack.push(command);
    this.redoStack = [];
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.notify();
    return this._state;
  }

  undo(): S | null {
    const command = this.undoStack.pop();
    if (!command) return null;
    this._state = command.undo(this._state);
    this.redoStack.push(command);
    this.notify();
    return this._state;
  }

  redo(): S | null {
    const command = this.redoStack.pop();
    if (!command) return null;
    this._state = command.execute(this._state);
    this.undoStack.push(command);
    this.notify();
    return this._state;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  history(): string[] {
    return this.undoStack
      .map((cmd) => cmd.description || "unknown")
      .filter((d) => d !== "unknown");
  }

  subscribe(listener: (state: S) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  batch(commands: Command<S>[]): S {
    const batchCmd: Command<S> = {
      execute: (s) => commands.reduce((state, cmd) => cmd.execute(state), s),
      undo: (s) => [...commands].reverse().reduce((state, cmd) => cmd.undo(state), s),
      description: `batch(${commands.length})`,
    };
    return this.execute(batchCmd);
  }

  private notify(): void {
    for (const listener of this.listeners) listener(this._state);
  }
}

export function setField<S, K extends keyof S>(key: K, value: S[K], description?: string): Command<S> {
  let oldValue: S[K];
  return {
    execute(state: S): S {
      oldValue = state[key];
      return { ...state, [key]: value };
    },
    undo(state: S): S {
      return { ...state, [key]: oldValue };
    },
    description: description || `set ${String(key)}`,
  };
}

export function arrayPush<S extends { [K in P]: T[] }, P extends keyof S, T>(
  prop: P,
  item: T,
  description?: string
): Command<S> {
  return {
    execute(state: S): S {
      return { ...state, [prop]: [...state[prop], item] };
    },
    undo(state: S): S {
      return { ...state, [prop]: state[prop].slice(0, -1) };
    },
    description: description || `push to ${String(prop)}`,
  };
}

export function arrayRemove<S extends { [K in P]: T[] }, P extends keyof S, T>(
  prop: P,
  index: number,
  description?: string
): Command<S> {
  let removed: T;
  return {
    execute(state: S): S {
      removed = state[prop][index];
      const arr = [...state[prop]];
      arr.splice(index, 1);
      return { ...state, [prop]: arr };
    },
    undo(state: S): S {
      const arr = [...state[prop]];
      arr.splice(index, 0, removed);
      return { ...state, [prop]: arr };
    },
    description: description || `remove from ${String(prop)}[${index}]`,
  };
}

export function transform<S>(
  forward: (s: S) => S,
  backward: (s: S) => S,
  description?: string
): Command<S> {
  return {
    execute: forward,
    undo: backward,
    description,
  };
}
