import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, partLoad, footprint,
  chCost, waterFree, forDataCenter, compressor,
  bestUse, chillerTypes,
} from "../chiller-type-calc.js";

describe("efficiency", () => {
  it("water cooled centrifugal most efficient", () => {
    expect(efficiency("water_cooled_centrifugal")).toBeGreaterThan(efficiency("air_cooled_scroll"));
  });
});

describe("capacity", () => {
  it("water cooled centrifugal highest capacity", () => {
    expect(capacity("water_cooled_centrifugal")).toBeGreaterThan(capacity("air_cooled_scroll"));
  });
});

describe("partLoad", () => {
  it("magnetic bearing best part load", () => {
    expect(partLoad("magnetic_bearing_oil_free")).toBeGreaterThan(partLoad("absorption_lithium_bromide"));
  });
});

describe("footprint", () => {
  it("modular air cooled smallest footprint", () => {
    expect(footprint("modular_air_cooled_screw")).toBeGreaterThan(footprint("absorption_lithium_bromide"));
  });
});

describe("chCost", () => {
  it("water cooled centrifugal most expensive", () => {
    expect(chCost("water_cooled_centrifugal")).toBeGreaterThan(chCost("air_cooled_scroll"));
  });
});

describe("waterFree", () => {
  it("air cooled scroll is water free", () => {
    expect(waterFree("air_cooled_scroll")).toBe(true);
  });
  it("water cooled not water free", () => {
    expect(waterFree("water_cooled_centrifugal")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("magnetic bearing for data center", () => {
    expect(forDataCenter("magnetic_bearing_oil_free")).toBe(true);
  });
  it("air cooled not for data center", () => {
    expect(forDataCenter("air_cooled_scroll")).toBe(false);
  });
});

describe("compressor", () => {
  it("absorption uses none thermal absorption", () => {
    expect(compressor("absorption_lithium_bromide")).toBe("none_thermal_absorption");
  });
});

describe("bestUse", () => {
  it("magnetic bearing best for data center variable load", () => {
    expect(bestUse("magnetic_bearing_oil_free")).toBe("data_center_variable_load_pue");
  });
});

describe("chillerTypes", () => {
  it("returns 5 types", () => {
    expect(chillerTypes()).toHaveLength(5);
  });
});
