import { describe, it, expect } from "vitest";
import {
  lightSpread, styleImpact, installEase, heightAdjust,
  pendantCost, dimmable, multiBulb, shadeMaterial,
  bestRoom, pendantLights,
} from "../pendant-light-calc.js";

describe("lightSpread", () => {
  it("cluster multi drop best light spread", () => {
    expect(lightSpread("cluster_multi_drop")).toBeGreaterThan(lightSpread("industrial_metal_cage"));
  });
});

describe("styleImpact", () => {
  it("cluster multi drop most style impact", () => {
    expect(styleImpact("cluster_multi_drop")).toBeGreaterThan(styleImpact("drum_shade_fabric"));
  });
});

describe("installEase", () => {
  it("industrial metal cage easiest install", () => {
    expect(installEase("industrial_metal_cage")).toBeGreaterThan(installEase("cluster_multi_drop"));
  });
});

describe("heightAdjust", () => {
  it("industrial metal cage best height adjust", () => {
    expect(heightAdjust("industrial_metal_cage")).toBeGreaterThan(heightAdjust("cluster_multi_drop"));
  });
});

describe("pendantCost", () => {
  it("cluster multi drop most expensive", () => {
    expect(pendantCost("cluster_multi_drop")).toBeGreaterThan(pendantCost("drum_shade_fabric"));
  });
});

describe("dimmable", () => {
  it("all types are dimmable", () => {
    expect(dimmable("drum_shade_fabric")).toBe(true);
    expect(dimmable("cluster_multi_drop")).toBe(true);
  });
});

describe("multiBulb", () => {
  it("cluster multi drop is multi bulb", () => {
    expect(multiBulb("cluster_multi_drop")).toBe(true);
  });
  it("glass globe clear is not", () => {
    expect(multiBulb("glass_globe_clear")).toBe(false);
  });
});

describe("shadeMaterial", () => {
  it("glass globe clear uses blown glass sphere", () => {
    expect(shadeMaterial("glass_globe_clear")).toBe("blown_glass_sphere");
  });
});

describe("bestRoom", () => {
  it("linear island bar best for kitchen island bar counter", () => {
    expect(bestRoom("linear_island_bar")).toBe("kitchen_island_bar_counter");
  });
});

describe("pendantLights", () => {
  it("returns 5 types", () => {
    expect(pendantLights()).toHaveLength(5);
  });
});
