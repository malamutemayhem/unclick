import { describe, it, expect } from "vitest";
import {
  reductionRatio, throughput, productShape, wearLife,
  ccCost, hydraulic, forFine, chamber,
  bestUse, coneCrushTypes,
} from "../cone-crush-calc.js";

describe("reductionRatio", () => {
  it("multi cylinder highest reduction", () => {
    expect(reductionRatio("multi_cylinder_hp")).toBeGreaterThan(reductionRatio("gyratory_primary"));
  });
});

describe("throughput", () => {
  it("gyratory primary highest throughput", () => {
    expect(throughput("gyratory_primary")).toBeGreaterThan(throughput("short_head_tertiary"));
  });
});

describe("productShape", () => {
  it("multi cylinder best product shape", () => {
    expect(productShape("multi_cylinder_hp")).toBeGreaterThan(productShape("gyratory_primary"));
  });
});

describe("wearLife", () => {
  it("hydraulic adjust longest wear life", () => {
    expect(wearLife("hydraulic_adjust_spring")).toBeGreaterThan(wearLife("standard_head_secondary"));
  });
});

describe("ccCost", () => {
  it("gyratory primary most expensive", () => {
    expect(ccCost("gyratory_primary")).toBeGreaterThan(ccCost("standard_head_secondary"));
  });
});

describe("hydraulic", () => {
  it("hydraulic adjust is hydraulic", () => {
    expect(hydraulic("hydraulic_adjust_spring")).toBe(true);
  });
  it("standard head not hydraulic", () => {
    expect(hydraulic("standard_head_secondary")).toBe(false);
  });
});

describe("forFine", () => {
  it("multi cylinder for fine", () => {
    expect(forFine("multi_cylinder_hp")).toBe(true);
  });
  it("gyratory not for fine", () => {
    expect(forFine("gyratory_primary")).toBe(false);
  });
});

describe("chamber", () => {
  it("gyratory uses wide mouth spider arm", () => {
    expect(chamber("gyratory_primary")).toBe("wide_mouth_gyratory_spider_arm");
  });
});

describe("bestUse", () => {
  it("multi cylinder for fine crush sand make", () => {
    expect(bestUse("multi_cylinder_hp")).toBe("fine_crush_sand_make_mineral_process");
  });
});

describe("coneCrushTypes", () => {
  it("returns 5 types", () => {
    expect(coneCrushTypes()).toHaveLength(5);
  });
});
