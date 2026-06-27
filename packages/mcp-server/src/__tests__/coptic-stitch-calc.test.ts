import { describe, it, expect } from "vitest";
import {
  holdStrength, layFlat, stitchSpeed, decorativeValue,
  stitchCost, exposed, forThick, linkPattern,
  bestUse, copticStitches,
} from "../coptic-stitch-calc.js";

describe("holdStrength", () => {
  it("ethiopian wrap bind strongest hold", () => {
    expect(holdStrength("ethiopian_wrap_bind")).toBeGreaterThan(holdStrength("long_stitch_exposed"));
  });
});

describe("layFlat", () => {
  it("basic chain link lays flattest", () => {
    expect(layFlat("basic_chain_link")).toBeGreaterThan(layFlat("caterpillar_raised"));
  });
});

describe("stitchSpeed", () => {
  it("long stitch exposed fastest stitch", () => {
    expect(stitchSpeed("long_stitch_exposed")).toBeGreaterThan(stitchSpeed("ethiopian_wrap_bind"));
  });
});

describe("decorativeValue", () => {
  it("caterpillar raised most decorative", () => {
    expect(decorativeValue("caterpillar_raised")).toBeGreaterThan(decorativeValue("basic_chain_link"));
  });
});

describe("stitchCost", () => {
  it("ethiopian wrap bind most expensive", () => {
    expect(stitchCost("ethiopian_wrap_bind")).toBeGreaterThan(stitchCost("basic_chain_link"));
  });
});

describe("exposed", () => {
  it("basic chain link is exposed", () => {
    expect(exposed("basic_chain_link")).toBe(true);
  });
  it("caterpillar raised is exposed", () => {
    expect(exposed("caterpillar_raised")).toBe(true);
  });
});

describe("forThick", () => {
  it("ethiopian wrap bind is for thick", () => {
    expect(forThick("ethiopian_wrap_bind")).toBe(true);
  });
  it("basic chain link not for thick", () => {
    expect(forThick("basic_chain_link")).toBe(false);
  });
});

describe("linkPattern", () => {
  it("caterpillar raised uses raised caterpillar", () => {
    expect(linkPattern("caterpillar_raised")).toBe("raised_caterpillar");
  });
});

describe("bestUse", () => {
  it("ethiopian wrap bind best for heavy board bind", () => {
    expect(bestUse("ethiopian_wrap_bind")).toBe("heavy_board_bind");
  });
});

describe("copticStitches", () => {
  it("returns 5 types", () => {
    expect(copticStitches()).toHaveLength(5);
  });
});
