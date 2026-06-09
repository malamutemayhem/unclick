import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function tspSolve(args: Record<string, unknown>) {
  const cities = args.cities as { name: string; x: number; y: number }[];
  if (!Array.isArray(cities) || cities.length < 2) {
    throw new Error("cities must be an array of at least 2 {name, x, y} objects.");
  }
  if (cities.length > 500) throw new Error("cities must have 500 or fewer entries.");

  const n = cities.length;
  const dist = (a: number, b: number) => {
    const dx = cities[a].x - cities[b].x;
    const dy = cities[a].y - cities[b].y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const nearestNeighbor = (startIdx: number): { tour: number[]; cost: number } => {
    const visited = new Set<number>([startIdx]);
    const tour = [startIdx];
    let cost = 0;
    let cur = startIdx;

    while (visited.size < n) {
      let best = -1;
      let bestDist = Infinity;
      for (let j = 0; j < n; j++) {
        if (!visited.has(j)) {
          const d = dist(cur, j);
          if (d < bestDist) { bestDist = d; best = j; }
        }
      }
      visited.add(best);
      tour.push(best);
      cost += bestDist;
      cur = best;
    }
    cost += dist(cur, startIdx);
    tour.push(startIdx);
    return { tour, cost };
  };

  let bestResult = nearestNeighbor(0);
  for (let i = 1; i < Math.min(n, 20); i++) {
    const result = nearestNeighbor(i);
    if (result.cost < bestResult.cost) bestResult = result;
  }

  const tourNames = bestResult.tour.map(i => cities[i].name);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Nearest-neighbor heuristic - not guaranteed optimal for large inputs",
      "Tries multiple starting cities and returns the best tour found",
    ],
  };
  return stampMeta({
    city_count: n,
    tour: tourNames,
    total_distance: Math.round(bestResult.cost * 1e6) / 1e6,
    tour_edges: bestResult.tour.length - 1,
  }, meta);
}
