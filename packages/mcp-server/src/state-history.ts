export class StateHistory<T> {
  private states: T[] = [];
  private pointer = -1;
  private readonly maxSize: number;
  private readonly clone: (state: T) => T;

  constructor(options?: { maxSize?: number; clone?: (state: T) => T }) {
    this.maxSize = options?.maxSize ?? 100;
    this.clone = options?.clone ?? ((s: T) => JSON.parse(JSON.stringify(s)) as T);
  }

  push(state: T): void {
    this.states = this.states.slice(0, this.pointer + 1);
    this.states.push(this.clone(state));
    if (this.states.length > this.maxSize) {
      this.states.shift();
    } else {
      this.pointer++;
    }
  }

  undo(): T | undefined {
    if (this.pointer <= 0) return undefined;
    this.pointer--;
    return this.clone(this.states[this.pointer]);
  }

  redo(): T | undefined {
    if (this.pointer >= this.states.length - 1) return undefined;
    this.pointer++;
    return this.clone(this.states[this.pointer]);
  }

  get current(): T | undefined {
    if (this.pointer < 0) return undefined;
    return this.clone(this.states[this.pointer]);
  }

  get canUndo(): boolean {
    return this.pointer > 0;
  }

  get canRedo(): boolean {
    return this.pointer < this.states.length - 1;
  }

  get size(): number {
    return this.states.length;
  }

  clear(): void {
    this.states = [];
    this.pointer = -1;
  }
}
