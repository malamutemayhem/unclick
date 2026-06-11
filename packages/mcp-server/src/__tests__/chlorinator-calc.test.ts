import { describe, it, expect } from "vitest";
import {
  dosing, safety, capacity, residual,
  clCost, onSiteGen, forMunicipal, method,
  bestUse, chlorinatorTypes,
} from "../chlorinator-calc.js";

describe("dosing", () => {
  it("gas cylinder best dosing", () => {
    expect(dosing("gas_cylinder_vacuum")).toBeGreaterThan(dosing("calcium_hypochlorite_tablet"));
  });
});

describe("safety", () => {
  it("tablet safest", () => {
    expect(safety("calcium_hypochlorite_tablet")).toBeGreaterThan(safety("gas_cylinder_vacuum"));
  });
});

describe("capacity", () => {
  it("gas cylinder highest capacity", () => {
    expect(capacity("gas_cylinder_vacuum")).toBeGreaterThan(capacity("calcium_hypochlorite_tablet"));
  });
});

describe("residual", () => {
  it("uv chloramine best residual", () => {
    expect(residual("uv_chloramine_advanced")).toBeGreaterThan(residual("calcium_hypochlorite_tablet"));
  });
});

describe("clCost", () => {
  it("uv chloramine most expensive", () => {
    expect(clCost("uv_chloramine_advanced")).toBeGreaterThan(clCost("calcium_hypochlorite_tablet"));
  });
});

describe("onSiteGen", () => {
  it("electrolytic is on site gen", () => {
    expect(onSiteGen("on_site_electrolytic")).toBe(true);
  });
  it("gas cylinder not on site gen", () => {
    expect(onSiteGen("gas_cylinder_vacuum")).toBe(false);
  });
});

describe("forMunicipal", () => {
  it("gas cylinder for municipal", () => {
    expect(forMunicipal("gas_cylinder_vacuum")).toBe(true);
  });
  it("tablet not municipal", () => {
    expect(forMunicipal("calcium_hypochlorite_tablet")).toBe(false);
  });
});

describe("method", () => {
  it("electrolytic uses brine electrolysis", () => {
    expect(method("on_site_electrolytic")).toBe("brine_electrolysis_naclo_onsite");
  });
});

describe("bestUse", () => {
  it("gas for large municipal", () => {
    expect(bestUse("gas_cylinder_vacuum")).toBe("large_municipal_water_plant");
  });
});

describe("chlorinatorTypes", () => {
  it("returns 5 types", () => {
    expect(chlorinatorTypes()).toHaveLength(5);
  });
});
