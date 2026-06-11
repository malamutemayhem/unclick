import { describe, it, expect } from "vitest";
import {
  loadCapacity, stability, damping, friction,
  jbCost, oilFree, forHighSpeed, film,
  bestUse, journalBearingTypes,
} from "../journal-bearing-calc.js";

describe("loadCapacity", () => {
  it("tilting pad highest load capacity", () => {
    expect(loadCapacity("tilting_pad_radial")).toBeGreaterThan(loadCapacity("foil_air_bearing"));
  });
});

describe("stability", () => {
  it("tilting pad best stability", () => {
    expect(stability("tilting_pad_radial")).toBeGreaterThan(stability("plain_sleeve_bushing"));
  });
});

describe("damping", () => {
  it("tilting pad best damping", () => {
    expect(damping("tilting_pad_radial")).toBeGreaterThan(damping("foil_air_bearing"));
  });
});

describe("friction", () => {
  it("foil air bearing lowest friction", () => {
    expect(friction("foil_air_bearing")).toBeGreaterThan(friction("tilting_pad_radial"));
  });
});

describe("jbCost", () => {
  it("tilting pad most expensive", () => {
    expect(jbCost("tilting_pad_radial")).toBeGreaterThan(jbCost("plain_sleeve_bushing"));
  });
});

describe("oilFree", () => {
  it("foil air bearing is oil free", () => {
    expect(oilFree("foil_air_bearing")).toBe(true);
  });
  it("plain sleeve not oil free", () => {
    expect(oilFree("plain_sleeve_bushing")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("tilting pad for high speed", () => {
    expect(forHighSpeed("tilting_pad_radial")).toBe(true);
  });
  it("plain sleeve not for high speed", () => {
    expect(forHighSpeed("plain_sleeve_bushing")).toBe(false);
  });
});

describe("film", () => {
  it("foil air bearing uses compliant foil", () => {
    expect(film("foil_air_bearing")).toBe("compliant_foil_air_film_no_oil_high_speed");
  });
});

describe("bestUse", () => {
  it("tilting pad for turbine compressor", () => {
    expect(bestUse("tilting_pad_radial")).toBe("high_speed_turbine_compressor_critical_rotor");
  });
});

describe("journalBearingTypes", () => {
  it("returns 5 types", () => {
    expect(journalBearingTypes()).toHaveLength(5);
  });
});
