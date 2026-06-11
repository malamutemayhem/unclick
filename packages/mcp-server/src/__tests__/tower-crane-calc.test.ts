import { describe, it, expect } from "vitest";
import {
  maxLoad, jibLength, liftHeight, erectionSpeed,
  tcCost, selfErecting, forHighRise, jib,
  bestUse, towerCraneTypes,
} from "../tower-crane-calc.js";

describe("maxLoad", () => {
  it("climbing internal highest max load", () => {
    expect(maxLoad("climbing_internal")).toBeGreaterThan(maxLoad("self_erecting"));
  });
});

describe("jibLength", () => {
  it("hammerhead fixed longest jib", () => {
    expect(jibLength("hammerhead_fixed")).toBeGreaterThan(jibLength("self_erecting"));
  });
});

describe("liftHeight", () => {
  it("climbing internal highest lift", () => {
    expect(liftHeight("climbing_internal")).toBeGreaterThan(liftHeight("self_erecting"));
  });
});

describe("erectionSpeed", () => {
  it("self erecting fastest erection", () => {
    expect(erectionSpeed("self_erecting")).toBeGreaterThan(erectionSpeed("climbing_internal"));
  });
});

describe("tcCost", () => {
  it("climbing internal most expensive", () => {
    expect(tcCost("climbing_internal")).toBeGreaterThan(tcCost("self_erecting"));
  });
});

describe("selfErecting", () => {
  it("self erecting is self erecting", () => {
    expect(selfErecting("self_erecting")).toBe(true);
  });
  it("hammerhead fixed not self erecting", () => {
    expect(selfErecting("hammerhead_fixed")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("luffing jib for high rise", () => {
    expect(forHighRise("luffing_jib")).toBe(true);
  });
  it("self erecting not for high rise", () => {
    expect(forHighRise("self_erecting")).toBe(false);
  });
});

describe("jib", () => {
  it("climbing internal uses internal climbing frame", () => {
    expect(jib("climbing_internal")).toBe("internal_climbing_frame_hydraulic_jack_floor_by_floor_rise");
  });
});

describe("bestUse", () => {
  it("luffing jib for congested city site", () => {
    expect(bestUse("luffing_jib")).toBe("congested_city_site_multiple_crane_overlap_restricted_slew");
  });
});

describe("towerCraneTypes", () => {
  it("returns 5 types", () => {
    expect(towerCraneTypes()).toHaveLength(5);
  });
});
