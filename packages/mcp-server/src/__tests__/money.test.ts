import { describe, it, expect } from "vitest";
import { Money } from "../money.js";

describe("money", () => {
  it("creates from cents", () => {
    const m = new Money(1050);
    expect(m.dollars).toBe(10.5);
  });

  it("creates from dollars", () => {
    const m = Money.fromDollars(10.5);
    expect(m.cents).toBe(1050);
  });

  it("adds money", () => {
    const a = Money.fromDollars(10);
    const b = Money.fromDollars(5.5);
    expect(a.add(b).dollars).toBe(15.5);
  });

  it("subtracts money", () => {
    const a = Money.fromDollars(10);
    const b = Money.fromDollars(3);
    expect(a.subtract(b).dollars).toBe(7);
  });

  it("multiplies", () => {
    const m = Money.fromDollars(10);
    expect(m.multiply(1.5).dollars).toBe(15);
  });

  it("divides", () => {
    const m = Money.fromDollars(10);
    expect(m.divide(4).dollars).toBe(2.5);
  });

  it("throws on currency mismatch", () => {
    const usd = new Money(100, "USD");
    const eur = new Money(100, "EUR");
    expect(() => usd.add(eur)).toThrow("Currency mismatch");
  });

  it("sum totals multiple amounts", () => {
    const amounts = [Money.fromDollars(10), Money.fromDollars(20), Money.fromDollars(5)];
    expect(Money.sum(amounts).dollars).toBe(35);
  });

  it("toString formats correctly", () => {
    const m = Money.fromDollars(42.5);
    expect(m.toString()).toBe("USD 42.50");
  });
});
