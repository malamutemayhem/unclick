import { describe, it, expect } from "vitest";
import {
  batteryLife, ergonomicGrip, buildQuality, portability,
  gripCost, verticalShutter, unlimitedPower, powerSource,
  bestShoot, batteryGrips,
} from "../battery-grip-calc.js";

describe("batteryLife", () => {
  it("dummy battery ac power longest battery life", () => {
    expect(batteryLife("dummy_battery_ac_power")).toBeGreaterThan(batteryLife("battery_pack_booster"));
  });
});

describe("ergonomicGrip", () => {
  it("oem vertical official best ergonomic grip", () => {
    expect(ergonomicGrip("oem_vertical_official")).toBeGreaterThan(ergonomicGrip("dummy_battery_ac_power"));
  });
});

describe("buildQuality", () => {
  it("oem vertical official best build quality", () => {
    expect(buildQuality("oem_vertical_official")).toBeGreaterThan(buildQuality("third_party_budget"));
  });
});

describe("portability", () => {
  it("battery pack booster most portable", () => {
    expect(portability("battery_pack_booster")).toBeGreaterThan(portability("dummy_battery_ac_power"));
  });
});

describe("gripCost", () => {
  it("oem vertical official most expensive", () => {
    expect(gripCost("oem_vertical_official")).toBeGreaterThan(gripCost("third_party_budget"));
  });
});

describe("verticalShutter", () => {
  it("oem vertical official has vertical shutter", () => {
    expect(verticalShutter("oem_vertical_official")).toBe(true);
  });
  it("battery pack booster has no vertical shutter", () => {
    expect(verticalShutter("battery_pack_booster")).toBe(false);
  });
});

describe("unlimitedPower", () => {
  it("dummy battery ac power has unlimited power", () => {
    expect(unlimitedPower("dummy_battery_ac_power")).toBe(true);
  });
  it("oem vertical official has no unlimited power", () => {
    expect(unlimitedPower("oem_vertical_official")).toBe(false);
  });
});

describe("powerSource", () => {
  it("usb c power bank grip uses usb c pd power bank", () => {
    expect(powerSource("usb_c_power_bank_grip")).toBe("usb_c_pd_power_bank");
  });
});

describe("bestShoot", () => {
  it("oem vertical official best for wedding event portrait", () => {
    expect(bestShoot("oem_vertical_official")).toBe("wedding_event_portrait");
  });
});

describe("batteryGrips", () => {
  it("returns 5 types", () => {
    expect(batteryGrips()).toHaveLength(5);
  });
});
