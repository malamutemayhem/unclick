export interface Particle {
  state: number[];
  weight: number;
}

export class ParticleFilter {
  private particles: Particle[];
  private numParticles: number;

  constructor(numParticles: number, initFn: () => number[]) {
    this.numParticles = numParticles;
    this.particles = [];
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({ state: initFn(), weight: 1 / numParticles });
    }
  }

  predict(transitionFn: (state: number[]) => number[]): void {
    for (const p of this.particles) {
      p.state = transitionFn(p.state);
    }
  }

  update(likelihoodFn: (state: number[]) => number): void {
    let totalWeight = 0;
    for (const p of this.particles) {
      p.weight *= likelihoodFn(p.state);
      totalWeight += p.weight;
    }
    if (totalWeight > 0) {
      for (const p of this.particles) {
        p.weight /= totalWeight;
      }
    }
  }

  resample(): void {
    const cumWeights: number[] = [];
    let cumSum = 0;
    for (const p of this.particles) {
      cumSum += p.weight;
      cumWeights.push(cumSum);
    }
    const newParticles: Particle[] = [];
    for (let i = 0; i < this.numParticles; i++) {
      const r = Math.random();
      let idx = 0;
      while (idx < cumWeights.length - 1 && cumWeights[idx] < r) idx++;
      newParticles.push({
        state: [...this.particles[idx].state],
        weight: 1 / this.numParticles,
      });
    }
    this.particles = newParticles;
  }

  estimate(): number[] {
    const dim = this.particles[0].state.length;
    const mean = new Array(dim).fill(0);
    for (const p of this.particles) {
      for (let d = 0; d < dim; d++) {
        mean[d] += p.state[d] * p.weight;
      }
    }
    return mean;
  }

  effectiveSampleSize(): number {
    let sumSq = 0;
    for (const p of this.particles) {
      sumSq += p.weight * p.weight;
    }
    return sumSq > 0 ? 1 / sumSq : 0;
  }

  getParticles(): Particle[] {
    return this.particles.map((p) => ({ state: [...p.state], weight: p.weight }));
  }

  size(): number {
    return this.numParticles;
  }

  maxWeight(): number {
    let max = 0;
    for (const p of this.particles) {
      if (p.weight > max) max = p.weight;
    }
    return max;
  }
}
