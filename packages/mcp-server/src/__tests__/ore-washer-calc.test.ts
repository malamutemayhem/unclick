import { describe, it, expect } from "vitest";
import {
  cleaningEfficiency, throughput, clayRemoval, waterUsage,
  owCost, heavy, forAlluvial, washerConfig,
  bestUse, oreWasherTypes,
} from "../ore-washer-calc.js";

describe("cleaningEfficiency", () => {
  it("attrition scrubber best cleaning efficiency", () => {
    expect(cleaningEfficiency("attrition_scrubber")).toBeGreaterThan(cleaningEfficiency("spiral_washer"));
  });
});

describe("throughput", () => {
  it("bucket wheel highest throughput", () => {
    expect(throughput("bucket_wheel")).toBeGreaterThan(throughput("attrition_scrubber"));
  });
});

describe("clayRemoval", () => {
  it("log washer best clay removal", () => {
    expect(clayRemoval("log_washer")).toBeGreaterThan(clayRemoval("bucket_wheel"));
  });
});

describe("waterUsage", () => {
  it("bucket wheel most water usage", () => {
    expect(waterUsage("bucket_wheel")).toBeGreaterThan(waterUsage("attrition_scrubber"));
  });
});

describe("owCost", () => {
  it("bucket wheel most expensive", () => {
    expect(owCost("bucket_wheel")).toBeGreaterThan(owCost("spiral_washer"));
  });
});

describe("heavy", () => {
  it("log washer is heavy", () => {
    expect(heavy("log_washer")).toBe(true);
  });
  it("attrition scrubber not heavy", () => {
    expect(heavy("attrition_scrubber")).toBe(false);
  });
});

describe("forAlluvial", () => {
  it("trommel scrubber for alluvial", () => {
    expect(forAlluvial("trommel_scrubber")).toBe(true);
  });
  it("attrition scrubber not for alluvial", () => {
    expect(forAlluvial("attrition_scrubber")).toBe(false);
  });
});

describe("washerConfig", () => {
  it("spiral washer uses inclined trough screw conveyor rinse dewater ore", () => {
    expect(washerConfig("spiral_washer")).toBe("spiral_washer_inclined_trough_screw_conveyor_rinse_dewater_ore");
  });
});

describe("bestUse", () => {
  it("trommel scrubber for alluvial gold wash screen classify placer", () => {
    expect(bestUse("trommel_scrubber")).toBe("alluvial_gold_trommel_scrubber_wash_screen_classify_placer");
  });
});

describe("oreWasherTypes", () => {
  it("returns 5 types", () => {
    expect(oreWasherTypes()).toHaveLength(5);
  });
});
