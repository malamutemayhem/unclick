import { describe, it, expect } from "vitest";
import {
  pullout, speed, depth, versatility,
  snCost, groutRequired, forSlope, installation,
  bestUse, soilNailTypes,
} from "../soil-nail-calc.js";

describe("pullout", () => {
  it("jet grouted highest pullout", () => {
    expect(pullout("jet_grouted_column_nail")).toBeGreaterThan(pullout("launched_compressed_air"));
  });
});

describe("speed", () => {
  it("launched fastest", () => {
    expect(speed("launched_compressed_air")).toBeGreaterThan(speed("jet_grouted_column_nail"));
  });
});

describe("depth", () => {
  it("jet grouted deepest", () => {
    expect(depth("jet_grouted_column_nail")).toBeGreaterThan(depth("launched_compressed_air"));
  });
});

describe("versatility", () => {
  it("grouted most versatile", () => {
    expect(versatility("grouted_drill_hole_bar")).toBeGreaterThan(versatility("launched_compressed_air"));
  });
});

describe("snCost", () => {
  it("jet grouted most expensive", () => {
    expect(snCost("jet_grouted_column_nail")).toBeGreaterThan(snCost("launched_compressed_air"));
  });
});

describe("groutRequired", () => {
  it("grouted requires grout", () => {
    expect(groutRequired("grouted_drill_hole_bar")).toBe(true);
  });
  it("launched no grout", () => {
    expect(groutRequired("launched_compressed_air")).toBe(false);
  });
});

describe("forSlope", () => {
  it("grouted for slope", () => {
    expect(forSlope("grouted_drill_hole_bar")).toBe(true);
  });
  it("launched not for slope", () => {
    expect(forSlope("launched_compressed_air")).toBe(false);
  });
});

describe("installation", () => {
  it("screw in uses torque motor", () => {
    expect(installation("screw_in_helical_plate")).toBe("torque_motor_screw_helical_plate");
  });
});

describe("bestUse", () => {
  it("grouted for permanent slope", () => {
    expect(bestUse("grouted_drill_hole_bar")).toBe("permanent_slope_cut_wall_retain");
  });
});

describe("soilNailTypes", () => {
  it("returns 5 types", () => {
    expect(soilNailTypes()).toHaveLength(5);
  });
});
