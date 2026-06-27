import { describe, it, expect } from "vitest";
import {
  spacingEven, warpSafe, setupSpeed, densityRange,
  raddleCost, adjustable, portable, pegStyle,
  bestUse, raddleCrosses,
} from "../raddle-cross-calc.js";

describe("spacingEven", () => {
  it("adjustable slot metal most even spacing", () => {
    expect(spacingEven("adjustable_slot_metal")).toBeGreaterThan(spacingEven("nail_raddle_board"));
  });
});

describe("warpSafe", () => {
  it("peg raddle wood safest for warp", () => {
    expect(warpSafe("peg_raddle_wood")).toBeGreaterThan(warpSafe("nail_raddle_board"));
  });
});

describe("setupSpeed", () => {
  it("clamp raddle table fastest setup", () => {
    expect(setupSpeed("clamp_raddle_table")).toBeGreaterThan(setupSpeed("adjustable_slot_metal"));
  });
});

describe("densityRange", () => {
  it("adjustable slot metal widest density range", () => {
    expect(densityRange("adjustable_slot_metal")).toBeGreaterThan(densityRange("peg_raddle_wood"));
  });
});

describe("raddleCost", () => {
  it("adjustable slot metal most expensive", () => {
    expect(raddleCost("adjustable_slot_metal")).toBeGreaterThan(raddleCost("nail_raddle_board"));
  });
});

describe("adjustable", () => {
  it("adjustable slot metal is adjustable", () => {
    expect(adjustable("adjustable_slot_metal")).toBe(true);
  });
  it("peg raddle wood not adjustable", () => {
    expect(adjustable("peg_raddle_wood")).toBe(false);
  });
});

describe("portable", () => {
  it("portable fold travel is portable", () => {
    expect(portable("portable_fold_travel")).toBe(true);
  });
  it("clamp raddle table not portable", () => {
    expect(portable("clamp_raddle_table")).toBe(false);
  });
});

describe("pegStyle", () => {
  it("nail raddle board uses wire nail driven", () => {
    expect(pegStyle("nail_raddle_board")).toBe("wire_nail_driven");
  });
});

describe("bestUse", () => {
  it("clamp raddle table best for table loom warp", () => {
    expect(bestUse("clamp_raddle_table")).toBe("table_loom_warp");
  });
});

describe("raddleCrosses", () => {
  it("returns 5 types", () => {
    expect(raddleCrosses()).toHaveLength(5);
  });
});
