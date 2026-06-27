import { describe, it, expect } from "vitest";
import { GeneticAlgorithm } from "../genetic-algorithm.js";

describe("GeneticAlgorithm", () => {
  const config = {
    populationSize: 20,
    create: () => Math.random() * 100,
    fitness: (x: number) => -Math.abs(x - 42),
    crossover: (a: number, b: number) => (a + b) / 2,
    mutate: (x: number) => x + (Math.random() - 0.5) * 10,
    mutationRate: 0.3,
    elitism: 2,
  };

  it("runs a single step", () => {
    const ga = new GeneticAlgorithm(config);
    const result = ga.step();
    expect(result.generation).toBe(1);
    expect(result.population).toHaveLength(20);
  });

  it("improves over generations", () => {
    const ga = new GeneticAlgorithm(config);
    const first = ga.step();
    const last = ga.run(50);
    expect(last.bestFitness).toBeGreaterThanOrEqual(first.bestFitness);
  });

  it("converges toward target", () => {
    const ga = new GeneticAlgorithm(config);
    const result = ga.run(100);
    expect(Math.abs(result.best - 42)).toBeLessThan(20);
  });

  it("getBest returns current best", () => {
    const ga = new GeneticAlgorithm(config);
    ga.run(10);
    const { individual, fitness } = ga.getBest();
    expect(typeof individual).toBe("number");
    expect(fitness).toBeLessThanOrEqual(0);
  });

  it("elitism preserves best individuals", () => {
    const ga = new GeneticAlgorithm({ ...config, elitism: 5 });
    const r1 = ga.step();
    const r2 = ga.step();
    expect(r2.bestFitness).toBeGreaterThanOrEqual(r1.bestFitness);
  });

  it("works with array chromosomes", () => {
    const ga = new GeneticAlgorithm<number[]>({
      populationSize: 10,
      create: () => Array.from({ length: 5 }, () => Math.random()),
      fitness: (arr) => -arr.reduce((s, v) => s + v, 0),
      crossover: (a, b) => a.map((v, i) => (v + b[i]) / 2),
      mutate: (arr) => arr.map((v) => v + (Math.random() - 0.5) * 0.1),
    });
    const result = ga.run(20);
    expect(result.best).toHaveLength(5);
  });
});
