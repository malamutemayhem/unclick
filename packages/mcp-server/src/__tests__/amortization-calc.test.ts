import { describe, it, expect } from "vitest";
import { AmortizationCalc } from "../amortization-calc.js";

describe("AmortizationCalc", () => {
  it("payment calculates monthly payment", () => {
    const pmt = AmortizationCalc.payment(200000, 5, 360);
    expect(pmt).toBeGreaterThan(1000);
    expect(pmt).toBeLessThan(1200);
  });

  it("payment handles zero rate", () => {
    const pmt = AmortizationCalc.payment(12000, 0, 12);
    expect(pmt).toBe(1000);
  });

  it("schedule produces correct number of periods", () => {
    const schedule = AmortizationCalc.schedule(100000, 6, 12);
    expect(schedule.length).toBe(12);
    expect(schedule[11].balance).toBeCloseTo(0, 0);
  });

  it("schedule shows decreasing interest over time", () => {
    const schedule = AmortizationCalc.schedule(100000, 6, 24);
    expect(schedule[0].interest).toBeGreaterThan(schedule[23].interest);
    expect(schedule[0].principal).toBeLessThan(schedule[23].principal);
  });

  it("totalInterest calculates total interest paid", () => {
    const interest = AmortizationCalc.totalInterest(200000, 5, 360);
    expect(interest).toBeGreaterThan(0);
    expect(interest).toBeLessThan(200000);
  });

  it("totalCost is principal plus total interest", () => {
    const cost = AmortizationCalc.totalCost(200000, 5, 360);
    const interest = AmortizationCalc.totalInterest(200000, 5, 360);
    expect(cost).toBeCloseTo(200000 + interest, 0);
  });

  it("extraPaymentSavings shows benefit of extra payments", () => {
    const savings = AmortizationCalc.extraPaymentSavings(200000, 5, 360, 200);
    expect(savings.periodsSaved).toBeGreaterThan(0);
    expect(savings.interestSaved).toBeGreaterThan(0);
  });

  it("affordability calculates max loan amount", () => {
    const maxLoan = AmortizationCalc.affordability(5000, 5, 360);
    expect(maxLoan).toBeGreaterThan(200000);
    expect(maxLoan).toBeLessThan(400000);
  });

  it("balanceAt returns balance at specific period", () => {
    const balance = AmortizationCalc.balanceAt(100000, 6, 120, 60);
    expect(balance).toBeGreaterThan(0);
    expect(balance).toBeLessThan(100000);
  });
});
