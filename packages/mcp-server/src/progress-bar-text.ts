export interface ProgressBarOptions {
  width: number;
  filled: string;
  empty: string;
  leftBracket: string;
  rightBracket: string;
  showPercent: boolean;
  showFraction: boolean;
}

const DEFAULT_OPTIONS: ProgressBarOptions = {
  width: 30,
  filled: "#",
  empty: "-",
  leftBracket: "[",
  rightBracket: "]",
  showPercent: true,
  showFraction: false,
};

export class ProgressBar {
  private current = 0;
  private readonly total: number;
  private readonly options: ProgressBarOptions;
  private startTime: number;

  constructor(total: number, options?: Partial<ProgressBarOptions>) {
    this.total = total;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.startTime = Date.now();
  }

  update(value: number): void {
    this.current = Math.min(value, this.total);
  }

  increment(amount: number = 1): void {
    this.update(this.current + amount);
  }

  render(): string {
    const { width, filled, empty, leftBracket, rightBracket, showPercent, showFraction } = this.options;
    const ratio = this.total > 0 ? this.current / this.total : 0;
    const filledCount = Math.round(ratio * width);
    const emptyCount = width - filledCount;
    let bar = `${leftBracket}${filled.repeat(filledCount)}${empty.repeat(emptyCount)}${rightBracket}`;
    if (showPercent) bar += ` ${Math.round(ratio * 100)}%`;
    if (showFraction) bar += ` ${this.current}/${this.total}`;
    return bar;
  }

  get progress(): number {
    return this.total > 0 ? this.current / this.total : 0;
  }

  get isComplete(): boolean {
    return this.current >= this.total;
  }

  get elapsed(): number {
    return Date.now() - this.startTime;
  }

  get eta(): number {
    if (this.current === 0) return Infinity;
    const rate = this.elapsed / this.current;
    return rate * (this.total - this.current);
  }

  static spinner(frame: number, style: string = "dots"): string {
    const frames: Record<string, string[]> = {
      dots: ["|", "/", "-", "\\"],
      braille: ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"],
      arrows: ["←", "↑", "→", "↓"],
    };
    const chars = frames[style] ?? frames.dots;
    return chars[frame % chars.length];
  }

  static bar(current: number, total: number, width: number = 20): string {
    const pb = new ProgressBar(total, { width });
    pb.update(current);
    return pb.render();
  }

  static multiBar(bars: { label: string; current: number; total: number }[], labelWidth: number = 10): string {
    return bars.map((b) => {
      const label = b.label.padEnd(labelWidth);
      return `${label} ${ProgressBar.bar(b.current, b.total, 20)}`;
    }).join("\n");
  }
}
