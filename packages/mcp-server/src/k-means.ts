export interface KMeansResult {
  centroids: number[][];
  assignments: number[];
  iterations: number;
}

export function kMeans(
  points: number[][],
  k: number,
  maxIterations = 100
): KMeansResult {
  if (points.length === 0 || k <= 0) {
    return { centroids: [], assignments: [], iterations: 0 };
  }
  if (k >= points.length) {
    return {
      centroids: points.map((p) => [...p]),
      assignments: points.map((_, i) => i),
      iterations: 0,
    };
  }

  const dim = points[0].length;
  let centroids = initCentroids(points, k);
  let assignments = new Array<number>(points.length).fill(0);

  let iterations = 0;
  for (; iterations < maxIterations; iterations++) {
    const newAssignments = points.map((p) => nearest(p, centroids));

    let changed = false;
    for (let i = 0; i < newAssignments.length; i++) {
      if (newAssignments[i] !== assignments[i]) {
        changed = true;
        break;
      }
    }
    assignments = newAssignments;
    if (!changed) break;

    centroids = recompute(points, assignments, k, dim);
  }

  return { centroids, assignments, iterations };
}

function initCentroids(points: number[][], k: number): number[][] {
  const used = new Set<number>();
  const centroids: number[][] = [];
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * points.length);
    if (!used.has(idx)) {
      used.add(idx);
      centroids.push([...points[idx]]);
    }
  }
  return centroids;
}

function nearest(point: number[], centroids: number[][]): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < centroids.length; i++) {
    const d = dist(point, centroids[i]);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function dist(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return sum;
}

function recompute(
  points: number[][],
  assignments: number[],
  k: number,
  dim: number
): number[][] {
  const sums = Array.from({ length: k }, () => new Array(dim).fill(0));
  const counts = new Array(k).fill(0);

  for (let i = 0; i < points.length; i++) {
    const c = assignments[i];
    counts[c]++;
    for (let d = 0; d < dim; d++) {
      sums[c][d] += points[i][d];
    }
  }

  return sums.map((s, i) =>
    counts[i] > 0 ? s.map((v) => v / counts[i]) : s
  );
}
