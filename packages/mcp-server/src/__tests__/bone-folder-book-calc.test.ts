import { describe, it, expect } from "vitest";
import {
  creaseSharp, slideSmooth, markFree, durability,
  folderCost, synthetic, forBurnish, tipProfile,
  bestUse, boneFolderBooks,
} from "../bone-folder-book-calc.js";

describe("creaseSharp", () => {
  it("bovine bone classic sharpest crease", () => {
    expect(creaseSharp("bovine_bone_classic")).toBeGreaterThan(creaseSharp("plastic_student_basic"));
  });
});

describe("slideSmooth", () => {
  it("teflon smooth slide smoothest", () => {
    expect(slideSmooth("teflon_smooth_slide")).toBeGreaterThan(slideSmooth("bamboo_light_flex"));
  });
});

describe("markFree", () => {
  it("teflon smooth slide most mark free", () => {
    expect(markFree("teflon_smooth_slide")).toBeGreaterThan(markFree("plastic_student_basic"));
  });
});

describe("durability", () => {
  it("agate stone burnish most durable", () => {
    expect(durability("agate_stone_burnish")).toBeGreaterThan(durability("bamboo_light_flex"));
  });
});

describe("folderCost", () => {
  it("agate stone burnish most expensive", () => {
    expect(folderCost("agate_stone_burnish")).toBeGreaterThan(folderCost("plastic_student_basic"));
  });
});

describe("synthetic", () => {
  it("teflon smooth slide is synthetic", () => {
    expect(synthetic("teflon_smooth_slide")).toBe(true);
  });
  it("bovine bone classic not synthetic", () => {
    expect(synthetic("bovine_bone_classic")).toBe(false);
  });
});

describe("forBurnish", () => {
  it("agate stone burnish is for burnish", () => {
    expect(forBurnish("agate_stone_burnish")).toBe(true);
  });
  it("bovine bone classic not for burnish", () => {
    expect(forBurnish("bovine_bone_classic")).toBe(false);
  });
});

describe("tipProfile", () => {
  it("agate stone burnish uses polished stone dome", () => {
    expect(tipProfile("agate_stone_burnish")).toBe("polished_stone_dome");
  });
});

describe("bestUse", () => {
  it("teflon smooth slide best for coated paper safe", () => {
    expect(bestUse("teflon_smooth_slide")).toBe("coated_paper_safe");
  });
});

describe("boneFolderBooks", () => {
  it("returns 5 types", () => {
    expect(boneFolderBooks()).toHaveLength(5);
  });
});
