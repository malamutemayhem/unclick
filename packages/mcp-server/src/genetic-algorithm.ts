export interface GAConfig<T> {
  populationSize: number;
  fitness: (individual: T) => number;
  crossover: (a: T, b: T) => T;
  mutate: (individual: T) => T;
  create: () => T;
  mutationRate?: number;
  elitism?: number;
}

export interface GAResult<T> {
  best: T;
  bestFitness: number;
  generation: number;
  population: T[];
}

export class GeneticAlgorithm<T> {
  private config: Required<GAConfig<T>>;
  private population: T[] = [];
  private generation = 0;

  constructor(config: GAConfig<T>) {
    this.config = {
      mutationRate: 0.1,
      elitism: 1,
      ...config,
    };
    this.population = Array.from({ length: this.config.populationSize }, () => this.config.create());
  }

  private select(): T {
    const tournament = Array.from({ length: 3 }, () =>
      this.population[Math.floor(Math.random() * this.population.length)]
    );
    return tournament.reduce((best, ind) =>
      this.config.fitness(ind) > this.config.fitness(best) ? ind : best
    );
  }

  step(): GAResult<T> {
    const scored = this.population
      .map((ind) => ({ ind, fit: this.config.fitness(ind) }))
      .sort((a, b) => b.fit - a.fit);

    const next: T[] = [];
    for (let i = 0; i < this.config.elitism && i < scored.length; i++) {
      next.push(scored[i].ind);
    }

    while (next.length < this.config.populationSize) {
      const a = this.select();
      const b = this.select();
      let child = this.config.crossover(a, b);
      if (Math.random() < this.config.mutationRate) {
        child = this.config.mutate(child);
      }
      next.push(child);
    }

    this.population = next;
    this.generation++;

    return {
      best: scored[0].ind,
      bestFitness: scored[0].fit,
      generation: this.generation,
      population: [...this.population],
    };
  }

  run(generations: number): GAResult<T> {
    let result: GAResult<T> = this.step();
    for (let i = 1; i < generations; i++) {
      result = this.step();
    }
    return result;
  }

  getBest(): { individual: T; fitness: number } {
    let best = this.population[0];
    let bestFit = this.config.fitness(best);
    for (const ind of this.population) {
      const fit = this.config.fitness(ind);
      if (fit > bestFit) {
        best = ind;
        bestFit = fit;
      }
    }
    return { individual: best, fitness: bestFit };
  }
}
