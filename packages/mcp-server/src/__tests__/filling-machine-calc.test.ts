import { describe, it, expect } from "vitest";
import {
  accuracy, speed, versatility, cleanability,
  fmCost, aseptic, forViscous, mechanism,
  bestUse, fillingMachineTypes,
} from "../filling-machine-calc.js";

describe("accuracy", () => {
  it("net weight most accurate", () => {
    expect(accuracy("net_weight_scale")).toBeGreaterThan(accuracy("gravity_fill_liquid"));
  });
});

describe("speed", () => {
  it("gravity fill fastest", () => {
    expect(speed("gravity_fill_liquid")).toBeGreaterThan(speed("piston_fill_viscous"));
  });
});

describe("versatility", () => {
  it("net weight most versatile", () => {
    expect(versatility("net_weight_scale")).toBeGreaterThan(versatility("vacuum_fill_bottle"));
  });
});

describe("cleanability", () => {
  it("vacuum fill easy to clean", () => {
    expect(cleanability("vacuum_fill_bottle")).toBeGreaterThan(cleanability("auger_fill_powder"));
  });
});

describe("fmCost", () => {
  it("net weight most expensive", () => {
    expect(fmCost("net_weight_scale")).toBeGreaterThan(fmCost("gravity_fill_liquid"));
  });
});

describe("aseptic", () => {
  it("vacuum fill is aseptic", () => {
    expect(aseptic("vacuum_fill_bottle")).toBe(true);
  });
  it("gravity fill not aseptic", () => {
    expect(aseptic("gravity_fill_liquid")).toBe(false);
  });
});

describe("forViscous", () => {
  it("piston fill for viscous", () => {
    expect(forViscous("piston_fill_viscous")).toBe(true);
  });
  it("gravity fill not for viscous", () => {
    expect(forViscous("gravity_fill_liquid")).toBe(false);
  });
});

describe("mechanism", () => {
  it("auger uses screw dose funnel", () => {
    expect(mechanism("auger_fill_powder")).toBe("auger_screw_dose_funnel");
  });
});

describe("bestUse", () => {
  it("piston for sauce and paste", () => {
    expect(bestUse("piston_fill_viscous")).toBe("sauce_cream_paste_chunky_fill");
  });
});

describe("fillingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(fillingMachineTypes()).toHaveLength(5);
  });
});
