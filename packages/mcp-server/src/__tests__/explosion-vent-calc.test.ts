import { describe, it, expect } from "vitest";
import {
  ventArea, response, reusability, safety,
  evCost, flameless, forIndoor, mechanism,
  bestUse, explosionVentTypes,
} from "../explosion-vent-calc.js";

describe("ventArea", () => {
  it("domed composite largest vent area", () => {
    expect(ventArea("domed_composite_burst")).toBeGreaterThan(ventArea("explosion_isolation_valve"));
  });
});

describe("response", () => {
  it("domed composite and isolation valve fastest response", () => {
    expect(response("domed_composite_burst")).toBeGreaterThanOrEqual(response("explosion_isolation_valve"));
  });
});

describe("reusability", () => {
  it("indoor recoilless most reusable", () => {
    expect(reusability("indoor_recoilless")).toBeGreaterThan(reusability("domed_composite_burst"));
  });
});

describe("safety", () => {
  it("flameless quench highest safety", () => {
    expect(safety("flameless_quench_filter")).toBeGreaterThan(safety("flat_panel_hinged"));
  });
});

describe("evCost", () => {
  it("isolation valve most expensive", () => {
    expect(evCost("explosion_isolation_valve")).toBeGreaterThan(evCost("flat_panel_hinged"));
  });
});

describe("flameless", () => {
  it("flameless quench is flameless", () => {
    expect(flameless("flameless_quench_filter")).toBe(true);
  });
  it("flat panel not flameless", () => {
    expect(flameless("flat_panel_hinged")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("flameless quench for indoor", () => {
    expect(forIndoor("flameless_quench_filter")).toBe(true);
  });
  it("domed composite not for indoor", () => {
    expect(forIndoor("domed_composite_burst")).toBe(false);
  });
});

describe("mechanism", () => {
  it("isolation valve uses fast acting gate", () => {
    expect(mechanism("explosion_isolation_valve")).toBe("fast_acting_gate_pinch_isolate");
  });
});

describe("bestUse", () => {
  it("flameless quench for indoor dust collector", () => {
    expect(bestUse("flameless_quench_filter")).toBe("indoor_dust_collector_filter_safe");
  });
});

describe("explosionVentTypes", () => {
  it("returns 5 types", () => {
    expect(explosionVentTypes()).toHaveLength(5);
  });
});
