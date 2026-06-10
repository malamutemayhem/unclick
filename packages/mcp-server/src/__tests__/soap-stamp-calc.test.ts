import { describe, it, expect } from "vitest";
import {
  impressDepth, detailLevel, releaseEase, durability,
  stampCost, customDesign, fullSurface, stampMaterial,
  bestSoap, soapStamps,
} from "../soap-stamp-calc.js";

describe("impressDepth", () => {
  it("metal emboss press deepest impress", () => {
    expect(impressDepth("metal_emboss_press")).toBeGreaterThan(impressDepth("silicone_mat_texture"));
  });
});

describe("detailLevel", () => {
  it("acrylic custom laser best detail level", () => {
    expect(detailLevel("acrylic_custom_laser")).toBeGreaterThan(detailLevel("silicone_mat_texture"));
  });
});

describe("releaseEase", () => {
  it("silicone mat texture easiest release", () => {
    expect(releaseEase("silicone_mat_texture")).toBeGreaterThan(releaseEase("wood_block_carved"));
  });
});

describe("durability", () => {
  it("metal emboss press most durable", () => {
    expect(durability("metal_emboss_press")).toBeGreaterThan(durability("resin_3d_printed"));
  });
});

describe("stampCost", () => {
  it("metal emboss press more expensive than silicone mat", () => {
    expect(stampCost("metal_emboss_press")).toBeGreaterThan(stampCost("silicone_mat_texture"));
  });
});

describe("customDesign", () => {
  it("acrylic custom laser supports custom design", () => {
    expect(customDesign("acrylic_custom_laser")).toBe(true);
  });
  it("silicone mat texture does not support custom design", () => {
    expect(customDesign("silicone_mat_texture")).toBe(false);
  });
});

describe("fullSurface", () => {
  it("silicone mat texture is full surface", () => {
    expect(fullSurface("silicone_mat_texture")).toBe(true);
  });
  it("acrylic custom laser is not full surface", () => {
    expect(fullSurface("acrylic_custom_laser")).toBe(false);
  });
});

describe("stampMaterial", () => {
  it("metal emboss press uses brass die machined", () => {
    expect(stampMaterial("metal_emboss_press")).toBe("brass_die_machined");
  });
});

describe("bestSoap", () => {
  it("acrylic custom laser best for cold process logo", () => {
    expect(bestSoap("acrylic_custom_laser")).toBe("cold_process_logo");
  });
});

describe("soapStamps", () => {
  it("returns 5 types", () => {
    expect(soapStamps()).toHaveLength(5);
  });
});
