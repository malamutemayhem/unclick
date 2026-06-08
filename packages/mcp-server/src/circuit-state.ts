export type CircuitStateType = "closed" | "open" | "half-open";

export class CircuitState {
  private state: CircuitStateType = "closed";
  private failCount = 0;
  private successCount = 0;
  private lastFailTime = 0;
  private threshold: number;
  private resetTimeoutMs: number;
  private halfOpenMax: number;

  constructor(opts?: { threshold?: number; resetTimeoutMs?: number; halfOpenMax?: number }) {
    this.threshold = opts?.threshold ?? 5;
    this.resetTimeoutMs = opts?.resetTimeoutMs ?? 30000;
    this.halfOpenMax = opts?.halfOpenMax ?? 1;
  }

  get current(): CircuitStateType {
    if (this.state === "open" && Date.now() - this.lastFailTime >= this.resetTimeoutMs) {
      this.state = "half-open";
      this.successCount = 0;
    }
    return this.state;
  }

  get failures(): number {
    return this.failCount;
  }

  recordSuccess(): void {
    if (this.state === "half-open") {
      this.successCount++;
      if (this.successCount >= this.halfOpenMax) {
        this.state = "closed";
        this.failCount = 0;
        this.successCount = 0;
      }
    } else if (this.state === "closed") {
      this.failCount = 0;
    }
  }

  recordFailure(): void {
    this.failCount++;
    this.lastFailTime = Date.now();
    if (this.state === "half-open" || this.failCount >= this.threshold) {
      this.state = "open";
    }
  }

  isAllowed(): boolean {
    const s = this.current;
    return s === "closed" || s === "half-open";
  }

  reset(): void {
    this.state = "closed";
    this.failCount = 0;
    this.successCount = 0;
    this.lastFailTime = 0;
  }

  forceOpen(): void {
    this.state = "open";
    this.lastFailTime = Date.now();
  }
}
