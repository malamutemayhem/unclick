export interface Histogram {
  bins: number[];
  min: number;
  max: number;
  mean: number;
  median: number;
  stddev: number;
  total: number;
}

export function computeHistogram(values: number[], numBins = 256): Histogram {
  if (values.length === 0) {
    return { bins: new Array(numBins).fill(0), min: 0, max: 0, mean: 0, median: 0, stddev: 0, total: 0 };
  }

  let min = values[0];
  let max = values[0];
  let sum = 0;
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }
  const mean = sum / values.length;

  let variance = 0;
  for (const v of values) variance += (v - mean) ** 2;
  const stddev = Math.sqrt(variance / values.length);

  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const bins = new Array(numBins).fill(0);
  const range = max - min || 1;
  for (const v of values) {
    const idx = Math.min(numBins - 1, Math.floor(((v - min) / range) * numBins));
    bins[idx]++;
  }

  return { bins, min, max, mean, median, stddev, total: values.length };
}

export function normalizeHistogram(hist: Histogram): number[] {
  const maxCount = Math.max(...hist.bins);
  if (maxCount === 0) return new Array(hist.bins.length).fill(0);
  return hist.bins.map(b => b / maxCount);
}

export function cumulativeHistogram(hist: Histogram): number[] {
  const cum: number[] = [];
  let sum = 0;
  for (const b of hist.bins) {
    sum += b;
    cum.push(sum);
  }
  return cum;
}

export function histogramEqualization(values: number[], numBins = 256): number[] {
  const hist = computeHistogram(values, numBins);
  const cum = cumulativeHistogram(hist);
  const total = values.length;
  const range = hist.max - hist.min || 1;

  return values.map(v => {
    const binIdx = Math.min(numBins - 1, Math.floor(((v - hist.min) / range) * numBins));
    return (cum[binIdx] / total) * range + hist.min;
  });
}

export function percentile(hist: Histogram, p: number): number {
  const targetCount = (p / 100) * hist.total;
  let cumCount = 0;
  const range = hist.max - hist.min || 1;
  for (let i = 0; i < hist.bins.length; i++) {
    cumCount += hist.bins[i];
    if (cumCount >= targetCount) {
      return hist.min + (i / hist.bins.length) * range;
    }
  }
  return hist.max;
}

export function entropy(hist: Histogram): number {
  let e = 0;
  for (const count of hist.bins) {
    if (count > 0) {
      const p = count / hist.total;
      e -= p * Math.log2(p);
    }
  }
  return e;
}

export function otsuThreshold(hist: Histogram): number {
  const total = hist.total;
  let sumAll = 0;
  for (let i = 0; i < hist.bins.length; i++) sumAll += i * hist.bins[i];

  let sumBg = 0;
  let wBg = 0;
  let maxVariance = 0;
  let bestThreshold = 0;

  for (let t = 0; t < hist.bins.length; t++) {
    wBg += hist.bins[t];
    if (wBg === 0) continue;
    const wFg = total - wBg;
    if (wFg === 0) break;

    sumBg += t * hist.bins[t];
    const meanBg = sumBg / wBg;
    const meanFg = (sumAll - sumBg) / wFg;
    const variance = wBg * wFg * (meanBg - meanFg) ** 2;

    if (variance > maxVariance) {
      maxVariance = variance;
      bestThreshold = t;
    }
  }

  const range = hist.max - hist.min || 1;
  return hist.min + (bestThreshold / hist.bins.length) * range;
}
