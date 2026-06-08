export class Range {
  readonly start: number;
  readonly end: number;

  constructor(start: number, end: number) {
    if (start > end) throw new Error("Start must be <= end");
    this.start = start;
    this.end = end;
  }

  get length(): number { return this.end - this.start; }

  contains(value: number): boolean {
    return value >= this.start && value <= this.end;
  }

  containsRange(other: Range): boolean {
    return other.start >= this.start && other.end <= this.end;
  }

  overlaps(other: Range): boolean {
    return this.start <= other.end && other.start <= this.end;
  }

  intersection(other: Range): Range | null {
    if (!this.overlaps(other)) return null;
    return new Range(Math.max(this.start, other.start), Math.min(this.end, other.end));
  }

  union(other: Range): Range {
    if (!this.overlaps(other) && this.end !== other.start && other.end !== this.start) {
      throw new Error("Ranges do not overlap or adjoin");
    }
    return new Range(Math.min(this.start, other.start), Math.max(this.end, other.end));
  }

  equals(other: Range): boolean {
    return this.start === other.start && this.end === other.end;
  }

  clamp(value: number): number {
    return Math.max(this.start, Math.min(this.end, value));
  }

  toArray(step = 1): number[] {
    const result: number[] = [];
    for (let i = this.start; i <= this.end; i += step) result.push(i);
    return result;
  }

  *[Symbol.iterator](): Iterator<number> {
    for (let i = this.start; i <= this.end; i++) yield i;
  }

  toString(): string {
    return `[${this.start}, ${this.end}]`;
  }
}

export function range(start: number, end: number): Range {
  return new Range(start, end);
}

export function rangeFrom(values: number[]): Range {
  if (values.length === 0) throw new Error("Empty array");
  return new Range(Math.min(...values), Math.max(...values));
}
