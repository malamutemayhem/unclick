import { describe, it, expect } from "vitest";
import {
  lineFineness, visibility, durability, adjustRange,
  scribeCost, adjustable, permanent, markMethod,
  bestUse, timberScribes,
} from "../timber-scribe-calc.js";

describe("lineFineness", () => {
  it("race knife scratch finest line", () => {
    expect(lineFineness("race_knife_scratch")).toBeGreaterThan(lineFineness("chalk_line_snap"));
  });
});

describe("visibility", () => {
  it("chalk line snap most visible", () => {
    expect(visibility("chalk_line_snap")).toBeGreaterThan(visibility("race_knife_scratch"));
  });
});

describe("durability", () => {
  it("race knife scratch most durable", () => {
    expect(durability("race_knife_scratch")).toBeGreaterThan(durability("timber_crayon_wax"));
  });
});

describe("adjustRange", () => {
  it("chalk line snap widest adjust range", () => {
    expect(adjustRange("chalk_line_snap")).toBeGreaterThan(adjustRange("race_knife_scratch"));
  });
});

describe("scribeCost", () => {
  it("log scribe compass most expensive", () => {
    expect(scribeCost("log_scribe_compass")).toBeGreaterThan(scribeCost("timber_crayon_wax"));
  });
});

describe("adjustable", () => {
  it("log scribe compass is adjustable", () => {
    expect(adjustable("log_scribe_compass")).toBe(true);
  });
  it("race knife scratch not adjustable", () => {
    expect(adjustable("race_knife_scratch")).toBe(false);
  });
});

describe("permanent", () => {
  it("race knife scratch is permanent", () => {
    expect(permanent("race_knife_scratch")).toBe(true);
  });
  it("chalk line snap not permanent", () => {
    expect(permanent("chalk_line_snap")).toBe(false);
  });
});

describe("markMethod", () => {
  it("marking gauge pin uses pin drag score", () => {
    expect(markMethod("marking_gauge_pin")).toBe("pin_drag_score");
  });
});

describe("bestUse", () => {
  it("chalk line snap best for long straight layout", () => {
    expect(bestUse("chalk_line_snap")).toBe("long_straight_layout");
  });
});

describe("timberScribes", () => {
  it("returns 5 types", () => {
    expect(timberScribes()).toHaveLength(5);
  });
});
