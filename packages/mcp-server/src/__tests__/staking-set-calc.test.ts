import { describe, it, expect } from "vitest";
import {
  punchCount, stumpCount, accuracy, taskRange,
  setCost, forClock, microSize, baseStyle,
  bestUse, stakingSets,
} from "../staking-set-calc.js";

describe("punchCount", () => {
  it("professional set full most punches", () => {
    expect(punchCount("professional_set_full")).toBeGreaterThan(punchCount("micro_set_small"));
  });
});

describe("stumpCount", () => {
  it("professional set full most stumps", () => {
    expect(stumpCount("professional_set_full")).toBeGreaterThan(stumpCount("micro_set_small"));
  });
});

describe("accuracy", () => {
  it("micro set small most accurate", () => {
    expect(accuracy("micro_set_small")).toBeGreaterThan(accuracy("basic_set_standard"));
  });
});

describe("taskRange", () => {
  it("professional set full best task range", () => {
    expect(taskRange("professional_set_full")).toBeGreaterThan(taskRange("micro_set_small"));
  });
});

describe("setCost", () => {
  it("professional set full most expensive", () => {
    expect(setCost("professional_set_full")).toBeGreaterThan(setCost("basic_set_standard"));
  });
});

describe("forClock", () => {
  it("heavy duty clock is for clock", () => {
    expect(forClock("heavy_duty_clock")).toBe(true);
  });
  it("basic set standard not for clock", () => {
    expect(forClock("basic_set_standard")).toBe(false);
  });
});

describe("microSize", () => {
  it("micro set small is micro size", () => {
    expect(microSize("micro_set_small")).toBe(true);
  });
  it("basic set standard not micro size", () => {
    expect(microSize("basic_set_standard")).toBe(false);
  });
});

describe("baseStyle", () => {
  it("universal set adapt uses modular adapt base", () => {
    expect(baseStyle("universal_set_adapt")).toBe("modular_adapt_base");
  });
});

describe("bestUse", () => {
  it("basic set standard best for general watch stake", () => {
    expect(bestUse("basic_set_standard")).toBe("general_watch_stake");
  });
});

describe("stakingSets", () => {
  it("returns 5 types", () => {
    expect(stakingSets()).toHaveLength(5);
  });
});
