import { describe, it, expect } from "vitest";
import {
  monthlyPayment, amortize, totalInterest,
  affordablePrice, remainingBalance, payoffMonths,
  refinanceSavings, extraPaymentImpact,
  loanToValue, debtToIncome,
} from "../loan-amortize.js";

describe("monthlyPayment", () => {
  it("computes correct payment", () => {
    const pmt = monthlyPayment(200000, 0.06, 360);
    expect(pmt).toBeCloseTo(1199.10, 0);
  });

  it("zero interest", () => {
    const pmt = monthlyPayment(12000, 0, 12);
    expect(pmt).toBe(1000);
  });
});

describe("amortize", () => {
  it("produces correct schedule length", () => {
    const result = amortize(100000, 0.05, 360);
    expect(result.schedule.length).toBe(360);
    expect(result.schedule[359].balance).toBeCloseTo(0, 0);
  });

  it("first payment has more interest than principal", () => {
    const result = amortize(200000, 0.06, 360);
    expect(result.schedule[0].interest).toBeGreaterThan(result.schedule[0].principal);
  });

  it("last payment has more principal than interest", () => {
    const result = amortize(200000, 0.06, 360);
    const last = result.schedule[result.schedule.length - 1];
    expect(last.principal).toBeGreaterThan(last.interest);
  });

  it("extra payments shorten the loan", () => {
    const normal = amortize(100000, 0.05, 360);
    const extra = amortize(100000, 0.05, 360, 100);
    expect(extra.schedule.length).toBeLessThan(normal.schedule.length);
    expect(extra.totalInterest).toBeLessThan(normal.totalInterest);
  });
});

describe("totalInterest", () => {
  it("computes total interest paid", () => {
    const interest = totalInterest(200000, 0.06, 360);
    expect(interest).toBeGreaterThan(200000);
  });
});

describe("affordablePrice", () => {
  it("computes affordable price", () => {
    const price = affordablePrice(1500, 0.06, 360, 50000);
    expect(price).toBeGreaterThan(200000);
  });
});

describe("remainingBalance", () => {
  it("full balance at start", () => {
    const bal = remainingBalance(200000, 0.06, 360, 0);
    expect(bal).toBeCloseTo(200000);
  });

  it("decreases over time", () => {
    const bal = remainingBalance(200000, 0.06, 360, 120);
    expect(bal).toBeLessThan(200000);
    expect(bal).toBeGreaterThan(0);
  });
});

describe("payoffMonths", () => {
  it("computes months to payoff", () => {
    const months = payoffMonths(10000, 0.06, 500);
    expect(months).toBeGreaterThan(0);
    expect(months).toBeLessThan(30);
  });

  it("returns Infinity if payment too small", () => {
    expect(payoffMonths(10000, 0.12, 50)).toBe(Infinity);
  });
});

describe("refinanceSavings", () => {
  it("computes savings", () => {
    const result = refinanceSavings(150000, 0.065, 300, 0.045, 360, 3000);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.breakEvenMonths).toBeGreaterThan(0);
  });
});

describe("extraPaymentImpact", () => {
  it("shows months and interest saved", () => {
    const result = extraPaymentImpact(200000, 0.06, 360, 200);
    expect(result.monthsSaved).toBeGreaterThan(0);
    expect(result.interestSaved).toBeGreaterThan(0);
  });
});

describe("loanToValue", () => {
  it("computes LTV ratio", () => {
    expect(loanToValue(160000, 200000)).toBe(80);
  });
});

describe("debtToIncome", () => {
  it("computes DTI ratio", () => {
    expect(debtToIncome(2000, 6000)).toBeCloseTo(33.33, 0);
  });
});
