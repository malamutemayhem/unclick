import { describe, it, expect } from "vitest";
import {
  dewpoint, capacity, energy, maintenance,
  adCost, regenerative, forInstrument, drying,
  bestUse, airDryerTypes,
} from "../air-dryer-calc.js";

describe("dewpoint", () => {
  it("desiccant heatless best dewpoint", () => {
    expect(dewpoint("desiccant_heatless_regen")).toBeGreaterThan(dewpoint("deliquescent_salt_tablet"));
  });
});

describe("capacity", () => {
  it("refrigerated highest capacity", () => {
    expect(capacity("refrigerated_cycling_heat")).toBeGreaterThan(capacity("membrane_hollow_fiber"));
  });
});

describe("energy", () => {
  it("desiccant heatless uses more energy", () => {
    expect(energy("desiccant_heatless_regen")).toBeGreaterThan(energy("deliquescent_salt_tablet"));
  });
});

describe("maintenance", () => {
  it("deliquescent highest maintenance", () => {
    expect(maintenance("deliquescent_salt_tablet")).toBeGreaterThan(maintenance("membrane_hollow_fiber"));
  });
});

describe("adCost", () => {
  it("desiccant heated most expensive", () => {
    expect(adCost("desiccant_heated_purge")).toBeGreaterThan(adCost("deliquescent_salt_tablet"));
  });
});

describe("regenerative", () => {
  it("desiccant heatless is regenerative", () => {
    expect(regenerative("desiccant_heatless_regen")).toBe(true);
  });
  it("refrigerated not regenerative", () => {
    expect(regenerative("refrigerated_cycling_heat")).toBe(false);
  });
});

describe("forInstrument", () => {
  it("desiccant heatless for instrument", () => {
    expect(forInstrument("desiccant_heatless_regen")).toBe(true);
  });
  it("membrane not for instrument", () => {
    expect(forInstrument("membrane_hollow_fiber")).toBe(false);
  });
});

describe("drying", () => {
  it("membrane uses selective permeation", () => {
    expect(drying("membrane_hollow_fiber")).toBe("selective_permeation_fiber_tube");
  });
});

describe("bestUse", () => {
  it("refrigerated for general plant air", () => {
    expect(bestUse("refrigerated_cycling_heat")).toBe("general_plant_air_moderate_dew");
  });
});

describe("airDryerTypes", () => {
  it("returns 5 types", () => {
    expect(airDryerTypes()).toHaveLength(5);
  });
});
