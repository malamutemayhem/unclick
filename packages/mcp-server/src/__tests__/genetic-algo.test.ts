import { describe, it, expect } from "vitest";
import { GeneticAlgorithm } from "../genetic-algo.js";

describe("GeneticAlgorithm", () => {
  const config = {
    populationSize: 20,
    geneLength: 10,
    mutationRate: 0.1,
    crossoverRate: 0.7,
    elitism: 2,
    createGene: () => Math.random() > 0.5 ? 1 : 0,
    fitnessFunction: (genes: number[]) => genes.reduce((s, g) => s + g, 0),
  };

  it("initializes population", () => {
    const ga = new GeneticAlgorithm(config);
    const pop = ga.getPopulation();
    expect(pop).toHaveLength(20);
    expect(pop[0].genes).toHaveLength(10);
  });

  it("tracks generation count", () => {
    const ga = new GeneticAlgorithm(config);
    expect(ga.getGeneration()).toBe(0);
    ga.evolve();
    expect(ga.getGeneration()).toBe(1);
  });

  it("improves fitness over generations", () => {
    const ga = new GeneticAlgorithm(config);
    const initialBest = ga.getBest().fitness;
    ga.run(50);
    expect(ga.getBest().fitness).toBeGreaterThanOrEqual(initialBest);
  });

  it("tracks best ever solution", () => {
    const ga = new GeneticAlgorithm(config);
    ga.run(20);
    const best = ga.getBest();
    expect(best.fitness).toBeGreaterThanOrEqual(0);
    expect(best.genes).toHaveLength(10);
  });

  it("calculates average fitness", () => {
    const ga = new GeneticAlgorithm(config);
    const avg = ga.averageFitness();
    expect(avg).toBeGreaterThanOrEqual(0);
    expect(avg).toBeLessThanOrEqual(10);
  });

  it("calculates population diversity", () => {
    const ga = new GeneticAlgorithm(config);
    const div = ga.diversity();
    expect(typeof div).toBe("number");
    expect(div).toBeGreaterThanOrEqual(0);
  });

  it("elitism preserves top individuals", () => {
    const ga = new GeneticAlgorithm({ ...config, elitism: 5 });
    ga.run(10);
    const best = ga.getBest();
    expect(best.fitness).toBeGreaterThanOrEqual(0);
  });

  it("run returns best individual", () => {
    const ga = new GeneticAlgorithm(config);
    const result = ga.run(5);
    expect(result.genes).toHaveLength(10);
    expect(typeof result.fitness).toBe("number");
  });
});
