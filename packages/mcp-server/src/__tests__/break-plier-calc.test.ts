import { describe, it, expect } from "vitest";
import {
  snapClean, controlGrip, glassRange, comfortHold,
  plierCost, padded, curved, jawProfile,
  bestUse, breakPliers,
} from "../break-plier-calc.js";

describe("snapClean", () => {
  it("narrow jaw strip cleanest snap", () => {
    expect(snapClean("narrow_jaw_strip")).toBeGreaterThan(snapClean("padded_jaw_delicate"));
  });
});

describe("controlGrip", () => {
  it("narrow jaw strip best control grip", () => {
    expect(controlGrip("narrow_jaw_strip")).toBeGreaterThan(controlGrip("wide_jaw_sheet"));
  });
});

describe("glassRange", () => {
  it("wide jaw sheet widest glass range", () => {
    expect(glassRange("wide_jaw_sheet")).toBeGreaterThan(glassRange("narrow_jaw_strip"));
  });
});

describe("comfortHold", () => {
  it("padded jaw delicate most comfortable hold", () => {
    expect(comfortHold("padded_jaw_delicate")).toBeGreaterThan(comfortHold("wide_jaw_sheet"));
  });
});

describe("plierCost", () => {
  it("padded jaw delicate most expensive", () => {
    expect(plierCost("padded_jaw_delicate")).toBeGreaterThan(plierCost("flat_jaw_standard"));
  });
});

describe("padded", () => {
  it("padded jaw delicate is padded", () => {
    expect(padded("padded_jaw_delicate")).toBe(true);
  });
  it("flat jaw standard not padded", () => {
    expect(padded("flat_jaw_standard")).toBe(false);
  });
});

describe("curved", () => {
  it("curved jaw contour is curved", () => {
    expect(curved("curved_jaw_contour")).toBe(true);
  });
  it("flat jaw standard not curved", () => {
    expect(curved("flat_jaw_standard")).toBe(false);
  });
});

describe("jawProfile", () => {
  it("narrow jaw strip uses narrow precision tip", () => {
    expect(jawProfile("narrow_jaw_strip")).toBe("narrow_precision_tip");
  });
});

describe("bestUse", () => {
  it("flat jaw standard best for general glass break", () => {
    expect(bestUse("flat_jaw_standard")).toBe("general_glass_break");
  });
});

describe("breakPliers", () => {
  it("returns 5 types", () => {
    expect(breakPliers()).toHaveLength(5);
  });
});
