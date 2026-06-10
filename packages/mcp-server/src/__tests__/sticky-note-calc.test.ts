import { describe, it, expect } from "vitest";
import {
  stickPower, writeSpace, dispensEase, colorRange,
  noteCost, repositionable, seeThrough, adhesiveType,
  bestUse, stickyNotes,
} from "../sticky-note-calc.js";

describe("stickPower", () => {
  it("super sticky strong highest stick power", () => {
    expect(stickPower("super_sticky_strong")).toBeGreaterThan(stickPower("lined_legal_pad"));
  });
});

describe("writeSpace", () => {
  it("lined legal pad most write space", () => {
    expect(writeSpace("lined_legal_pad")).toBeGreaterThan(writeSpace("transparent_flag_tab"));
  });
});

describe("dispensEase", () => {
  it("pop up dispenser easiest to dispense", () => {
    expect(dispensEase("pop_up_dispenser")).toBeGreaterThan(dispensEase("lined_legal_pad"));
  });
});

describe("colorRange", () => {
  it("transparent flag tab widest color range", () => {
    expect(colorRange("transparent_flag_tab")).toBeGreaterThan(colorRange("lined_legal_pad"));
  });
});

describe("noteCost", () => {
  it("pop up dispenser most expensive", () => {
    expect(noteCost("pop_up_dispenser")).toBeGreaterThan(noteCost("classic_square_3x3"));
  });
});

describe("repositionable", () => {
  it("classic square 3x3 is repositionable", () => {
    expect(repositionable("classic_square_3x3")).toBe(true);
  });
  it("super sticky strong is also repositionable", () => {
    expect(repositionable("super_sticky_strong")).toBe(true);
  });
});

describe("seeThrough", () => {
  it("transparent flag tab is see through", () => {
    expect(seeThrough("transparent_flag_tab")).toBe(true);
  });
  it("classic square 3x3 is not", () => {
    expect(seeThrough("classic_square_3x3")).toBe(false);
  });
});

describe("adhesiveType", () => {
  it("super sticky strong uses enhanced micro sphere", () => {
    expect(adhesiveType("super_sticky_strong")).toBe("enhanced_micro_sphere");
  });
});

describe("bestUse", () => {
  it("transparent flag tab best for textbook page marking", () => {
    expect(bestUse("transparent_flag_tab")).toBe("textbook_page_marking");
  });
});

describe("stickyNotes", () => {
  it("returns 5 types", () => {
    expect(stickyNotes()).toHaveLength(5);
  });
});
