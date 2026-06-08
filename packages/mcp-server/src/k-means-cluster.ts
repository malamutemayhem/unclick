export class KMeansCluster {
  static cluster(
    points: number[][],
    k: number,
    maxIterations: number = 100
  ): { centroids: number[][]; assignments: number[]; iterations: number } {
    const n = points.length;
    const dim = points[0].length;

    const centroids = points.slice(0, k).map((p) => [...p]);
    let assignments = new Array(n).fill(0);

    for (let iter = 0; iter < maxIterations; iter++) {
      const newAssignments = points.map((p) => this.nearest(p, centroids));

      let changed = false;
      for (let i = 0; i < n; i++) {
        if (newAssignments[i] !== assignments[i]) changed = true;
      }
      assignments = newAssignments;

      if (!changed) return { centroids, assignments, iterations: iter };

      for (let c = 0; c < k; c++) {
        const members = points.filter((_, i) => assignments[i] === c);
        if (members.length === 0) continue;
        for (let d = 0; d < dim; d++) {
          centroids[c][d] = members.reduce((s, p) => s + p[d], 0) / members.length;
        }
      }
    }

    return { centroids, assignments, iterations: maxIterations };
  }

  private static nearest(point: number[], centroids: number[][]): number {
    let minDist = Infinity;
    let minIdx = 0;
    for (let i = 0; i < centroids.length; i++) {
      const dist = this.distance(point, centroids[i]);
      if (dist < minDist) { minDist = dist; minIdx = i; }
    }
    return minIdx;
  }

  static distance(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
    return Math.sqrt(sum);
  }

  static inertia(points: number[][], centroids: number[][], assignments: number[]): number {
    let total = 0;
    for (let i = 0; i < points.length; i++) {
      total += this.distance(points[i], centroids[assignments[i]]) ** 2;
    }
    return total;
  }

  static silhouetteScore(points: number[][], assignments: number[], k: number): number {
    const n = points.length;
    if (n <= 1) return 0;
    let totalSilhouette = 0;

    for (let i = 0; i < n; i++) {
      const clusterI = assignments[i];
      const sameCluster = points.filter((_, j) => j !== i && assignments[j] === clusterI);
      const a = sameCluster.length > 0
        ? sameCluster.reduce((s, p) => s + this.distance(points[i], p), 0) / sameCluster.length
        : 0;

      let minB = Infinity;
      for (let c = 0; c < k; c++) {
        if (c === clusterI) continue;
        const others = points.filter((_, j) => assignments[j] === c);
        if (others.length === 0) continue;
        const avgDist = others.reduce((s, p) => s + this.distance(points[i], p), 0) / others.length;
        minB = Math.min(minB, avgDist);
      }
      if (minB === Infinity) minB = 0;

      totalSilhouette += (minB - a) / Math.max(a, minB);
    }

    return totalSilhouette / n;
  }
}
