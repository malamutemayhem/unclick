import { describe, it, expect } from "vitest";
import {
  computePayroll, annualFromBiweekly, annualFromMonthly,
  biweeklyFromAnnual, monthlyFromAnnual, weeklyFromAnnual,
  hourlyFromAnnual, annualFromHourly, overtime,
  employerCost, takeHomePercent, raiseImpact, bonus,
} from "../payroll-calc.js";

describe("computePayroll", () => {
  it("computes net pay", () => {
    const result = computePayroll({
      grossPay: 5000,
      federalTaxRate: 0.22,
      stateTaxRate: 0.05,
      socialSecurityRate: 0.062,
      medicareRate: 0.0145,
      retirement401k: 250,
      healthInsurance: 200,
      otherDeductions: 0,
    });
    expect(result.federalTax).toBe(1100);
    expect(result.stateTax).toBe(250);
    expect(result.netPay).toBeLessThan(5000);
    expect(result.netPay).toBeGreaterThan(0);
    expect(result.totalDeductions).toBeCloseTo(
      result.federalTax + result.stateTax + result.socialSecurity
      + result.medicare + result.retirement401k + result.healthInsurance
    );
  });
});

describe("salary conversions", () => {
  it("annual from biweekly", () => {
    expect(annualFromBiweekly(2000)).toBe(52000);
  });

  it("annual from monthly", () => {
    expect(annualFromMonthly(5000)).toBe(60000);
  });

  it("biweekly from annual", () => {
    expect(biweeklyFromAnnual(52000)).toBe(2000);
  });

  it("monthly from annual", () => {
    expect(monthlyFromAnnual(60000)).toBe(5000);
  });

  it("weekly from annual", () => {
    expect(weeklyFromAnnual(52000)).toBe(1000);
  });

  it("hourly from annual", () => {
    expect(hourlyFromAnnual(52000)).toBeCloseTo(25, 0);
  });

  it("annual from hourly", () => {
    expect(annualFromHourly(25)).toBe(52000);
  });
});

describe("overtime", () => {
  it("no overtime under 40 hours", () => {
    const result = overtime(35, 20);
    expect(result.overtimeHours).toBe(0);
    expect(result.totalPay).toBe(700);
  });

  it("calculates overtime", () => {
    const result = overtime(50, 20);
    expect(result.overtimeHours).toBe(10);
    expect(result.regularPay).toBe(800);
    expect(result.overtimePay).toBe(300);
    expect(result.totalPay).toBe(1100);
  });
});

describe("employerCost", () => {
  it("adds employer taxes", () => {
    const cost = employerCost(5000);
    expect(cost).toBeGreaterThan(5000);
  });
});

describe("takeHomePercent", () => {
  it("computes percentage", () => {
    expect(takeHomePercent(3500, 5000)).toBe(70);
  });
});

describe("raiseImpact", () => {
  it("computes raise impact", () => {
    const result = raiseImpact(5000, 0.10, 0.22, 0.05);
    expect(result.newGross).toBe(5500);
    expect(result.grossIncrease).toBe(500);
    expect(result.netIncrease).toBeLessThan(500);
    expect(result.effectiveTaxOnRaise).toBeGreaterThan(0);
  });
});

describe("bonus", () => {
  it("computes bonus after supplemental tax", () => {
    const result = bonus(10000);
    expect(result.tax).toBe(2200);
    expect(result.net).toBe(7800);
  });

  it("custom rate", () => {
    const result = bonus(1000, 0.3);
    expect(result.tax).toBe(300);
  });
});
