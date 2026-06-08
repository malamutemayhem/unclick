export interface Point {
  x: number;
  y: number;
}

export interface VoronoiCell {
  site: Point;
  index: number;
}

export function nearestSite(point: Point, sites: Point[]): number {
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < sites.length; i++) {
    const dx = point.x - sites[i].x;
    const dy = point.y - sites[i].y;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function voronoiGrid(
  sites: Point[],
  width: number,
  height: number,
  resolution = 1,
): number[][] {
  const cols = Math.ceil(width / resolution);
  const rows = Math.ceil(height / resolution);
  const grid: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      const px = c * resolution + resolution / 2;
      const py = r * resolution + resolution / 2;
      row.push(nearestSite({ x: px, y: py }, sites));
    }
    grid.push(row);
  }
  return grid;
}

export function cellAreas(
  sites: Point[],
  width: number,
  height: number,
  resolution = 1,
): number[] {
  const areas = new Array(sites.length).fill(0);
  const grid = voronoiGrid(sites, width, height, resolution);
  const cellArea = resolution * resolution;
  for (const row of grid) {
    for (const idx of row) {
      areas[idx] += cellArea;
    }
  }
  return areas;
}

export function lloydRelaxation(
  sites: Point[],
  width: number,
  height: number,
  iterations = 1,
  resolution = 1,
): Point[] {
  let current = sites.map((s) => ({ ...s }));

  for (let iter = 0; iter < iterations; iter++) {
    const grid = voronoiGrid(current, width, height, resolution);
    const sumX = new Array(current.length).fill(0);
    const sumY = new Array(current.length).fill(0);
    const counts = new Array(current.length).fill(0);

    const rows = grid.length;
    const cols = grid[0].length;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = grid[r][c];
        const px = c * resolution + resolution / 2;
        const py = r * resolution + resolution / 2;
        sumX[idx] += px;
        sumY[idx] += py;
        counts[idx]++;
      }
    }

    current = current.map((s, i) => {
      if (counts[i] === 0) return s;
      return { x: sumX[i] / counts[i], y: sumY[i] / counts[i] };
    });
  }

  return current;
}

export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function delaunayEdges(sites: Point[]): [number, number][] {
  if (sites.length < 2) return [];
  const edges: [number, number][] = [];

  for (let i = 0; i < sites.length; i++) {
    for (let j = i + 1; j < sites.length; j++) {
      let isEdge = true;
      const midX = (sites[i].x + sites[j].x) / 2;
      const midY = (sites[i].y + sites[j].y) / 2;
      const distIJ = distance(sites[i], sites[j]);

      for (let k = 0; k < sites.length; k++) {
        if (k === i || k === j) continue;
        const circumX = midX;
        const circumY = midY;
        const r = distIJ / 2;
        const dk = distance(sites[k], { x: circumX, y: circumY });
        if (dk < r - 0.001) {
          isEdge = false;
          break;
        }
      }

      if (isEdge) edges.push([i, j]);
    }
  }

  return edges;
}
