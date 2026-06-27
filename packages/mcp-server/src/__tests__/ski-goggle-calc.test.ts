import { describe, it, expect } from "vitest";
import {
  opticalClarity, fogResistance, fieldOfView, lightAdaptation,
  goggleCost, interchangeable, prescriptionFit, lensType,
  bestCondition, skiGoggles,
} from "../ski-goggle-calc.js";

describe("opticalClarity", () => {
  it("frameless magnetic best clarity", () => {
    expect(opticalClarity("frameless_magnetic")).toBeGreaterThan(opticalClarity("flat_lens_budget"));
  });
});

describe("fogResistance", () => {
  it("frameless magnetic best fog resistance", () => {
    expect(fogResistance("frameless_magnetic")).toBeGreaterThan(fogResistance("flat_lens_budget"));
  });
});

describe("fieldOfView", () => {
  it("frameless magnetic widest field of view", () => {
    expect(fieldOfView("frameless_magnetic")).toBeGreaterThan(fieldOfView("flat_lens_budget"));
  });
});

describe("lightAdaptation", () => {
  it("cylindrical photochromic best light adaptation", () => {
    expect(lightAdaptation("cylindrical_photochromic")).toBeGreaterThan(lightAdaptation("flat_lens_budget"));
  });
});

describe("goggleCost", () => {
  it("frameless magnetic most expensive", () => {
    expect(goggleCost("frameless_magnetic")).toBeGreaterThan(goggleCost("flat_lens_budget"));
  });
});

describe("interchangeable", () => {
  it("frameless magnetic is interchangeable", () => {
    expect(interchangeable("frameless_magnetic")).toBe(true);
  });
  it("spherical mirror is not", () => {
    expect(interchangeable("spherical_mirror")).toBe(false);
  });
});

describe("prescriptionFit", () => {
  it("otg over glasses fits prescriptions", () => {
    expect(prescriptionFit("otg_over_glasses")).toBe(true);
  });
  it("frameless magnetic does not", () => {
    expect(prescriptionFit("frameless_magnetic")).toBe(false);
  });
});

describe("lensType", () => {
  it("cylindrical photochromic uses transition variable tint", () => {
    expect(lensType("cylindrical_photochromic")).toBe("transition_variable_tint");
  });
});

describe("bestCondition", () => {
  it("spherical mirror for bright bluebird day", () => {
    expect(bestCondition("spherical_mirror")).toBe("bright_bluebird_day");
  });
});

describe("skiGoggles", () => {
  it("returns 5 types", () => {
    expect(skiGoggles()).toHaveLength(5);
  });
});
