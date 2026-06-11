import { describe, it, expect } from "vitest";
import {
  taperClean, holeFit, speedReam, sizeRange,
  ramerCost, adjustable, forHardwood, fluteStyle,
  bestUse, pegRamers,
} from "../peg-ramer-calc.js";

describe("taperClean", () => {
  it("shell reamer smooth cleanest taper", () => {
    expect(taperClean("shell_reamer_smooth")).toBeGreaterThan(taperClean("adjustable_reamer_set"));
  });
});

describe("holeFit", () => {
  it("shell reamer smooth best hole fit", () => {
    expect(holeFit("shell_reamer_smooth")).toBeGreaterThan(holeFit("stepped_reamer_size"));
  });
});

describe("speedReam", () => {
  it("spiral flute fast fastest ream", () => {
    expect(speedReam("spiral_flute_fast")).toBeGreaterThan(speedReam("shell_reamer_smooth"));
  });
});

describe("sizeRange", () => {
  it("stepped reamer size best size range", () => {
    expect(sizeRange("stepped_reamer_size")).toBeGreaterThan(sizeRange("shell_reamer_smooth"));
  });
});

describe("ramerCost", () => {
  it("adjustable reamer set most expensive", () => {
    expect(ramerCost("adjustable_reamer_set")).toBeGreaterThan(ramerCost("tapered_reamer_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable reamer set is adjustable", () => {
    expect(adjustable("adjustable_reamer_set")).toBe(true);
  });
  it("tapered reamer standard not adjustable", () => {
    expect(adjustable("tapered_reamer_standard")).toBe(false);
  });
});

describe("forHardwood", () => {
  it("tapered reamer standard is for hardwood", () => {
    expect(forHardwood("tapered_reamer_standard")).toBe(true);
  });
  it("stepped reamer size not for hardwood", () => {
    expect(forHardwood("stepped_reamer_size")).toBe(false);
  });
});

describe("fluteStyle", () => {
  it("spiral flute fast uses spiral chip clear", () => {
    expect(fluteStyle("spiral_flute_fast")).toBe("spiral_chip_clear");
  });
});

describe("bestUse", () => {
  it("shell reamer smooth best for finish ream smooth", () => {
    expect(bestUse("shell_reamer_smooth")).toBe("finish_ream_smooth");
  });
});

describe("pegRamers", () => {
  it("returns 5 types", () => {
    expect(pegRamers()).toHaveLength(5);
  });
});
