import { describe, it, expect } from "vitest";
import {
  resilience, efficiency, renewable, complexity,
  mgCost, islanding, forRemote, anchor,
  bestUse, microgridTypes,
} from "../microgrid-calc.js";

describe("resilience", () => {
  it("military most resilient", () => {
    expect(resilience("military_resilient_base")).toBeGreaterThan(resilience("community_solar_plus"));
  });
});

describe("efficiency", () => {
  it("chp most efficient", () => {
    expect(efficiency("industrial_chp_anchor")).toBeGreaterThan(efficiency("remote_diesel_hybrid"));
  });
});

describe("renewable", () => {
  it("community most renewable", () => {
    expect(renewable("community_solar_plus")).toBeGreaterThan(renewable("industrial_chp_anchor"));
  });
});

describe("complexity", () => {
  it("military most complex", () => {
    expect(complexity("military_resilient_base")).toBeGreaterThan(complexity("remote_diesel_hybrid"));
  });
});

describe("mgCost", () => {
  it("military most expensive", () => {
    expect(mgCost("military_resilient_base")).toBeGreaterThan(mgCost("remote_diesel_hybrid"));
  });
});

describe("islanding", () => {
  it("campus can island", () => {
    expect(islanding("campus_islanding_capable")).toBe(true);
  });
  it("community cannot island", () => {
    expect(islanding("community_solar_plus")).toBe(false);
  });
});

describe("forRemote", () => {
  it("diesel hybrid for remote", () => {
    expect(forRemote("remote_diesel_hybrid")).toBe(true);
  });
  it("campus not remote", () => {
    expect(forRemote("campus_islanding_capable")).toBe(false);
  });
});

describe("anchor", () => {
  it("chp uses gas turbine", () => {
    expect(anchor("industrial_chp_anchor")).toBe("chp_gas_turbine_heat_recover");
  });
});

describe("bestUse", () => {
  it("military for dod base", () => {
    expect(bestUse("military_resilient_base")).toBe("forward_operating_base_dod");
  });
});

describe("microgridTypes", () => {
  it("returns 5 types", () => {
    expect(microgridTypes()).toHaveLength(5);
  });
});
