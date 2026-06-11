import { describe, it, expect } from "vitest";
import {
  acoustic, fireRating, flexibility, aesthetic,
  pwCost, relocatable, forOffice, construction,
  bestUse, partitionWallTypes,
} from "../partition-wall-calc.js";

describe("acoustic", () => {
  it("masonry best acoustic", () => {
    expect(acoustic("masonry_cmu_block_wall")).toBeGreaterThan(acoustic("glass_frameless_tempered"));
  });
});

describe("fireRating", () => {
  it("masonry best fire rating", () => {
    expect(fireRating("masonry_cmu_block_wall")).toBeGreaterThan(fireRating("glass_frameless_tempered"));
  });
});

describe("flexibility", () => {
  it("demountable most flexible", () => {
    expect(flexibility("demountable_relocatable")).toBeGreaterThan(flexibility("masonry_cmu_block_wall"));
  });
});

describe("aesthetic", () => {
  it("glass best aesthetic", () => {
    expect(aesthetic("glass_frameless_tempered")).toBeGreaterThan(aesthetic("masonry_cmu_block_wall"));
  });
});

describe("pwCost", () => {
  it("operable most expensive", () => {
    expect(pwCost("operable_folding_acoustic")).toBeGreaterThan(pwCost("metal_stud_gypsum_board"));
  });
});

describe("relocatable", () => {
  it("demountable is relocatable", () => {
    expect(relocatable("demountable_relocatable")).toBe(true);
  });
  it("masonry not relocatable", () => {
    expect(relocatable("masonry_cmu_block_wall")).toBe(false);
  });
});

describe("forOffice", () => {
  it("metal stud for office", () => {
    expect(forOffice("metal_stud_gypsum_board")).toBe(true);
  });
  it("masonry not for office", () => {
    expect(forOffice("masonry_cmu_block_wall")).toBe(false);
  });
});

describe("construction", () => {
  it("operable uses panel track ceiling seal", () => {
    expect(construction("operable_folding_acoustic")).toBe("panel_track_ceiling_seal_fold");
  });
});

describe("bestUse", () => {
  it("glass for executive suite", () => {
    expect(bestUse("glass_frameless_tempered")).toBe("executive_suite_conference_visual");
  });
});

describe("partitionWallTypes", () => {
  it("returns 5 types", () => {
    expect(partitionWallTypes()).toHaveLength(5);
  });
});
