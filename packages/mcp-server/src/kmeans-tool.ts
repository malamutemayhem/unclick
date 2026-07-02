import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function kmeansCluster(args: Record<string, unknown>) {
  const points = args.points as number[][];
  if (!Array.isArray(points) || points.length === 0) {
    throw new Error("points must be a non-empty array of numeric vectors.");
  }
  if (points.length > 10000) throw new Error("points must have 10000 entries or fewer.");

  const dim = points[0].length;
  if (dim === 0) throw new Error("point dimensions must be at least 1.");
  for (const p of points) {
    if (!Array.isArray(p) || p.length !== dim) {
      throw new Error("all points must have the same number of dimensions.");
    }
  }

  const k = typeof args.k === "number" ? args.k : 3;
  if (k < 1 || k > points.length) throw new Error("k must be between 1 and the number of points.");

  const maxIter = typeof args.max_iterations === "number" ? args.max_iterations : 100;

  const centroids: number[][] = [];
  const used = new Set<number>();
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * points.length);
    if (!used.has(idx)) {
      used.add(idx);
      centroids.push([...points[idx]]);
    }
  }

  let assignments = new Array(points.length).fill(0);
  let iters = 0;

  for (let iter = 0; iter < maxIter; iter++) {
    iters++;
    const newAssignments = points.map((p) => {
      let best = 0;
      let bestDist = Infinity;
      for (let c = 0; c < k; c++) {
        let dist = 0;
        for (let d = 0; d < dim; d++) dist += (p[d] - centroids[c][d]) ** 2;
        if (dist < bestDist) { bestDist = dist; best = c; }
      }
      return best;
    });

    let changed = false;
    for (let i = 0; i < points.length; i++) {
      if (newAssignments[i] !== assignments[i]) { changed = true; break; }
    }
    assignments = newAssignments;

    for (let c = 0; c < k; c++) {
      const members = points.filter((_, i) => assignments[i] === c);
      if (members.length > 0) {
        for (let d = 0; d < dim; d++) {
          centroids[c][d] = members.reduce((s, p) => s + p[d], 0) / members.length;
        }
      }
    }

    if (!changed) break;
  }

  const clusterSizes = new Array(k).fill(0);
  for (const a of assignments) clusterSizes[a]++;

  let totalInertia = 0;
  for (let i = 0; i < points.length; i++) {
    const c = assignments[i];
    for (let d = 0; d < dim; d++) totalInertia += (points[i][d] - centroids[c][d]) ** 2;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Lower inertia indicates tighter clusters",
      "Try different k values to find the best fit (elbow method)",
    ],
  };
  return stampMeta({
    k,
    dimensions: dim,
    point_count: points.length,
    iterations_run: iters,
    centroids: centroids.map(c => c.map(v => Math.round(v * 1e6) / 1e6)),
    cluster_sizes: clusterSizes,
    assignments,
    inertia: Math.round(totalInertia * 1e6) / 1e6,
  }, meta);
}
