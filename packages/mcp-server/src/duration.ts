export class Duration {
  readonly ms: number;

  private constructor(ms: number) {
    this.ms = ms;
  }

  static milliseconds(n: number): Duration { return new Duration(n); }
  static seconds(n: number): Duration { return new Duration(n * 1000); }
  static minutes(n: number): Duration { return new Duration(n * 60_000); }
  static hours(n: number): Duration { return new Duration(n * 3_600_000); }
  static days(n: number): Duration { return new Duration(n * 86_400_000); }

  get seconds(): number { return this.ms / 1000; }
  get minutes(): number { return this.ms / 60_000; }
  get hours(): number { return this.ms / 3_600_000; }
  get days(): number { return this.ms / 86_400_000; }

  add(other: Duration): Duration { return new Duration(this.ms + other.ms); }
  subtract(other: Duration): Duration { return new Duration(this.ms - other.ms); }
  multiply(factor: number): Duration { return new Duration(this.ms * factor); }

  isZero(): boolean { return this.ms === 0; }
  isNegative(): boolean { return this.ms < 0; }

  format(): string {
    const abs = Math.abs(this.ms);
    if (abs < 1000) return `${this.ms}ms`;
    if (abs < 60_000) return `${(this.ms / 1000).toFixed(1)}s`;
    if (abs < 3_600_000) return `${(this.ms / 60_000).toFixed(1)}m`;
    if (abs < 86_400_000) return `${(this.ms / 3_600_000).toFixed(1)}h`;
    return `${(this.ms / 86_400_000).toFixed(1)}d`;
  }

  static between(a: Date, b: Date): Duration {
    return new Duration(b.getTime() - a.getTime());
  }

  static parse(str: string): Duration {
    const match = str.match(/^(-?\d+(?:\.\d+)?)\s*(ms|s|m|h|d)$/);
    if (!match) throw new Error(`Invalid duration: ${str}`);
    const value = parseFloat(match[1]);
    switch (match[2]) {
      case "ms": return Duration.milliseconds(value);
      case "s": return Duration.seconds(value);
      case "m": return Duration.minutes(value);
      case "h": return Duration.hours(value);
      case "d": return Duration.days(value);
      default: throw new Error(`Unknown unit: ${match[2]}`);
    }
  }
}
