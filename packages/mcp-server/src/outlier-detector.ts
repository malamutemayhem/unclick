export interface OutlierResult {
  value: number;
  index: number;
  zScore: number;
  isOutlier: boolean;
}

export class OutlierDetector {
  static zScore(data: number[], threshold: number = 2): OutlierResult[] {
    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length;
    const stdDev = Math.sqrt(variance);
    if (stdDev === 0) return data.map((v, i) => ({ value: v, index: i, zScore: 0, isOutlier: false }));

    return data.map((value, index) => {
      const z = (value - mean) / stdDev;
      return {
        value,
        index,
        zScore: Math.round(z * 1000) / 1000,
        isOutlier: Math.abs(z) > threshold,
      };
    });
  }

  static iqr(data: number[], factor: number = 1.5): OutlierResult[] {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = OutlierDetector.percentile(sorted, 25);
    const q3 = OutlierDetector.percentile(sorted, 75);
    const iqr = q3 - q1;
    const lower = q1 - factor * iqr;
    const upper = q3 + factor * iqr;

    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length;
    const stdDev = Math.sqrt(variance);

    return data.map((value, index) => ({
      value,
      index,
      zScore: stdDev === 0 ? 0 : Math.round(((value - mean) / stdDev) * 1000) / 1000,
      isOutlier: value < lower || value > upper,
    }));
  }

  static modifiedZScore(data: number[], threshold: number = 3.5): OutlierResult[] {
    const sorted = [...data].sort((a, b) => a - b);
    const median = OutlierDetector.percentile(sorted, 50);
    const deviations = data.map((v) => Math.abs(v - median));
    const mad = OutlierDetector.percentile([...deviations].sort((a, b) => a - b), 50);
    const factor = 0.6745;

    return data.map((value, index) => {
      const mz = mad === 0 ? 0 : (factor * (value - median)) / mad;
      return {
        value,
        index,
        zScore: Math.round(mz * 1000) / 1000,
        isOutlier: Math.abs(mz) > threshold,
      };
    });
  }

  static getOutliers(data: number[], method: "zscore" | "iqr" | "modified" = "iqr"): number[] {
    let results: OutlierResult[];
    switch (method) {
      case "zscore": results = OutlierDetector.zScore(data); break;
      case "modified": results = OutlierDetector.modifiedZScore(data); break;
      default: results = OutlierDetector.iqr(data);
    }
    return results.filter((r) => r.isOutlier).map((r) => r.value);
  }

  static removeOutliers(data: number[], method: "zscore" | "iqr" | "modified" = "iqr"): number[] {
    let results: OutlierResult[];
    switch (method) {
      case "zscore": results = OutlierDetector.zScore(data); break;
      case "modified": results = OutlierDetector.modifiedZScore(data); break;
      default: results = OutlierDetector.iqr(data);
    }
    return results.filter((r) => !r.isOutlier).map((r) => r.value);
  }

  static bounds(data: number[], factor: number = 1.5): { lower: number; upper: number } {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = OutlierDetector.percentile(sorted, 25);
    const q3 = OutlierDetector.percentile(sorted, 75);
    const iqr = q3 - q1;
    return {
      lower: Math.round((q1 - factor * iqr) * 1000) / 1000,
      upper: Math.round((q3 + factor * iqr) * 1000) / 1000,
    };
  }

  private static percentile(sorted: number[], p: number): number {
    const idx = (p / 100) * (sorted.length - 1);
    const low = Math.floor(idx);
    const high = Math.ceil(idx);
    if (low === high) return sorted[low];
    return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
  }
}
