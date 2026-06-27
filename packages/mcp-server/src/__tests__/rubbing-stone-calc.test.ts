import { describe, it, expect } from "vitest";
import {
  cutSpeed, surfaceFinish, durability, gritRange,
  stoneCost, synthetic, forPolish, grainType,
  bestUse, rubbingStones,
} from "../rubbing-stone-calc.js";

describe("cutSpeed", () => {
  it("silicon carbide coarse fastest cut", () => {
    expect(cutSpeed("silicon_carbide_coarse")).toBeGreaterThan(cutSpeed("pumice_block_polish"));
  });
});

describe("surfaceFinish", () => {
  it("pumice block polish best surface finish", () => {
    expect(surfaceFinish("pumice_block_polish")).toBeGreaterThan(surfaceFinish("silicon_carbide_coarse"));
  });
});

describe("durability", () => {
  it("diamond pad fine most durable", () => {
    expect(durability("diamond_pad_fine")).toBeGreaterThan(durability("pumice_block_polish"));
  });
});

describe("gritRange", () => {
  it("diamond pad fine best grit range", () => {
    expect(gritRange("diamond_pad_fine")).toBeGreaterThan(gritRange("pumice_block_polish"));
  });
});

describe("stoneCost", () => {
  it("diamond pad fine most expensive", () => {
    expect(stoneCost("diamond_pad_fine")).toBeGreaterThan(stoneCost("pumice_block_polish"));
  });
});

describe("synthetic", () => {
  it("silicon carbide coarse is synthetic", () => {
    expect(synthetic("silicon_carbide_coarse")).toBe(true);
  });
  it("natural arkansas hone not synthetic", () => {
    expect(synthetic("natural_arkansas_hone")).toBe(false);
  });
});

describe("forPolish", () => {
  it("pumice block polish is for polish", () => {
    expect(forPolish("pumice_block_polish")).toBe(true);
  });
  it("silicon carbide coarse not for polish", () => {
    expect(forPolish("silicon_carbide_coarse")).toBe(false);
  });
});

describe("grainType", () => {
  it("natural arkansas hone uses natural novaculite", () => {
    expect(grainType("natural_arkansas_hone")).toBe("natural_novaculite");
  });
});

describe("bestUse", () => {
  it("pumice block polish best for final surface polish", () => {
    expect(bestUse("pumice_block_polish")).toBe("final_surface_polish");
  });
});

describe("rubbingStones", () => {
  it("returns 5 types", () => {
    expect(rubbingStones()).toHaveLength(5);
  });
});
