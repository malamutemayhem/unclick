import { describe, it, expect } from "vitest";
import {
  capacity, trapSeal, aesthetic, maintenance,
  dtCost, trapped, forInterior, grate,
  bestUse, drainTypeTypes,
} from "../drain-type-calc.js";

describe("capacity", () => {
  it("area drain highest capacity", () => {
    expect(capacity("area_drain_catch_basin")).toBeGreaterThan(capacity("cleanout_access_plug"));
  });
});

describe("trapSeal", () => {
  it("floor drain best trap seal", () => {
    expect(trapSeal("floor_drain_cast_iron_trap")).toBeGreaterThan(trapSeal("roof_drain_dome_strainer"));
  });
});

describe("aesthetic", () => {
  it("trench drain best aesthetic", () => {
    expect(aesthetic("trench_drain_linear_channel")).toBeGreaterThan(aesthetic("area_drain_catch_basin"));
  });
});

describe("maintenance", () => {
  it("cleanout best maintenance", () => {
    expect(maintenance("cleanout_access_plug")).toBeGreaterThan(maintenance("area_drain_catch_basin"));
  });
});

describe("dtCost", () => {
  it("trench drain most expensive", () => {
    expect(dtCost("trench_drain_linear_channel")).toBeGreaterThan(dtCost("cleanout_access_plug"));
  });
});

describe("trapped", () => {
  it("floor drain is trapped", () => {
    expect(trapped("floor_drain_cast_iron_trap")).toBe(true);
  });
  it("trench drain not trapped", () => {
    expect(trapped("trench_drain_linear_channel")).toBe(false);
  });
});

describe("forInterior", () => {
  it("floor drain for interior", () => {
    expect(forInterior("floor_drain_cast_iron_trap")).toBe(true);
  });
  it("roof drain not for interior", () => {
    expect(forInterior("roof_drain_dome_strainer")).toBe(false);
  });
});

describe("grate", () => {
  it("cleanout uses brass screw plug", () => {
    expect(grate("cleanout_access_plug")).toBe("brass_screw_plug_flush_cover");
  });
});

describe("bestUse", () => {
  it("trench drain for commercial kitchen", () => {
    expect(bestUse("trench_drain_linear_channel")).toBe("commercial_kitchen_loading_dock");
  });
});

describe("drainTypeTypes", () => {
  it("returns 5 types", () => {
    expect(drainTypeTypes()).toHaveLength(5);
  });
});
