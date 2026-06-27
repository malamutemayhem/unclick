import { describe, it, expect } from "vitest";
import {
  cutUniformity, cutSpeed, curdDamage, sizeRange,
  ccCost, automated, forSoft, cutterConfig,
  bestUse, curdCutterTypes,
} from "../curd-cutter-calc.js";

describe("cutUniformity", () => {
  it("ultrasonic blade best cut uniformity", () => {
    expect(cutUniformity("ultrasonic_blade")).toBeGreaterThan(cutUniformity("manual_harp"));
  });
});

describe("cutSpeed", () => {
  it("automated column fastest cut speed", () => {
    expect(cutSpeed("automated_column")).toBeGreaterThan(cutSpeed("manual_harp"));
  });
});

describe("curdDamage", () => {
  it("ultrasonic blade least curd damage", () => {
    expect(curdDamage("ultrasonic_blade")).toBeGreaterThan(curdDamage("automated_column"));
  });
});

describe("sizeRange", () => {
  it("ultrasonic blade best size range", () => {
    expect(sizeRange("ultrasonic_blade")).toBeGreaterThan(sizeRange("manual_harp"));
  });
});

describe("ccCost", () => {
  it("ultrasonic blade most expensive", () => {
    expect(ccCost("ultrasonic_blade")).toBeGreaterThan(ccCost("manual_harp"));
  });
});

describe("automated", () => {
  it("vertical knife is automated", () => {
    expect(automated("vertical_knife")).toBe(true);
  });
  it("manual harp not automated", () => {
    expect(automated("manual_harp")).toBe(false);
  });
});

describe("forSoft", () => {
  it("ultrasonic blade for soft cheese", () => {
    expect(forSoft("ultrasonic_blade")).toBe(true);
  });
  it("vertical knife not for soft", () => {
    expect(forSoft("vertical_knife")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("automated column uses programmable blade speed", () => {
    expect(cutterConfig("automated_column")).toBe("automated_column_curd_cutter_programmable_blade_speed_size_adjust");
  });
});

describe("bestUse", () => {
  it("manual harp for artisan creamery", () => {
    expect(bestUse("manual_harp")).toBe("artisan_creamery_manual_harp_curd_cutter_hand_drawn_traditional");
  });
});

describe("curdCutterTypes", () => {
  it("returns 5 types", () => {
    expect(curdCutterTypes()).toHaveLength(5);
  });
});
