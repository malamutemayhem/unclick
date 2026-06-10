import { describe, it, expect } from "vitest";
import {
  lineWidth, lineDepth, controlFine, versatility,
  toolCost, forLettering, forOutline, angleProfile,
  bestUse, vTools,
} from "../v-tool-calc.js";

describe("lineWidth", () => {
  it("degree 90 wide widest line", () => {
    expect(lineWidth("degree_90_wide")).toBeGreaterThan(lineWidth("micro_detail_fine"));
  });
});

describe("lineDepth", () => {
  it("parting deep cut deepest line", () => {
    expect(lineDepth("parting_deep_cut")).toBeGreaterThan(lineDepth("micro_detail_fine"));
  });
});

describe("controlFine", () => {
  it("micro detail fine finest control", () => {
    expect(controlFine("micro_detail_fine")).toBeGreaterThan(controlFine("parting_deep_cut"));
  });
});

describe("versatility", () => {
  it("degree 60 standard most versatile", () => {
    expect(versatility("degree_60_standard")).toBeGreaterThan(versatility("micro_detail_fine"));
  });
});

describe("toolCost", () => {
  it("micro detail fine most expensive", () => {
    expect(toolCost("micro_detail_fine")).toBeGreaterThan(toolCost("degree_60_standard"));
  });
});

describe("forLettering", () => {
  it("degree 60 standard is for lettering", () => {
    expect(forLettering("degree_60_standard")).toBe(true);
  });
  it("degree 90 wide not for lettering", () => {
    expect(forLettering("degree_90_wide")).toBe(false);
  });
});

describe("forOutline", () => {
  it("degree 60 standard is for outline", () => {
    expect(forOutline("degree_60_standard")).toBe(true);
  });
  it("micro detail fine not for outline", () => {
    expect(forOutline("micro_detail_fine")).toBe(false);
  });
});

describe("angleProfile", () => {
  it("degree 60 standard uses sixty degree vee", () => {
    expect(angleProfile("degree_60_standard")).toBe("sixty_degree_vee");
  });
});

describe("bestUse", () => {
  it("micro detail fine best for miniature detail work", () => {
    expect(bestUse("micro_detail_fine")).toBe("miniature_detail_work");
  });
});

describe("vTools", () => {
  it("returns 5 types", () => {
    expect(vTools()).toHaveLength(5);
  });
});
