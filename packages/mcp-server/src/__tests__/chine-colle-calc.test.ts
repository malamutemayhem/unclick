import { describe, it, expect } from "vitest";
import {
  bondStrength, transparency, textureRange, tearResist,
  chineCost, handmade, forDetail, fiberSource,
  bestUse, chineColles,
} from "../chine-colle-calc.js";

describe("bondStrength", () => {
  it("kozo sheet strong strongest bond", () => {
    expect(bondStrength("kozo_sheet_strong")).toBeGreaterThan(bondStrength("rice_paper_thin"));
  });
});

describe("transparency", () => {
  it("gampi tissue fine most transparent", () => {
    expect(transparency("gampi_tissue_fine")).toBeGreaterThan(transparency("lokta_paper_textured"));
  });
});

describe("textureRange", () => {
  it("lokta paper textured widest texture range", () => {
    expect(textureRange("lokta_paper_textured")).toBeGreaterThan(textureRange("gampi_tissue_fine"));
  });
});

describe("tearResist", () => {
  it("kozo sheet strong best tear resist", () => {
    expect(tearResist("kozo_sheet_strong")).toBeGreaterThan(tearResist("rice_paper_thin"));
  });
});

describe("chineCost", () => {
  it("gampi tissue fine most expensive", () => {
    expect(chineCost("gampi_tissue_fine")).toBeGreaterThan(chineCost("rice_paper_thin"));
  });
});

describe("handmade", () => {
  it("gampi tissue fine is handmade", () => {
    expect(handmade("gampi_tissue_fine")).toBe(true);
  });
  it("rice paper thin not handmade", () => {
    expect(handmade("rice_paper_thin")).toBe(false);
  });
});

describe("forDetail", () => {
  it("rice paper thin is for detail", () => {
    expect(forDetail("rice_paper_thin")).toBe(true);
  });
  it("kozo sheet strong not for detail", () => {
    expect(forDetail("kozo_sheet_strong")).toBe(false);
  });
});

describe("fiberSource", () => {
  it("kozo sheet strong uses kozo bark fiber", () => {
    expect(fiberSource("kozo_sheet_strong")).toBe("kozo_bark_fiber");
  });
});

describe("bestUse", () => {
  it("rice paper thin best for general chine colle", () => {
    expect(bestUse("rice_paper_thin")).toBe("general_chine_colle");
  });
});

describe("chineColles", () => {
  it("returns 5 types", () => {
    expect(chineColles()).toHaveLength(5);
  });
});
