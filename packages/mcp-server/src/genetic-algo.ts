export interface Individual<T> {
  genes: T[];
  fitness: number;
}

export interface GeneticConfig<T> {
  populationSize: number;
  geneLength: number;
  mutationRate: number;
  crossoverRate: number;
  elitism: number;
  createGene: () => T;
  fitnessFunction: (genes: T[]) => number;
}

export class GeneticAlgorithm<T> {
  private config: GeneticConfig<T>;
  private population: Individual<T>[] = [];
  private generation = 0;
  private bestEver: Individual<T> | null = null;

  constructor(config: GeneticConfig<T>) {
    this.config = config;
    this.initPopulation();
  }

  private initPopulation(): void {
    this.population = [];
    for (let i = 0; i < this.config.populationSize; i++) {
      const genes: T[] = [];
      for (let j = 0; j < this.config.geneLength; j++) {
        genes.push(this.config.createGene());
      }
      const fitness = this.config.fitnessFunction(genes);
      this.population.push({ genes, fitness });
    }
    this.updateBest();
  }

  private updateBest(): void {
    const sorted = [...this.population].sort((a, b) => b.fitness - a.fitness);
    if (!this.bestEver || sorted[0].fitness > this.bestEver.fitness) {
      this.bestEver = { genes: [...sorted[0].genes], fitness: sorted[0].fitness };
    }
  }

  evolve(): void {
    const sorted = [...this.population].sort((a, b) => b.fitness - a.fitness);
    const newPopulation: Individual<T>[] = [];

    for (let i = 0; i < this.config.elitism && i < sorted.length; i++) {
      newPopulation.push({ genes: [...sorted[i].genes], fitness: sorted[i].fitness });
    }

    while (newPopulation.length < this.config.populationSize) {
      const parent1 = this.tournamentSelect();
      const parent2 = this.tournamentSelect();

      let childGenes: T[];
      if (Math.random() < this.config.crossoverRate) {
        childGenes = this.crossover(parent1.genes, parent2.genes);
      } else {
        childGenes = [...parent1.genes];
      }

      childGenes = this.mutate(childGenes);
      const fitness = this.config.fitnessFunction(childGenes);
      newPopulation.push({ genes: childGenes, fitness });
    }

    this.population = newPopulation;
    this.generation++;
    this.updateBest();
  }

  private tournamentSelect(size = 3): Individual<T> {
    let best: Individual<T> | null = null;
    for (let i = 0; i < size; i++) {
      const idx = Math.floor(Math.random() * this.population.length);
      const candidate = this.population[idx];
      if (!best || candidate.fitness > best.fitness) {
        best = candidate;
      }
    }
    return best!;
  }

  private crossover(a: T[], b: T[]): T[] {
    const point = Math.floor(Math.random() * a.length);
    return [...a.slice(0, point), ...b.slice(point)];
  }

  private mutate(genes: T[]): T[] {
    return genes.map((g) =>
      Math.random() < this.config.mutationRate ? this.config.createGene() : g,
    );
  }

  run(generations: number): Individual<T> {
    for (let i = 0; i < generations; i++) {
      this.evolve();
    }
    return this.getBest();
  }

  getBest(): Individual<T> {
    return this.bestEver!;
  }

  getGeneration(): number {
    return this.generation;
  }

  getPopulation(): Individual<T>[] {
    return this.population.map((ind) => ({ genes: [...ind.genes], fitness: ind.fitness }));
  }

  averageFitness(): number {
    const sum = this.population.reduce((s, ind) => s + ind.fitness, 0);
    return sum / this.population.length;
  }

  diversity(): number {
    const fitnesses = this.population.map((ind) => ind.fitness);
    const avg = fitnesses.reduce((s, f) => s + f, 0) / fitnesses.length;
    const variance = fitnesses.reduce((s, f) => s + (f - avg) ** 2, 0) / fitnesses.length;
    return Math.sqrt(variance);
  }
}
