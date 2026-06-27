import { describe, it, expect } from "vitest";
import {
  holdStrength, removability, cureSpeed, tempResist,
  lockCost, permanent, forPreassembled, chemistryType,
  bestUse, threadLocks,
} from "../thread-lock-calc.js";

describe("holdStrength", () => {
  it("high strength red strongest hold", () => {
    expect(holdStrength("high_strength_red")).toBeGreaterThan(holdStrength("low_strength_purple"));
  });
});

describe("removability", () => {
  it("low strength purple most removable", () => {
    expect(removability("low_strength_purple")).toBeGreaterThan(removability("high_strength_red"));
  });
});

describe("cureSpeed", () => {
  it("wicking grade fastest cure", () => {
    expect(cureSpeed("wicking_grade_green")).toBeGreaterThan(cureSpeed("high_temp_orange"));
  });
});

describe("tempResist", () => {
  it("high temp orange best temp resistance", () => {
    expect(tempResist("high_temp_orange")).toBeGreaterThan(tempResist("low_strength_purple"));
  });
});

describe("lockCost", () => {
  it("high temp orange most expensive", () => {
    expect(lockCost("high_temp_orange")).toBeGreaterThan(lockCost("low_strength_purple"));
  });
});

describe("permanent", () => {
  it("high strength red is permanent", () => {
    expect(permanent("high_strength_red")).toBe(true);
  });
  it("medium strength blue not permanent", () => {
    expect(permanent("medium_strength_blue")).toBe(false);
  });
});

describe("forPreassembled", () => {
  it("wicking grade is for preassembled", () => {
    expect(forPreassembled("wicking_grade_green")).toBe(true);
  });
  it("high strength red not for preassembled", () => {
    expect(forPreassembled("high_strength_red")).toBe(false);
  });
});

describe("chemistryType", () => {
  it("high temp orange uses modified acrylic resist", () => {
    expect(chemistryType("high_temp_orange")).toBe("modified_acrylic_resist");
  });
});

describe("bestUse", () => {
  it("medium strength blue best for general bolt lock", () => {
    expect(bestUse("medium_strength_blue")).toBe("general_bolt_lock");
  });
});

describe("threadLocks", () => {
  it("returns 5 types", () => {
    expect(threadLocks()).toHaveLength(5);
  });
});
