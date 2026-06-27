import { describe, it, expect } from "vitest";
import {
  avgReturnPercent, volatility, liquidity,
  minInvestmentBarrier, diversificationBenefit, passiveIncome,
  regulated, incomeType, bestTimeHorizon, investmentVehicles,
} from "../investment-vehicle-calc.js";

describe("avgReturnPercent", () => {
  it("crypto highest avg return", () => {
    expect(avgReturnPercent("cryptocurrency")).toBeGreaterThan(
      avgReturnPercent("bonds")
    );
  });
});

describe("volatility", () => {
  it("crypto most volatile", () => {
    expect(volatility("cryptocurrency")).toBeGreaterThan(
      volatility("bonds")
    );
  });
});

describe("liquidity", () => {
  it("etf most liquid", () => {
    expect(liquidity("etf")).toBeGreaterThan(
      liquidity("real_estate")
    );
  });
});

describe("minInvestmentBarrier", () => {
  it("real estate highest barrier", () => {
    expect(minInvestmentBarrier("real_estate")).toBeGreaterThan(
      minInvestmentBarrier("etf")
    );
  });
});

describe("diversificationBenefit", () => {
  it("etf best diversification", () => {
    expect(diversificationBenefit("etf")).toBeGreaterThan(
      diversificationBenefit("cryptocurrency")
    );
  });
});

describe("passiveIncome", () => {
  it("bonds provide passive income", () => {
    expect(passiveIncome("bonds")).toBe(true);
  });
  it("crypto does not", () => {
    expect(passiveIncome("cryptocurrency")).toBe(false);
  });
});

describe("regulated", () => {
  it("stocks are regulated", () => {
    expect(regulated("stocks")).toBe(true);
  });
  it("crypto is not", () => {
    expect(regulated("cryptocurrency")).toBe(false);
  });
});

describe("incomeType", () => {
  it("bonds pay coupon payments", () => {
    expect(incomeType("bonds")).toBe("coupon_payments");
  });
});

describe("bestTimeHorizon", () => {
  it("real estate very long term", () => {
    expect(bestTimeHorizon("real_estate")).toBe("very_long_term");
  });
});

describe("investmentVehicles", () => {
  it("returns 5 vehicles", () => {
    expect(investmentVehicles()).toHaveLength(5);
  });
});
