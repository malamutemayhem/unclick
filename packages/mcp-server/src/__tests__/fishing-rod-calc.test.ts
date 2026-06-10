import { describe, it, expect } from "vitest";
import {
  sensitivity, castRange, rodPower, portability,
  rodCost, twopiece, corkGrip, blankMaterial,
  bestTarget, fishingRods,
} from "../fishing-rod-calc.js";

describe("sensitivity", () => {
  it("ice short most sensitive", () => {
    expect(sensitivity("ice_short")).toBeGreaterThan(sensitivity("surf_long"));
  });
});

describe("castRange", () => {
  it("surf long longest cast range", () => {
    expect(castRange("surf_long")).toBeGreaterThan(castRange("ice_short"));
  });
});

describe("rodPower", () => {
  it("casting heavy most power", () => {
    expect(rodPower("casting_heavy")).toBeGreaterThan(rodPower("fly_rod"));
  });
});

describe("portability", () => {
  it("ice short most portable", () => {
    expect(portability("ice_short")).toBeGreaterThan(portability("surf_long"));
  });
});

describe("rodCost", () => {
  it("fly rod most expensive", () => {
    expect(rodCost("fly_rod")).toBeGreaterThan(rodCost("ice_short"));
  });
});

describe("twopiece", () => {
  it("spinning medium is two piece", () => {
    expect(twopiece("spinning_medium")).toBe(true);
  });
  it("ice short is not", () => {
    expect(twopiece("ice_short")).toBe(false);
  });
});

describe("corkGrip", () => {
  it("fly rod has cork grip", () => {
    expect(corkGrip("fly_rod")).toBe(true);
  });
  it("casting heavy does not", () => {
    expect(corkGrip("casting_heavy")).toBe(false);
  });
});

describe("blankMaterial", () => {
  it("fly rod uses high modulus graphite fast", () => {
    expect(blankMaterial("fly_rod")).toBe("high_modulus_graphite_fast");
  });
});

describe("bestTarget", () => {
  it("ice short for perch crappie ice hole", () => {
    expect(bestTarget("ice_short")).toBe("perch_crappie_ice_hole");
  });
});

describe("fishingRods", () => {
  it("returns 5 types", () => {
    expect(fishingRods()).toHaveLength(5);
  });
});
