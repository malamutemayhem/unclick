import { describe, it, expect } from "vitest";
import {
  spreading, thickness, maxHeatFlux, reliability,
  vcCost, bendable, forGpu, process,
  bestUse, vaporChambers,
} from "../vapor-chamber-calc.js";

describe("spreading", () => {
  it("two phase immersion vc best spreading", () => {
    expect(spreading("two_phase_immersion_vc")).toBeGreaterThan(spreading("ultra_thin_sub_mm"));
  });
});

describe("thickness", () => {
  it("ultra thin sub mm thinnest", () => {
    expect(thickness("ultra_thin_sub_mm")).toBeGreaterThan(thickness("two_phase_immersion_vc"));
  });
});

describe("maxHeatFlux", () => {
  it("two phase immersion vc highest heat flux", () => {
    expect(maxHeatFlux("two_phase_immersion_vc")).toBeGreaterThan(maxHeatFlux("ultra_thin_sub_mm"));
  });
});

describe("reliability", () => {
  it("stamped copper thin most reliable", () => {
    expect(reliability("stamped_copper_thin")).toBeGreaterThan(reliability("3d_printed_additive"));
  });
});

describe("vcCost", () => {
  it("3d printed additive most expensive", () => {
    expect(vcCost("3d_printed_additive")).toBeGreaterThan(vcCost("stamped_copper_thin"));
  });
});

describe("bendable", () => {
  it("ultra thin sub mm is bendable", () => {
    expect(bendable("ultra_thin_sub_mm")).toBe(true);
  });
  it("stamped copper thin not bendable", () => {
    expect(bendable("stamped_copper_thin")).toBe(false);
  });
});

describe("forGpu", () => {
  it("stamped copper thin for gpu", () => {
    expect(forGpu("stamped_copper_thin")).toBe(true);
  });
  it("ultra thin sub mm not for gpu", () => {
    expect(forGpu("ultra_thin_sub_mm")).toBe(false);
  });
});

describe("process", () => {
  it("ultra thin sub mm uses electroplated copper foil", () => {
    expect(process("ultra_thin_sub_mm")).toBe("electroplated_copper_foil");
  });
});

describe("bestUse", () => {
  it("two phase immersion vc best for ai chip extreme tdp", () => {
    expect(bestUse("two_phase_immersion_vc")).toBe("ai_chip_extreme_tdp");
  });
});

describe("vaporChambers", () => {
  it("returns 5 types", () => {
    expect(vaporChambers()).toHaveLength(5);
  });
});
