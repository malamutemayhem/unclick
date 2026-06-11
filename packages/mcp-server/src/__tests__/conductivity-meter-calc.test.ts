import { describe, it, expect } from "vitest";
import {
  accuracy, range, foulingResist, maintenance,
  cmCost, nonContact, forHighCond, sensor,
  bestUse, conductivityMeterTypes,
} from "../conductivity-meter-calc.js";

describe("accuracy", () => {
  it("micro flow cell most accurate", () => {
    expect(accuracy("micro_flow_cell")).toBeGreaterThan(accuracy("electrodeless_capacitive"));
  });
});

describe("range", () => {
  it("inductive toroidal widest range", () => {
    expect(range("inductive_toroidal")).toBeGreaterThan(range("contacting_two_electrode"));
  });
});

describe("foulingResist", () => {
  it("inductive toroidal best fouling resistance", () => {
    expect(foulingResist("inductive_toroidal")).toBeGreaterThan(foulingResist("contacting_two_electrode"));
  });
});

describe("maintenance", () => {
  it("inductive toroidal lowest maintenance", () => {
    expect(maintenance("inductive_toroidal")).toBeGreaterThan(maintenance("contacting_two_electrode"));
  });
});

describe("cmCost", () => {
  it("micro flow cell most expensive", () => {
    expect(cmCost("micro_flow_cell")).toBeGreaterThan(cmCost("contacting_two_electrode"));
  });
});

describe("nonContact", () => {
  it("inductive toroidal is non contact", () => {
    expect(nonContact("inductive_toroidal")).toBe(true);
  });
  it("contacting two electrode is contact", () => {
    expect(nonContact("contacting_two_electrode")).toBe(false);
  });
});

describe("forHighCond", () => {
  it("inductive toroidal for high conductivity", () => {
    expect(forHighCond("inductive_toroidal")).toBe(true);
  });
  it("two electrode not for high conductivity", () => {
    expect(forHighCond("contacting_two_electrode")).toBe(false);
  });
});

describe("sensor", () => {
  it("four electrode uses polarization compensate", () => {
    expect(sensor("contacting_four_electrode")).toBe("four_electrode_polarization_compensate");
  });
});

describe("bestUse", () => {
  it("micro flow for ultrapure water", () => {
    expect(bestUse("micro_flow_cell")).toBe("ultrapure_water_semiconductor_pharma");
  });
});

describe("conductivityMeterTypes", () => {
  it("returns 5 types", () => {
    expect(conductivityMeterTypes()).toHaveLength(5);
  });
});
