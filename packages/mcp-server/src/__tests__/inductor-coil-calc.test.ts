import { describe, it, expect } from "vitest";
import {
  inductance, qFactor, currentHandle, sizeCompact,
  coilCost, shielded, forRf, coreType,
  bestUse, inductorCoils,
} from "../inductor-coil-calc.js";

describe("inductance", () => {
  it("toroid ring core highest inductance", () => {
    expect(inductance("toroid_ring_core")).toBeGreaterThan(inductance("smd_chip_inductor"));
  });
});

describe("qFactor", () => {
  it("air core wound highest q factor", () => {
    expect(qFactor("air_core_wound")).toBeGreaterThan(qFactor("iron_powder_shielded"));
  });
});

describe("currentHandle", () => {
  it("iron powder shielded highest current handle", () => {
    expect(currentHandle("iron_powder_shielded")).toBeGreaterThan(currentHandle("smd_chip_inductor"));
  });
});

describe("sizeCompact", () => {
  it("smd chip inductor most compact", () => {
    expect(sizeCompact("smd_chip_inductor")).toBeGreaterThan(sizeCompact("air_core_wound"));
  });
});

describe("coilCost", () => {
  it("iron powder shielded most expensive", () => {
    expect(coilCost("iron_powder_shielded")).toBeGreaterThan(coilCost("ferrite_core_axial"));
  });
});

describe("shielded", () => {
  it("toroid ring core is shielded", () => {
    expect(shielded("toroid_ring_core")).toBe(true);
  });
  it("air core wound not shielded", () => {
    expect(shielded("air_core_wound")).toBe(false);
  });
});

describe("forRf", () => {
  it("air core wound is for rf", () => {
    expect(forRf("air_core_wound")).toBe(true);
  });
  it("ferrite core axial not for rf", () => {
    expect(forRf("ferrite_core_axial")).toBe(false);
  });
});

describe("coreType", () => {
  it("smd chip inductor uses multilayer ceramic", () => {
    expect(coreType("smd_chip_inductor")).toBe("multilayer_ceramic");
  });
});

describe("bestUse", () => {
  it("toroid ring core best for power supply filter", () => {
    expect(bestUse("toroid_ring_core")).toBe("power_supply_filter");
  });
});

describe("inductorCoils", () => {
  it("returns 5 types", () => {
    expect(inductorCoils()).toHaveLength(5);
  });
});
