import { describe, it, expect } from "vitest";
import {
  fitAccuracy, adjustability, pinnability, stability,
  formCost, collapsible, hasArms, coverMaterial,
  bestSewer, dressForms,
} from "../dress-form-calc.js";

describe("fitAccuracy", () => {
  it("custom clone body most accurate fit", () => {
    expect(fitAccuracy("custom_clone_body")).toBeGreaterThan(fitAccuracy("wire_cage_display"));
  });
});

describe("adjustability", () => {
  it("adjustable dial standard most adjustable", () => {
    expect(adjustability("adjustable_dial_standard")).toBeGreaterThan(adjustability("custom_clone_body"));
  });
});

describe("pinnability", () => {
  it("foam pinnable pro most pinnable", () => {
    expect(pinnability("foam_pinnable_pro")).toBeGreaterThan(pinnability("wire_cage_display"));
  });
});

describe("stability", () => {
  it("custom clone body most stable", () => {
    expect(stability("custom_clone_body")).toBeGreaterThan(stability("child_size_petite"));
  });
});

describe("formCost", () => {
  it("custom clone body most expensive", () => {
    expect(formCost("custom_clone_body")).toBeGreaterThan(formCost("child_size_petite"));
  });
});

describe("collapsible", () => {
  it("wire cage display is collapsible", () => {
    expect(collapsible("wire_cage_display")).toBe(true);
  });
  it("foam pinnable pro is not", () => {
    expect(collapsible("foam_pinnable_pro")).toBe(false);
  });
});

describe("hasArms", () => {
  it("foam pinnable pro has arms", () => {
    expect(hasArms("foam_pinnable_pro")).toBe(true);
  });
  it("adjustable dial standard does not", () => {
    expect(hasArms("adjustable_dial_standard")).toBe(false);
  });
});

describe("coverMaterial", () => {
  it("foam pinnable pro uses high density polyurethane", () => {
    expect(coverMaterial("foam_pinnable_pro")).toBe("high_density_polyurethane");
  });
});

describe("bestSewer", () => {
  it("custom clone body best for couture bespoke tailoring", () => {
    expect(bestSewer("custom_clone_body")).toBe("couture_bespoke_tailoring");
  });
});

describe("dressForms", () => {
  it("returns 5 types", () => {
    expect(dressForms()).toHaveLength(5);
  });
});
