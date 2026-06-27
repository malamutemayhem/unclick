export class UndoStack<T> {
  private undoStack: T[] = [];
  private redoStack: T[] = [];
  private _current: T;
  private maxSize: number;

  constructor(initial: T, maxSize = 100) {
    this._current = initial;
    this.maxSize = maxSize;
  }

  get current(): T { return this._current; }
  get canUndo(): boolean { return this.undoStack.length > 0; }
  get canRedo(): boolean { return this.redoStack.length > 0; }
  get undoCount(): number { return this.undoStack.length; }
  get redoCount(): number { return this.redoStack.length; }

  push(state: T): void {
    this.undoStack.push(this._current);
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
    this._current = state;
    this.redoStack.length = 0;
  }

  undo(): T | undefined {
    if (!this.canUndo) return undefined;
    this.redoStack.push(this._current);
    this._current = this.undoStack.pop()!;
    return this._current;
  }

  redo(): T | undefined {
    if (!this.canRedo) return undefined;
    this.undoStack.push(this._current);
    this._current = this.redoStack.pop()!;
    return this._current;
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }

  reset(state: T): void {
    this.clear();
    this._current = state;
  }
}
