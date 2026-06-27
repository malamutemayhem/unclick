import { describe, it, expect } from "vitest";
import {
  colorLaydown, blendability, lightfastness, detailWork,
  pencilCost, waterActivated, needsFixative, coreBinder,
  bestProject, coloredPencils,
} from "../colored-pencil-calc.js";

describe("colorLaydown", () => {
  it("pastel chalk soft best laydown", () => {
    expect(colorLaydown("pastel_chalk_soft")).toBeGreaterThan(colorLaydown("mechanical_color_lead"));
  });
});

describe("blendability", () => {
  it("oil based pro most blendable", () => {
    expect(blendability("oil_based_pro")).toBeGreaterThan(blendability("mechanical_color_lead"));
  });
});

describe("lightfastness", () => {
  it("oil based pro most lightfast", () => {
    expect(lightfastness("oil_based_pro")).toBeGreaterThan(lightfastness("wax_based_student"));
  });
});

describe("detailWork", () => {
  it("mechanical color lead best for detail", () => {
    expect(detailWork("mechanical_color_lead")).toBeGreaterThan(detailWork("pastel_chalk_soft"));
  });
});

describe("pencilCost", () => {
  it("oil based pro most expensive", () => {
    expect(pencilCost("oil_based_pro")).toBeGreaterThan(pencilCost("wax_based_student"));
  });
});

describe("waterActivated", () => {
  it("watercolor aqua is water activated", () => {
    expect(waterActivated("watercolor_aqua")).toBe(true);
  });
  it("oil based pro is not", () => {
    expect(waterActivated("oil_based_pro")).toBe(false);
  });
});

describe("needsFixative", () => {
  it("pastel chalk soft needs fixative", () => {
    expect(needsFixative("pastel_chalk_soft")).toBe(true);
  });
  it("oil based pro does not", () => {
    expect(needsFixative("oil_based_pro")).toBe(false);
  });
});

describe("coreBinder", () => {
  it("oil based pro uses oil binder high pigment", () => {
    expect(coreBinder("oil_based_pro")).toBe("oil_binder_high_pigment");
  });
});

describe("bestProject", () => {
  it("watercolor aqua best for botanical landscape wash", () => {
    expect(bestProject("watercolor_aqua")).toBe("botanical_landscape_wash");
  });
});

describe("coloredPencils", () => {
  it("returns 5 types", () => {
    expect(coloredPencils()).toHaveLength(5);
  });
});
