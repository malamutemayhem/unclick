import { describe, it, expect } from "vitest";
import {
  precision, speed, surfaceFinish, complexity,
  moCost, hardMaterial, forPrototype, cutting,
  bestUse, machiningOps,
} from "../machining-op-calc.js";

describe("precision", () => {
  it("edm wire highest precision", () => {
    expect(precision("edm_wire_spark")).toBeGreaterThan(precision("cnc_turning_lathe"));
  });
});

describe("speed", () => {
  it("cnc turning fastest", () => {
    expect(speed("cnc_turning_lathe")).toBeGreaterThan(speed("edm_wire_spark"));
  });
});

describe("surfaceFinish", () => {
  it("grinding best surface finish", () => {
    expect(surfaceFinish("grinding_surface_flat")).toBeGreaterThan(surfaceFinish("cnc_turning_lathe"));
  });
});

describe("complexity", () => {
  it("five axis most complex", () => {
    expect(complexity("five_axis_simultaneous")).toBeGreaterThan(complexity("grinding_surface_flat"));
  });
});

describe("moCost", () => {
  it("five axis most expensive", () => {
    expect(moCost("five_axis_simultaneous")).toBeGreaterThan(moCost("cnc_turning_lathe"));
  });
});

describe("hardMaterial", () => {
  it("edm handles hard material", () => {
    expect(hardMaterial("edm_wire_spark")).toBe(true);
  });
  it("cnc turning not for hard material", () => {
    expect(hardMaterial("cnc_turning_lathe")).toBe(false);
  });
});

describe("forPrototype", () => {
  it("cnc milling for prototype", () => {
    expect(forPrototype("cnc_milling_3axis")).toBe(true);
  });
  it("edm not for prototype", () => {
    expect(forPrototype("edm_wire_spark")).toBe(false);
  });
});

describe("cutting", () => {
  it("grinding uses abrasive wheel micro chip", () => {
    expect(cutting("grinding_surface_flat")).toBe("abrasive_wheel_micro_chip");
  });
});

describe("bestUse", () => {
  it("five axis best for impeller blade", () => {
    expect(bestUse("five_axis_simultaneous")).toBe("impeller_blade_freeform_surface");
  });
});

describe("machiningOps", () => {
  it("returns 5 types", () => {
    expect(machiningOps()).toHaveLength(5);
  });
});
