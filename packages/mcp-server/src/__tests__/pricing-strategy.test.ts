import { describe, it, expect } from "vitest";
import { PricingStrategy } from "../pricing-strategy.js";

describe("PricingStrategy", () => {
  it("costPlus calculates marked-up price", () => {
    const result = PricingStrategy.costPlus(100, 50);
    expect(result.price).toBe(150);
    expect(result.profit).toBe(50);
    expect(result.margin).toBeCloseTo(33.33, 1);
  });

  it("targetReturn prices for investment return", () => {
    const result = PricingStrategy.targetReturn(10, 100000, 20, 10000);
    expect(result.price).toBeGreaterThan(10);
    expect(result.revenue).toBeGreaterThan(100000);
  });

  it("psychological generates charm pricing", () => {
    const result = PricingStrategy.psychological(29.50);
    expect(result.charm).toBe(28.99);
    expect(result.prestige).toBe(30);
    expect(result.anchor).toBe(44.25);
  });

  it("tiered creates price tiers", () => {
    const tiers = PricingStrategy.tiered([
      { name: "Basic", features: ["A"], basePrice: 10 },
      { name: "Pro", features: ["A", "B", "C"], basePrice: 10 },
      { name: "Enterprise", features: ["A", "B", "C", "D", "E"], basePrice: 10 },
    ]);
    expect(tiers.length).toBe(3);
    expect(tiers[0].price).toBe(10);
    expect(tiers[1].price).toBe(20);
    expect(tiers[2].price).toBe(40);
  });

  it("bundleDiscount calculates savings", () => {
    const result = PricingStrategy.bundleDiscount(
      [{ name: "A", price: 50 }, { name: "B", price: 30 }],
      20,
    );
    expect(result.individualTotal).toBe(80);
    expect(result.bundlePrice).toBe(64);
    expect(result.savings).toBe(16);
  });

  it("elasticity calculates price elasticity", () => {
    const e = PricingStrategy.elasticity(10, 12, 100, 80);
    expect(e).toBeLessThan(0);
  });

  it("competitivePosition classifies pricing", () => {
    const result = PricingStrategy.competitivePosition(50, [40, 45, 55, 60]);
    expect(result.position).toBe("competitive");
    expect(result.avgCompetitor).toBe(50);
  });

  it("competitivePosition detects premium", () => {
    const result = PricingStrategy.competitivePosition(100, [40, 45, 50, 55]);
    expect(result.position).toBe("premium");
  });

  it("margin calculates gross margin and markup", () => {
    const result = PricingStrategy.margin(150, 100);
    expect(result.grossMargin).toBeCloseTo(33.33, 1);
    expect(result.markup).toBe(50);
  });
});
