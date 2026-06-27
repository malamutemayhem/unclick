import { describe, it, expect } from "vitest";
import {
  firingUniformity, throughput, energyEfficiency, emissionControl,
  bkCost, continuous, forHighQuality, kilnConfig,
  bestUse, brickKilnTypes,
} from "../brick-kiln-calc.js";

describe("firingUniformity", () => {
  it("tunnel kiln brick best firing uniformity", () => {
    expect(firingUniformity("tunnel_kiln_brick")).toBeGreaterThan(firingUniformity("clamp_kiln"));
  });
});

describe("throughput", () => {
  it("tunnel kiln brick highest throughput", () => {
    expect(throughput("tunnel_kiln_brick")).toBeGreaterThan(throughput("clamp_kiln"));
  });
});

describe("energyEfficiency", () => {
  it("tunnel kiln brick best energy efficiency", () => {
    expect(energyEfficiency("tunnel_kiln_brick")).toBeGreaterThan(energyEfficiency("clamp_kiln"));
  });
});

describe("emissionControl", () => {
  it("tunnel kiln brick best emission control", () => {
    expect(emissionControl("tunnel_kiln_brick")).toBeGreaterThan(emissionControl("clamp_kiln"));
  });
});

describe("bkCost", () => {
  it("tunnel kiln brick most expensive", () => {
    expect(bkCost("tunnel_kiln_brick")).toBeGreaterThan(bkCost("clamp_kiln"));
  });
});

describe("continuous", () => {
  it("hoffman kiln is continuous", () => {
    expect(continuous("hoffman_kiln")).toBe(true);
  });
  it("clamp kiln not continuous", () => {
    expect(continuous("clamp_kiln")).toBe(false);
  });
});

describe("forHighQuality", () => {
  it("tunnel kiln brick for high quality", () => {
    expect(forHighQuality("tunnel_kiln_brick")).toBe(true);
  });
  it("clamp kiln not for high quality", () => {
    expect(forHighQuality("clamp_kiln")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("zigzag kiln uses serpentine fire path draft preheat improve fuel use", () => {
    expect(kilnConfig("zigzag_kiln")).toBe("zigzag_kiln_serpentine_fire_path_draft_preheat_improve_fuel_use");
  });
});

describe("bestUse", () => {
  it("vertical shaft for developing region compact efficient", () => {
    expect(bestUse("vertical_shaft")).toBe("developing_region_vertical_shaft_brick_kiln_compact_efficient");
  });
});

describe("brickKilnTypes", () => {
  it("returns 5 types", () => {
    expect(brickKilnTypes()).toHaveLength(5);
  });
});
