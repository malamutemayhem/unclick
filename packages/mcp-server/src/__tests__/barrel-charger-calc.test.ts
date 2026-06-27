import { describe, it, expect } from "vitest";
import {
  fillSpeed, fillAccuracy, spillControl, automation,
  bcCost, automated, forSpirits, chargerConfig,
  bestUse, barrelChargerTypes,
} from "../barrel-charger-calc.js";

describe("fillSpeed", () => {
  it("carousel rotary fastest fill speed", () => {
    expect(fillSpeed("carousel_rotary")).toBeGreaterThan(fillSpeed("gravity_fill"));
  });
});

describe("fillAccuracy", () => {
  it("metered auto best fill accuracy", () => {
    expect(fillAccuracy("metered_auto")).toBeGreaterThan(fillAccuracy("gravity_fill"));
  });
});

describe("spillControl", () => {
  it("vacuum fill best spill control", () => {
    expect(spillControl("vacuum_fill")).toBeGreaterThan(spillControl("gravity_fill"));
  });
});

describe("automation", () => {
  it("carousel rotary highest automation", () => {
    expect(automation("carousel_rotary")).toBeGreaterThan(automation("gravity_fill"));
  });
});

describe("bcCost", () => {
  it("carousel rotary most expensive", () => {
    expect(bcCost("carousel_rotary")).toBeGreaterThan(bcCost("gravity_fill"));
  });
});

describe("automated", () => {
  it("metered auto is automated", () => {
    expect(automated("metered_auto")).toBe(true);
  });
  it("gravity fill not automated", () => {
    expect(automated("gravity_fill")).toBe(false);
  });
});

describe("forSpirits", () => {
  it("all barrel chargers for spirits", () => {
    expect(forSpirits("gravity_fill")).toBe(true);
    expect(forSpirits("carousel_rotary")).toBe(true);
  });
});

describe("chargerConfig", () => {
  it("vacuum fill uses no spill seal bung evacuate", () => {
    expect(chargerConfig("vacuum_fill")).toBe("vacuum_fill_barrel_charger_no_spill_seal_bung_evacuate_fill");
  });
});

describe("bestUse", () => {
  it("carousel rotary for high volume bourbon whisky", () => {
    expect(bestUse("carousel_rotary")).toBe("high_volume_bourbon_whisky_carousel_rotary_continuous_barrel_fill");
  });
});

describe("barrelChargerTypes", () => {
  it("returns 5 types", () => {
    expect(barrelChargerTypes()).toHaveLength(5);
  });
});
