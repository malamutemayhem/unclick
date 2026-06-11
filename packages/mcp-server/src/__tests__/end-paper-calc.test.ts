import { describe, it, expect } from "vitest";
import {
  decorativeValue, durability, hingeStrength, printSurface,
  paperCost, decorative, reinforced, paperWeight,
  bestUse, endPapers,
} from "../end-paper-calc.js";

describe("decorativeValue", () => {
  it("marbled paper decorative most decorative", () => {
    expect(decorativeValue("marbled_paper_decorative")).toBeGreaterThan(decorativeValue("plain_white_standard"));
  });
});

describe("durability", () => {
  it("cloth joint strong most durable", () => {
    expect(durability("cloth_joint_strong")).toBeGreaterThan(durability("plain_white_standard"));
  });
});

describe("hingeStrength", () => {
  it("cloth joint strong strongest hinge", () => {
    expect(hingeStrength("cloth_joint_strong")).toBeGreaterThan(hingeStrength("marbled_paper_decorative"));
  });
});

describe("printSurface", () => {
  it("printed pattern custom best print surface", () => {
    expect(printSurface("printed_pattern_custom")).toBeGreaterThan(printSurface("cloth_joint_strong"));
  });
});

describe("paperCost", () => {
  it("marbled paper decorative most expensive", () => {
    expect(paperCost("marbled_paper_decorative")).toBeGreaterThan(paperCost("plain_white_standard"));
  });
});

describe("decorative", () => {
  it("marbled paper decorative is decorative", () => {
    expect(decorative("marbled_paper_decorative")).toBe(true);
  });
  it("plain white standard not decorative", () => {
    expect(decorative("plain_white_standard")).toBe(false);
  });
});

describe("reinforced", () => {
  it("cloth joint strong is reinforced", () => {
    expect(reinforced("cloth_joint_strong")).toBe(true);
  });
  it("marbled paper decorative not reinforced", () => {
    expect(reinforced("marbled_paper_decorative")).toBe(false);
  });
});

describe("paperWeight", () => {
  it("tipped in hinge uses heavy 100gsm folded", () => {
    expect(paperWeight("tipped_in_hinge")).toBe("heavy_100gsm_folded");
  });
});

describe("bestUse", () => {
  it("plain white standard best for economy case bind", () => {
    expect(bestUse("plain_white_standard")).toBe("economy_case_bind");
  });
});

describe("endPapers", () => {
  it("returns 5 types", () => {
    expect(endPapers()).toHaveLength(5);
  });
});
