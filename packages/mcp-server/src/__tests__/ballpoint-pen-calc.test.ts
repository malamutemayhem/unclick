import { describe, it, expect } from "vitest";
import {
  writingSmoothness, lineConsistency, gripComfort, inkLife,
  penCost, refillable, writesUpside, inkType,
  bestWriter, ballpointPens,
} from "../ballpoint-pen-calc.js";

describe("writingSmoothness", () => {
  it("luxury metal executive smoothest writing", () => {
    expect(writingSmoothness("luxury_metal_executive")).toBeGreaterThan(writingSmoothness("multi_color_four"));
  });
});

describe("lineConsistency", () => {
  it("pressurized space pen most consistent", () => {
    expect(lineConsistency("pressurized_space_pen")).toBeGreaterThan(lineConsistency("multi_color_four"));
  });
});

describe("gripComfort", () => {
  it("luxury metal executive most comfortable grip", () => {
    expect(gripComfort("luxury_metal_executive")).toBeGreaterThan(gripComfort("multi_color_four"));
  });
});

describe("inkLife", () => {
  it("pressurized space pen longest ink life", () => {
    expect(inkLife("pressurized_space_pen")).toBeGreaterThan(inkLife("multi_color_four"));
  });
});

describe("penCost", () => {
  it("luxury metal executive most expensive", () => {
    expect(penCost("luxury_metal_executive")).toBeGreaterThan(penCost("retractable_click_daily"));
  });
});

describe("refillable", () => {
  it("luxury metal executive is refillable", () => {
    expect(refillable("luxury_metal_executive")).toBe(true);
  });
  it("capped fine tip is not", () => {
    expect(refillable("capped_fine_tip")).toBe(false);
  });
});

describe("writesUpside", () => {
  it("pressurized space pen writes upside down", () => {
    expect(writesUpside("pressurized_space_pen")).toBe(true);
  });
  it("retractable click daily does not", () => {
    expect(writesUpside("retractable_click_daily")).toBe(false);
  });
});

describe("inkType", () => {
  it("pressurized space pen uses pressurized thixotropic", () => {
    expect(inkType("pressurized_space_pen")).toBe("pressurized_thixotropic");
  });
});

describe("bestWriter", () => {
  it("luxury metal executive best for executive signing gift", () => {
    expect(bestWriter("luxury_metal_executive")).toBe("executive_signing_gift");
  });
});

describe("ballpointPens", () => {
  it("returns 5 types", () => {
    expect(ballpointPens()).toHaveLength(5);
  });
});
