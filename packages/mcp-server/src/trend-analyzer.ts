export interface TrendResult {
  direction: "up" | "down" | "flat";
  strength: number;
  slope: number;
  volatility: number;
  momentum: number;
}

export class TrendAnalyzer {
  static analyze(data: number[]): TrendResult {
    if (data.length < 2) {
      return { direction: "flat", strength: 0, slope: 0, volatility: 0, momentum: 0 };
    }

    const n = data.length;
    const xMean = (n - 1) / 2;
    const yMean = data.reduce((s, v) => s + v, 0) / n;

    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < n; i++) {
      numerator += (i - xMean) * (data[i] - yMean);
      denominator += (i - xMean) ** 2;
    }
    const slope = denominator === 0 ? 0 : numerator / denominator;

    const range = Math.max(...data) - Math.min(...data);
    const normalizedSlope = range === 0 ? 0 : slope / range;
    const strength = Math.min(1, Math.abs(normalizedSlope) * n);

    const changes = [];
    for (let i = 1; i < n; i++) {
      changes.push(data[i] - data[i - 1]);
    }
    const avgChange = changes.reduce((s, c) => s + Math.abs(c), 0) / changes.length;
    const volatility = yMean === 0 ? 0 : avgChange / Math.abs(yMean);

    const recentN = Math.min(3, Math.floor(n / 2));
    const recent = data.slice(-recentN);
    const earlier = data.slice(0, recentN);
    const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
    const earlierAvg = earlier.reduce((s, v) => s + v, 0) / earlier.length;
    const momentum = earlierAvg === 0 ? 0 : (recentAvg - earlierAvg) / Math.abs(earlierAvg);

    let direction: "up" | "down" | "flat";
    if (range === 0 || Math.abs(slope) < range * 0.01) direction = "flat";
    else direction = slope > 0 ? "up" : "down";

    return {
      direction,
      strength: Math.round(strength * 1000) / 1000,
      slope: Math.round(slope * 10000) / 10000,
      volatility: Math.round(volatility * 10000) / 10000,
      momentum: Math.round(momentum * 10000) / 10000,
    };
  }

  static percentChange(data: number[]): number[] {
    const changes: number[] = [];
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i - 1] === 0 ? 0 : Math.round(((data[i] - data[i - 1]) / Math.abs(data[i - 1])) * 10000) / 100);
    }
    return changes;
  }

  static peaks(data: number[]): number[] {
    const indices: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
        indices.push(i);
      }
    }
    return indices;
  }

  static troughs(data: number[]): number[] {
    const indices: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] < data[i - 1] && data[i] < data[i + 1]) {
        indices.push(i);
      }
    }
    return indices;
  }

  static forecast(data: number[], periods: number): number[] {
    if (data.length < 2) return new Array(periods).fill(data[0] || 0);
    const n = data.length;
    const xMean = (n - 1) / 2;
    const yMean = data.reduce((s, v) => s + v, 0) / n;
    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (i - xMean) * (data[i] - yMean);
      den += (i - xMean) ** 2;
    }
    const slope = den === 0 ? 0 : num / den;
    const intercept = yMean - slope * xMean;
    return Array.from({ length: periods }, (_, i) =>
      Math.round((slope * (n + i) + intercept) * 10000) / 10000,
    );
  }

  static seasonality(data: number[], period: number): number[] {
    const seasonal: number[] = new Array(period).fill(0);
    const counts: number[] = new Array(period).fill(0);
    for (let i = 0; i < data.length; i++) {
      seasonal[i % period] += data[i];
      counts[i % period]++;
    }
    const overall = data.reduce((s, v) => s + v, 0) / data.length;
    return seasonal.map((s, i) => {
      const avg = counts[i] === 0 ? 0 : s / counts[i];
      return Math.round((avg - overall) * 10000) / 10000;
    });
  }
}
