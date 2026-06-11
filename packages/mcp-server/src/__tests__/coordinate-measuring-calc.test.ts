import { describe, it, expect } from "vitest";
import {
  accuracy, volume, speed, portability,
  cmCost, portable, forLargeParts, probe,
  bestUse, coordinateMeasuringTypes,
} from "../coordinate-measuring-calc.js";

describe("accuracy", () => {
  it("bridge cmm fixed highest accuracy", () => {
    expect(accuracy("bridge_cmm_fixed")).toBeGreaterThan(accuracy("portable_arm_cmm"));
  });
});

describe("volume", () => {
  it("gantry cmm large biggest volume", () => {
    expect(volume("gantry_cmm_large")).toBeGreaterThan(volume("portable_arm_cmm"));
  });
});

describe("speed", () => {
  it("optical cmm scanner fastest", () => {
    expect(speed("optical_cmm_scanner")).toBeGreaterThan(speed("gantry_cmm_large"));
  });
});

describe("portability", () => {
  it("portable arm cmm most portable", () => {
    expect(portability("portable_arm_cmm")).toBeGreaterThan(portability("bridge_cmm_fixed"));
  });
});

describe("cmCost", () => {
  it("gantry cmm large most expensive", () => {
    expect(cmCost("gantry_cmm_large")).toBeGreaterThan(cmCost("portable_arm_cmm"));
  });
});

describe("portable", () => {
  it("portable arm cmm is portable", () => {
    expect(portable("portable_arm_cmm")).toBe(true);
  });
  it("bridge cmm fixed not portable", () => {
    expect(portable("bridge_cmm_fixed")).toBe(false);
  });
});

describe("forLargeParts", () => {
  it("gantry cmm large for large parts", () => {
    expect(forLargeParts("gantry_cmm_large")).toBe(true);
  });
  it("portable arm cmm not for large parts", () => {
    expect(forLargeParts("portable_arm_cmm")).toBe(false);
  });
});

describe("probe", () => {
  it("portable arm uses articulated arm 7 axis", () => {
    expect(probe("portable_arm_cmm")).toBe("articulated_arm_7_axis_touch_or_laser_line_scan");
  });
});

describe("bestUse", () => {
  it("bridge cmm for precision machined part", () => {
    expect(bestUse("bridge_cmm_fixed")).toBe("precision_machined_part_first_article_inspection");
  });
});

describe("coordinateMeasuringTypes", () => {
  it("returns 5 types", () => {
    expect(coordinateMeasuringTypes()).toHaveLength(5);
  });
});
