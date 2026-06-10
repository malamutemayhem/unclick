import { describe, it, expect } from "vitest";
import {
  lineWidth, lineConsistency, expressiveness, easeOfUse,
  penCost, diyMake, usesCartridge, feedSystem,
  bestLettering, rulingPens,
} from "../ruling-pen-calc.js";

describe("lineWidth", () => {
  it("cola pen diy widest line", () => {
    expect(lineWidth("cola_pen_diy")).toBeGreaterThan(lineWidth("ruling_pen_classic"));
  });
});

describe("lineConsistency", () => {
  it("ruling pen classic most consistent line", () => {
    expect(lineConsistency("ruling_pen_classic")).toBeGreaterThan(lineConsistency("cola_pen_diy"));
  });
});

describe("expressiveness", () => {
  it("cola pen diy most expressive", () => {
    expect(expressiveness("cola_pen_diy")).toBeGreaterThan(expressiveness("ruling_pen_classic"));
  });
});

describe("easeOfUse", () => {
  it("pilot parallel cartridge easiest to use", () => {
    expect(easeOfUse("pilot_parallel_cartridge")).toBeGreaterThan(easeOfUse("ruling_pen_classic"));
  });
});

describe("penCost", () => {
  it("automatic lettering wide more expensive than cola pen", () => {
    expect(penCost("automatic_lettering_wide")).toBeGreaterThan(penCost("cola_pen_diy"));
  });
});

describe("diyMake", () => {
  it("cola pen diy is diy make", () => {
    expect(diyMake("cola_pen_diy")).toBe(true);
  });
  it("ruling pen classic is not diy make", () => {
    expect(diyMake("ruling_pen_classic")).toBe(false);
  });
});

describe("usesCartridge", () => {
  it("pilot parallel cartridge uses cartridge", () => {
    expect(usesCartridge("pilot_parallel_cartridge")).toBe(true);
  });
  it("ruling pen classic does not use cartridge", () => {
    expect(usesCartridge("ruling_pen_classic")).toBe(false);
  });
});

describe("feedSystem", () => {
  it("ruling pen classic uses screw adjust blades", () => {
    expect(feedSystem("ruling_pen_classic")).toBe("screw_adjust_blades");
  });
});

describe("bestLettering", () => {
  it("pilot parallel cartridge best for gothic blackletter", () => {
    expect(bestLettering("pilot_parallel_cartridge")).toBe("gothic_blackletter");
  });
});

describe("rulingPens", () => {
  it("returns 5 types", () => {
    expect(rulingPens()).toHaveLength(5);
  });
});
