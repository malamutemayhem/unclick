export class Duration {
  private ms: number;

  private constructor(ms: number) {
    this.ms = ms;
  }

  static milliseconds(n: number): Duration { return new Duration(n); }
  static seconds(n: number): Duration { return new Duration(n * 1000); }
  static minutes(n: number): Duration { return new Duration(n * 60_000); }
  static hours(n: number): Duration { return new Duration(n * 3_600_000); }
  static days(n: number): Duration { return new Duration(n * 86_400_000); }

  static parse(s: string): Duration {
    const match = s.match(/^(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)$/);
    if (!match) throw new Error(`Invalid duration: "${s}"`);
    const val = parseFloat(match[1]);
    const unit = match[2];
    switch (unit) {
      case "ms": return Duration.milliseconds(val);
      case "s": return Duration.seconds(val);
      case "m": return Duration.minutes(val);
      case "h": return Duration.hours(val);
      case "d": return Duration.days(val);
      default: throw new Error(`Unknown unit: ${unit}`);
    }
  }

  toMilliseconds(): number { return this.ms; }
  toSeconds(): number { return this.ms / 1000; }
  toMinutes(): number { return this.ms / 60_000; }
  toHours(): number { return this.ms / 3_600_000; }
  toDays(): number { return this.ms / 86_400_000; }

  add(other: Duration): Duration { return new Duration(this.ms + other.ms); }
  subtract(other: Duration): Duration { return new Duration(this.ms - other.ms); }
  multiply(factor: number): Duration { return new Duration(this.ms * factor); }

  isZero(): boolean { return this.ms === 0; }
  isNegative(): boolean { return this.ms < 0; }

  toString(): string {
    if (this.ms === 0) return "0ms";
    const abs = Math.abs(this.ms);
    const sign = this.ms < 0 ? "-" : "";
    if (abs >= 86_400_000 && abs % 86_400_000 === 0) return `${sign}${abs / 86_400_000}d`;
    if (abs >= 3_600_000 && abs % 3_600_000 === 0) return `${sign}${abs / 3_600_000}h`;
    if (abs >= 60_000 && abs % 60_000 === 0) return `${sign}${abs / 60_000}m`;
    if (abs >= 1000 && abs % 1000 === 0) return `${sign}${abs / 1000}s`;
    return `${sign}${abs}ms`;
  }

  equals(other: Duration): boolean { return this.ms === other.ms; }
  greaterThan(other: Duration): boolean { return this.ms > other.ms; }
  lessThan(other: Duration): boolean { return this.ms < other.ms; }
}
