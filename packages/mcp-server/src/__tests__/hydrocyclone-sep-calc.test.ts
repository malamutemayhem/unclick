import { describe, it, expect } from "vitest";
import {
  cutPoint, capacity, sharpness, wearResist,
  hsCost, pressureFed, forFine, geometry,
  bestUse, hydrocycloneSepTypes,
} from "../hydrocyclone-sep-calc.js";

describe("cutPoint", () => {
  it("multi stage cluster finest cut point", () => {
    expect(cutPoint("multi_stage_cluster")).toBeGreaterThan(cutPoint("flat_bottom_thicken"));
  });
});

describe("capacity", () => {
  it("multi stage cluster highest capacity", () => {
    expect(capacity("multi_stage_cluster")).toBeGreaterThan(capacity("dewatering_fine_recovery"));
  });
});

describe("sharpness", () => {
  it("dense medium sharpest separation", () => {
    expect(sharpness("dense_medium_gravity")).toBeGreaterThan(sharpness("flat_bottom_thicken"));
  });
});

describe("wearResist", () => {
  it("flat bottom best wear resistance", () => {
    expect(wearResist("flat_bottom_thicken")).toBeGreaterThan(wearResist("dewatering_fine_recovery"));
  });
});

describe("hsCost", () => {
  it("multi stage cluster most expensive", () => {
    expect(hsCost("multi_stage_cluster")).toBeGreaterThan(hsCost("standard_conical_class"));
  });
});

describe("pressureFed", () => {
  it("all hydrocyclones are pressure fed", () => {
    expect(pressureFed("standard_conical_class")).toBe(true);
    expect(pressureFed("multi_stage_cluster")).toBe(true);
  });
});

describe("forFine", () => {
  it("dewatering for fine particles", () => {
    expect(forFine("dewatering_fine_recovery")).toBe(true);
  });
  it("standard conical not for fine", () => {
    expect(forFine("standard_conical_class")).toBe(false);
  });
});

describe("geometry", () => {
  it("flat bottom uses high density underflow", () => {
    expect(geometry("flat_bottom_thicken")).toBe("flat_bottom_underflow_high_density");
  });
});

describe("bestUse", () => {
  it("dense medium for coal diamond gravity", () => {
    expect(bestUse("dense_medium_gravity")).toBe("coal_diamond_gravity_separate_density");
  });
});

describe("hydrocycloneSepTypes", () => {
  it("returns 5 types", () => {
    expect(hydrocycloneSepTypes()).toHaveLength(5);
  });
});
