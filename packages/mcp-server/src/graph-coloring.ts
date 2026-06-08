export interface Graph {
  vertices: number;
  edges: [number, number][];
}

export function greedyColor(graph: Graph): Map<number, number> {
  const adj = new Map<number, Set<number>>();
  for (let i = 0; i < graph.vertices; i++) adj.set(i, new Set());
  for (const [u, v] of graph.edges) {
    adj.get(u)!.add(v);
    adj.get(v)!.add(u);
  }

  const colors = new Map<number, number>();
  for (let v = 0; v < graph.vertices; v++) {
    const used = new Set<number>();
    for (const neighbor of adj.get(v)!) {
      if (colors.has(neighbor)) used.add(colors.get(neighbor)!);
    }
    let c = 0;
    while (used.has(c)) c++;
    colors.set(v, c);
  }
  return colors;
}

export function chromaticNumber(graph: Graph): number {
  if (graph.vertices === 0) return 0;

  const adj = new Map<number, Set<number>>();
  for (let i = 0; i < graph.vertices; i++) adj.set(i, new Set());
  for (const [u, v] of graph.edges) {
    adj.get(u)!.add(v);
    adj.get(v)!.add(u);
  }

  for (let k = 1; k <= graph.vertices; k++) {
    if (canColor(adj, graph.vertices, k)) return k;
  }
  return graph.vertices;
}

function canColor(
  adj: Map<number, Set<number>>,
  n: number,
  k: number,
): boolean {
  const colors = new Array<number>(n).fill(-1);

  function bt(v: number): boolean {
    if (v === n) return true;
    for (let c = 0; c < k; c++) {
      let safe = true;
      for (const neighbor of adj.get(v)!) {
        if (colors[neighbor] === c) { safe = false; break; }
      }
      if (safe) {
        colors[v] = c;
        if (bt(v + 1)) return true;
        colors[v] = -1;
      }
    }
    return false;
  }

  return bt(0);
}

export function isValidColoring(
  graph: Graph,
  coloring: Map<number, number>,
): boolean {
  for (const [u, v] of graph.edges) {
    if (coloring.get(u) === coloring.get(v)) return false;
  }
  return true;
}

export function colorCount(coloring: Map<number, number>): number {
  return new Set(coloring.values()).size;
}

export function dsaturColor(graph: Graph): Map<number, number> {
  const adj = new Map<number, Set<number>>();
  for (let i = 0; i < graph.vertices; i++) adj.set(i, new Set());
  for (const [u, v] of graph.edges) {
    adj.get(u)!.add(v);
    adj.get(v)!.add(u);
  }

  const colors = new Map<number, number>();
  const saturation = new Array<Set<number>>(graph.vertices);
  for (let i = 0; i < graph.vertices; i++) saturation[i] = new Set();

  for (let step = 0; step < graph.vertices; step++) {
    let best = -1;
    let bestSat = -1;
    let bestDeg = -1;
    for (let v = 0; v < graph.vertices; v++) {
      if (colors.has(v)) continue;
      const sat = saturation[v].size;
      const deg = adj.get(v)!.size;
      if (sat > bestSat || (sat === bestSat && deg > bestDeg)) {
        best = v;
        bestSat = sat;
        bestDeg = deg;
      }
    }

    const used = new Set<number>();
    for (const neighbor of adj.get(best)!) {
      if (colors.has(neighbor)) used.add(colors.get(neighbor)!);
    }
    let c = 0;
    while (used.has(c)) c++;
    colors.set(best, c);

    for (const neighbor of adj.get(best)!) {
      saturation[neighbor].add(c);
    }
  }

  return colors;
}
