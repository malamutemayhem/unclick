import { describe, it, expect } from "vitest";
import { MoneyFormat } from "../money-format.js";

describe("MoneyFormat", () => {
  it("formats USD amounts", () => {
    expect(MoneyFormat.format(1234.56, "USD")).toBe("$1,234.56");
    expect(MoneyFormat.format(0, "USD")).toBe("$0.00");
  });

  it("formats negative amounts", () => {
    expect(MoneyFormat.format(-42.50, "USD")).toBe("-$42.50");
  });

  it("formats zero-decimal currencies", () => {
    expect(MoneyFormat.format(1000, "JPY")).toBe("¥1,000");
  });

  it("formats compact amounts", () => {
    expect(MoneyFormat.formatCompact(1500000, "USD")).toBe("$1.5M");
    expect(MoneyFormat.formatCompact(2500, "USD")).toBe("$2.5K");
    expect(MoneyFormat.formatCompact(3e9, "USD")).toBe("$3.0B");
  });

  it("converts to and from cents", () => {
    expect(MoneyFormat.toCents(19.99)).toBe(1999);
    expect(MoneyFormat.fromCents(1999)).toBe(19.99);
  });

  it("parses money strings", () => {
    const result = MoneyFormat.parse("$1,234.56");
    expect(result).not.toBeNull();
    expect(result!.amount).toBeCloseTo(1234.56);
    expect(result!.currency).toBe("USD");
  });

  it("returns null for invalid parse", () => {
    expect(MoneyFormat.parse("not money")).toBeNull();
  });

  it("splits amount evenly", () => {
    const splits = MoneyFormat.split(10.00, 3);
    expect(splits.length).toBe(3);
    const total = splits.reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(10.00);
  });

  it("gets currency info", () => {
    const info = MoneyFormat.getCurrency("EUR");
    expect(info).not.toBeNull();
    expect(info!.symbol).toBe("€");
  });

  it("lists currencies", () => {
    const currencies = MoneyFormat.listCurrencies();
    expect(currencies.length).toBeGreaterThan(10);
  });
});
