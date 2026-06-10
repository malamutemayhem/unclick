import { describe, it, expect } from "vitest";
import {
  magnification, fieldOfView, lowLightPerf, portability,
  binocularCost, waterproof, needsBattery, prismType,
  bestActivity, binoculars,
} from "../binocular-calc.js";

describe("magnification", () => {
  it("zoom 10 30x variable highest magnification", () => {
    expect(magnification("zoom_10_30x_variable")).toBeGreaterThan(magnification("compact_8x25_pocket"));
  });
});

describe("fieldOfView", () => {
  it("wide angle birding widest field of view", () => {
    expect(fieldOfView("wide_angle_birding")).toBeGreaterThan(fieldOfView("zoom_10_30x_variable"));
  });
});

describe("lowLightPerf", () => {
  it("image stabilized marine best low light", () => {
    expect(lowLightPerf("image_stabilized_marine")).toBeGreaterThan(lowLightPerf("compact_8x25_pocket"));
  });
});

describe("portability", () => {
  it("compact 8x25 pocket most portable", () => {
    expect(portability("compact_8x25_pocket")).toBeGreaterThan(portability("image_stabilized_marine"));
  });
});

describe("binocularCost", () => {
  it("image stabilized marine most expensive", () => {
    expect(binocularCost("image_stabilized_marine")).toBeGreaterThan(binocularCost("compact_8x25_pocket"));
  });
});

describe("waterproof", () => {
  it("standard 10x42 allround is waterproof", () => {
    expect(waterproof("standard_10x42_allround")).toBe(true);
  });
  it("compact 8x25 pocket is not", () => {
    expect(waterproof("compact_8x25_pocket")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("image stabilized marine needs battery", () => {
    expect(needsBattery("image_stabilized_marine")).toBe(true);
  });
  it("standard 10x42 allround does not", () => {
    expect(needsBattery("standard_10x42_allround")).toBe(false);
  });
});

describe("prismType", () => {
  it("wide angle birding uses roof ed extra low disp", () => {
    expect(prismType("wide_angle_birding")).toBe("roof_ed_extra_low_disp");
  });
});

describe("bestActivity", () => {
  it("compact 8x25 pocket best for travel concert hiking light", () => {
    expect(bestActivity("compact_8x25_pocket")).toBe("travel_concert_hiking_light");
  });
});

describe("binoculars", () => {
  it("returns 5 types", () => {
    expect(binoculars()).toHaveLength(5);
  });
});
