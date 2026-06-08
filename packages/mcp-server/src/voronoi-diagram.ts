export interface VoronoiPoint {
  x: number;
  y: number;
}

export class VoronoiDiagram {
  static nearest(sites: VoronoiPoint[], x: number, y: number): number {
    let minDist = Infinity;
    let minIdx = 0;
    for (let i = 0; i < sites.length; i++) {
      const dx = sites[i].x - x;
      const dy = sites[i].y - y;
      const d = dx * dx + dy * dy;
      if (d < minDist) {
        minDist = d;
        minIdx = i;
      }
    }
    return minIdx;
  }

  static classify(
    sites: VoronoiPoint[],
    width: number,
    height: number,
    resolution = 1,
  ): number[][] {
    const rows = Math.ceil(height / resolution);
    const cols = Math.ceil(width / resolution);
    const grid: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(VoronoiDiagram.nearest(sites, c * resolution, r * resolution));
      }
      grid.push(row);
    }
    return grid;
  }

  static cellAreas(
    sites: VoronoiPoint[],
    width: number,
    height: number,
    resolution = 1,
  ): number[] {
    const grid = VoronoiDiagram.classify(sites, width, height, resolution);
    const areas = new Array(sites.length).fill(0);
    const cellArea = resolution * resolution;
    for (const row of grid) {
      for (const idx of row) {
        areas[idx] += cellArea;
      }
    }
    return areas.map(a => Math.round(a * 10000) / 10000);
  }

  static boundaries(
    sites: VoronoiPoint[],
    width: number,
    height: number,
    resolution = 1,
  ): { x: number; y: number }[] {
    const grid = VoronoiDiagram.classify(sites, width, height, resolution);
    const edges: { x: number; y: number }[] = [];
    const rows = grid.length;
    const cols = grid[0].length;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cur = grid[r][c];
        if (
          (c + 1 < cols && grid[r][c + 1] !== cur) ||
          (r + 1 < rows && grid[r + 1][c] !== cur)
        ) {
          edges.push({ x: c * resolution, y: r * resolution });
        }
      }
    }
    return edges;
  }

  static centroid(
    siteIndex: number,
    sites: VoronoiPoint[],
    width: number,
    height: number,
    resolution = 1,
  ): VoronoiPoint {
    const grid = VoronoiDiagram.classify(sites, width, height, resolution);
    let sumX = 0, sumY = 0, count = 0;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === siteIndex) {
          sumX += c * resolution;
          sumY += r * resolution;
          count++;
        }
      }
    }
    if (count === 0) return { x: sites[siteIndex].x, y: sites[siteIndex].y };
    return {
      x: Math.round((sumX / count) * 10000) / 10000,
      y: Math.round((sumY / count) * 10000) / 10000,
    };
  }

  static lloydRelax(
    sites: VoronoiPoint[],
    width: number,
    height: number,
    iterations = 1,
    resolution = 1,
  ): VoronoiPoint[] {
    let current = sites.map(s => ({ ...s }));
    for (let i = 0; i < iterations; i++) {
      const next: VoronoiPoint[] = [];
      for (let j = 0; j < current.length; j++) {
        next.push(VoronoiDiagram.centroid(j, current, width, height, resolution));
      }
      current = next;
    }
    return current;
  }
}
