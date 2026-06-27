import { describe, it, expect } from "vitest";
import {
  bandwidth, capacity, powerEff, thermalDesign,
  hbmCost, ecc, forAi, interface_,
  bestUse, hbmStacks,
} from "../hbm-stack-calc.js";

describe("bandwidth", () => {
  it("hbm4 future highest bandwidth", () => {
    expect(bandwidth("hbm4_future")).toBeGreaterThan(bandwidth("hbm2_8hi"));
  });
});

describe("capacity", () => {
  it("hbm4 future highest capacity", () => {
    expect(capacity("hbm4_future")).toBeGreaterThan(capacity("hbm2_8hi"));
  });
});

describe("powerEff", () => {
  it("hbm3e 12hi best power efficiency", () => {
    expect(powerEff("hbm3e_12hi")).toBeGreaterThan(powerEff("hbm2_8hi"));
  });
});

describe("thermalDesign", () => {
  it("hbm2 8hi best thermal design", () => {
    expect(thermalDesign("hbm2_8hi")).toBeGreaterThan(thermalDesign("hbm3_16hi"));
  });
});

describe("hbmCost", () => {
  it("hbm4 future most expensive", () => {
    expect(hbmCost("hbm4_future")).toBeGreaterThan(hbmCost("hbm2_8hi"));
  });
});

describe("ecc", () => {
  it("hbm3 16hi has ecc", () => {
    expect(ecc("hbm3_16hi")).toBe(true);
  });
});

describe("forAi", () => {
  it("hbm3 16hi is for ai", () => {
    expect(forAi("hbm3_16hi")).toBe(true);
  });
  it("hbm2 8hi not for ai", () => {
    expect(forAi("hbm2_8hi")).toBe(false);
  });
});

describe("interface_", () => {
  it("hbm4 future uses 2048bit hybrid bond", () => {
    expect(interface_("hbm4_future")).toBe("2048bit_hybrid_bond");
  });
});

describe("bestUse", () => {
  it("hbm3e 12hi best for next gen ai inference", () => {
    expect(bestUse("hbm3e_12hi")).toBe("next_gen_ai_inference");
  });
});

describe("hbmStacks", () => {
  it("returns 5 types", () => {
    expect(hbmStacks()).toHaveLength(5);
  });
});
