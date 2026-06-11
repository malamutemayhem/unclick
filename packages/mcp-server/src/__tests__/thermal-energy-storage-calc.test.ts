import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, chargeRate, duration,
  teCost, passive, forPeakShift, medium,
  bestUse, thermalEnergyStorageTypes,
} from "../thermal-energy-storage-calc.js";

describe("capacity", () => {
  it("molten salt and borehole seasonal highest capacity", () => {
    expect(capacity("molten_salt")).toBeGreaterThan(capacity("chilled_water_tank"));
    expect(capacity("borehole_seasonal")).toBeGreaterThan(capacity("chilled_water_tank"));
  });
});

describe("efficiency", () => {
  it("chilled water tank most efficient", () => {
    expect(efficiency("chilled_water_tank")).toBeGreaterThan(efficiency("borehole_seasonal"));
  });
});

describe("chargeRate", () => {
  it("chilled water tank fastest charge rate", () => {
    expect(chargeRate("chilled_water_tank")).toBeGreaterThan(chargeRate("borehole_seasonal"));
  });
});

describe("duration", () => {
  it("borehole seasonal longest duration", () => {
    expect(duration("borehole_seasonal")).toBeGreaterThan(duration("chilled_water_tank"));
  });
});

describe("teCost", () => {
  it("molten salt most expensive", () => {
    expect(teCost("molten_salt")).toBeGreaterThan(teCost("chilled_water_tank"));
  });
});

describe("passive", () => {
  it("chilled water tank is passive", () => {
    expect(passive("chilled_water_tank")).toBe(true);
  });
  it("ice storage not passive", () => {
    expect(passive("ice_storage")).toBe(false);
  });
});

describe("forPeakShift", () => {
  it("ice storage for peak shift", () => {
    expect(forPeakShift("ice_storage")).toBe(true);
  });
  it("molten salt not for peak shift", () => {
    expect(forPeakShift("molten_salt")).toBe(false);
  });
});

describe("medium", () => {
  it("molten salt uses binary nitrate salt", () => {
    expect(medium("molten_salt")).toBe("binary_nitrate_salt_60_40_nano3_kno3_two_tank_solar_csp");
  });
});

describe("bestUse", () => {
  it("borehole seasonal for district heating", () => {
    expect(bestUse("borehole_seasonal")).toBe("district_heating_seasonal_solar_excess_summer_to_winter");
  });
});

describe("thermalEnergyStorageTypes", () => {
  it("returns 5 types", () => {
    expect(thermalEnergyStorageTypes()).toHaveLength(5);
  });
});
