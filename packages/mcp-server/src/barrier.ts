export class Barrier {
  private count: number;
  private parties: number;
  private waiters: (() => void)[] = [];
  private generation: number = 0;

  constructor(parties: number) {
    this.parties = parties;
    this.count = 0;
  }

  async wait(): Promise<number> {
    const gen = this.generation;
    this.count++;
    if (this.count >= this.parties) {
      const arrived = this.count;
      this.count = 0;
      this.generation++;
      const waiters = this.waiters;
      this.waiters = [];
      for (const resolve of waiters) {
        resolve();
      }
      return arrived;
    }
    return new Promise<number>((resolve) => {
      this.waiters.push(() => resolve(this.count));
    });
  }

  arrived(): number {
    return this.count;
  }

  remaining(): number {
    return this.parties - this.count;
  }

  getParties(): number {
    return this.parties;
  }

  getGeneration(): number {
    return this.generation;
  }

  isBroken(): boolean {
    return false;
  }

  reset(): void {
    this.count = 0;
    this.generation++;
    const waiters = this.waiters;
    this.waiters = [];
    for (const resolve of waiters) {
      resolve();
    }
  }
}

export class CountDownLatch {
  private count: number;
  private waiters: (() => void)[] = [];

  constructor(count: number) {
    this.count = count;
  }

  countDown(): void {
    if (this.count <= 0) return;
    this.count--;
    if (this.count === 0) {
      for (const resolve of this.waiters) {
        resolve();
      }
      this.waiters = [];
    }
  }

  async await(): Promise<void> {
    if (this.count <= 0) return;
    return new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  getCount(): number {
    return this.count;
  }
}
