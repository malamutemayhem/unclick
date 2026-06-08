export class Sparkline {
  private static readonly BLOCKS = [" ", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

  static render(data: number[]): string {
    if (data.length === 0) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return Sparkline.BLOCKS[4].repeat(data.length);
    return data.map((v) => {
      const idx = Math.round(((v - min) / range) * 7) + 1;
      return Sparkline.BLOCKS[Math.min(idx, 8)];
    }).join("");
  }

  static renderWithLabels(data: number[], label?: string): string {
    const chart = Sparkline.render(data);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const prefix = label ? `${label}: ` : "";
    return `${prefix}${chart} (${min}-${max})`;
  }

  static barChart(data: number[], maxWidth: number = 40): string[] {
    if (data.length === 0) return [];
    const max = Math.max(...data);
    if (max === 0) return data.map(() => "");
    return data.map((v) => {
      const width = Math.round((v / max) * maxWidth);
      return "█".repeat(width);
    });
  }

  static labeledBarChart(items: { label: string; value: number }[], maxWidth: number = 40): string[] {
    if (items.length === 0) return [];
    const maxLabel = Math.max(...items.map((i) => i.label.length));
    const max = Math.max(...items.map((i) => i.value));
    if (max === 0) return items.map((i) => i.label.padEnd(maxLabel) + " |");
    return items.map((i) => {
      const bar = "█".repeat(Math.round((i.value / max) * maxWidth));
      return `${i.label.padEnd(maxLabel)} | ${bar} ${i.value}`;
    });
  }

  static trend(data: number[]): "up" | "down" | "flat" | "unknown" {
    if (data.length < 2) return "unknown";
    const first = data.slice(0, Math.ceil(data.length / 2));
    const second = data.slice(Math.ceil(data.length / 2));
    const avgFirst = first.reduce((a, b) => a + b, 0) / first.length;
    const avgSecond = second.reduce((a, b) => a + b, 0) / second.length;
    const diff = avgSecond - avgFirst;
    const threshold = (Math.max(...data) - Math.min(...data)) * 0.05;
    if (diff > threshold) return "up";
    if (diff < -threshold) return "down";
    return "flat";
  }

  static summary(data: number[]): { min: number; max: number; avg: number; trend: string; chart: string } {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const avg = Math.round((data.reduce((a, b) => a + b, 0) / data.length) * 100) / 100;
    return {
      min,
      max,
      avg,
      trend: Sparkline.trend(data),
      chart: Sparkline.render(data),
    };
  }
}
