import { describe, it, expect } from "vitest";
import {
  cuttingSpeed, bladeLength, weightKg, vibrationLevel,
  trimmerCost, cordless, dualAction, bladeDesign,
  bestHedge, hedgeTrimmers,
} from "../hedge-trimmer-calc.js";

describe("cuttingSpeed", () => {
  it("gas dual sided fastest cutting", () => {
    expect(cuttingSpeed("gas_dual_sided")).toBeGreaterThan(cuttingSpeed("manual_shears"));
  });
});

describe("bladeLength", () => {
  it("gas dual sided longest blade", () => {
    expect(bladeLength("gas_dual_sided")).toBeGreaterThan(bladeLength("manual_shears"));
  });
});

describe("weightKg", () => {
  it("gas dual sided heaviest", () => {
    expect(weightKg("gas_dual_sided")).toBeGreaterThan(weightKg("manual_shears"));
  });
});

describe("vibrationLevel", () => {
  it("gas dual sided most vibration", () => {
    expect(vibrationLevel("gas_dual_sided")).toBeGreaterThan(vibrationLevel("battery_cordless"));
  });
});

describe("trimmerCost", () => {
  it("gas dual sided most expensive", () => {
    expect(trimmerCost("gas_dual_sided")).toBeGreaterThan(trimmerCost("manual_shears"));
  });
});

describe("cordless", () => {
  it("battery cordless is cordless", () => {
    expect(cordless("battery_cordless")).toBe(true);
  });
  it("electric corded is not", () => {
    expect(cordless("electric_corded")).toBe(false);
  });
});

describe("dualAction", () => {
  it("gas dual sided has dual action", () => {
    expect(dualAction("gas_dual_sided")).toBe(true);
  });
  it("manual shears does not", () => {
    expect(dualAction("manual_shears")).toBe(false);
  });
});

describe("bladeDesign", () => {
  it("manual shears uses bypass scissor blade", () => {
    expect(bladeDesign("manual_shears")).toBe("bypass_scissor_blade");
  });
});

describe("bestHedge", () => {
  it("pole extended for tall overhead reaching", () => {
    expect(bestHedge("pole_extended")).toBe("tall_overhead_reaching");
  });
});

describe("hedgeTrimmers", () => {
  it("returns 5 types", () => {
    expect(hedgeTrimmers()).toHaveLength(5);
  });
});
