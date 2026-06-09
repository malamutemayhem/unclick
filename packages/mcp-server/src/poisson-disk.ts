export interface Point {
  x: number;
  y: number;
}

export interface PoissonConfig {
  width: number;
  height: number;
  minDistance: number;
  maxAttempts?: number;
  seed?: number;
}

class SeededRandom {
  private state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next(): number {
    this.state = (this.state * 1103515245 + 12345) & 0x7fffffff;
    return this.state / 0x7fffffff;
  }
}

export function poissonDiskSampling(config: PoissonConfig): Point[] {
  const { width, height, minDistance, maxAttempts = 30, seed = 42 } = config;
  const rng = new SeededRandom(seed);

  const cellSize = minDistance / Math.SQRT2;
  const gridW = Math.ceil(width / cellSize);
  const gridH = Math.ceil(height / cellSize);
  const grid: (Point | null)[] = new Array(gridW * gridH).fill(null);

  const points: Point[] = [];
  const active: number[] = [];

  const gridIndex = (x: number, y: number) =>
    Math.floor(y / cellSize) * gridW + Math.floor(x / cellSize);

  const addPoint = (p: Point) => {
    points.push(p);
    active.push(points.length - 1);
    grid[gridIndex(p.x, p.y)] = p;
  };

  const isValid = (p: Point): boolean => {
    if (p.x < 0 || p.x >= width || p.y < 0 || p.y >= height) return false;

    const gx = Math.floor(p.x / cellSize);
    const gy = Math.floor(p.y / cellSize);

    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx < 0 || nx >= gridW || ny < 0 || ny >= gridH) continue;

        const neighbor = grid[ny * gridW + nx];
        if (neighbor) {
          const dist = Math.sqrt((p.x - neighbor.x) ** 2 + (p.y - neighbor.y) ** 2);
          if (dist < minDistance) return false;
        }
      }
    }

    return true;
  };

  addPoint({ x: rng.next() * width, y: rng.next() * height });

  while (active.length > 0) {
    const idx = Math.floor(rng.next() * active.length);
    const parent = points[active[idx]];
    let found = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const angle = rng.next() * Math.PI * 2;
      const dist = minDistance + rng.next() * minDistance;
      const candidate: Point = {
        x: parent.x + Math.cos(angle) * dist,
        y: parent.y + Math.sin(angle) * dist,
      };

      if (isValid(candidate)) {
        addPoint(candidate);
        found = true;
        break;
      }
    }

    if (!found) {
      active.splice(idx, 1);
    }
  }

  return points;
}

export function distance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function minPointDistance(points: Point[]): number {
  if (points.length < 2) return Infinity;
  let min = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = distance(points[i], points[j]);
      if (d < min) min = d;
    }
  }
  return min;
}

export function pointDensity(points: Point[], width: number, height: number): number {
  return points.length / (width * height);
}

export function nearestNeighbor(points: Point[], query: Point): Point | null {
  if (points.length === 0) return null;
  let best = points[0];
  let bestDist = distance(query, best);
  for (let i = 1; i < points.length; i++) {
    const d = distance(query, points[i]);
    if (d < bestDist) {
      bestDist = d;
      best = points[i];
    }
  }
  return best;
}

export function pointsInRadius(points: Point[], center: Point, radius: number): Point[] {
  return points.filter(p => distance(p, center) <= radius);
}

export function toSVG(points: Point[], width: number, height: number, radius = 2): string {
  const dots = points.map(p =>
    `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${radius}" fill="black"/>`
  ).join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n  ${dots}\n</svg>`;
}
