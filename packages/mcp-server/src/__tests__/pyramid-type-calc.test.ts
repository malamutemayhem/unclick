import { describe, it, expect } from "vitest";
import {
  heightMeters, baseAreaM2, slopeAngleDegrees,
  constructionYears, internalChambers, hasFlatTop,
  funerary, civilization, preservationState, pyramidTypes,
} from "../pyramid-type-calc.js";

describe("heightMeters", () => {
  it("true smooth is tallest", () => {
    expect(heightMeters("true_smooth")).toBeGreaterThan(
      heightMeters("nubian")
    );
  });
});

describe("baseAreaM2", () => {
  it("true smooth has largest base", () => {
    expect(baseAreaM2("true_smooth")).toBeGreaterThan(
      baseAreaM2("nubian")
    );
  });
});

describe("slopeAngleDegrees", () => {
  it("nubian is steepest", () => {
    expect(slopeAngleDegrees("nubian")).toBeGreaterThan(
      slopeAngleDegrees("mesoamerican")
    );
  });
});

describe("constructionYears", () => {
  it("mesoamerican takes longest", () => {
    expect(constructionYears("mesoamerican")).toBeGreaterThan(
      constructionYears("nubian")
    );
  });
});

describe("internalChambers", () => {
  it("step has most chambers", () => {
    expect(internalChambers("step")).toBeGreaterThan(
      internalChambers("nubian")
    );
  });
});

describe("hasFlatTop", () => {
  it("mesoamerican has flat top", () => {
    expect(hasFlatTop("mesoamerican")).toBe(true);
  });
  it("true smooth does not", () => {
    expect(hasFlatTop("true_smooth")).toBe(false);
  });
});

describe("funerary", () => {
  it("step is funerary", () => {
    expect(funerary("step")).toBe(true);
  });
  it("mesoamerican is not", () => {
    expect(funerary("mesoamerican")).toBe(false);
  });
});

describe("civilization", () => {
  it("nubian is kush", () => {
    expect(civilization("nubian")).toBe("kush");
  });
});

describe("preservationState", () => {
  it("true smooth best preserved", () => {
    expect(preservationState("true_smooth")).toBeGreaterThan(
      preservationState("nubian")
    );
  });
});

describe("pyramidTypes", () => {
  it("returns 5 types", () => {
    expect(pyramidTypes()).toHaveLength(5);
  });
});
