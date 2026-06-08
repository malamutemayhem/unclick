import { describe, it, expect } from "vitest";
import { Money, money } from "../money.js";

describe("Money", () => {
  it("rounds to two decimal places", () => {
    const m = new Money(1.999, "usd");
    expect(m.amount).toBe(2);
  });

  it("uppercases currency", () => {
    const m = new Money(10, "eur");
    expect(m.currency).toBe("EUR");
  });

  it("adds two amounts", () => {
    const a = new Money(10.5, "USD");
    const b = new Money(3.25, "USD");
    expect(a.add(b).amount).toBe(13.75);
  });

  it("throws on currency mismatch for add", () => {
    const a = new Money(10, "USD");
    const b = new Money(5, "EUR");
    expect(() => a.add(b)).toThrow("Currency mismatch");
  });

  it("subtracts", () => {
    const result = new Money(10, "USD").subtract(new Money(3, "USD"));
    expect(result.amount).toBe(7);
  });

  it("multiplies", () => {
    expect(new Money(5, "USD").multiply(3).amount).toBe(15);
  });

  it("divides", () => {
    expect(new Money(10, "USD").divide(4).amount).toBe(2.5);
  });

  it("throws on division by zero", () => {
    expect(() => new Money(10, "USD").divide(0)).toThrow("Division by zero");
  });

  it("checks equality", () => {
    expect(new Money(5, "USD").equals(new Money(5, "USD"))).toBe(true);
    expect(new Money(5, "USD").equals(new Money(5, "EUR"))).toBe(false);
    expect(new Money(5, "USD").equals(new Money(6, "USD"))).toBe(false);
  });

  it("isZero / isPositive / isNegative", () => {
    expect(new Money(0, "USD").isZero()).toBe(true);
    expect(new Money(5, "USD").isPositive()).toBe(true);
    expect(new Money(-3, "USD").isNegative()).toBe(true);
  });

  it("abs and negate", () => {
    expect(new Money(-5, "USD").abs().amount).toBe(5);
    expect(new Money(5, "USD").negate().amount).toBe(-5);
  });

  it("formats as string", () => {
    const m = new Money(42, "USD");
    expect(m.toString()).toBe("42.00 USD");
  });

  it("format uses Intl", () => {
    const m = new Money(42.5, "USD");
    const formatted = m.format("en-US");
    expect(formatted).toContain("42.50");
  });

  it("allocates preserving total", () => {
    const m = new Money(100, "USD");
    const parts = m.allocate([1, 1, 1]);
    const total = parts.reduce((s: number, p: Money) => s + p.amount, 0);
    expect(Math.round(total * 100) / 100).toBe(100);
    expect(parts).toHaveLength(3);
  });

  it("allocate handles uneven split", () => {
    const m = new Money(10, "USD");
    const parts = m.allocate([1, 1, 1]);
    const amounts = parts.map((p: Money) => p.amount);
    expect(amounts.reduce((a: number, b: number) => a + b, 0)).toBeCloseTo(10, 2);
  });

  it("money factory function", () => {
    const m = money(25.5, "aud");
    expect(m.amount).toBe(25.5);
    expect(m.currency).toBe("AUD");
  });
});
