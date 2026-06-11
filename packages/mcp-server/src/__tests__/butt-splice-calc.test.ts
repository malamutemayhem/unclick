import { describe, it, expect } from "vitest";
import {
  conductivity, pullStrength, moistureSeal, installSpeed,
  spliceCost, insulated, waterproof, joinMethod,
  bestUse, buttSplices,
} from "../butt-splice-calc.js";

describe("conductivity", () => {
  it("heat shrink solder best conductivity", () => {
    expect(conductivity("heat_shrink_solder")).toBeGreaterThan(conductivity("step_down_reducer"));
  });
});

describe("pullStrength", () => {
  it("heat shrink solder strongest pull", () => {
    expect(pullStrength("heat_shrink_solder")).toBeGreaterThan(pullStrength("step_down_reducer"));
  });
});

describe("moistureSeal", () => {
  it("waterproof gel fill best moisture seal", () => {
    expect(moistureSeal("waterproof_gel_fill")).toBeGreaterThan(moistureSeal("non_insulated_bare"));
  });
});

describe("installSpeed", () => {
  it("insulated vinyl crimp fastest install", () => {
    expect(installSpeed("insulated_vinyl_crimp")).toBeGreaterThan(installSpeed("heat_shrink_solder"));
  });
});

describe("spliceCost", () => {
  it("waterproof gel fill most expensive", () => {
    expect(spliceCost("waterproof_gel_fill")).toBeGreaterThan(spliceCost("insulated_vinyl_crimp"));
  });
});

describe("insulated", () => {
  it("insulated vinyl crimp is insulated", () => {
    expect(insulated("insulated_vinyl_crimp")).toBe(true);
  });
  it("non insulated bare not insulated", () => {
    expect(insulated("non_insulated_bare")).toBe(false);
  });
});

describe("waterproof", () => {
  it("heat shrink solder is waterproof", () => {
    expect(waterproof("heat_shrink_solder")).toBe(true);
  });
  it("insulated vinyl crimp not waterproof", () => {
    expect(waterproof("insulated_vinyl_crimp")).toBe(false);
  });
});

describe("joinMethod", () => {
  it("heat shrink solder uses solder ring shrink", () => {
    expect(joinMethod("heat_shrink_solder")).toBe("solder_ring_shrink");
  });
});

describe("bestUse", () => {
  it("waterproof gel fill best for underground splice", () => {
    expect(bestUse("waterproof_gel_fill")).toBe("underground_splice");
  });
});

describe("buttSplices", () => {
  it("returns 5 types", () => {
    expect(buttSplices()).toHaveLength(5);
  });
});
