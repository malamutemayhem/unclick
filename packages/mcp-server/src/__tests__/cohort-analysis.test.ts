import { describe, it, expect } from "vitest";
import { CohortAnalysis } from "../cohort-analysis.js";

describe("CohortAnalysis", () => {
  const cohorts = [
    { cohort: "Jan", periods: [100, 80, 60, 40, 20] },
    { cohort: "Feb", periods: [120, 100, 70, 50, 30] },
    { cohort: "Mar", periods: [150, 130, 100, 80, 60] },
  ];

  it("retention calculates rates correctly", () => {
    const result = CohortAnalysis.retention(cohorts);
    expect(result.length).toBe(3);
    expect(result[0].initialSize).toBe(100);
    expect(result[0].retentionRates[0]).toBe(100);
    expect(result[0].retentionRates[1]).toBe(80);
    expect(result[0].retentionRates[4]).toBe(20);
  });

  it("churnRate calculates period-over-period churn", () => {
    const rates = CohortAnalysis.churnRate(cohorts[0]);
    expect(rates.length).toBe(4);
    expect(rates[0]).toBe(20);
  });

  it("averageRetention averages across cohorts", () => {
    const avg = CohortAnalysis.averageRetention(cohorts);
    expect(avg.length).toBe(5);
    expect(avg[0]).toBe(100);
    expect(avg[1]).toBeGreaterThan(50);
  });

  it("ltv calculates lifetime value", () => {
    const value = CohortAnalysis.ltv(cohorts[0], 10);
    expect(value).toBe(30);
  });

  it("render produces tab-separated output", () => {
    const output = CohortAnalysis.render(cohorts);
    expect(output).toContain("Cohort");
    expect(output).toContain("Jan");
    expect(output).toContain("%");
  });

  it("bestCohort finds top performer at given period", () => {
    const best = CohortAnalysis.bestCohort(cohorts, 2);
    expect(best).toBe("Mar");
  });

  it("halfLife finds when retention drops below 50%", () => {
    const hl = CohortAnalysis.halfLife(cohorts[0]);
    expect(hl).toBe(3);
  });

  it("halfLife returns null if never drops below 50%", () => {
    const hl = CohortAnalysis.halfLife({ cohort: "X", periods: [100, 90, 80, 70] });
    expect(hl).toBeNull();
  });

  it("growthRate calculates cohort-over-cohort growth", () => {
    const rates = CohortAnalysis.growthRate(cohorts);
    expect(rates.length).toBe(2);
    expect(rates[0]).toBe(20);
    expect(rates[1]).toBe(25);
  });

  it("handles empty cohorts", () => {
    expect(CohortAnalysis.retention([])).toEqual([]);
    expect(CohortAnalysis.averageRetention([])).toEqual([]);
  });
});
