import { describe, it, expect } from "vitest";
import {
  settRange, threadEase, patternRange, fabricFine,
  heddleCost, variable, forFine, dentSpacing,
  bestUse, rigidHeddles,
} from "../rigid-heddle-calc.js";

describe("settRange", () => {
  it("variable dent combo widest sett range", () => {
    expect(settRange("variable_dent_combo")).toBeGreaterThan(settRange("fifteen_dent_very_fine"));
  });
});

describe("threadEase", () => {
  it("eight dent coarse easiest thread", () => {
    expect(threadEase("eight_dent_coarse")).toBeGreaterThan(threadEase("fifteen_dent_very_fine"));
  });
});

describe("patternRange", () => {
  it("variable dent combo widest pattern range", () => {
    expect(patternRange("variable_dent_combo")).toBeGreaterThan(patternRange("eight_dent_coarse"));
  });
});

describe("fabricFine", () => {
  it("fifteen dent very fine finest fabric", () => {
    expect(fabricFine("fifteen_dent_very_fine")).toBeGreaterThan(fabricFine("eight_dent_coarse"));
  });
});

describe("heddleCost", () => {
  it("variable dent combo most expensive", () => {
    expect(heddleCost("variable_dent_combo")).toBeGreaterThan(heddleCost("eight_dent_coarse"));
  });
});

describe("variable", () => {
  it("variable dent combo is variable", () => {
    expect(variable("variable_dent_combo")).toBe(true);
  });
  it("ten dent standard not variable", () => {
    expect(variable("ten_dent_standard")).toBe(false);
  });
});

describe("forFine", () => {
  it("twelve dent fine is for fine", () => {
    expect(forFine("twelve_dent_fine")).toBe(true);
  });
  it("ten dent standard not for fine", () => {
    expect(forFine("ten_dent_standard")).toBe(false);
  });
});

describe("dentSpacing", () => {
  it("variable dent combo uses variable slot hole", () => {
    expect(dentSpacing("variable_dent_combo")).toBe("variable_slot_hole");
  });
});

describe("bestUse", () => {
  it("ten dent standard best for general worsted weave", () => {
    expect(bestUse("ten_dent_standard")).toBe("general_worsted_weave");
  });
});

describe("rigidHeddles", () => {
  it("returns 5 types", () => {
    expect(rigidHeddles()).toHaveLength(5);
  });
});
