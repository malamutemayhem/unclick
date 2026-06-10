import { describe, it, expect } from "vitest";
import {
  stiffness, barrelDiameter, inkCapacity,
  lineVariation, durabilityHours, readilyAvailable,
  leftHandSuitable, bestScript, costPerQuill, quillFeathers,
} from "../quill-feather-calc.js";

describe("stiffness", () => {
  it("eagle is stiffest", () => {
    expect(stiffness("eagle")).toBeGreaterThan(
      stiffness("crow")
    );
  });
});

describe("barrelDiameter", () => {
  it("swan has largest barrel", () => {
    expect(barrelDiameter("swan")).toBeGreaterThan(
      barrelDiameter("crow")
    );
  });
});

describe("inkCapacity", () => {
  it("swan holds most ink", () => {
    expect(inkCapacity("swan")).toBeGreaterThan(
      inkCapacity("crow")
    );
  });
});

describe("lineVariation", () => {
  it("crow has most line variation", () => {
    expect(lineVariation("crow")).toBeGreaterThan(
      lineVariation("eagle")
    );
  });
});

describe("durabilityHours", () => {
  it("swan lasts longest", () => {
    expect(durabilityHours("swan")).toBeGreaterThan(
      durabilityHours("crow")
    );
  });
});

describe("readilyAvailable", () => {
  it("goose is readily available", () => {
    expect(readilyAvailable("goose")).toBe(true);
  });
  it("swan is not", () => {
    expect(readilyAvailable("swan")).toBe(false);
  });
});

describe("leftHandSuitable", () => {
  it("goose is left hand suitable", () => {
    expect(leftHandSuitable("goose")).toBe(true);
  });
  it("crow is not", () => {
    expect(leftHandSuitable("crow")).toBe(false);
  });
});

describe("bestScript", () => {
  it("goose best for copperplate", () => {
    expect(bestScript("goose")).toBe("copperplate");
  });
});

describe("costPerQuill", () => {
  it("eagle costs most", () => {
    expect(costPerQuill("eagle")).toBeGreaterThan(
      costPerQuill("turkey")
    );
  });
});

describe("quillFeathers", () => {
  it("returns 5 feathers", () => {
    expect(quillFeathers()).toHaveLength(5);
  });
});
