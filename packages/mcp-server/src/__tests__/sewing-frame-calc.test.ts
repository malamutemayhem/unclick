import { describe, it, expect } from "vitest";
import {
  holdStrength, adjustability, portability, stability,
  frameCost, hasPress, usesCords, frameMaterial,
  bestUse, sewingFrames,
} from "../sewing-frame-calc.js";

describe("holdStrength", () => {
  it("adjustable metal pro strongest hold", () => {
    expect(holdStrength("adjustable_metal_pro")).toBeGreaterThan(holdStrength("tabletop_clamp_small"));
  });
});

describe("adjustability", () => {
  it("adjustable metal pro most adjustable", () => {
    expect(adjustability("adjustable_metal_pro")).toBeGreaterThan(adjustability("wood_upright_basic"));
  });
});

describe("portability", () => {
  it("tabletop clamp small most portable", () => {
    expect(portability("tabletop_clamp_small")).toBeGreaterThan(portability("finishing_press_combo"));
  });
});

describe("stability", () => {
  it("adjustable metal pro most stable", () => {
    expect(stability("adjustable_metal_pro")).toBeGreaterThan(stability("tabletop_clamp_small"));
  });
});

describe("frameCost", () => {
  it("finishing press combo most expensive", () => {
    expect(frameCost("finishing_press_combo")).toBeGreaterThan(frameCost("wood_upright_basic"));
  });
});

describe("hasPress", () => {
  it("finishing press combo has press", () => {
    expect(hasPress("finishing_press_combo")).toBe(true);
  });
  it("wood upright basic no press", () => {
    expect(hasPress("wood_upright_basic")).toBe(false);
  });
});

describe("usesCords", () => {
  it("wood upright basic uses cords", () => {
    expect(usesCords("wood_upright_basic")).toBe(true);
  });
  it("tabletop clamp small no cords", () => {
    expect(usesCords("tabletop_clamp_small")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("wood upright basic uses beech dowel crossbar", () => {
    expect(frameMaterial("wood_upright_basic")).toBe("beech_dowel_crossbar");
  });
});

describe("bestUse", () => {
  it("adjustable metal pro best for production workshop", () => {
    expect(bestUse("adjustable_metal_pro")).toBe("production_workshop");
  });
});

describe("sewingFrames", () => {
  it("returns 5 types", () => {
    expect(sewingFrames()).toHaveLength(5);
  });
});
