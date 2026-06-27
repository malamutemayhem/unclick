export interface PingResult {
  seq: number;
  target: string;
  ttl: number;
  rtt: number;
  success: boolean;
  error?: string;
}

export interface PingStats {
  sent: number;
  received: number;
  lost: number;
  lossPercent: number;
  minRtt: number;
  maxRtt: number;
  avgRtt: number;
  jitter: number;
}

export interface PingOptions {
  count: number;
  ttl: number;
  baseRtt: number;
  jitter: number;
  lossRate: number;
}

export class PingSim {
  private target: string;
  private results: PingResult[] = [];
  private opts: PingOptions;
  private seq = 0;
  private rng: () => number;

  constructor(target: string, opts?: Partial<PingOptions>, seed?: number) {
    this.target = target;
    this.opts = {
      count: opts?.count ?? 4,
      ttl: opts?.ttl ?? 64,
      baseRtt: opts?.baseRtt ?? 20,
      jitter: opts?.jitter ?? 5,
      lossRate: opts?.lossRate ?? 0,
    };
    this.rng = seed !== undefined ? this.seededRandom(seed) : Math.random.bind(Math);
  }

  ping(): PingResult {
    this.seq++;
    const lost = this.rng() < this.opts.lossRate;

    if (lost) {
      const result: PingResult = {
        seq: this.seq,
        target: this.target,
        ttl: this.opts.ttl,
        rtt: -1,
        success: false,
        error: "Request timed out",
      };
      this.results.push(result);
      return { ...result };
    }

    const variation = (this.rng() - 0.5) * 2 * this.opts.jitter;
    const rtt = Math.max(0.1, this.opts.baseRtt + variation);

    const result: PingResult = {
      seq: this.seq,
      target: this.target,
      ttl: this.opts.ttl,
      rtt: Math.round(rtt * 100) / 100,
      success: true,
    };
    this.results.push(result);
    return { ...result };
  }

  run(): PingResult[] {
    const results: PingResult[] = [];
    for (let i = 0; i < this.opts.count; i++) {
      results.push(this.ping());
    }
    return results;
  }

  getStats(): PingStats {
    const successful = this.results.filter((r) => r.success);
    const sent = this.results.length;
    const received = successful.length;
    const lost = sent - received;

    if (successful.length === 0) {
      return {
        sent,
        received: 0,
        lost,
        lossPercent: sent > 0 ? 100 : 0,
        minRtt: 0,
        maxRtt: 0,
        avgRtt: 0,
        jitter: 0,
      };
    }

    const rtts = successful.map((r) => r.rtt);
    const minRtt = Math.min(...rtts);
    const maxRtt = Math.max(...rtts);
    const avgRtt = rtts.reduce((a, b) => a + b, 0) / rtts.length;

    let jitter = 0;
    if (rtts.length > 1) {
      for (let i = 1; i < rtts.length; i++) {
        jitter += Math.abs(rtts[i] - rtts[i - 1]);
      }
      jitter /= rtts.length - 1;
    }

    return {
      sent,
      received,
      lost,
      lossPercent: (lost / sent) * 100,
      minRtt: Math.round(minRtt * 100) / 100,
      maxRtt: Math.round(maxRtt * 100) / 100,
      avgRtt: Math.round(avgRtt * 100) / 100,
      jitter: Math.round(jitter * 100) / 100,
    };
  }

  getResults(): PingResult[] {
    return this.results.map((r) => ({ ...r }));
  }

  reset(): void {
    this.results = [];
    this.seq = 0;
  }

  private seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }
}
