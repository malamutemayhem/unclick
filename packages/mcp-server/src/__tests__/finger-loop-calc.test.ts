import { describe, it, expect } from "vitest";
import {
  patternRange, complexityLevel, speedBraid, portability,
  loopCost, forSolo, forBeginner, loopSetup,
  bestUse, fingerLoops,
} from "../finger-loop-calc.js";

describe("patternRange", () => {
  it("bicolor loop pattern widest pattern range", () => {
    expect(patternRange("bicolor_loop_pattern")).toBeGreaterThan(patternRange("five_loop_basic"));
  });
});

describe("complexityLevel", () => {
  it("nine loop complex highest complexity", () => {
    expect(complexityLevel("nine_loop_complex")).toBeGreaterThan(complexityLevel("five_loop_basic"));
  });
});

describe("speedBraid", () => {
  it("five loop basic fastest braid", () => {
    expect(speedBraid("five_loop_basic")).toBeGreaterThan(speedBraid("nine_loop_complex"));
  });
});

describe("portability", () => {
  it("all finger loops highly portable", () => {
    expect(portability("five_loop_basic")).toBe(10);
  });
});

describe("loopCost", () => {
  it("bicolor loop pattern most expensive", () => {
    expect(loopCost("bicolor_loop_pattern")).toBeGreaterThan(loopCost("five_loop_basic"));
  });
});

describe("forSolo", () => {
  it("five loop basic is for solo", () => {
    expect(forSolo("five_loop_basic")).toBe(true);
  });
  it("nine loop complex not for solo", () => {
    expect(forSolo("nine_loop_complex")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("five loop basic is for beginner", () => {
    expect(forBeginner("five_loop_basic")).toBe(true);
  });
  it("nine loop complex not for beginner", () => {
    expect(forBeginner("nine_loop_complex")).toBe(false);
  });
});

describe("loopSetup", () => {
  it("bicolor loop pattern uses two color loop set", () => {
    expect(loopSetup("bicolor_loop_pattern")).toBe("two_color_loop_set");
  });
});

describe("bestUse", () => {
  it("seven loop standard best for general round braid", () => {
    expect(bestUse("seven_loop_standard")).toBe("general_round_braid");
  });
});

describe("fingerLoops", () => {
  it("returns 5 types", () => {
    expect(fingerLoops()).toHaveLength(5);
  });
});
