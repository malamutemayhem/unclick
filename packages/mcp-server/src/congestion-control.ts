export type CongestionState = "slow-start" | "congestion-avoidance" | "fast-recovery";

export class TCPCongestion {
  private cwnd: number;
  private ssthresh: number;
  private state: CongestionState;
  private mss: number;
  private dupAckCount = 0;
  private history: { cwnd: number; state: CongestionState }[] = [];

  constructor(mss = 1, initialWindow = 1, initialSsthresh = 64) {
    this.mss = mss;
    this.cwnd = initialWindow;
    this.ssthresh = initialSsthresh;
    this.state = "slow-start";
  }

  onAck(): void {
    this.dupAckCount = 0;
    switch (this.state) {
      case "slow-start":
        this.cwnd += this.mss;
        if (this.cwnd >= this.ssthresh) {
          this.state = "congestion-avoidance";
        }
        break;
      case "congestion-avoidance":
        this.cwnd += this.mss * (this.mss / this.cwnd);
        break;
      case "fast-recovery":
        this.cwnd = this.ssthresh;
        this.state = "congestion-avoidance";
        break;
    }
    this.record();
  }

  onDupAck(): void {
    this.dupAckCount++;
    if (this.dupAckCount === 3) {
      this.ssthresh = Math.max(this.cwnd / 2, 2);
      this.cwnd = this.ssthresh + 3 * this.mss;
      this.state = "fast-recovery";
    } else if (this.state === "fast-recovery") {
      this.cwnd += this.mss;
    }
    this.record();
  }

  onTimeout(): void {
    this.ssthresh = Math.max(this.cwnd / 2, 2);
    this.cwnd = this.mss;
    this.dupAckCount = 0;
    this.state = "slow-start";
    this.record();
  }

  private record(): void {
    this.history.push({ cwnd: this.cwnd, state: this.state });
  }

  get window(): number {
    return this.cwnd;
  }

  get threshold(): number {
    return this.ssthresh;
  }

  get currentState(): CongestionState {
    return this.state;
  }

  getHistory(): typeof this.history {
    return [...this.history];
  }

  reset(): void {
    this.cwnd = this.mss;
    this.ssthresh = 64;
    this.state = "slow-start";
    this.dupAckCount = 0;
    this.history = [];
  }
}

export class LeakyBucket {
  private capacity: number;
  private rate: number;
  private level = 0;
  private lastTime = 0;

  constructor(capacity: number, rate: number) {
    this.capacity = capacity;
    this.rate = rate;
  }

  add(amount: number, time: number): boolean {
    this.drain(time);
    if (this.level + amount > this.capacity) return false;
    this.level += amount;
    return true;
  }

  private drain(time: number): void {
    const elapsed = time - this.lastTime;
    this.level = Math.max(0, this.level - elapsed * this.rate);
    this.lastTime = time;
  }

  get currentLevel(): number {
    return this.level;
  }

  get available(): number {
    return this.capacity - this.level;
  }
}

export class TokenBucket {
  private capacity: number;
  private rate: number;
  private tokens: number;
  private lastTime = 0;

  constructor(capacity: number, rate: number) {
    this.capacity = capacity;
    this.rate = rate;
    this.tokens = capacity;
  }

  consume(amount: number, time: number): boolean {
    this.refill(time);
    if (this.tokens < amount) return false;
    this.tokens -= amount;
    return true;
  }

  private refill(time: number): void {
    const elapsed = time - this.lastTime;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.rate);
    this.lastTime = time;
  }

  get availableTokens(): number {
    return this.tokens;
  }
}
