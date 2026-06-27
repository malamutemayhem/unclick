import { describe, it, expect } from "vitest";
import {
  lineVisibility, lineAccuracy, rewindSpeed, lineLength,
  chalkCost, geared, pocketSize, caseType,
  bestUse, chalkLines,
} from "../chalk-line-calc.js";

describe("lineVisibility", () => {
  it("fine powder precision most visible line", () => {
    expect(lineVisibility("fine_powder_precision")).toBeGreaterThan(lineVisibility("mini_pocket_compact"));
  });
});

describe("lineAccuracy", () => {
  it("fine powder precision most accurate", () => {
    expect(lineAccuracy("fine_powder_precision")).toBeGreaterThan(lineAccuracy("mini_pocket_compact"));
  });
});

describe("rewindSpeed", () => {
  it("geared fast rewind fastest rewind", () => {
    expect(rewindSpeed("geared_fast_rewind")).toBeGreaterThan(rewindSpeed("mini_pocket_compact"));
  });
});

describe("lineLength", () => {
  it("heavy duty 100ft longest line", () => {
    expect(lineLength("heavy_duty_100ft")).toBeGreaterThan(lineLength("mini_pocket_compact"));
  });
});

describe("chalkCost", () => {
  it("geared fast rewind more expensive", () => {
    expect(chalkCost("geared_fast_rewind")).toBeGreaterThan(chalkCost("reel_snap_standard"));
  });
});

describe("geared", () => {
  it("geared fast rewind is geared", () => {
    expect(geared("geared_fast_rewind")).toBe(true);
  });
  it("reel snap standard not geared", () => {
    expect(geared("reel_snap_standard")).toBe(false);
  });
});

describe("pocketSize", () => {
  it("mini pocket compact is pocket size", () => {
    expect(pocketSize("mini_pocket_compact")).toBe(true);
  });
  it("heavy duty 100ft not pocket size", () => {
    expect(pocketSize("heavy_duty_100ft")).toBe(false);
  });
});

describe("caseType", () => {
  it("reel snap standard uses abs plastic reel", () => {
    expect(caseType("reel_snap_standard")).toBe("abs_plastic_reel");
  });
});

describe("bestUse", () => {
  it("heavy duty 100ft best for long distance layout", () => {
    expect(bestUse("heavy_duty_100ft")).toBe("long_distance_layout");
  });
});

describe("chalkLines", () => {
  it("returns 5 types", () => {
    expect(chalkLines()).toHaveLength(5);
  });
});
