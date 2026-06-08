export class UndoStack<T> {
  private undos: T[] = [];
  private redos: T[] = [];
  private _current: T;

  constructor(initial: T) {
    this._current = initial;
  }

  get current(): T {
    return this._current;
  }

  get canUndo(): boolean {
    return this.undos.length > 0;
  }

  get canRedo(): boolean {
    return this.redos.length > 0;
  }

  get undoCount(): number {
    return this.undos.length;
  }

  get redoCount(): number {
    return this.redos.length;
  }

  push(state: T): void {
    this.undos.push(this._current);
    this._current = state;
    this.redos = [];
  }

  undo(): T | undefined {
    if (this.undos.length === 0) return undefined;
    this.redos.push(this._current);
    this._current = this.undos.pop()!;
    return this._current;
  }

  redo(): T | undefined {
    if (this.redos.length === 0) return undefined;
    this.undos.push(this._current);
    this._current = this.redos.pop()!;
    return this._current;
  }

  clear(): void {
    this.undos = [];
    this.redos = [];
  }

  history(): T[] {
    return [...this.undos, this._current];
  }
}
