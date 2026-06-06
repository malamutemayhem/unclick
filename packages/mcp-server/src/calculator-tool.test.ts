import { describe, expect, it } from "vitest";
import {
  calculateTip,
  calculateMortgage,
  calculateBmi,
  calculateCompoundInterest,
  convertCurrencyEstimate,
} from "./calculator-tool.js";

describe("calculator-tool", () => {
  describe("calculateTip", () => {
    it("splits a tipped bill evenly", () => {
      const result = calculateTip({ bill: 100, tip_percent: 20, split_ways: 4 }) as Record<string, number>;
      expect(result.tip_amount).toBe(20);
      expect(result.total).toBe(120);
      expect(result.per_person).toBe(30);
      expect(result.tip_per_person).toBe(5);
    });

    it("defaults to 18% tip and a single payer", () => {
      const result = calculateTip({ bill: 50 }) as Record<string, number>;
      expect(result.tip_percent).toBe(18);
      expect(result.tip_amount).toBe(9);
      expect(result.total).toBe(59);
      expect(result.split_ways).toBe(1);
    });

    it("rejects a non-positive bill", () => {
      expect(calculateTip({ bill: 0 })).toEqual({ error: "bill must be a positive number." });
    });

    it("rejects a negative tip percent", () => {
      expect(calculateTip({ bill: 10, tip_percent: -5 })).toEqual({
        error: "tip_percent must be non-negative.",
      });
    });
  });

  describe("calculateMortgage", () => {
    it("handles a zero-interest loan as simple division", () => {
      const result = calculateMortgage({ loan_amount: 120000, annual_rate: 0, term_years: 10 }) as Record<string, number>;
      expect(result.term_months).toBe(120);
      expect(result.monthly_payment).toBe(1000);
      expect(result.total_paid).toBe(120000);
      expect(result.total_interest).toBe(0);
    });

    it("amortizes an interest-bearing loan", () => {
      const result = calculateMortgage({ loan_amount: 300000, annual_rate: 6, term_years: 30 }) as Record<string, number>;
      // Standard 30-year amortization: ~$1,798.65/mo.
      expect(result.monthly_payment).toBeCloseTo(1798.65, 1);
      expect(result.total_interest).toBeGreaterThan(result.loan_amount);
    });

    it("rejects a non-positive loan amount", () => {
      expect(calculateMortgage({ loan_amount: 0, annual_rate: 5, term_years: 10 })).toEqual({
        error: "loan_amount must be a positive number.",
      });
    });

    it("rejects a non-positive term", () => {
      expect(calculateMortgage({ loan_amount: 1000, annual_rate: 5, term_years: 0 })).toEqual({
        error: "term_years must be a positive number.",
      });
    });
  });

  describe("calculateBmi", () => {
    it("classifies a normal-weight reading", () => {
      const result = calculateBmi({ weight_kg: 70, height_cm: 175 }) as Record<string, unknown>;
      expect(result.bmi).toBe(22.86);
      expect(result.category).toBe("Normal weight");
      expect(result.healthy_weight_range_kg).toEqual({ min: 56.66, max: 76.26 });
    });

    it("classifies an obese reading", () => {
      // 95kg @ 175cm => BMI 31.0 => Obese (Class I), the 30-35 band.
      const result = calculateBmi({ weight_kg: 95, height_cm: 175 }) as Record<string, unknown>;
      expect(result.bmi).toBe(31.02);
      expect(result.category).toBe("Obese (Class I)");
    });

    it("rejects a non-positive height", () => {
      expect(calculateBmi({ weight_kg: 70, height_cm: 0 })).toEqual({
        error: "height_cm must be a positive number.",
      });
    });
  });

  describe("calculateCompoundInterest", () => {
    it("compounds monthly", () => {
      const result = calculateCompoundInterest({
        principal: 1000,
        annual_rate: 12,
        years: 1,
        compounds_per_year: 12,
      }) as Record<string, number | string>;
      expect(result.final_amount).toBeCloseTo(1126.83, 2);
      expect(result.compound_frequency).toBe("monthly");
      expect(result.effective_annual_rate_percent as number).toBeCloseTo(12.6825, 3);
    });

    it("treats a zero rate as no growth", () => {
      const result = calculateCompoundInterest({ principal: 1000, annual_rate: 0, years: 5 }) as Record<string, number>;
      expect(result.final_amount).toBe(1000);
      expect(result.total_interest).toBe(0);
    });

    it("rejects a non-positive principal", () => {
      expect(calculateCompoundInterest({ principal: 0, annual_rate: 5, years: 1 })).toEqual({
        error: "principal must be a positive number.",
      });
    });
  });

  describe("convertCurrencyEstimate", () => {
    it("converts via the USD pivot", () => {
      const result = convertCurrencyEstimate({ amount: 100, from_currency: "usd", to_currency: "eur" }) as Record<string, number>;
      expect(result.converted_amount).toBeCloseTo(92.5926, 3);
      expect(result.approximate_rate).toBeCloseTo(0.925926, 5);
    });

    it("rejects an unsupported currency", () => {
      const result = convertCurrencyEstimate({ amount: 100, from_currency: "USD", to_currency: "XYZ" }) as Record<string, string>;
      expect(result.error).toMatch(/not in approximate rate table/);
    });

    it("rejects a non-positive amount", () => {
      expect(convertCurrencyEstimate({ amount: 0, from_currency: "USD", to_currency: "EUR" })).toEqual({
        error: "amount must be a positive number.",
      });
    });
  });
});
