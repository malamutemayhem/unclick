export class PhiAccrualDetector {
  private intervals: number[] = [];
  private lastHeartbeat: number | null = null;
  private maxSamples: number;
  private threshold: number;

  constructor(threshold = 8, maxSamples = 200) {
    this.threshold = threshold;
    this.maxSamples = maxSamples;
  }

  heartbeat(timestamp: number): void {
    if (this.lastHeartbeat !== null) {
      const interval = timestamp - this.lastHeartbeat;
      this.intervals.push(interval);
      if (this.intervals.length > this.maxSamples) {
        this.intervals.shift();
      }
    }
    this.lastHeartbeat = timestamp;
  }

  phi(now: number): number {
    if (this.lastHeartbeat === null || this.intervals.length < 2) {
      return 0;
    }
    const elapsed = now - this.lastHeartbeat;
    const mean = this.mean();
    const std = this.stddev();
    if (std === 0) {
      return elapsed > mean ? Infinity : 0;
    }
    const y = (elapsed - mean) / std;
    const p = 1 - cdf(y);
    if (p <= 0) return Infinity;
    return -Math.log10(p);
  }

  isAvailable(now: number): boolean {
    return this.phi(now) < this.threshold;
  }

  private mean(): number {
    if (this.intervals.length === 0) return 0;
    let sum = 0;
    for (const v of this.intervals) sum += v;
    return sum / this.intervals.length;
  }

  private stddev(): number {
    if (this.intervals.length < 2) return 0;
    const m = this.mean();
    let sum = 0;
    for (const v of this.intervals) {
      const d = v - m;
      sum += d * d;
    }
    return Math.sqrt(sum / (this.intervals.length - 1));
  }

  get sampleCount(): number {
    return this.intervals.length;
  }

  get lastSeen(): number | null {
    return this.lastHeartbeat;
  }

  getThreshold(): number {
    return this.threshold;
  }

  setThreshold(t: number): void {
    this.threshold = t;
  }

  stats(): { mean: number; stddev: number; samples: number } {
    return {
      mean: this.mean(),
      stddev: this.stddev(),
      samples: this.intervals.length,
    };
  }

  reset(): void {
    this.intervals = [];
    this.lastHeartbeat = null;
  }
}

function cdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

export class MultiDetector {
  private detectors = new Map<string, PhiAccrualDetector>();
  private threshold: number;
  private maxSamples: number;

  constructor(threshold = 8, maxSamples = 200) {
    this.threshold = threshold;
    this.maxSamples = maxSamples;
  }

  heartbeat(nodeId: string, timestamp: number): void {
    if (!this.detectors.has(nodeId)) {
      this.detectors.set(nodeId, new PhiAccrualDetector(this.threshold, this.maxSamples));
    }
    this.detectors.get(nodeId)!.heartbeat(timestamp);
  }

  phi(nodeId: string, now: number): number {
    const detector = this.detectors.get(nodeId);
    return detector ? detector.phi(now) : Infinity;
  }

  isAvailable(nodeId: string, now: number): boolean {
    const detector = this.detectors.get(nodeId);
    return detector ? detector.isAvailable(now) : false;
  }

  availableNodes(now: number): string[] {
    const result: string[] = [];
    for (const [id, detector] of this.detectors) {
      if (detector.isAvailable(now)) result.push(id);
    }
    return result;
  }

  remove(nodeId: string): void {
    this.detectors.delete(nodeId);
  }

  get nodeCount(): number {
    return this.detectors.size;
  }
}
