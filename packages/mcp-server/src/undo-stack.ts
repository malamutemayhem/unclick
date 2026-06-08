export class UndoStack<T> {
  private undoStack: T[] = [];
  private redoStack: T[] = [];
  private current: T;
  private readonly maxSize: number;

  constructor(initial: T, maxSize: number = 100) {
    this.current = initial;
    this.maxSize = maxSize;
  }

  push(state: T): void {
    this.undoStack.push(this.current);
    if (this.undoStack.length > this.maxSize) this.undoStack.shift();
    this.current = state;
    this.redoStack = [];
  }

  undo(): T | null {
    if (this.undoStack.length === 0) return null;
    this.redoStack.push(this.current);
    this.current = this.undoStack.pop()!;
    return this.current;
  }

  redo(): T | null {
    if (this.redoStack.length === 0) return null;
    this.undoStack.push(this.current);
    this.current = this.redoStack.pop()!;
    return this.current;
  }

  get state(): T {
    return this.current;
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

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}
