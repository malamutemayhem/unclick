import { describe, it, expect } from "vitest";
import {
  pressureEven, forceNeeded, printClarity, durability,
  barenCost, traditional, forLargePrint, surfaceType,
  bestPrint, barens,
} from "../baren-calc.js";

describe("pressureEven", () => {
  it("ball bearing modern best pressure even", () => {
    expect(pressureEven("ball_bearing_modern")).toBeGreaterThan(pressureEven("wooden_disc_flat"));
  });
});

describe("forceNeeded", () => {
  it("ball bearing modern best force transfer", () => {
    expect(forceNeeded("ball_bearing_modern")).toBeGreaterThan(forceNeeded("wooden_disc_flat"));
  });
});

describe("printClarity", () => {
  it("murasaki lacquer pro best print clarity", () => {
    expect(printClarity("murasaki_lacquer_pro")).toBeGreaterThan(printClarity("wooden_disc_flat"));
  });
});

describe("durability", () => {
  it("ball bearing modern most durable", () => {
    expect(durability("ball_bearing_modern")).toBeGreaterThan(durability("bamboo_sheath_traditional"));
  });
});

describe("barenCost", () => {
  it("murasaki lacquer pro most expensive", () => {
    expect(barenCost("murasaki_lacquer_pro")).toBeGreaterThan(barenCost("wooden_disc_flat"));
  });
});

describe("traditional", () => {
  it("bamboo sheath traditional is traditional", () => {
    expect(traditional("bamboo_sheath_traditional")).toBe(true);
  });
  it("ball bearing modern is not traditional", () => {
    expect(traditional("ball_bearing_modern")).toBe(false);
  });
});

describe("forLargePrint", () => {
  it("ball bearing modern is for large print", () => {
    expect(forLargePrint("ball_bearing_modern")).toBe(true);
  });
  it("wooden disc flat is not for large print", () => {
    expect(forLargePrint("wooden_disc_flat")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("bamboo sheath traditional uses twisted bamboo cord", () => {
    expect(surfaceType("bamboo_sheath_traditional")).toBe("twisted_bamboo_cord");
  });
});

describe("bestPrint", () => {
  it("murasaki lacquer pro best for ukiyo e fine detail", () => {
    expect(bestPrint("murasaki_lacquer_pro")).toBe("ukiyo_e_fine_detail");
  });
});

describe("barens", () => {
  it("returns 5 types", () => {
    expect(barens()).toHaveLength(5);
  });
});
