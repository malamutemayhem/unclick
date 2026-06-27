export interface BoundaryPoint {
  x: number;
  y: number;
  label: string;
}

export class DecisionBoundary {
  static linear(
    weights: number[],
    bias: number,
    xRange: [number, number],
    steps = 50,
  ): { x: number; y: number }[] {
    if (weights.length < 2 || weights[1] === 0) return [];
    const points: { x: number; y: number }[] = [];
    const step = (xRange[1] - xRange[0]) / steps;
    for (let x = xRange[0]; x <= xRange[1]; x += step) {
      const y = -(weights[0] * x + bias) / weights[1];
      points.push({
        x: Math.round(x * 10000) / 10000,
        y: Math.round(y * 10000) / 10000,
      });
    }
    return points;
  }

  static classify(
    classifier: (point: number[]) => string,
    xRange: [number, number],
    yRange: [number, number],
    resolution = 20,
  ): BoundaryPoint[] {
    const points: BoundaryPoint[] = [];
    const xStep = (xRange[1] - xRange[0]) / resolution;
    const yStep = (yRange[1] - yRange[0]) / resolution;
    for (let x = xRange[0]; x <= xRange[1]; x += xStep) {
      for (let y = yRange[0]; y <= yRange[1]; y += yStep) {
        points.push({
          x: Math.round(x * 10000) / 10000,
          y: Math.round(y * 10000) / 10000,
          label: classifier([x, y]),
        });
      }
    }
    return points;
  }

  static margin(
    weights: number[],
    bias: number,
    point: number[],
  ): number {
    let z = bias;
    for (let i = 0; i < weights.length; i++) z += weights[i] * point[i];
    const norm = Math.sqrt(weights.reduce((s, w) => s + w * w, 0));
    return norm === 0 ? 0 : Math.round((Math.abs(z) / norm) * 10000) / 10000;
  }

  static separable(
    dataA: number[][],
    dataB: number[][],
    weights: number[],
    bias: number,
  ): boolean {
    for (const point of dataA) {
      let z = bias;
      for (let i = 0; i < weights.length; i++) z += weights[i] * point[i];
      if (z <= 0) return false;
    }
    for (const point of dataB) {
      let z = bias;
      for (let i = 0; i < weights.length; i++) z += weights[i] * point[i];
      if (z >= 0) return false;
    }
    return true;
  }

  static voronoi(
    centroids: { point: number[]; label: string }[],
    xRange: [number, number],
    yRange: [number, number],
    resolution = 20,
  ): BoundaryPoint[] {
    return DecisionBoundary.classify(
      (point) => {
        let minDist = Infinity;
        let closest = centroids[0].label;
        for (const c of centroids) {
          const dist = Math.sqrt(
            (point[0] - c.point[0]) ** 2 + (point[1] - c.point[1]) ** 2,
          );
          if (dist < minDist) {
            minDist = dist;
            closest = c.label;
          }
        }
        return closest;
      },
      xRange,
      yRange,
      resolution,
    );
  }

  static render(points: BoundaryPoint[], width: number, height: number): string {
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);

    const grid: string[][] = Array.from({ length: height }, () =>
      new Array(width).fill(" "),
    );

    for (const p of points) {
      const col = Math.round(((p.x - xMin) / (xMax - xMin || 1)) * (width - 1));
      const row = height - 1 - Math.round(((p.y - yMin) / (yMax - yMin || 1)) * (height - 1));
      if (row >= 0 && row < height && col >= 0 && col < width) {
        grid[row][col] = p.label[0] || ".";
      }
    }

    return grid.map(row => row.join("")).join("\n");
  }
}
