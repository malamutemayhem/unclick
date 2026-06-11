import { describe, it, expect } from "vitest";
import {
  damping, displacement, vertical, durability,
  siCost, selfCentering, forHighRise, mechanism,
  bestUse, seismicIsolatorTypes,
} from "../seismic-isolator-calc.js";

describe("damping", () => {
  it("lrb highest damping", () => {
    expect(damping("lead_rubber_bearing_lrb")).toBeGreaterThan(damping("elastomeric_natural_rubber"));
  });
});

describe("displacement", () => {
  it("triple pendulum highest displacement", () => {
    expect(displacement("triple_pendulum_tps")).toBeGreaterThan(displacement("elastomeric_natural_rubber"));
  });
});

describe("vertical", () => {
  it("triple pendulum highest vertical", () => {
    expect(vertical("triple_pendulum_tps")).toBeGreaterThan(vertical("elastomeric_natural_rubber"));
  });
});

describe("durability", () => {
  it("friction pendulum most durable", () => {
    expect(durability("friction_pendulum_fps")).toBeGreaterThan(durability("elastomeric_natural_rubber"));
  });
});

describe("siCost", () => {
  it("triple pendulum most expensive", () => {
    expect(siCost("triple_pendulum_tps")).toBeGreaterThan(siCost("elastomeric_natural_rubber"));
  });
});

describe("selfCentering", () => {
  it("all types self centering", () => {
    expect(selfCentering("lead_rubber_bearing_lrb")).toBe(true);
  });
});

describe("forHighRise", () => {
  it("lrb for high rise", () => {
    expect(forHighRise("lead_rubber_bearing_lrb")).toBe(true);
  });
  it("elastomeric not for high rise", () => {
    expect(forHighRise("elastomeric_natural_rubber")).toBe(false);
  });
});

describe("mechanism", () => {
  it("fps uses concave surface", () => {
    expect(mechanism("friction_pendulum_fps")).toBe("concave_surface_slider_gravity");
  });
});

describe("bestUse", () => {
  it("triple pendulum for multi hazard", () => {
    expect(bestUse("triple_pendulum_tps")).toBe("high_importance_multi_hazard");
  });
});

describe("seismicIsolatorTypes", () => {
  it("returns 5 types", () => {
    expect(seismicIsolatorTypes()).toHaveLength(5);
  });
});
