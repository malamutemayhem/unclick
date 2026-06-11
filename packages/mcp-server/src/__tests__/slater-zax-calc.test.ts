import { describe, it, expect } from "vitest";
import {
  cutClean, holePunch, nailPull, controlGrip,
  zaxCost, multiFunction, forThin, bladeStyle,
  bestUse, slaterZaxs,
} from "../slater-zax-calc.js";

describe("cutClean", () => {
  it("standard slate cut cleanest cut", () => {
    expect(cutClean("standard_slate_cut")).toBeGreaterThan(cutClean("ripper_nail_pull"));
  });
});

describe("holePunch", () => {
  it("stake hole punch best hole punch", () => {
    expect(holePunch("stake_hole_punch")).toBeGreaterThan(holePunch("ripper_nail_pull"));
  });
});

describe("nailPull", () => {
  it("ripper nail pull best nail pull", () => {
    expect(nailPull("ripper_nail_pull")).toBeGreaterThan(nailPull("standard_slate_cut"));
  });
});

describe("controlGrip", () => {
  it("lightweight thin slate best control grip", () => {
    expect(controlGrip("lightweight_thin_slate")).toBeGreaterThan(controlGrip("combination_multi_tool"));
  });
});

describe("zaxCost", () => {
  it("combination multi tool most expensive", () => {
    expect(zaxCost("combination_multi_tool")).toBeGreaterThan(zaxCost("standard_slate_cut"));
  });
});

describe("multiFunction", () => {
  it("combination multi tool is multi function", () => {
    expect(multiFunction("combination_multi_tool")).toBe(true);
  });
  it("standard slate cut not multi function", () => {
    expect(multiFunction("standard_slate_cut")).toBe(false);
  });
});

describe("forThin", () => {
  it("lightweight thin slate is for thin", () => {
    expect(forThin("lightweight_thin_slate")).toBe(true);
  });
  it("standard slate cut not for thin", () => {
    expect(forThin("standard_slate_cut")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("combination multi tool uses combo cut punch rip", () => {
    expect(bladeStyle("combination_multi_tool")).toBe("combo_cut_punch_rip");
  });
});

describe("bestUse", () => {
  it("standard slate cut best for general slate trim", () => {
    expect(bestUse("standard_slate_cut")).toBe("general_slate_trim");
  });
});

describe("slaterZaxs", () => {
  it("returns 5 types", () => {
    expect(slaterZaxs()).toHaveLength(5);
  });
});
