import { describe, it, expect } from "vitest";
import {
  clinkerQuality, throughput, fuelEfficiency, emissionControl,
  ckCost, continuous, forPortland, kilnConfig,
  bestUse, cementKilnTypes,
} from "../cement-kiln-calc.js";

describe("clinkerQuality", () => {
  it("precalciner best clinker quality", () => {
    expect(clinkerQuality("precalciner")).toBeGreaterThan(clinkerQuality("shaft_kiln"));
  });
});

describe("throughput", () => {
  it("precalciner highest throughput", () => {
    expect(throughput("precalciner")).toBeGreaterThan(throughput("shaft_kiln"));
  });
});

describe("fuelEfficiency", () => {
  it("precalciner best fuel efficiency", () => {
    expect(fuelEfficiency("precalciner")).toBeGreaterThan(fuelEfficiency("wet_process"));
  });
});

describe("emissionControl", () => {
  it("precalciner best emission control", () => {
    expect(emissionControl("precalciner")).toBeGreaterThan(emissionControl("shaft_kiln"));
  });
});

describe("ckCost", () => {
  it("precalciner most expensive", () => {
    expect(ckCost("precalciner")).toBeGreaterThan(ckCost("shaft_kiln"));
  });
});

describe("continuous", () => {
  it("dry process is continuous", () => {
    expect(continuous("dry_process")).toBe(true);
  });
  it("shaft kiln not continuous", () => {
    expect(continuous("shaft_kiln")).toBe(false);
  });
});

describe("forPortland", () => {
  it("dry process for portland", () => {
    expect(forPortland("dry_process")).toBe(true);
  });
  it("shaft kiln not for portland", () => {
    expect(forPortland("shaft_kiln")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("semi dry uses lepol grate nodule preheater", () => {
    expect(kilnConfig("semi_dry")).toBe("semi_dry_cement_kiln_lepol_grate_nodule_preheater_moderate");
  });
});

describe("bestUse", () => {
  it("wet process for older cement plant high moisture", () => {
    expect(bestUse("wet_process")).toBe("older_cement_plant_wet_kiln_high_moisture_raw_material_reliable");
  });
});

describe("cementKilnTypes", () => {
  it("returns 5 types", () => {
    expect(cementKilnTypes()).toHaveLength(5);
  });
});
