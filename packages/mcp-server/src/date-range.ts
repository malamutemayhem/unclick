export class DateRange {
  constructor(public readonly start: Date, public readonly end: Date) {
    if (start > end) throw new Error("Start must be before end");
  }

  contains(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }

  overlaps(other: DateRange): boolean {
    return this.start <= other.end && this.end >= other.start;
  }

  intersection(other: DateRange): DateRange | null {
    if (!this.overlaps(other)) return null;
    return new DateRange(
      new Date(Math.max(this.start.getTime(), other.start.getTime())),
      new Date(Math.min(this.end.getTime(), other.end.getTime())),
    );
  }

  union(other: DateRange): DateRange | null {
    if (!this.overlaps(other) && !this.adjacent(other)) return null;
    return new DateRange(
      new Date(Math.min(this.start.getTime(), other.start.getTime())),
      new Date(Math.max(this.end.getTime(), other.end.getTime())),
    );
  }

  adjacent(other: DateRange): boolean {
    const dayMs = 86400000;
    return (
      Math.abs(this.end.getTime() - other.start.getTime()) <= dayMs ||
      Math.abs(other.end.getTime() - this.start.getTime()) <= dayMs
    );
  }

  days(): number {
    return Math.round((this.end.getTime() - this.start.getTime()) / 86400000);
  }

  hours(): number {
    return (this.end.getTime() - this.start.getTime()) / 3600000;
  }

  milliseconds(): number {
    return this.end.getTime() - this.start.getTime();
  }

  eachDay(): Date[] {
    const result: Date[] = [];
    const current = new Date(this.start);
    while (current <= this.end) {
      result.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return result;
  }

  weekdays(): number {
    let count = 0;
    const current = new Date(this.start);
    while (current <= this.end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  }

  split(intervalDays: number): DateRange[] {
    const ranges: DateRange[] = [];
    const current = new Date(this.start);
    while (current < this.end) {
      const chunkEnd = new Date(current);
      chunkEnd.setDate(chunkEnd.getDate() + intervalDays - 1);
      if (chunkEnd > this.end) {
        ranges.push(new DateRange(new Date(current), new Date(this.end)));
      } else {
        ranges.push(new DateRange(new Date(current), new Date(chunkEnd)));
      }
      current.setDate(current.getDate() + intervalDays);
    }
    return ranges;
  }

  format(): string {
    return `${this.start.toISOString().split("T")[0]} to ${this.end.toISOString().split("T")[0]}`;
  }

  static fromISO(start: string, end: string): DateRange {
    return new DateRange(new Date(start), new Date(end));
  }

  static lastNDays(n: number): DateRange {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - n);
    return new DateRange(start, end);
  }

  static thisMonth(): DateRange {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return new DateRange(start, end);
  }

  static thisYear(): DateRange {
    const now = new Date();
    return new DateRange(new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31));
  }
}
