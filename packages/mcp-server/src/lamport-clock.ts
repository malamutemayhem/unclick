export class LamportClock {
  private counter: number;
  readonly processId: string;

  constructor(processId: string, initial = 0) {
    this.processId = processId;
    this.counter = initial;
  }

  tick(): number {
    return ++this.counter;
  }

  send(): number {
    return this.tick();
  }

  receive(remoteTimestamp: number): number {
    this.counter = Math.max(this.counter, remoteTimestamp) + 1;
    return this.counter;
  }

  get time(): number {
    return this.counter;
  }

  static happensBefore(a: number, b: number): boolean {
    return a < b;
  }

  static concurrent(a: number, b: number): boolean {
    return a === b;
  }
}

export interface VectorTimestamp {
  [processId: string]: number;
}

export class VectorClockProcess {
  readonly processId: string;
  private clock: VectorTimestamp = {};

  constructor(processId: string) {
    this.processId = processId;
    this.clock[processId] = 0;
  }

  tick(): VectorTimestamp {
    this.clock[this.processId] = (this.clock[this.processId] || 0) + 1;
    return { ...this.clock };
  }

  send(): VectorTimestamp {
    return this.tick();
  }

  receive(remote: VectorTimestamp): VectorTimestamp {
    for (const [pid, time] of Object.entries(remote)) {
      this.clock[pid] = Math.max(this.clock[pid] || 0, time);
    }
    this.clock[this.processId] = (this.clock[this.processId] || 0) + 1;
    return { ...this.clock };
  }

  get timestamp(): VectorTimestamp {
    return { ...this.clock };
  }

  static happensBefore(a: VectorTimestamp, b: VectorTimestamp): boolean {
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    let atLeastOneLess = false;
    for (const key of allKeys) {
      const av = a[key] || 0;
      const bv = b[key] || 0;
      if (av > bv) return false;
      if (av < bv) atLeastOneLess = true;
    }
    return atLeastOneLess;
  }

  static concurrent(a: VectorTimestamp, b: VectorTimestamp): boolean {
    return !VectorClockProcess.happensBefore(a, b) && !VectorClockProcess.happensBefore(b, a);
  }

  static merge(a: VectorTimestamp, b: VectorTimestamp): VectorTimestamp {
    const result: VectorTimestamp = { ...a };
    for (const [pid, time] of Object.entries(b)) {
      result[pid] = Math.max(result[pid] || 0, time);
    }
    return result;
  }
}

export class HybridLogicalClock {
  private logical = 0;
  private counter = 0;
  readonly processId: string;

  constructor(processId: string) {
    this.processId = processId;
  }

  now(physicalTime: number): { logical: number; counter: number } {
    if (physicalTime > this.logical) {
      this.logical = physicalTime;
      this.counter = 0;
    } else {
      this.counter++;
    }
    return { logical: this.logical, counter: this.counter };
  }

  receive(remoteLogical: number, remoteCounter: number, physicalTime: number): { logical: number; counter: number } {
    if (physicalTime > this.logical && physicalTime > remoteLogical) {
      this.logical = physicalTime;
      this.counter = 0;
    } else if (remoteLogical > this.logical) {
      this.logical = remoteLogical;
      this.counter = remoteCounter + 1;
    } else if (this.logical === remoteLogical) {
      this.counter = Math.max(this.counter, remoteCounter) + 1;
    } else {
      this.counter++;
    }
    return { logical: this.logical, counter: this.counter };
  }

  get time(): { logical: number; counter: number } {
    return { logical: this.logical, counter: this.counter };
  }

  static compare(
    a: { logical: number; counter: number },
    b: { logical: number; counter: number }
  ): number {
    if (a.logical !== b.logical) return a.logical - b.logical;
    return a.counter - b.counter;
  }
}
