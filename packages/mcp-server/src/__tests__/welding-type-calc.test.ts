import { describe, it, expect } from "vitest";
import {
  depositRate, weldQuality, skillRequired,
  equipmentCost, versatility, requiresShieldingGas,
  outdoorCapable, bestForMaterial, heatInputLevel, weldingTypes,
} from "../welding-type-calc.js";

describe("depositRate", () => {
  it("flux_cored highest deposit rate", () => {
    expect(depositRate("flux_cored")).toBeGreaterThan(
      depositRate("tig")
    );
  });
});

describe("weldQuality", () => {
  it("tig highest quality", () => {
    expect(weldQuality("tig")).toBeGreaterThan(
      weldQuality("stick")
    );
  });
});

describe("skillRequired", () => {
  it("tig requires most skill", () => {
    expect(skillRequired("tig")).toBeGreaterThan(
      skillRequired("mig")
    );
  });
});

describe("equipmentCost", () => {
  it("laser most expensive equipment", () => {
    expect(equipmentCost("laser")).toBeGreaterThan(
      equipmentCost("stick")
    );
  });
});

describe("versatility", () => {
  it("tig most versatile", () => {
    expect(versatility("tig")).toBeGreaterThan(
      versatility("laser")
    );
  });
});

describe("requiresShieldingGas", () => {
  it("mig requires shielding gas", () => {
    expect(requiresShieldingGas("mig")).toBe(true);
  });
  it("stick does not", () => {
    expect(requiresShieldingGas("stick")).toBe(false);
  });
});

describe("outdoorCapable", () => {
  it("stick works outdoors", () => {
    expect(outdoorCapable("stick")).toBe(true);
  });
  it("tig does not", () => {
    expect(outdoorCapable("tig")).toBe(false);
  });
});

describe("bestForMaterial", () => {
  it("tig best for stainless and aluminum", () => {
    expect(bestForMaterial("tig")).toBe("stainless_aluminum");
  });
});

describe("heatInputLevel", () => {
  it("laser has very low focused heat", () => {
    expect(heatInputLevel("laser")).toBe("very_low_focused");
  });
});

describe("weldingTypes", () => {
  it("returns 5 types", () => {
    expect(weldingTypes()).toHaveLength(5);
  });
});
