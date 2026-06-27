import { describe, it, expect } from "vitest";
import {
  stitchRange, controlFine, speedWork, yarnHold,
  hookCost, doubleEnded, forBeginners, hookProfile,
  bestUse, croHooks,
} from "../cro-hook-calc.js";

describe("stitchRange", () => {
  it("interchangeable set widest stitch range", () => {
    expect(stitchRange("interchangeable_set")).toBeGreaterThan(stitchRange("single_end_standard"));
  });
});

describe("controlFine", () => {
  it("tunisian hook inline finest control", () => {
    expect(controlFine("tunisian_hook_inline")).toBeGreaterThan(controlFine("cro_knit_long"));
  });
});

describe("speedWork", () => {
  it("cro knit long fastest work", () => {
    expect(speedWork("cro_knit_long")).toBeGreaterThan(speedWork("interchangeable_set"));
  });
});

describe("yarnHold", () => {
  it("cro knit long best yarn hold", () => {
    expect(yarnHold("cro_knit_long")).toBeGreaterThan(yarnHold("single_end_standard"));
  });
});

describe("hookCost", () => {
  it("interchangeable set most expensive", () => {
    expect(hookCost("interchangeable_set")).toBeGreaterThan(hookCost("single_end_standard"));
  });
});

describe("doubleEnded", () => {
  it("double end flexible is double ended", () => {
    expect(doubleEnded("double_end_flexible")).toBe(true);
  });
  it("single end standard not double ended", () => {
    expect(doubleEnded("single_end_standard")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("single end standard is for beginners", () => {
    expect(forBeginners("single_end_standard")).toBe(true);
  });
  it("double end flexible not for beginners", () => {
    expect(forBeginners("double_end_flexible")).toBe(false);
  });
});

describe("hookProfile", () => {
  it("tunisian hook inline uses inline tunisian head", () => {
    expect(hookProfile("tunisian_hook_inline")).toBe("inline_tunisian_head");
  });
});

describe("bestUse", () => {
  it("single end standard best for general cro knit", () => {
    expect(bestUse("single_end_standard")).toBe("general_cro_knit");
  });
});

describe("croHooks", () => {
  it("returns 5 types", () => {
    expect(croHooks()).toHaveLength(5);
  });
});
