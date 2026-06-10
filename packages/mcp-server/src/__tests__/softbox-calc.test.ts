import { describe, it, expect } from "vitest";
import {
  lightSpread, softness, portability, controlPrecision,
  softboxCost, hasGrid, quickSetup, diffusionLayers,
  bestShoot, softboxes,
} from "../softbox-calc.js";

describe("lightSpread", () => {
  it("lantern sphere wrap widest spread", () => {
    expect(lightSpread("lantern_sphere_wrap")).toBeGreaterThan(lightSpread("strip_rim_light"));
  });
});

describe("softness", () => {
  it("lantern sphere wrap softest light", () => {
    expect(softness("lantern_sphere_wrap")).toBeGreaterThan(softness("strip_rim_light"));
  });
});

describe("portability", () => {
  it("collapsible speedlight most portable", () => {
    expect(portability("collapsible_speedlight")).toBeGreaterThan(portability("rectangular_studio_large"));
  });
});

describe("controlPrecision", () => {
  it("strip rim light most precise control", () => {
    expect(controlPrecision("strip_rim_light")).toBeGreaterThan(controlPrecision("lantern_sphere_wrap"));
  });
});

describe("softboxCost", () => {
  it("octagonal portrait most expensive", () => {
    expect(softboxCost("octagonal_portrait")).toBeGreaterThan(softboxCost("collapsible_speedlight"));
  });
});

describe("hasGrid", () => {
  it("rectangular studio large has grid", () => {
    expect(hasGrid("rectangular_studio_large")).toBe(true);
  });
  it("lantern sphere wrap does not", () => {
    expect(hasGrid("lantern_sphere_wrap")).toBe(false);
  });
});

describe("quickSetup", () => {
  it("collapsible speedlight quick setup", () => {
    expect(quickSetup("collapsible_speedlight")).toBe(true);
  });
  it("rectangular studio large is not", () => {
    expect(quickSetup("rectangular_studio_large")).toBe(false);
  });
});

describe("diffusionLayers", () => {
  it("lantern sphere wrap uses full sphere silk", () => {
    expect(diffusionLayers("lantern_sphere_wrap")).toBe("full_sphere_silk");
  });
});

describe("bestShoot", () => {
  it("octagonal portrait best for headshot beauty portrait", () => {
    expect(bestShoot("octagonal_portrait")).toBe("headshot_beauty_portrait");
  });
});

describe("softboxes", () => {
  it("returns 5 types", () => {
    expect(softboxes()).toHaveLength(5);
  });
});
