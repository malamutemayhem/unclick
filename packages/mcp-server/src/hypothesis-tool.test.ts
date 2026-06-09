import { describe, it, expect } from "vitest";
import { hypothesisTest } from "./hypothesis-tool.js";

describe("hypothesisTest", () => {
  it("performs z-test (significant)", async () => {
    const r = await hypothesisTest({
      test: "z",
      sample_mean: 105,
      population_mean: 100,
      population_std: 10,
      sample_size: 30,
    }) as any;
    expect(r.test).toBe("z-test");
    expect(r.z_statistic).toBeGreaterThan(2);
    expect(r.reject_null).toBe(true);
  });

  it("performs z-test (not significant)", async () => {
    const r = await hypothesisTest({
      test: "z",
      sample_mean: 100.5,
      population_mean: 100,
      population_std: 10,
      sample_size: 10,
    }) as any;
    expect(r.reject_null).toBe(false);
  });

  it("performs one-tailed z-test", async () => {
    const r = await hypothesisTest({
      test: "z",
      sample_mean: 105,
      population_mean: 100,
      population_std: 10,
      sample_size: 30,
      tail: "right",
    }) as any;
    expect(r.tail).toBe("right");
    expect(r.p_value).toBeLessThan(0.05);
  });

  it("performs t-test", async () => {
    const r = await hypothesisTest({
      test: "t",
      sample_mean: 12,
      population_mean: 10,
      sample_std: 3,
      sample_size: 25,
    }) as any;
    expect(r.test).toBe("t-test");
    expect(r.degrees_of_freedom).toBe(24);
    expect(r.t_statistic).toBeGreaterThan(0);
  });

  it("performs chi-squared test", async () => {
    const r = await hypothesisTest({
      test: "chi2",
      observed: [50, 30, 20],
      expected: [40, 40, 20],
    }) as any;
    expect(r.test).toBe("chi-squared");
    expect(r.degrees_of_freedom).toBe(2);
    expect(r.chi2_statistic).toBeGreaterThan(0);
  });

  it("rejects invalid test type", async () => {
    await expect(
      hypothesisTest({ test: "anova" }),
    ).rejects.toThrow("test must be");
  });

  it("stamps meta", async () => {
    const r = await hypothesisTest({
      test: "z",
      sample_mean: 100,
      population_mean: 100,
      population_std: 10,
      sample_size: 10,
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
