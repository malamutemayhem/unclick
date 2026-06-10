import { describe, it, expect } from "vitest";
import {
  surfaceFinish, reuseCount, weightPerPanel, initialCost,
  setupSpeed, customShapeable, continuousPour, strippingMethod,
  bestApplication, formworkTypes,
} from "../formwork-type-calc.js";

describe("surfaceFinish", () => {
  it("steel best surface finish", () => {
    expect(surfaceFinish("steel")).toBeGreaterThan(surfaceFinish("timber"));
  });
});

describe("reuseCount", () => {
  it("steel most reuses", () => {
    expect(reuseCount("steel")).toBeGreaterThan(reuseCount("timber"));
  });
});

describe("weightPerPanel", () => {
  it("steel heaviest", () => {
    expect(weightPerPanel("steel")).toBeGreaterThan(weightPerPanel("plastic"));
  });
});

describe("initialCost", () => {
  it("slip form most expensive", () => {
    expect(initialCost("slip_form")).toBeGreaterThan(initialCost("timber"));
  });
});

describe("setupSpeed", () => {
  it("aluminum fastest setup", () => {
    expect(setupSpeed("aluminum")).toBeGreaterThan(setupSpeed("timber"));
  });
});

describe("customShapeable", () => {
  it("timber is custom shapeable", () => {
    expect(customShapeable("timber")).toBe(true);
  });
  it("steel is not", () => {
    expect(customShapeable("steel")).toBe(false);
  });
});

describe("continuousPour", () => {
  it("slip form allows continuous pour", () => {
    expect(continuousPour("slip_form")).toBe(true);
  });
  it("timber does not", () => {
    expect(continuousPour("timber")).toBe(false);
  });
});

describe("strippingMethod", () => {
  it("slip form uses hydraulic jack continuous", () => {
    expect(strippingMethod("slip_form")).toBe("hydraulic_jack_continuous");
  });
});

describe("bestApplication", () => {
  it("timber for custom one off shape", () => {
    expect(bestApplication("timber")).toBe("custom_one_off_shape");
  });
});

describe("formworkTypes", () => {
  it("returns 5 types", () => {
    expect(formworkTypes()).toHaveLength(5);
  });
});
