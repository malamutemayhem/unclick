import { describe, it, expect } from "vitest";
import {
  friction, fade, wear, noise,
  bpCost, lowDust, forTrack, material,
  bestUse, brakePadTypes,
} from "../brake-pad-type-calc.js";

describe("friction", () => {
  it("carbon carbon highest friction", () => {
    expect(friction("carbon_carbon_composite")).toBeGreaterThan(friction("organic_nao_resin"));
  });
});

describe("fade", () => {
  it("carbon carbon best fade resistance", () => {
    expect(fade("carbon_carbon_composite")).toBeGreaterThan(fade("organic_nao_resin"));
  });
});

describe("wear", () => {
  it("ceramic best wear life", () => {
    expect(wear("ceramic_copper_free")).toBeGreaterThan(wear("sintered_metallic_race"));
  });
});

describe("noise", () => {
  it("organic quietest", () => {
    expect(noise("organic_nao_resin")).toBeGreaterThan(noise("carbon_carbon_composite"));
  });
});

describe("bpCost", () => {
  it("carbon carbon most expensive", () => {
    expect(bpCost("carbon_carbon_composite")).toBeGreaterThan(bpCost("organic_nao_resin"));
  });
});

describe("lowDust", () => {
  it("ceramic is low dust", () => {
    expect(lowDust("ceramic_copper_free")).toBe(true);
  });
  it("sintered not low dust", () => {
    expect(lowDust("sintered_metallic_race")).toBe(false);
  });
});

describe("forTrack", () => {
  it("sintered for track", () => {
    expect(forTrack("sintered_metallic_race")).toBe(true);
  });
  it("organic not for track", () => {
    expect(forTrack("organic_nao_resin")).toBe(false);
  });
});

describe("material", () => {
  it("carbon uses carbon fiber pyrolytic", () => {
    expect(material("carbon_carbon_composite")).toBe("carbon_fiber_pyrolytic_matrix");
  });
});

describe("bestUse", () => {
  it("organic for daily commuter", () => {
    expect(bestUse("organic_nao_resin")).toBe("daily_commuter_quiet_low_dust");
  });
});

describe("brakePadTypes", () => {
  it("returns 5 types", () => {
    expect(brakePadTypes()).toHaveLength(5);
  });
});
