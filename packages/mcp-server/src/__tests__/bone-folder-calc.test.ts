import { describe, it, expect } from "vitest";
import {
  foldCrispness, paperSafe, burnishQuality, durability,
  folderCost, noMarking, forBookbinding, tipMaterial,
  bestUse, boneFolders,
} from "../bone-folder-calc.js";

describe("foldCrispness", () => {
  it("genuine bone classic crispest fold", () => {
    expect(foldCrispness("genuine_bone_classic")).toBeGreaterThan(foldCrispness("plastic_student_safe"));
  });
});

describe("paperSafe", () => {
  it("teflon smooth glide most paper safe", () => {
    expect(paperSafe("teflon_smooth_glide")).toBeGreaterThan(paperSafe("agate_burnish_polish"));
  });
});

describe("burnishQuality", () => {
  it("agate burnish polish best burnish quality", () => {
    expect(burnishQuality("agate_burnish_polish")).toBeGreaterThan(burnishQuality("plastic_student_safe"));
  });
});

describe("durability", () => {
  it("agate burnish polish most durable", () => {
    expect(durability("agate_burnish_polish")).toBeGreaterThan(durability("plastic_student_safe"));
  });
});

describe("folderCost", () => {
  it("agate burnish polish more expensive than bamboo", () => {
    expect(folderCost("agate_burnish_polish")).toBeGreaterThan(folderCost("bamboo_eco_light"));
  });
});

describe("noMarking", () => {
  it("teflon smooth glide has no marking", () => {
    expect(noMarking("teflon_smooth_glide")).toBe(true);
  });
  it("genuine bone classic can mark", () => {
    expect(noMarking("genuine_bone_classic")).toBe(false);
  });
});

describe("forBookbinding", () => {
  it("genuine bone classic is for bookbinding", () => {
    expect(forBookbinding("genuine_bone_classic")).toBe(true);
  });
  it("plastic student safe is not for bookbinding", () => {
    expect(forBookbinding("plastic_student_safe")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("genuine bone classic uses polished cattle bone", () => {
    expect(tipMaterial("genuine_bone_classic")).toBe("polished_cattle_bone");
  });
});

describe("bestUse", () => {
  it("agate burnish polish best for gold leaf burnish", () => {
    expect(bestUse("agate_burnish_polish")).toBe("gold_leaf_burnish");
  });
});

describe("boneFolders", () => {
  it("returns 5 types", () => {
    expect(boneFolders()).toHaveLength(5);
  });
});
