import { describe, it, expect } from "vitest";
import {
  colorVividness, writingSmoothness, drySpeed, lineFineness,
  penCost, smearResist, worksOnDark, inkFormula,
  bestUse, gelPens,
} from "../gel-pen-calc.js";

describe("colorVividness", () => {
  it("bold 10mm vivid most vivid color", () => {
    expect(colorVividness("bold_10mm_vivid")).toBeGreaterThan(colorVividness("fine_05mm_smooth"));
  });
});

describe("writingSmoothness", () => {
  it("fine 05mm smooth smoothest writing", () => {
    expect(writingSmoothness("fine_05mm_smooth")).toBeGreaterThan(writingSmoothness("white_opaque_highlight"));
  });
});

describe("drySpeed", () => {
  it("retractable quick dry fastest dry", () => {
    expect(drySpeed("retractable_quick_dry")).toBeGreaterThan(drySpeed("bold_10mm_vivid"));
  });
});

describe("lineFineness", () => {
  it("fine 05mm smooth finest line", () => {
    expect(lineFineness("fine_05mm_smooth")).toBeGreaterThan(lineFineness("bold_10mm_vivid"));
  });
});

describe("penCost", () => {
  it("retractable quick dry slightly more expensive", () => {
    expect(penCost("retractable_quick_dry")).toBeGreaterThan(penCost("fine_05mm_smooth"));
  });
});

describe("smearResist", () => {
  it("retractable quick dry is smear resistant", () => {
    expect(smearResist("retractable_quick_dry")).toBe(true);
  });
  it("bold 10mm vivid is not", () => {
    expect(smearResist("bold_10mm_vivid")).toBe(false);
  });
});

describe("worksOnDark", () => {
  it("white opaque highlight works on dark", () => {
    expect(worksOnDark("white_opaque_highlight")).toBe(true);
  });
  it("fine 05mm smooth does not", () => {
    expect(worksOnDark("fine_05mm_smooth")).toBe(false);
  });
});

describe("inkFormula", () => {
  it("glitter metallic sparkle uses suspended glitter gel", () => {
    expect(inkFormula("glitter_metallic_sparkle")).toBe("suspended_glitter_gel");
  });
});

describe("bestUse", () => {
  it("retractable quick dry best for left handed fast writer", () => {
    expect(bestUse("retractable_quick_dry")).toBe("left_handed_fast_writer");
  });
});

describe("gelPens", () => {
  it("returns 5 types", () => {
    expect(gelPens()).toHaveLength(5);
  });
});
