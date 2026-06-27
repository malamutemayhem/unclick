export interface ProgressStyle {
  filled: string;
  empty: string;
  leftCap: string;
  rightCap: string;
}

export class ProgressBar {
  static readonly BLOCK: ProgressStyle = { filled: "█", empty: "░", leftCap: "", rightCap: "" };
  static readonly HASH: ProgressStyle = { filled: "#", empty: "-", leftCap: "[", rightCap: "]" };
  static readonly ARROW: ProgressStyle = { filled: "=", empty: " ", leftCap: "[", rightCap: "]" };
  static readonly DOT: ProgressStyle = { filled: "●", empty: "○", leftCap: "", rightCap: "" };

  static render(
    current: number,
    total: number,
    width: number = 30,
    style: ProgressStyle = ProgressBar.BLOCK,
  ): string {
    const ratio = Math.min(1, Math.max(0, total === 0 ? 0 : current / total));
    const filledCount = Math.round(ratio * width);
    const emptyCount = width - filledCount;
    const bar = style.leftCap + style.filled.repeat(filledCount) + style.empty.repeat(emptyCount) + style.rightCap;
    const pct = Math.round(ratio * 100);
    return `${bar} ${pct}%`;
  }

  static renderWithLabel(
    label: string,
    current: number,
    total: number,
    width: number = 30,
    style: ProgressStyle = ProgressBar.BLOCK,
  ): string {
    return `${label}: ${ProgressBar.render(current, total, width, style)}`;
  }

  static multiBar(
    items: Array<{ label: string; current: number; total: number }>,
    width: number = 30,
    style: ProgressStyle = ProgressBar.BLOCK,
  ): string {
    const maxLabel = Math.max(...items.map((i) => i.label.length));
    return items
      .map((i) => `${i.label.padEnd(maxLabel)} ${ProgressBar.render(i.current, i.total, width, style)}`)
      .join("\n");
  }

  static spinner(frame: number): string {
    const frames = ["|", "/", "-", "\\"];
    return frames[frame % frames.length];
  }

  static dots(frame: number): string {
    const patterns = ["   ", ".  ", ".. ", "..."];
    return patterns[frame % patterns.length];
  }

  static eta(current: number, total: number, elapsedMs: number): string {
    if (current === 0) return "calculating...";
    const rate = current / elapsedMs;
    const remaining = (total - current) / rate;
    return ProgressBar.formatDuration(remaining);
  }

  static throughput(current: number, elapsedMs: number, unit: string = "items"): string {
    const rate = elapsedMs === 0 ? 0 : (current / elapsedMs) * 1000;
    return `${rate.toFixed(1)} ${unit}/s`;
  }

  static percentage(current: number, total: number, decimals: number = 0): string {
    if (total === 0) return "0%";
    const pct = (current / total) * 100;
    return `${pct.toFixed(decimals)}%`;
  }

  static fraction(current: number, total: number): string {
    return `${current}/${total}`;
  }

  private static formatDuration(ms: number): string {
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes < 60) return `${minutes}m ${secs}s`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}
