import { describe, it, expect } from "vitest";
import {
  filletYield, throughput, boneRemoval, cutPrecision,
  ffCost, automated, forSalmon, filleterConfig,
  bestUse, fishFilleterTypes,
} from "../fish-filleter-calc.js";

describe("filletYield", () => {
  it("manual fillet best yield", () => {
    expect(filletYield("manual_fillet")).toBeGreaterThan(filletYield("pelagic_filleter"));
  });
});

describe("throughput", () => {
  it("pelagic filleter highest throughput", () => {
    expect(throughput("pelagic_filleter")).toBeGreaterThan(throughput("manual_fillet"));
  });
});

describe("boneRemoval", () => {
  it("manual fillet best bone removal", () => {
    expect(boneRemoval("manual_fillet")).toBeGreaterThan(boneRemoval("pelagic_filleter"));
  });
});

describe("cutPrecision", () => {
  it("manual fillet best cut precision", () => {
    expect(cutPrecision("manual_fillet")).toBeGreaterThan(cutPrecision("pelagic_filleter"));
  });
});

describe("ffCost", () => {
  it("salmon filleter most expensive", () => {
    expect(ffCost("salmon_filleter")).toBeGreaterThan(ffCost("manual_fillet"));
  });
});

describe("automated", () => {
  it("salmon filleter is automated", () => {
    expect(automated("salmon_filleter")).toBe(true);
  });
  it("manual fillet not automated", () => {
    expect(automated("manual_fillet")).toBe(false);
  });
});

describe("forSalmon", () => {
  it("salmon filleter for salmon", () => {
    expect(forSalmon("salmon_filleter")).toBe(true);
  });
  it("whitefish filleter not for salmon", () => {
    expect(forSalmon("whitefish_filleter")).toBe(false);
  });
});

describe("filleterConfig", () => {
  it("flatfish filleter uses four fillet cut", () => {
    expect(filleterConfig("flatfish_filleter")).toBe("flatfish_filleter_four_fillet_cut_sole_plaice_turbot_auto");
  });
});

describe("bestUse", () => {
  it("manual fillet for sushi grade precise custom", () => {
    expect(bestUse("manual_fillet")).toBe("premium_fish_manual_fillet_sushi_grade_precise_custom_portion");
  });
});

describe("fishFilleterTypes", () => {
  it("returns 5 types", () => {
    expect(fishFilleterTypes()).toHaveLength(5);
  });
});
