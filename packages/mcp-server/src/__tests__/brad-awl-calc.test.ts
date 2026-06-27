import { describe, it, expect } from "vitest";
import {
  holeStart, markClarity, woodSplit, handleGrip,
  awlCost, twistAction, forScrew, tipProfile,
  bestUse, bradAwls,
} from "../brad-awl-calc.js";

describe("holeStart", () => {
  it("birdcage twist point best hole start", () => {
    expect(holeStart("birdcage_twist_point")).toBeGreaterThan(holeStart("round_scratch_mark"));
  });
});

describe("markClarity", () => {
  it("round scratch mark best mark clarity", () => {
    expect(markClarity("round_scratch_mark")).toBeGreaterThan(markClarity("tapered_brad_push"));
  });
});

describe("woodSplit", () => {
  it("square blade pilot most wood split", () => {
    expect(woodSplit("square_blade_pilot")).toBeGreaterThan(woodSplit("round_scratch_mark"));
  });
});

describe("handleGrip", () => {
  it("square blade pilot best handle grip", () => {
    expect(handleGrip("square_blade_pilot")).toBeGreaterThan(handleGrip("round_scratch_mark"));
  });
});

describe("awlCost", () => {
  it("birdcage twist point more expensive", () => {
    expect(awlCost("birdcage_twist_point")).toBeGreaterThan(awlCost("straight_diamond_tip"));
  });
});

describe("twistAction", () => {
  it("birdcage twist point has twist action", () => {
    expect(twistAction("birdcage_twist_point")).toBe(true);
  });
  it("straight diamond tip no twist action", () => {
    expect(twistAction("straight_diamond_tip")).toBe(false);
  });
});

describe("forScrew", () => {
  it("square blade pilot is for screw", () => {
    expect(forScrew("square_blade_pilot")).toBe(true);
  });
  it("round scratch mark not for screw", () => {
    expect(forScrew("round_scratch_mark")).toBe(false);
  });
});

describe("tipProfile", () => {
  it("birdcage twist point uses twisted flute point", () => {
    expect(tipProfile("birdcage_twist_point")).toBe("twisted_flute_point");
  });
});

describe("bestUse", () => {
  it("round scratch mark best for layout scratch mark", () => {
    expect(bestUse("round_scratch_mark")).toBe("layout_scratch_mark");
  });
});

describe("bradAwls", () => {
  it("returns 5 types", () => {
    expect(bradAwls()).toHaveLength(5);
  });
});
