import { describe, it, expect } from "vitest";
import {
  leakage, speed, temperature, wear,
  lsCost, nonContact, forTurbine, geometry,
  bestUse, labyrinthSealTypes,
} from "../labyrinth-seal-calc.js";

describe("leakage", () => {
  it("honeycomb abradable lowest leakage", () => {
    expect(leakage("honeycomb_abradable")).toBeGreaterThan(leakage("straight_through_teeth"));
  });
});

describe("speed", () => {
  it("honeycomb abradable highest speed", () => {
    expect(speed("honeycomb_abradable")).toBeGreaterThan(speed("carbon_ring_segmented"));
  });
});

describe("temperature", () => {
  it("honeycomb abradable highest temperature", () => {
    expect(temperature("honeycomb_abradable")).toBeGreaterThan(temperature("carbon_ring_segmented"));
  });
});

describe("wear", () => {
  it("straight through teeth best wear resistance", () => {
    expect(wear("straight_through_teeth")).toBeGreaterThan(wear("carbon_ring_segmented"));
  });
});

describe("lsCost", () => {
  it("honeycomb abradable most expensive", () => {
    expect(lsCost("honeycomb_abradable")).toBeGreaterThan(lsCost("straight_through_teeth"));
  });
});

describe("nonContact", () => {
  it("straight through is non-contact", () => {
    expect(nonContact("straight_through_teeth")).toBe(true);
  });
  it("brush seal not non-contact", () => {
    expect(nonContact("brush_seal_bristle")).toBe(false);
  });
});

describe("forTurbine", () => {
  it("honeycomb for turbine", () => {
    expect(forTurbine("honeycomb_abradable")).toBe(true);
  });
  it("carbon ring not for turbine", () => {
    expect(forTurbine("carbon_ring_segmented")).toBe(false);
  });
});

describe("geometry", () => {
  it("brush seal uses metallic bristle pack", () => {
    expect(geometry("brush_seal_bristle")).toBe("metallic_bristle_pack_backing_plate");
  });
});

describe("bestUse", () => {
  it("honeycomb for aircraft engine tip seal", () => {
    expect(bestUse("honeycomb_abradable")).toBe("aircraft_engine_turbine_tip_seal");
  });
});

describe("labyrinthSealTypes", () => {
  it("returns 5 types", () => {
    expect(labyrinthSealTypes()).toHaveLength(5);
  });
});
