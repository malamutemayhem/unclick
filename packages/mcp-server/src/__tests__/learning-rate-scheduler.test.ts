import { describe, it, expect } from "vitest";
import { LearningRateScheduler } from "../learning-rate-scheduler.js";

describe("LearningRateScheduler", () => {
  it("constant returns same rate", () => {
    const scheduler = LearningRateScheduler.constant(0.01);
    expect(scheduler(0)).toBe(0.01);
    expect(scheduler(100)).toBe(0.01);
  });

  it("stepDecay drops at intervals", () => {
    const scheduler = LearningRateScheduler.stepDecay(0.1, 0.5, 10);
    expect(scheduler(0)).toBe(0.1);
    expect(scheduler(10)).toBe(0.05);
    expect(scheduler(20)).toBe(0.025);
  });

  it("exponentialDecay decreases smoothly", () => {
    const scheduler = LearningRateScheduler.exponentialDecay(0.1, 0.1);
    expect(scheduler(0)).toBe(0.1);
    expect(scheduler(10)).toBeLessThan(0.1);
    expect(scheduler(10)).toBeGreaterThan(0);
  });

  it("cosineAnnealing oscillates between max and min", () => {
    const scheduler = LearningRateScheduler.cosineAnnealing(0.1, 100, 0.001);
    expect(scheduler(0)).toBeCloseTo(0.1, 3);
    expect(scheduler(50)).toBeCloseTo(0.0505, 2);
    expect(scheduler(100)).toBeCloseTo(0.001, 3);
  });

  it("warmup linearly increases", () => {
    const scheduler = LearningRateScheduler.warmup(0.1, 5);
    expect(scheduler(0)).toBe(0.02);
    expect(scheduler(4)).toBe(0.1);
    expect(scheduler(10)).toBe(0.1);
  });

  it("warmupCosine warms then decays", () => {
    const scheduler = LearningRateScheduler.warmupCosine(0.1, 5, 50);
    expect(scheduler(0)).toBeLessThan(0.1);
    expect(scheduler(4)).toBeCloseTo(0.1, 3);
    expect(scheduler(49)).toBeLessThan(scheduler(5));
  });

  it("polynomial decays with power", () => {
    const scheduler = LearningRateScheduler.polynomial(0.1, 100, 2);
    expect(scheduler(0)).toBe(0.1);
    expect(scheduler(50)).toBeCloseTo(0.025, 2);
  });

  it("cyclical oscillates between base and max", () => {
    const scheduler = LearningRateScheduler.cyclical(0.001, 0.01, 10);
    const rates = LearningRateScheduler.schedule(scheduler, 20);
    expect(rates.length).toBe(20);
    expect(Math.min(...rates)).toBeGreaterThanOrEqual(0.001);
    expect(Math.max(...rates)).toBeLessThanOrEqual(0.01);
  });

  it("schedule generates array of rates", () => {
    const scheduler = LearningRateScheduler.exponentialDecay(0.1, 0.1);
    const rates = LearningRateScheduler.schedule(scheduler, 10);
    expect(rates.length).toBe(10);
    expect(rates[0]).toBeGreaterThan(rates[9]);
  });
});
