import { describe, it, expect } from "vitest";
import {
  brightness, runtime, packSize, ambiance,
  lanternCost, solarCharge, collapsible, lightSource,
  bestScene, campLanterns,
} from "../camp-lantern-calc.js";

describe("brightness", () => {
  it("fuel canister gas brightest", () => {
    expect(brightness("fuel_canister_gas")).toBeGreaterThan(brightness("collapsible_pop_up"));
  });
});

describe("runtime", () => {
  it("string light ambient longest runtime", () => {
    expect(runtime("string_light_ambient")).toBeGreaterThan(runtime("fuel_canister_gas"));
  });
});

describe("packSize", () => {
  it("collapsible pop up smallest pack size", () => {
    expect(packSize("collapsible_pop_up")).toBeGreaterThan(packSize("fuel_canister_gas"));
  });
});

describe("ambiance", () => {
  it("string light ambient best ambiance", () => {
    expect(ambiance("string_light_ambient")).toBeGreaterThan(ambiance("led_battery_classic"));
  });
});

describe("lanternCost", () => {
  it("rechargeable solar combo more expensive than led", () => {
    expect(lanternCost("rechargeable_solar_combo")).toBeGreaterThan(lanternCost("led_battery_classic"));
  });
});

describe("solarCharge", () => {
  it("rechargeable solar combo has solar charge", () => {
    expect(solarCharge("rechargeable_solar_combo")).toBe(true);
  });
  it("led battery classic has no solar charge", () => {
    expect(solarCharge("led_battery_classic")).toBe(false);
  });
});

describe("collapsible", () => {
  it("collapsible pop up is collapsible", () => {
    expect(collapsible("collapsible_pop_up")).toBe(true);
  });
  it("led battery classic is not collapsible", () => {
    expect(collapsible("led_battery_classic")).toBe(false);
  });
});

describe("lightSource", () => {
  it("fuel canister gas uses gas mantle glow", () => {
    expect(lightSource("fuel_canister_gas")).toBe("gas_mantle_glow");
  });
});

describe("bestScene", () => {
  it("string light ambient best for car camp patio party", () => {
    expect(bestScene("string_light_ambient")).toBe("car_camp_patio_party");
  });
});

describe("campLanterns", () => {
  it("returns 5 types", () => {
    expect(campLanterns()).toHaveLength(5);
  });
});
