import { describe, it, expect } from "vitest";
import {
  functionalScore, formDifficulty, marketDemand,
  glazeConsumption, dryingSensitivity, dailyUse,
  requiresLid, bestTechnique, historicalOrigin, potteryForms,
} from "../pottery-form-calc.js";

describe("functionalScore", () => {
  it("plate most functional", () => {
    expect(functionalScore("plate")).toBeGreaterThan(
      functionalScore("sculpture")
    );
  });
});

describe("formDifficulty", () => {
  it("sculpture most difficult", () => {
    expect(formDifficulty("sculpture")).toBeGreaterThan(
      formDifficulty("bowl")
    );
  });
});

describe("marketDemand", () => {
  it("bowl highest market demand", () => {
    expect(marketDemand("bowl")).toBeGreaterThan(
      marketDemand("sculpture")
    );
  });
});

describe("glazeConsumption", () => {
  it("sculpture uses most glaze", () => {
    expect(glazeConsumption("sculpture")).toBeGreaterThan(
      glazeConsumption("plate")
    );
  });
});

describe("dryingSensitivity", () => {
  it("teapot most drying sensitive", () => {
    expect(dryingSensitivity("teapot")).toBeGreaterThan(
      dryingSensitivity("bowl")
    );
  });
});

describe("dailyUse", () => {
  it("bowl is for daily use", () => {
    expect(dailyUse("bowl")).toBe(true);
  });
  it("sculpture is not", () => {
    expect(dailyUse("sculpture")).toBe(false);
  });
});

describe("requiresLid", () => {
  it("teapot requires lid", () => {
    expect(requiresLid("teapot")).toBe(true);
  });
  it("bowl does not", () => {
    expect(requiresLid("bowl")).toBe(false);
  });
});

describe("bestTechnique", () => {
  it("sculpture by hand building", () => {
    expect(bestTechnique("sculpture")).toBe("hand_building");
  });
});

describe("historicalOrigin", () => {
  it("teapot from ming dynasty china", () => {
    expect(historicalOrigin("teapot")).toBe("ming_dynasty_china");
  });
});

describe("potteryForms", () => {
  it("returns 5 forms", () => {
    expect(potteryForms()).toHaveLength(5);
  });
});
