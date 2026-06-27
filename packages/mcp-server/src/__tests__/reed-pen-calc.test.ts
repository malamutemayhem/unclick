import { describe, it, expect } from "vitest";
import {
  nibWidthMm, strokeVariation, inkCapacity,
  resharpeningFrequency, bestForScript, splitNib,
  lifespanHours, flexibility, costEstimate, reedPenTypes,
} from "../reed-pen-calc.js";

describe("nibWidthMm", () => {
  it("arundo has widest nib", () => {
    expect(nibWidthMm("arundo")).toBeGreaterThan(
      nibWidthMm("egyptian_rush")
    );
  });
});

describe("strokeVariation", () => {
  it("qalam has most stroke variation", () => {
    expect(strokeVariation("qalam")).toBeGreaterThan(
      strokeVariation("arundo")
    );
  });
});

describe("inkCapacity", () => {
  it("arundo holds most ink", () => {
    expect(inkCapacity("arundo")).toBeGreaterThan(
      inkCapacity("egyptian_rush")
    );
  });
});

describe("resharpeningFrequency", () => {
  it("egyptian rush needs most resharpening", () => {
    expect(resharpeningFrequency("egyptian_rush")).toBeGreaterThan(
      resharpeningFrequency("arundo")
    );
  });
});

describe("bestForScript", () => {
  it("qalam is best for arabic", () => {
    expect(bestForScript("qalam")).toBe("arabic");
  });
});

describe("splitNib", () => {
  it("qalam has split nib", () => {
    expect(splitNib("qalam")).toBe(true);
  });
  it("arundo does not", () => {
    expect(splitNib("arundo")).toBe(false);
  });
});

describe("lifespanHours", () => {
  it("arundo lasts longest", () => {
    expect(lifespanHours("arundo")).toBeGreaterThan(
      lifespanHours("egyptian_rush")
    );
  });
});

describe("flexibility", () => {
  it("egyptian rush is most flexible", () => {
    expect(flexibility("egyptian_rush")).toBeGreaterThan(
      flexibility("arundo")
    );
  });
});

describe("costEstimate", () => {
  it("qalam is most expensive", () => {
    expect(costEstimate("qalam")).toBeGreaterThan(
      costEstimate("egyptian_rush")
    );
  });
});

describe("reedPenTypes", () => {
  it("returns 5 types", () => {
    expect(reedPenTypes()).toHaveLength(5);
  });
});
