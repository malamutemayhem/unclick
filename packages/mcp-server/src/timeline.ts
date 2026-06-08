export interface TimelineEvent<T = unknown> {
  time: number;
  data: T;
}

export class Timeline<T = unknown> {
  private events: TimelineEvent<T>[] = [];

  get length(): number {
    return this.events.length;
  }

  add(time: number, data: T): void {
    const idx = this.insertionIndex(time);
    this.events.splice(idx, 0, { time, data });
  }

  at(index: number): TimelineEvent<T> | undefined {
    return this.events[index];
  }

  range(start: number, end: number): TimelineEvent<T>[] {
    const startIdx = this.insertionIndex(start);
    const result: TimelineEvent<T>[] = [];
    for (let i = startIdx; i < this.events.length; i++) {
      if (this.events[i].time > end) break;
      result.push(this.events[i]);
    }
    return result;
  }

  before(time: number): TimelineEvent<T> | undefined {
    const idx = this.insertionIndex(time);
    return idx > 0 ? this.events[idx - 1] : undefined;
  }

  after(time: number): TimelineEvent<T> | undefined {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].time > time) return this.events[i];
    }
    return undefined;
  }

  closest(time: number): TimelineEvent<T> | undefined {
    if (this.events.length === 0) return undefined;
    let best = this.events[0];
    let bestDist = Math.abs(best.time - time);
    for (let i = 1; i < this.events.length; i++) {
      const d = Math.abs(this.events[i].time - time);
      if (d < bestDist) {
        bestDist = d;
        best = this.events[i];
      }
      if (this.events[i].time > time) break;
    }
    return best;
  }

  all(): TimelineEvent<T>[] {
    return [...this.events];
  }

  clear(): void {
    this.events = [];
  }

  private insertionIndex(time: number): number {
    let lo = 0;
    let hi = this.events.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.events[mid].time < time) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
