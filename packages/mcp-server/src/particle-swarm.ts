export interface PSOConfig {
  dimensions: number;
  particleCount: number;
  inertia?: number;
  cognitive?: number;
  social?: number;
  bounds?: { min: number; max: number }[];
}

export interface PSOResult {
  bestPosition: number[];
  bestFitness: number;
  iterations: number;
}

interface Particle {
  position: number[];
  velocity: number[];
  bestPosition: number[];
  bestFitness: number;
}

export class ParticleSwarm {
  private particles: Particle[];
  private globalBest: number[];
  private globalBestFitness: number;
  private inertia: number;
  private cognitive: number;
  private social: number;
  private dims: number;
  private bounds: { min: number; max: number }[];
  private iterations: number;

  constructor(
    private fitness: (position: number[]) => number,
    config: PSOConfig,
  ) {
    this.dims = config.dimensions;
    this.inertia = config.inertia ?? 0.7;
    this.cognitive = config.cognitive ?? 1.5;
    this.social = config.social ?? 1.5;
    this.iterations = 0;

    this.bounds = config.bounds ??
      Array.from({ length: this.dims }, () => ({ min: -100, max: 100 }));

    this.globalBest = new Array(this.dims).fill(0);
    this.globalBestFitness = -Infinity;
    this.particles = [];

    for (let i = 0; i < config.particleCount; i++) {
      const position = this.bounds.map((b) =>
        b.min + Math.random() * (b.max - b.min),
      );
      const velocity = this.bounds.map((b) =>
        (Math.random() - 0.5) * (b.max - b.min) * 0.1,
      );
      const fit = this.fitness(position);
      const particle: Particle = {
        position,
        velocity,
        bestPosition: [...position],
        bestFitness: fit,
      };
      this.particles.push(particle);
      if (fit > this.globalBestFitness) {
        this.globalBestFitness = fit;
        this.globalBest = [...position];
      }
    }
  }

  step(): PSOResult {
    for (const p of this.particles) {
      for (let d = 0; d < this.dims; d++) {
        const r1 = Math.random();
        const r2 = Math.random();
        p.velocity[d] =
          this.inertia * p.velocity[d] +
          this.cognitive * r1 * (p.bestPosition[d] - p.position[d]) +
          this.social * r2 * (this.globalBest[d] - p.position[d]);
        p.position[d] += p.velocity[d];

        const b = this.bounds[d];
        if (p.position[d] < b.min) {
          p.position[d] = b.min;
          p.velocity[d] *= -0.5;
        } else if (p.position[d] > b.max) {
          p.position[d] = b.max;
          p.velocity[d] *= -0.5;
        }
      }

      const fit = this.fitness(p.position);
      if (fit > p.bestFitness) {
        p.bestFitness = fit;
        p.bestPosition = [...p.position];
      }
      if (fit > this.globalBestFitness) {
        this.globalBestFitness = fit;
        this.globalBest = [...p.position];
      }
    }

    this.iterations++;
    return {
      bestPosition: [...this.globalBest],
      bestFitness: this.globalBestFitness,
      iterations: this.iterations,
    };
  }

  run(iterations: number): PSOResult {
    let result: PSOResult = {
      bestPosition: [...this.globalBest],
      bestFitness: this.globalBestFitness,
      iterations: this.iterations,
    };
    for (let i = 0; i < iterations; i++) {
      result = this.step();
    }
    return result;
  }

  getBest(): { position: number[]; fitness: number } {
    return {
      position: [...this.globalBest],
      fitness: this.globalBestFitness,
    };
  }
}
