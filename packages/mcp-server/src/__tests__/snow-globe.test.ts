import { describe, it, expect } from "vitest";
import {
  globeVolumeMl, waterAmount, glycerinAmount, glitterAmount,
  settleTime, sealantRing, baseHeight, figurineMaxHeight,
  distilledWaterNeeded, musicBoxFits, shakeForce,
  airBubbleRemoval, costEstimate, globeSizes,
} from "../snow-globe.js";

describe("globeVolumeMl", () => {
  it("positive ml", () => {
    expect(globeVolumeMl(10)).toBeGreaterThan(0);
  });
  it("larger diameter = more volume", () => {
    expect(globeVolumeMl(15)).toBeGreaterThan(globeVolumeMl(10));
  });
});

describe("waterAmount", () => {
  it("pure water = full volume", () => {
    expect(waterAmount(500, "water")).toBe(500);
  });
  it("glycerin mix has less water", () => {
    expect(waterAmount(500, "glycerin_mix")).toBeLessThan(500);
  });
});

describe("glycerinAmount", () => {
  it("30% of volume", () => {
    expect(glycerinAmount(500)).toBe(150);
  });
});

describe("glitterAmount", () => {
  it("positive grams", () => {
    expect(glitterAmount(500)).toBeGreaterThan(0);
  });
});

describe("settleTime", () => {
  it("water settles fastest", () => {
    expect(settleTime("water")).toBeLessThan(settleTime("mineral_oil"));
  });
});

describe("sealantRing", () => {
  it("positive cm", () => {
    expect(sealantRing(10)).toBeGreaterThan(0);
  });
});

describe("baseHeight", () => {
  it("40% of diameter", () => {
    expect(baseHeight(10)).toBe(4);
  });
});

describe("figurineMaxHeight", () => {
  it("60% of diameter", () => {
    expect(figurineMaxHeight(10)).toBe(6);
  });
});

describe("distilledWaterNeeded", () => {
  it("always true", () => {
    expect(distilledWaterNeeded(500)).toBe(true);
  });
});

describe("musicBoxFits", () => {
  it("10cm+ fits", () => {
    expect(musicBoxFits(10)).toBe(true);
  });
  it("too small does not fit", () => {
    expect(musicBoxFits(5)).toBe(false);
  });
});

describe("shakeForce", () => {
  it("small = gentle", () => {
    expect(shakeForce(100)).toBe("gentle");
  });
  it("large = vigorous", () => {
    expect(shakeForce(600)).toBe("vigorous");
  });
});

describe("airBubbleRemoval", () => {
  it("returns instructions", () => {
    expect(typeof airBubbleRemoval("water")).toBe("string");
  });
});

describe("costEstimate", () => {
  it("musical costs more than mini", () => {
    expect(costEstimate("musical")).toBeGreaterThan(costEstimate("mini"));
  });
});

describe("globeSizes", () => {
  it("returns 5 sizes", () => {
    expect(globeSizes()).toHaveLength(5);
  });
});
