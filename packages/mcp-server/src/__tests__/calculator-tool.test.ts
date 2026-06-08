import { describe, expect, it } from "vitest";

import {
  calculateTip,
  calculateMortgage,
  calculateBmi,
  calculateCompoundInterest,
  convertCurrencyEstimate,
} from "../calculator-tool.js";

describe("calculateTip", () => {
  it("calculates tip with defaults (18%)", () => {
    const r = calculateTip({ bill: 100 }) as any;
    expect(r.tip_percent).toBe(18);
    expect(r.tip_amount).toBe(18);
    expect(r.total).toBe(118);
  });

  it("calculates custom tip percentage", () => {
    const r = calculateTip({ bill: 50, tip_percent: 20 }) as any;
    expect(r.tip_amount).toBe(10);
    expect(r.total).toBe(60);
  });

  it("splits the bill", () => {
    const r = calculateTip({ bill: 100, tip_percent: 20, split_ways: 4 }) as any;
    expect(r.split_ways).toBe(4);
    expect(r.per_person).toBe(30);
    expect(r.tip_per_person).toBe(5);
  });

  it("returns error for zero bill", () => {
    const r = calculateTip({ bill: 0 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for negative bill", () => {
    const r = calculateTip({ bill: -10 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for negative tip percent", () => {
    const r = calculateTip({ bill: 50, tip_percent: -5 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("handles zero tip percent", () => {
    const r = calculateTip({ bill: 100, tip_percent: 0 }) as any;
    expect(r.tip_amount).toBe(0);
    expect(r.total).toBe(100);
  });

  it("rounds split_ways to nearest integer", () => {
    const r = calculateTip({ bill: 100, tip_percent: 10, split_ways: 2.7 }) as any;
    expect(r.split_ways).toBe(3);
  });
});

describe("calculateMortgage", () => {
  it("calculates a standard 30-year mortgage", () => {
    const r = calculateMortgage({ principal: 300000, annual_rate: 6, years: 30 }) as any;
    expect(r.loan_amount).toBe(300000);
    expect(r.term_months).toBe(360);
    expect(r.monthly_payment).toBeCloseTo(1798.65, 0);
    expect(r.total_interest).toBeGreaterThan(0);
  });

  it("handles 0% interest rate", () => {
    const r = calculateMortgage({ principal: 120000, annual_rate: 0, years: 10 }) as any;
    expect(r.monthly_payment).toBe(1000);
    expect(r.total_interest).toBe(0);
  });

  it("accepts loan_amount alias", () => {
    const r = calculateMortgage({ loan_amount: 200000, annual_rate: 5, years: 15 }) as any;
    expect(r.loan_amount).toBe(200000);
    expect(r.monthly_payment).toBeGreaterThan(0);
  });

  it("accepts term_years alias", () => {
    const r = calculateMortgage({ principal: 100000, annual_rate: 4, term_years: 20 }) as any;
    expect(r.term_years).toBe(20);
  });

  it("includes interest_to_principal_ratio", () => {
    const r = calculateMortgage({ principal: 300000, annual_rate: 6, years: 30 }) as any;
    expect(r.interest_to_principal_ratio).toBeGreaterThan(0);
  });

  it("returns error for zero principal", () => {
    const r = calculateMortgage({ principal: 0, annual_rate: 5, years: 30 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for negative rate", () => {
    const r = calculateMortgage({ principal: 100000, annual_rate: -1, years: 30 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for zero years", () => {
    const r = calculateMortgage({ principal: 100000, annual_rate: 5, years: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("calculateBmi", () => {
  it("calculates normal weight BMI", () => {
    const r = calculateBmi({ weight_kg: 70, height_cm: 175 }) as any;
    expect(r.bmi).toBeCloseTo(22.86, 1);
    expect(r.category).toBe("Normal weight");
  });

  it("classifies underweight", () => {
    const r = calculateBmi({ weight_kg: 45, height_cm: 175 }) as any;
    expect(r.category).toBe("Underweight");
  });

  it("classifies overweight", () => {
    const r = calculateBmi({ weight_kg: 85, height_cm: 175 }) as any;
    expect(r.category).toBe("Overweight");
  });

  it("classifies obese class I", () => {
    const r = calculateBmi({ weight_kg: 100, height_cm: 175 }) as any;
    expect(r.category).toBe("Obese (Class I)");
  });

  it("classifies obese class II", () => {
    const r = calculateBmi({ weight_kg: 115, height_cm: 175 }) as any;
    expect(r.category).toBe("Obese (Class II)");
  });

  it("classifies obese class III", () => {
    const r = calculateBmi({ weight_kg: 135, height_cm: 175 }) as any;
    expect(r.category).toBe("Obese (Class III)");
  });

  it("provides healthy weight range", () => {
    const r = calculateBmi({ weight_kg: 70, height_cm: 175 }) as any;
    expect(r.healthy_weight_range_kg.min).toBeCloseTo(56.66, 0);
    expect(r.healthy_weight_range_kg.max).toBeCloseTo(76.29, 0);
  });

  it("returns error for zero weight", () => {
    const r = calculateBmi({ weight_kg: 0, height_cm: 175 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for zero height", () => {
    const r = calculateBmi({ weight_kg: 70, height_cm: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("calculateCompoundInterest", () => {
  it("calculates monthly compounding", () => {
    const r = calculateCompoundInterest({ principal: 10000, annual_rate: 5, years: 10 }) as any;
    expect(r.final_amount).toBeCloseTo(16470.09, 0);
    expect(r.compound_frequency).toBe("monthly");
  });

  it("calculates annual compounding", () => {
    const r = calculateCompoundInterest({ principal: 10000, annual_rate: 5, years: 10, compounds_per_year: 1 }) as any;
    expect(r.final_amount).toBeCloseTo(16288.95, 0);
    expect(r.compound_frequency).toBe("annually");
  });

  it("calculates daily compounding", () => {
    const r = calculateCompoundInterest({ principal: 1000, annual_rate: 10, years: 1, compounds_per_year: 365 }) as any;
    expect(r.compound_frequency).toBe("daily");
    expect(r.final_amount).toBeGreaterThan(1100);
  });

  it("includes growth_factor and effective_annual_rate", () => {
    const r = calculateCompoundInterest({ principal: 1000, annual_rate: 12, years: 1, compounds_per_year: 12 }) as any;
    expect(r.growth_factor).toBeGreaterThan(1);
    expect(r.effective_annual_rate_percent).toBeGreaterThan(12);
  });

  it("labels non-standard frequency as Nx per year", () => {
    const r = calculateCompoundInterest({ principal: 1000, annual_rate: 5, years: 1, compounds_per_year: 6 }) as any;
    expect(r.compound_frequency).toBe("6x per year");
  });

  it("handles 0% interest rate", () => {
    const r = calculateCompoundInterest({ principal: 5000, annual_rate: 0, years: 5 }) as any;
    expect(r.final_amount).toBe(5000);
    expect(r.total_interest).toBe(0);
  });

  it("returns error for zero principal", () => {
    const r = calculateCompoundInterest({ principal: 0, annual_rate: 5, years: 10 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for negative rate", () => {
    const r = calculateCompoundInterest({ principal: 1000, annual_rate: -5, years: 10 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for zero years", () => {
    const r = calculateCompoundInterest({ principal: 1000, annual_rate: 5, years: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertCurrencyEstimate", () => {
  it("converts USD to EUR", () => {
    const r = convertCurrencyEstimate({ amount: 100, from: "USD", to: "EUR" }) as any;
    expect(r.converted_amount).toBeGreaterThan(0);
    expect(r.from_currency).toBe("USD");
    expect(r.to_currency).toBe("EUR");
    expect(r.disclaimer).toContain("APPROXIMATE");
  });

  it("converts AUD to GBP", () => {
    const r = convertCurrencyEstimate({ amount: 500, from: "AUD", to: "GBP" }) as any;
    expect(r.converted_amount).toBeGreaterThan(0);
    expect(r.converted_amount).toBeLessThan(500);
  });

  it("is case-insensitive", () => {
    const r = convertCurrencyEstimate({ amount: 100, from: "usd", to: "eur" }) as any;
    expect(r.error).toBeUndefined();
    expect(r.converted_amount).toBeGreaterThan(0);
  });

  it("accepts from_currency / to_currency aliases", () => {
    const r = convertCurrencyEstimate({ amount: 50, from_currency: "JPY", to_currency: "USD" }) as any;
    expect(r.converted_amount).toBeGreaterThan(0);
  });

  it("identity conversion returns same amount", () => {
    const r = convertCurrencyEstimate({ amount: 42, from: "USD", to: "USD" }) as any;
    expect(r.converted_amount).toBeCloseTo(42, 2);
  });

  it("includes approximate_rate", () => {
    const r = convertCurrencyEstimate({ amount: 1, from: "USD", to: "EUR" }) as any;
    expect(r.approximate_rate).toBeGreaterThan(0);
  });

  it("includes supported_currencies list", () => {
    const r = convertCurrencyEstimate({ amount: 1, from: "USD", to: "EUR" }) as any;
    expect(r.supported_currencies).toContain("USD");
    expect(r.supported_currencies).toContain("AUD");
  });

  it("returns error for zero amount", () => {
    const r = convertCurrencyEstimate({ amount: 0, from: "USD", to: "EUR" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for unsupported from_currency", () => {
    const r = convertCurrencyEstimate({ amount: 100, from: "XYZ", to: "USD" }) as any;
    expect(r.error).toContain("XYZ");
  });

  it("returns error for unsupported to_currency", () => {
    const r = convertCurrencyEstimate({ amount: 100, from: "USD", to: "DOGE" }) as any;
    expect(r.error).toContain("DOGE");
  });

  it("returns error when from is missing", () => {
    const r = convertCurrencyEstimate({ amount: 100, to: "USD" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error when to is missing", () => {
    const r = convertCurrencyEstimate({ amount: 100, from: "USD" }) as any;
    expect(r.error).toBeTruthy();
  });
});
