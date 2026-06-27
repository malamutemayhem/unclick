import { describe, it, expect } from "vitest";
import {
  setForce, alignment, fastenerRange, portability,
  setterCost, benchMount, needsHammer, dieType,
  bestUse, rivetSetters,
} from "../rivet-setter-calc.js";

describe("setForce", () => {
  it("press die bench strongest set force", () => {
    expect(setForce("press_die_bench")).toBeGreaterThan(setForce("rotary_punch_hole"));
  });
});

describe("alignment", () => {
  it("press die bench best alignment", () => {
    expect(alignment("press_die_bench")).toBeGreaterThan(alignment("hand_setter_anvil"));
  });
});

describe("fastenerRange", () => {
  it("press die bench widest fastener range", () => {
    expect(fastenerRange("press_die_bench")).toBeGreaterThan(fastenerRange("rotary_punch_hole"));
  });
});

describe("portability", () => {
  it("hand setter anvil most portable", () => {
    expect(portability("hand_setter_anvil")).toBeGreaterThan(portability("press_die_bench"));
  });
});

describe("setterCost", () => {
  it("press die bench most expensive", () => {
    expect(setterCost("press_die_bench")).toBeGreaterThan(setterCost("hand_setter_anvil"));
  });
});

describe("benchMount", () => {
  it("press die bench is bench mount", () => {
    expect(benchMount("press_die_bench")).toBe(true);
  });
  it("hand setter anvil not bench mount", () => {
    expect(benchMount("hand_setter_anvil")).toBe(false);
  });
});

describe("needsHammer", () => {
  it("hand setter anvil needs hammer", () => {
    expect(needsHammer("hand_setter_anvil")).toBe(true);
  });
  it("press die bench no hammer needed", () => {
    expect(needsHammer("press_die_bench")).toBe(false);
  });
});

describe("dieType", () => {
  it("press die bench uses lever press die", () => {
    expect(dieType("press_die_bench")).toBe("lever_press_die");
  });
});

describe("bestUse", () => {
  it("press die bench best for production rivet line", () => {
    expect(bestUse("press_die_bench")).toBe("production_rivet_line");
  });
});

describe("rivetSetters", () => {
  it("returns 5 types", () => {
    expect(rivetSetters()).toHaveLength(5);
  });
});
