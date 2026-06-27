import { describe, it, expect } from "vitest";
import {
  loadWeight, maneuverEase, rustResistance, tipStability,
  barrowCost, dumpable, motorized, trayMaterial,
  bestJob, wheelbarrows,
} from "../wheelbarrow-calc.js";

describe("loadWeight", () => {
  it("garden cart flat highest load weight", () => {
    expect(loadWeight("garden_cart_flat")).toBeGreaterThan(loadWeight("poly_lightweight"));
  });
});

describe("maneuverEase", () => {
  it("electric power easiest to maneuver", () => {
    expect(maneuverEase("electric_power")).toBeGreaterThan(maneuverEase("garden_cart_flat"));
  });
});

describe("rustResistance", () => {
  it("poly lightweight best rust resistance", () => {
    expect(rustResistance("poly_lightweight")).toBeGreaterThan(rustResistance("steel_traditional"));
  });
});

describe("tipStability", () => {
  it("dual wheel stable most tip stable", () => {
    expect(tipStability("dual_wheel_stable")).toBeGreaterThan(tipStability("poly_lightweight"));
  });
});

describe("barrowCost", () => {
  it("electric power most expensive", () => {
    expect(barrowCost("electric_power")).toBeGreaterThan(barrowCost("poly_lightweight"));
  });
});

describe("dumpable", () => {
  it("steel traditional is dumpable", () => {
    expect(dumpable("steel_traditional")).toBe(true);
  });
  it("garden cart flat is not", () => {
    expect(dumpable("garden_cart_flat")).toBe(false);
  });
});

describe("motorized", () => {
  it("electric power is motorized", () => {
    expect(motorized("electric_power")).toBe(true);
  });
  it("steel traditional is not", () => {
    expect(motorized("steel_traditional")).toBe(false);
  });
});

describe("trayMaterial", () => {
  it("garden cart flat uses steel mesh flatbed", () => {
    expect(trayMaterial("garden_cart_flat")).toBe("steel_mesh_flatbed");
  });
});

describe("bestJob", () => {
  it("electric power for hillside heavy assist", () => {
    expect(bestJob("electric_power")).toBe("hillside_heavy_assist");
  });
});

describe("wheelbarrows", () => {
  it("returns 5 types", () => {
    expect(wheelbarrows()).toHaveLength(5);
  });
});
