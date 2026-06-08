export class LeakyBucket {
  private water = 0;
  private readonly capacity: number;
  private readonly leakRatePerMs: number;
  private lastLeak: number;

  constructor(capacity: number, leakRatePerSecond: number) {
    this.capacity = capacity;
    this.leakRatePerMs = leakRatePerSecond / 1000;
    this.lastLeak = Date.now();
  }

  add(amount: number = 1, now: number = Date.now()): boolean {
    this.leak(now);
    if (this.water + amount > this.capacity) return false;
    this.water += amount;
    return true;
  }

  get level(): number {
    this.leak(Date.now());
    return this.water;
  }

  get isFull(): boolean {
    this.leak(Date.now());
    return this.water >= this.capacity;
  }

  get isEmpty(): boolean {
    this.leak(Date.now());
    return this.water <= 0;
  }

  waitTime(amount: number = 1, now: number = Date.now()): number {
    this.leak(now);
    const overflow = this.water + amount - this.capacity;
    if (overflow <= 0) return 0;
    return Math.ceil(overflow / this.leakRatePerMs);
  }

  reset(): void {
    this.water = 0;
    this.lastLeak = Date.now();
  }

  private leak(now: number): void {
    const elapsed = now - this.lastLeak;
    if (elapsed > 0) {
      this.water = Math.max(0, this.water - elapsed * this.leakRatePerMs);
    }
    this.lastLeak = now;
  }
}
