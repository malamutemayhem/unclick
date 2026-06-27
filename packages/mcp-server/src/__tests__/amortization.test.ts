import { describe, it, expect } from "vitest";
import { AmortizationSchedule } from "../amortization.js";

describe("AmortizationSchedule", () => {
  it("calculates monthly payment", () => {
    const sched = new AmortizationSchedule(200000, 0.06, 360);
    expect(sched.monthlyPayment()).toBeCloseTo(1199.1, 0);
  });

  it("generates full schedule", () => {
    const sched = new AmortizationSchedule(100000, 0.05, 120);
    const entries = sched.generate();
    expect(entries.length).toBe(120);
    expect(entries[entries.length - 1].balance).toBeCloseTo(0, 0);
  });

  it("first payment is mostly interest", () => {
    const sched = new AmortizationSchedule(200000, 0.06, 360);
    const entries = sched.generate();
    expect(entries[0].interest).toBeGreaterThan(entries[0].principal);
  });

  it("last payment is mostly principal", () => {
    const sched = new AmortizationSchedule(200000, 0.06, 360);
    const entries = sched.generate();
    const last = entries[entries.length - 1];
    expect(last.principal).toBeGreaterThan(last.interest);
  });

  it("total interest exceeds zero", () => {
    const sched = new AmortizationSchedule(100000, 0.05, 120);
    expect(sched.totalInterest()).toBeGreaterThan(0);
  });

  it("extra payments reduce payoff time", () => {
    const normal = new AmortizationSchedule(200000, 0.06, 360);
    const extra = new AmortizationSchedule(200000, 0.06, 360, 200);
    expect(extra.payoffPeriods()).toBeLessThan(normal.payoffPeriods());
  });

  it("calculates interest saved by extra payments", () => {
    const sched = new AmortizationSchedule(200000, 0.06, 360);
    const saved = sched.interestSaved(200);
    expect(saved).toBeGreaterThan(0);
  });

  it("calculates affordable amount", () => {
    const amount = AmortizationSchedule.affordableAmount(1500, 0.06, 360);
    expect(amount).toBeGreaterThan(200000);
    expect(amount).toBeLessThan(300000);
  });

  it("handles zero interest rate", () => {
    const sched = new AmortizationSchedule(12000, 0, 12);
    expect(sched.monthlyPayment()).toBe(1000);
  });
});
