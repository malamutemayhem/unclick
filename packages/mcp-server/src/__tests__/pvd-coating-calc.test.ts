import { describe, it, expect } from "vitest";
import {
  adhesion, hardness, uniformity, temperature,
  pvCost, lowTemp, forCuttingTool, target,
  bestUse, pvdCoatingTypes,
} from "../pvd-coating-calc.js";

describe("adhesion", () => {
  it("hipims best adhesion", () => {
    expect(adhesion("hipims_high_power")).toBeGreaterThan(adhesion("evaporation_e_beam"));
  });
});

describe("hardness", () => {
  it("arc cathodic hardest coating", () => {
    expect(hardness("arc_cathodic_tin")).toBeGreaterThan(hardness("evaporation_e_beam"));
  });
});

describe("uniformity", () => {
  it("hipims most uniform", () => {
    expect(uniformity("hipims_high_power")).toBeGreaterThan(uniformity("arc_cathodic_tin"));
  });
});

describe("temperature", () => {
  it("sputtering higher temp rating", () => {
    expect(temperature("sputtering_magnetron_dc")).toBeGreaterThan(temperature("evaporation_e_beam"));
  });
});

describe("pvCost", () => {
  it("hipims most expensive", () => {
    expect(pvCost("hipims_high_power")).toBeGreaterThan(pvCost("evaporation_e_beam"));
  });
});

describe("lowTemp", () => {
  it("sputtering is low temp", () => {
    expect(lowTemp("sputtering_magnetron_dc")).toBe(true);
  });
  it("arc cathodic not low temp", () => {
    expect(lowTemp("arc_cathodic_tin")).toBe(false);
  });
});

describe("forCuttingTool", () => {
  it("arc cathodic for cutting tool", () => {
    expect(forCuttingTool("arc_cathodic_tin")).toBe(true);
  });
  it("evaporation not for cutting tool", () => {
    expect(forCuttingTool("evaporation_e_beam")).toBe(false);
  });
});

describe("target", () => {
  it("hipims uses high power pulse magnetron", () => {
    expect(target("hipims_high_power")).toBe("high_power_pulse_magnetron");
  });
});

describe("bestUse", () => {
  it("evaporation for optical lens", () => {
    expect(bestUse("evaporation_e_beam")).toBe("optical_lens_mirror_anti_reflect");
  });
});

describe("pvdCoatingTypes", () => {
  it("returns 5 types", () => {
    expect(pvdCoatingTypes()).toHaveLength(5);
  });
});
