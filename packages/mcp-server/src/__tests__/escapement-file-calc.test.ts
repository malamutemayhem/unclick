import { describe, it, expect } from "vitest";
import {
  cutPrecision, finishSmooth, reachAccess, controlFeel,
  fileCost, deadSmooth, forPallets, crossSection,
  bestUse, escapementFiles,
} from "../escapement-file-calc.js";

describe("cutPrecision", () => {
  it("pallet flat fine most precise", () => {
    expect(cutPrecision("pallet_flat_fine")).toBeGreaterThan(cutPrecision("burnish_dead_smooth"));
  });
});

describe("finishSmooth", () => {
  it("burnish dead smooth smoothest", () => {
    expect(finishSmooth("burnish_dead_smooth")).toBeGreaterThan(finishSmooth("slot_knife_thin"));
  });
});

describe("reachAccess", () => {
  it("slot knife thin best reach", () => {
    expect(reachAccess("slot_knife_thin")).toBeGreaterThan(reachAccess("pallet_flat_fine"));
  });
});

describe("controlFeel", () => {
  it("pallet flat fine best control", () => {
    expect(controlFeel("pallet_flat_fine")).toBeGreaterThan(controlFeel("slot_knife_thin"));
  });
});

describe("fileCost", () => {
  it("burnish dead smooth most expensive", () => {
    expect(fileCost("burnish_dead_smooth")).toBeGreaterThan(fileCost("crossing_half_round"));
  });
});

describe("deadSmooth", () => {
  it("burnish dead smooth is dead smooth", () => {
    expect(deadSmooth("burnish_dead_smooth")).toBe(true);
  });
  it("pivot round smooth not dead smooth", () => {
    expect(deadSmooth("pivot_round_smooth")).toBe(false);
  });
});

describe("forPallets", () => {
  it("pallet flat fine is for pallets", () => {
    expect(forPallets("pallet_flat_fine")).toBe(true);
  });
  it("pivot round smooth not for pallets", () => {
    expect(forPallets("pivot_round_smooth")).toBe(false);
  });
});

describe("crossSection", () => {
  it("crossing half round uses half round dual", () => {
    expect(crossSection("crossing_half_round")).toBe("half_round_dual");
  });
});

describe("bestUse", () => {
  it("burnish dead smooth best for final surface burnish", () => {
    expect(bestUse("burnish_dead_smooth")).toBe("final_surface_burnish");
  });
});

describe("escapementFiles", () => {
  it("returns 5 types", () => {
    expect(escapementFiles()).toHaveLength(5);
  });
});
