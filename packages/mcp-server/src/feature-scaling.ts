export class FeatureScaling {
  static minMax(data: number[]): number[] {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return data.map(() => 0);
    return data.map(v => Math.round(((v - min) / range) * 10000) / 10000);
  }

  static standardize(data: number[]): number[] {
    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    const std = Math.sqrt(data.reduce((s, v) => s + (v - mean) ** 2, 0) / data.length);
    if (std === 0) return data.map(() => 0);
    return data.map(v => Math.round(((v - mean) / std) * 10000) / 10000);
  }

  static robust(data: number[]): number[] {
    const sorted = [...data].sort((a, b) => a - b);
    const median = FeatureScaling.percentileValue(sorted, 50);
    const q1 = FeatureScaling.percentileValue(sorted, 25);
    const q3 = FeatureScaling.percentileValue(sorted, 75);
    const iqr = q3 - q1;
    if (iqr === 0) return data.map(() => 0);
    return data.map(v => Math.round(((v - median) / iqr) * 10000) / 10000);
  }

  static maxAbs(data: number[]): number[] {
    const maxVal = Math.max(...data.map(Math.abs));
    if (maxVal === 0) return data.map(() => 0);
    return data.map(v => Math.round((v / maxVal) * 10000) / 10000);
  }

  static log(data: number[]): number[] {
    return data.map(v => Math.round(Math.log1p(Math.max(0, v)) * 10000) / 10000);
  }

  static l2Normalize(data: number[]): number[] {
    const norm = Math.sqrt(data.reduce((s, v) => s + v * v, 0));
    if (norm === 0) return data.map(() => 0);
    return data.map(v => Math.round((v / norm) * 10000) / 10000);
  }

  static batchMinMax(data: number[][]): number[][] {
    if (data.length === 0) return [];
    const dims = data[0].length;
    const result: number[][] = data.map(() => new Array(dims));
    for (let d = 0; d < dims; d++) {
      const col = data.map(row => row[d]);
      const scaled = FeatureScaling.minMax(col);
      for (let i = 0; i < data.length; i++) {
        result[i][d] = scaled[i];
      }
    }
    return result;
  }

  static batchStandardize(data: number[][]): number[][] {
    if (data.length === 0) return [];
    const dims = data[0].length;
    const result: number[][] = data.map(() => new Array(dims));
    for (let d = 0; d < dims; d++) {
      const col = data.map(row => row[d]);
      const scaled = FeatureScaling.standardize(col);
      for (let i = 0; i < data.length; i++) {
        result[i][d] = scaled[i];
      }
    }
    return result;
  }

  private static percentileValue(sorted: number[], p: number): number {
    const idx = (p / 100) * (sorted.length - 1);
    const low = Math.floor(idx);
    const high = Math.ceil(idx);
    if (low === high) return sorted[low];
    return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
  }
}
