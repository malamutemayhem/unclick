export class LeakyBucket {
  private capacity: number;
  private leakRatePerMs: number;
  private water = 0;
  private lastLeakTime: number;

  constructor(capacity: number, leakRatePerSecond: number) {
    this.capacity = capacity;
    this.leakRatePerMs = leakRatePerSecond / 1000;
    this.lastLeakTime = Date.now();
  }

  private leak(): void {
    const now = Date.now();
    const elapsed = now - this.lastLeakTime;
    this.water = Math.max(0, this.water - elapsed * this.leakRatePerMs);
    this.lastLeakTime = now;
  }

  add(amount = 1): boolean {
    this.leak();
    if (this.water + amount > this.capacity) return false;
    this.water += amount;
    return true;
  }

  tryAdd(amount = 1): { accepted: boolean; retryAfterMs: number } {
    this.leak();
    if (this.water + amount <= this.capacity) {
      this.water += amount;
      return { accepted: true, retryAfterMs: 0 };
    }
    const overflow = this.water + amount - this.capacity;
    const retryAfterMs = Math.ceil(overflow / this.leakRatePerMs);
    return { accepted: false, retryAfterMs };
  }

  get level(): number {
    this.leak();
    return this.water;
  }

  get remaining(): number {
    this.leak();
    return Math.max(0, this.capacity - this.water);
  }

  reset(): void {
    this.water = 0;
    this.lastLeakTime = Date.now();
  }
}
