import { describe, it, expect } from "vitest";
import {
  matchTolerance, tempStability, powerRating, sizeCompact,
  arrayCost, isolated, forPrecision, construction,
  bestUse, resistorArrays,
} from "../resistor-array-calc.js";

describe("matchTolerance", () => {
  it("precision thin film best match tolerance", () => {
    expect(matchTolerance("precision_thin_film")).toBeGreaterThan(matchTolerance("sip_bussed_network"));
  });
});

describe("tempStability", () => {
  it("precision thin film best temp stability", () => {
    expect(tempStability("precision_thin_film")).toBeGreaterThan(tempStability("sip_bussed_network"));
  });
});

describe("powerRating", () => {
  it("thick film custom highest power rating", () => {
    expect(powerRating("thick_film_custom")).toBeGreaterThan(powerRating("smd_chip_array"));
  });
});

describe("sizeCompact", () => {
  it("smd chip array most compact", () => {
    expect(sizeCompact("smd_chip_array")).toBeGreaterThan(sizeCompact("thick_film_custom"));
  });
});

describe("arrayCost", () => {
  it("precision thin film most expensive", () => {
    expect(arrayCost("precision_thin_film")).toBeGreaterThan(arrayCost("sip_bussed_network"));
  });
});

describe("isolated", () => {
  it("dip isolated network is isolated", () => {
    expect(isolated("dip_isolated_network")).toBe(true);
  });
  it("sip bussed network not isolated", () => {
    expect(isolated("sip_bussed_network")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("precision thin film is for precision", () => {
    expect(forPrecision("precision_thin_film")).toBe(true);
  });
  it("sip bussed network not for precision", () => {
    expect(forPrecision("sip_bussed_network")).toBe(false);
  });
});

describe("construction", () => {
  it("precision thin film uses thin film laser trim", () => {
    expect(construction("precision_thin_film")).toBe("thin_film_laser_trim");
  });
});

describe("bestUse", () => {
  it("sip bussed network best for pullup pulldown bus", () => {
    expect(bestUse("sip_bussed_network")).toBe("pullup_pulldown_bus");
  });
});

describe("resistorArrays", () => {
  it("returns 5 types", () => {
    expect(resistorArrays()).toHaveLength(5);
  });
});
