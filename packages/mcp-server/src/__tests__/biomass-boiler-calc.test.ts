import { describe, it, expect } from "vitest";
import {
  efficiency, fuelFlex, emissions, automation,
  bbCost, automated, forLargeScale, combustion,
  bestUse, biomassBoilerTypes,
} from "../biomass-boiler-calc.js";

describe("efficiency", () => {
  it("circulating fbc most efficient", () => {
    expect(efficiency("circulating_fbc_cfb")).toBeGreaterThan(efficiency("stoker_grate_fired"));
  });
});

describe("fuelFlex", () => {
  it("circulating fbc most fuel flexible", () => {
    expect(fuelFlex("circulating_fbc_cfb")).toBeGreaterThan(fuelFlex("pellet_boiler_auto"));
  });
});

describe("emissions", () => {
  it("circulating fbc best emissions", () => {
    expect(emissions("circulating_fbc_cfb")).toBeGreaterThan(emissions("stoker_grate_fired"));
  });
});

describe("automation", () => {
  it("pellet boiler most automated", () => {
    expect(automation("pellet_boiler_auto")).toBeGreaterThan(automation("stoker_grate_fired"));
  });
});

describe("bbCost", () => {
  it("circulating fbc most expensive", () => {
    expect(bbCost("circulating_fbc_cfb")).toBeGreaterThan(bbCost("pellet_boiler_auto"));
  });
});

describe("automated", () => {
  it("all biomass boilers are automated", () => {
    expect(automated("stoker_grate_fired")).toBe(true);
    expect(automated("pellet_boiler_auto")).toBe(true);
  });
});

describe("forLargeScale", () => {
  it("fluidized bed for large scale", () => {
    expect(forLargeScale("fluidized_bed_bfb")).toBe(true);
  });
  it("pellet boiler not for large scale", () => {
    expect(forLargeScale("pellet_boiler_auto")).toBe(false);
  });
});

describe("combustion", () => {
  it("pellet boiler uses auger feed", () => {
    expect(combustion("pellet_boiler_auto")).toBe("auger_feed_pellet_modulating_burner_ash_auto_clean");
  });
});

describe("bestUse", () => {
  it("stoker grate for wood waste sawmill", () => {
    expect(bestUse("stoker_grate_fired")).toBe("wood_waste_sawmill_residue_industrial_steam_heat");
  });
});

describe("biomassBoilerTypes", () => {
  it("returns 5 types", () => {
    expect(biomassBoilerTypes()).toHaveLength(5);
  });
});
