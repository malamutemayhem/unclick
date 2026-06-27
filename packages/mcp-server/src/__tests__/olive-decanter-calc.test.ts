import { describe, it, expect } from "vitest";
import {
  oilRecovery, waterUsage, oilPurity, throughput,
  odCost, lowWaste, forOrganic, decanterConfig,
  bestUse, oliveDecanterTypes,
} from "../olive-decanter-calc.js";

describe("oilRecovery", () => {
  it("two phase best oil recovery", () => {
    expect(oilRecovery("two_phase")).toBeGreaterThan(oilRecovery("gravity_settling"));
  });
});

describe("waterUsage", () => {
  it("two phase best water usage", () => {
    expect(waterUsage("two_phase")).toBeGreaterThan(waterUsage("three_phase"));
  });
});

describe("oilPurity", () => {
  it("vertical centrifuge best oil purity", () => {
    expect(oilPurity("vertical_centrifuge")).toBeGreaterThan(oilPurity("gravity_settling"));
  });
});

describe("throughput", () => {
  it("three phase highest throughput", () => {
    expect(throughput("three_phase")).toBeGreaterThan(throughput("gravity_settling"));
  });
});

describe("odCost", () => {
  it("two half phase most expensive", () => {
    expect(odCost("two_half_phase")).toBeGreaterThan(odCost("gravity_settling"));
  });
});

describe("lowWaste", () => {
  it("two phase is low waste", () => {
    expect(lowWaste("two_phase")).toBe(true);
  });
  it("three phase not low waste", () => {
    expect(lowWaste("three_phase")).toBe(false);
  });
});

describe("forOrganic", () => {
  it("gravity settling for organic", () => {
    expect(forOrganic("gravity_settling")).toBe(true);
  });
  it("three phase not for organic", () => {
    expect(forOrganic("three_phase")).toBe(false);
  });
});

describe("decanterConfig", () => {
  it("two half phase uses minimal water oil wet pomace", () => {
    expect(decanterConfig("two_half_phase")).toBe("two_half_phase_decanter_minimal_water_oil_wet_pomace_best_of_both");
  });
});

describe("bestUse", () => {
  it("vertical centrifuge for final polish clarity", () => {
    expect(bestUse("vertical_centrifuge")).toBe("olive_mill_vertical_centrifuge_final_polish_oil_clarity_purity");
  });
});

describe("oliveDecanterTypes", () => {
  it("returns 5 types", () => {
    expect(oliveDecanterTypes()).toHaveLength(5);
  });
});
