import { describe, it, expect } from "vitest";
import {
  cutClean, easeOfUse, sizeOptions, paperWeight,
  punchCost, multiRadius, heavyDuty, punchMech,
  bestUse, cornerRounders,
} from "../corner-rounder-calc.js";

describe("cutClean", () => {
  it("corner chomper heavy cleanest cut", () => {
    expect(cutClean("corner_chomper_heavy")).toBeGreaterThan(cutClean("multi_size_dial"));
  });
});

describe("easeOfUse", () => {
  it("quarter inch small easiest to use", () => {
    expect(easeOfUse("quarter_inch_small")).toBeGreaterThan(easeOfUse("multi_size_dial"));
  });
});

describe("sizeOptions", () => {
  it("multi size dial most size options", () => {
    expect(sizeOptions("multi_size_dial")).toBeGreaterThan(sizeOptions("quarter_inch_small"));
  });
});

describe("paperWeight", () => {
  it("corner chomper heavy handles heaviest paper", () => {
    expect(paperWeight("corner_chomper_heavy")).toBeGreaterThan(paperWeight("quarter_inch_small"));
  });
});

describe("punchCost", () => {
  it("corner chomper heavy most expensive", () => {
    expect(punchCost("corner_chomper_heavy")).toBeGreaterThan(punchCost("quarter_inch_small"));
  });
});

describe("multiRadius", () => {
  it("multi size dial has multi radius", () => {
    expect(multiRadius("multi_size_dial")).toBe(true);
  });
  it("quarter inch small no multi radius", () => {
    expect(multiRadius("quarter_inch_small")).toBe(false);
  });
});

describe("heavyDuty", () => {
  it("corner chomper heavy is heavy duty", () => {
    expect(heavyDuty("corner_chomper_heavy")).toBe(true);
  });
  it("half inch medium not heavy duty", () => {
    expect(heavyDuty("half_inch_medium")).toBe(false);
  });
});

describe("punchMech", () => {
  it("multi size dial uses rotary dial select", () => {
    expect(punchMech("multi_size_dial")).toBe("rotary_dial_select");
  });
});

describe("bestUse", () => {
  it("corner chomper heavy best for thick chipboard round", () => {
    expect(bestUse("corner_chomper_heavy")).toBe("thick_chipboard_round");
  });
});

describe("cornerRounders", () => {
  it("returns 5 types", () => {
    expect(cornerRounders()).toHaveLength(5);
  });
});
