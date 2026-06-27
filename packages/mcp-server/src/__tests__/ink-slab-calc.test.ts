import { describe, it, expect } from "vitest";
import {
  inkMixing, cleanEase, stability, inkRetention,
  slabCost, seeThrough, nonPorous, surfaceFinish,
  bestInk, inkSlabs,
} from "../ink-slab-calc.js";

describe("inkMixing", () => {
  it("glass plate smooth best ink mixing", () => {
    expect(inkMixing("glass_plate_smooth")).toBeGreaterThan(inkMixing("acrylic_sheet_clear"));
  });
});

describe("cleanEase", () => {
  it("glass plate smooth easiest to clean", () => {
    expect(cleanEase("glass_plate_smooth")).toBeGreaterThan(cleanEase("granite_stone_heavy"));
  });
});

describe("stability", () => {
  it("granite stone heavy most stable", () => {
    expect(stability("granite_stone_heavy")).toBeGreaterThan(stability("glass_plate_smooth"));
  });
});

describe("inkRetention", () => {
  it("granite stone heavy best ink retention", () => {
    expect(inkRetention("granite_stone_heavy")).toBeGreaterThan(inkRetention("acrylic_sheet_clear"));
  });
});

describe("slabCost", () => {
  it("marble tile cold more expensive than glass", () => {
    expect(slabCost("marble_tile_cold")).toBeGreaterThan(slabCost("glass_plate_smooth"));
  });
});

describe("seeThrough", () => {
  it("glass plate smooth is see through", () => {
    expect(seeThrough("glass_plate_smooth")).toBe(true);
  });
  it("granite stone heavy is not see through", () => {
    expect(seeThrough("granite_stone_heavy")).toBe(false);
  });
});

describe("nonPorous", () => {
  it("glass plate smooth is non porous", () => {
    expect(nonPorous("glass_plate_smooth")).toBe(true);
  });
  it("granite stone heavy is not non porous", () => {
    expect(nonPorous("granite_stone_heavy")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("granite stone heavy uses honed natural granite", () => {
    expect(surfaceFinish("granite_stone_heavy")).toBe("honed_natural_granite");
  });
});

describe("bestInk", () => {
  it("glass plate smooth best for oil based relief ink", () => {
    expect(bestInk("glass_plate_smooth")).toBe("oil_based_relief_ink");
  });
});

describe("inkSlabs", () => {
  it("returns 5 types", () => {
    expect(inkSlabs()).toHaveLength(5);
  });
});
