import { describe, it, expect } from "vitest";
import {
  sealStrength, throughput, filmRange, bagVariety,
  bmCost, inlineFill, forRetail, makerConfig,
  bestUse, bagMakerTypes,
} from "../bag-maker-calc.js";

describe("sealStrength", () => {
  it("gusseted bag best seal strength", () => {
    expect(sealStrength("gusseted_bag")).toBeGreaterThan(sealStrength("pillow_bag"));
  });
});

describe("throughput", () => {
  it("pillow bag highest throughput", () => {
    expect(throughput("pillow_bag")).toBeGreaterThan(throughput("stand_up_pouch"));
  });
});

describe("filmRange", () => {
  it("pillow bag best film range", () => {
    expect(filmRange("pillow_bag")).toBeGreaterThan(filmRange("wicketed_bag"));
  });
});

describe("bagVariety", () => {
  it("stand up pouch best bag variety", () => {
    expect(bagVariety("stand_up_pouch")).toBeGreaterThan(bagVariety("wicketed_bag"));
  });
});

describe("bmCost", () => {
  it("stand up pouch most expensive", () => {
    expect(bmCost("stand_up_pouch")).toBeGreaterThan(bmCost("wicketed_bag"));
  });
});

describe("inlineFill", () => {
  it("pillow bag has inline fill", () => {
    expect(inlineFill("pillow_bag")).toBe(true);
  });
  it("wicketed bag no inline fill", () => {
    expect(inlineFill("wicketed_bag")).toBe(false);
  });
});

describe("forRetail", () => {
  it("stand up pouch for retail", () => {
    expect(forRetail("stand_up_pouch")).toBe(true);
  });
  it("pillow bag not for retail", () => {
    expect(forRetail("pillow_bag")).toBe(false);
  });
});

describe("makerConfig", () => {
  it("gusseted bag uses side fold tuck bottom flat stand shelf stable", () => {
    expect(makerConfig("gusseted_bag")).toBe("gusseted_bag_maker_side_fold_tuck_bottom_flat_stand_shelf_stable");
  });
});

describe("bestUse", () => {
  it("pillow bag for snack pack vffs fill seal chip cracker cereal", () => {
    expect(bestUse("pillow_bag")).toBe("snack_pack_pillow_bag_maker_vffs_fill_seal_chip_cracker_cereal");
  });
});

describe("bagMakerTypes", () => {
  it("returns 5 types", () => {
    expect(bagMakerTypes()).toHaveLength(5);
  });
});
