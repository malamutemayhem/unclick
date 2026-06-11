import { describe, it, expect } from "vitest";
import {
  brightness, digitCount, viewDistance, powerDraw,
  segCost, commonCathode, multiplexed, segmentType,
  bestUse, sevenSegments,
} from "../seven-segment-calc.js";

describe("brightness", () => {
  it("large digit outdoor brightest", () => {
    expect(brightness("large_digit_outdoor")).toBeGreaterThan(brightness("single_digit_led"));
  });
});

describe("digitCount", () => {
  it("large digit outdoor most digits", () => {
    expect(digitCount("large_digit_outdoor")).toBeGreaterThan(digitCount("single_digit_led"));
  });
});

describe("viewDistance", () => {
  it("large digit outdoor farthest view distance", () => {
    expect(viewDistance("large_digit_outdoor")).toBeGreaterThan(viewDistance("single_digit_led"));
  });
});

describe("powerDraw", () => {
  it("single digit led lowest power draw", () => {
    expect(powerDraw("single_digit_led")).toBeGreaterThan(powerDraw("large_digit_outdoor"));
  });
});

describe("segCost", () => {
  it("large digit outdoor most expensive", () => {
    expect(segCost("large_digit_outdoor")).toBeGreaterThan(segCost("single_digit_led"));
  });
});

describe("commonCathode", () => {
  it("single digit led is common cathode", () => {
    expect(commonCathode("single_digit_led")).toBe(true);
  });
  it("large digit outdoor not common cathode", () => {
    expect(commonCathode("large_digit_outdoor")).toBe(false);
  });
});

describe("multiplexed", () => {
  it("four digit clock is multiplexed", () => {
    expect(multiplexed("four_digit_clock")).toBe(true);
  });
  it("single digit led not multiplexed", () => {
    expect(multiplexed("single_digit_led")).toBe(false);
  });
});

describe("segmentType", () => {
  it("alphanumeric 14seg uses 14 segment alpha", () => {
    expect(segmentType("alphanumeric_14seg")).toBe("14_segment_alpha");
  });
});

describe("bestUse", () => {
  it("four digit clock best for clock counter show", () => {
    expect(bestUse("four_digit_clock")).toBe("clock_counter_show");
  });
});

describe("sevenSegments", () => {
  it("returns 5 types", () => {
    expect(sevenSegments()).toHaveLength(5);
  });
});
