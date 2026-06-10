import { describe, it, expect } from "vitest";
import {
  glideRatio, steerability, openingReliability, packVolume,
  descentRate, allowsLandingFlare, militaryApproved, canopyShape,
  bestApplication, parachuteTypes,
} from "../parachute-type-calc.js";

describe("glideRatio", () => {
  it("ram air best glide ratio", () => {
    expect(glideRatio("ram_air")).toBeGreaterThan(glideRatio("round"));
  });
});

describe("steerability", () => {
  it("ram air most steerable", () => {
    expect(steerability("ram_air")).toBeGreaterThan(steerability("drogue"));
  });
});

describe("openingReliability", () => {
  it("round most reliable opening", () => {
    expect(openingReliability("round")).toBeGreaterThan(openingReliability("ram_air"));
  });
});

describe("packVolume", () => {
  it("parafoil largest pack volume", () => {
    expect(packVolume("parafoil")).toBeGreaterThan(packVolume("drogue"));
  });
});

describe("descentRate", () => {
  it("drogue fastest descent", () => {
    expect(descentRate("drogue")).toBeGreaterThan(descentRate("ram_air"));
  });
});

describe("allowsLandingFlare", () => {
  it("ram air allows flare", () => {
    expect(allowsLandingFlare("ram_air")).toBe(true);
  });
  it("round does not", () => {
    expect(allowsLandingFlare("round")).toBe(false);
  });
});

describe("militaryApproved", () => {
  it("round is military approved", () => {
    expect(militaryApproved("round")).toBe(true);
  });
  it("parafoil is not", () => {
    expect(militaryApproved("parafoil")).toBe(false);
  });
});

describe("canopyShape", () => {
  it("ram air is rectangular cells", () => {
    expect(canopyShape("ram_air")).toBe("rectangular_cells");
  });
});

describe("bestApplication", () => {
  it("ram air for sport skydiving", () => {
    expect(bestApplication("ram_air")).toBe("sport_skydiving");
  });
});

describe("parachuteTypes", () => {
  it("returns 5 types", () => {
    expect(parachuteTypes()).toHaveLength(5);
  });
});
