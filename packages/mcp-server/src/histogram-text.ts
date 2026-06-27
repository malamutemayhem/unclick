export interface HistogramBin {
  min: number;
  max: number;
  count: number;
  frequency: number;
}

export class HistogramText {
  static binData(data: number[], binCount: number = 10): HistogramBin[] {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const binWidth = range === 0 ? 1 : range / binCount;

    const bins: HistogramBin[] = [];
    for (let i = 0; i < binCount; i++) {
      bins.push({
        min: min + i * binWidth,
        max: min + (i + 1) * binWidth,
        count: 0,
        frequency: 0,
      });
    }

    for (const v of data) {
      let idx = Math.floor((v - min) / binWidth);
      if (idx >= binCount) idx = binCount - 1;
      bins[idx].count++;
    }

    for (const bin of bins) {
      bin.frequency = Math.round((bin.count / data.length) * 1000) / 1000;
    }

    return bins;
  }

  static render(data: number[], binCount: number = 10, width: number = 40): string {
    const bins = HistogramText.binData(data, binCount);
    if (bins.length === 0) return "";
    const maxCount = Math.max(...bins.map((b) => b.count));
    const maxLabel = Math.max(...bins.map((b) => b.max.toFixed(1).length));

    return bins
      .map((bin) => {
        const label = `${bin.min.toFixed(1).padStart(maxLabel)} - ${bin.max.toFixed(1).padStart(maxLabel)}`;
        const barLen = maxCount === 0 ? 0 : Math.round((bin.count / maxCount) * width);
        const bar = "█".repeat(barLen);
        return `${label} | ${bar} ${bin.count}`;
      })
      .join("\n");
  }

  static renderVertical(data: number[], binCount: number = 10, height: number = 15): string {
    const bins = HistogramText.binData(data, binCount);
    if (bins.length === 0) return "";
    const maxCount = Math.max(...bins.map((b) => b.count));

    const lines: string[] = [];
    for (let row = height; row > 0; row--) {
      const threshold = (row / height) * maxCount;
      const line = bins.map((b) => (b.count >= threshold ? "█" : " ")).join(" ");
      lines.push(line);
    }
    lines.push(bins.map(() => "─").join("─"));
    return lines.join("\n");
  }

  static stats(data: number[]): { mean: number; median: number; stdDev: number; min: number; max: number; count: number } {
    if (data.length === 0) return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0, count: 0 };
    const sorted = [...data].sort((a, b) => a - b);
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const median = data.length % 2 === 0
      ? (sorted[data.length / 2 - 1] + sorted[data.length / 2]) / 2
      : sorted[Math.floor(data.length / 2)];
    const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length;
    return {
      mean: Math.round(mean * 100) / 100,
      median,
      stdDev: Math.round(Math.sqrt(variance) * 100) / 100,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      count: data.length,
    };
  }

  static percentile(data: number[], p: number): number {
    const sorted = [...data].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const low = Math.floor(idx);
    const high = Math.ceil(idx);
    if (low === high) return sorted[low];
    return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
  }

  static quartiles(data: number[]): { q1: number; q2: number; q3: number } {
    return {
      q1: HistogramText.percentile(data, 25),
      q2: HistogramText.percentile(data, 50),
      q3: HistogramText.percentile(data, 75),
    };
  }

  static boxPlot(data: number[], width: number = 40): string {
    const q = HistogramText.quartiles(data);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return "├" + "─".repeat(width) + "┤";

    const pos = (v: number) => Math.round(((v - min) / range) * width);
    const line = new Array(width + 1).fill("─");
    line[pos(q.q1)] = "┤";
    line[pos(q.q2)] = "│";
    line[pos(q.q3)] = "├";
    line[0] = "├";
    line[width] = "┤";
    return line.join("");
  }
}
