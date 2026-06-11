import { describe, it, expect } from "vitest";
import {
  transferEfficiency, finishQuality, speed, materialWaste,
  psCost, electrostatic, forAutomotive, method,
  bestUse, paintingSystemTypes,
} from "../painting-system-calc.js";

describe("transferEfficiency", () => {
  it("dip coat e coat best transfer efficiency", () => {
    expect(transferEfficiency("dip_coat_e_coat")).toBeGreaterThan(transferEfficiency("airless_spray"));
  });
});

describe("finishQuality", () => {
  it("electrostatic bell best finish quality", () => {
    expect(finishQuality("electrostatic_bell")).toBeGreaterThan(finishQuality("airless_spray"));
  });
});

describe("speed", () => {
  it("airless spray fastest", () => {
    expect(speed("airless_spray")).toBeGreaterThan(speed("dip_coat_e_coat"));
  });
});

describe("materialWaste", () => {
  it("airless spray most waste", () => {
    expect(materialWaste("airless_spray")).toBeGreaterThan(materialWaste("powder_coat_gun"));
  });
});

describe("psCost", () => {
  it("electrostatic bell most expensive", () => {
    expect(psCost("electrostatic_bell")).toBeGreaterThan(psCost("airless_spray"));
  });
});

describe("electrostatic", () => {
  it("electrostatic bell is electrostatic", () => {
    expect(electrostatic("electrostatic_bell")).toBe(true);
  });
  it("airless spray not electrostatic", () => {
    expect(electrostatic("airless_spray")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("electrostatic bell for automotive", () => {
    expect(forAutomotive("electrostatic_bell")).toBe(true);
  });
  it("airless spray not for automotive", () => {
    expect(forAutomotive("airless_spray")).toBe(false);
  });
});

describe("method", () => {
  it("powder coat uses corona or tribo charge", () => {
    expect(method("powder_coat_gun")).toBe("corona_or_tribo_charge_dry_powder_oven_cure_fuse");
  });
});

describe("bestUse", () => {
  it("airless spray for structural steel", () => {
    expect(bestUse("airless_spray")).toBe("structural_steel_ship_hull_bridge_heavy_coating");
  });
});

describe("paintingSystemTypes", () => {
  it("returns 5 types", () => {
    expect(paintingSystemTypes()).toHaveLength(5);
  });
});
