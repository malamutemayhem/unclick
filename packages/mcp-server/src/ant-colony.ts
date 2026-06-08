export interface ACOConfig {
  antCount: number;
  iterations: number;
  alpha?: number;
  beta?: number;
  evaporationRate?: number;
  q?: number;
}

export interface ACOResult {
  bestPath: number[];
  bestDistance: number;
  iteration: number;
}

export class AntColony {
  private distances: number[][];
  private pheromones: number[][];
  private n: number;
  private alpha: number;
  private beta: number;
  private evapRate: number;
  private q: number;
  private antCount: number;

  constructor(distances: number[][], config: ACOConfig) {
    this.distances = distances;
    this.n = distances.length;
    this.antCount = config.antCount;
    this.alpha = config.alpha ?? 1;
    this.beta = config.beta ?? 2;
    this.evapRate = config.evaporationRate ?? 0.5;
    this.q = config.q ?? 100;

    this.pheromones = Array.from({ length: this.n }, () => new Array(this.n).fill(1));
  }

  private buildPath(start: number): { path: number[]; distance: number } {
    const visited = new Set<number>([start]);
    const path = [start];
    let current = start;
    let totalDist = 0;

    while (visited.size < this.n) {
      const probs: { city: number; prob: number }[] = [];
      let sum = 0;

      for (let j = 0; j < this.n; j++) {
        if (visited.has(j)) continue;
        const tau = Math.pow(this.pheromones[current][j], this.alpha);
        const eta = Math.pow(1 / this.distances[current][j], this.beta);
        const p = tau * eta;
        probs.push({ city: j, prob: p });
        sum += p;
      }

      let r = Math.random() * sum;
      let next = probs[0].city;
      for (const { city, prob } of probs) {
        r -= prob;
        if (r <= 0) {
          next = city;
          break;
        }
      }

      totalDist += this.distances[current][next];
      visited.add(next);
      path.push(next);
      current = next;
    }

    totalDist += this.distances[current][start];
    path.push(start);
    return { path, distance: totalDist };
  }

  solve(iterations: number): ACOResult {
    let bestPath: number[] = [];
    let bestDist = Infinity;

    for (let iter = 0; iter < iterations; iter++) {
      const allPaths: { path: number[]; distance: number }[] = [];

      for (let ant = 0; ant < this.antCount; ant++) {
        const start = Math.floor(Math.random() * this.n);
        const result = this.buildPath(start);
        allPaths.push(result);
        if (result.distance < bestDist) {
          bestDist = result.distance;
          bestPath = result.path;
        }
      }

      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.n; j++) {
          this.pheromones[i][j] *= 1 - this.evapRate;
        }
      }

      for (const { path, distance } of allPaths) {
        const deposit = this.q / distance;
        for (let i = 0; i < path.length - 1; i++) {
          this.pheromones[path[i]][path[i + 1]] += deposit;
          this.pheromones[path[i + 1]][path[i]] += deposit;
        }
      }
    }

    return { bestPath, bestDistance: bestDist, iteration: iterations };
  }
}

export function distanceMatrix(cities: { x: number; y: number }[]): number[][] {
  const n = cities.length;
  const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = cities[i].x - cities[j].x;
      const dy = cities[i].y - cities[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      matrix[i][j] = d;
      matrix[j][i] = d;
    }
  }
  return matrix;
}
