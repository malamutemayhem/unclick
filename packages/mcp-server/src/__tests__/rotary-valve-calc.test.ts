import { describe, it, expect } from "vitest";
import {
  airlock, feedAccuracy, wearResist, cleanability,
  rvCost, pressureRated, forPneumatic, rotor,
  bestUse, rotaryValveTypes,
} from "../rotary-valve-calc.js";

describe("airlock", () => {
  it("blow through best airlock", () => {
    expect(airlock("blow_through_pneumatic")).toBeGreaterThan(airlock("drop_through_gravity"));
  });
});

describe("feedAccuracy", () => {
  it("metering pocket most accurate", () => {
    expect(feedAccuracy("metering_pocket_prec")).toBeGreaterThan(feedAccuracy("high_temp_cast_iron"));
  });
});

describe("wearResist", () => {
  it("high temp cast iron best wear resist", () => {
    expect(wearResist("high_temp_cast_iron")).toBeGreaterThan(wearResist("sanitary_stainless_food"));
  });
});

describe("cleanability", () => {
  it("sanitary stainless best cleanability", () => {
    expect(cleanability("sanitary_stainless_food")).toBeGreaterThan(cleanability("high_temp_cast_iron"));
  });
});

describe("rvCost", () => {
  it("sanitary stainless most expensive", () => {
    expect(rvCost("sanitary_stainless_food")).toBeGreaterThan(rvCost("drop_through_gravity"));
  });
});

describe("pressureRated", () => {
  it("blow through is pressure rated", () => {
    expect(pressureRated("blow_through_pneumatic")).toBe(true);
  });
  it("drop through not pressure rated", () => {
    expect(pressureRated("drop_through_gravity")).toBe(false);
  });
});

describe("forPneumatic", () => {
  it("blow through for pneumatic", () => {
    expect(forPneumatic("blow_through_pneumatic")).toBe(true);
  });
  it("metering pocket not for pneumatic", () => {
    expect(forPneumatic("metering_pocket_prec")).toBe(false);
  });
});

describe("rotor", () => {
  it("sanitary uses polished stainless", () => {
    expect(rotor("sanitary_stainless_food")).toBe("polished_stainless_rotor_quick_release_cip");
  });
});

describe("bestUse", () => {
  it("high temp for cement ash clinker", () => {
    expect(bestUse("high_temp_cast_iron")).toBe("cement_ash_clinker_high_temp_abrasive_material");
  });
});

describe("rotaryValveTypes", () => {
  it("returns 5 types", () => {
    expect(rotaryValveTypes()).toHaveLength(5);
  });
});
