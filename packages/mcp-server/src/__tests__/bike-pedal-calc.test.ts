import { describe, it, expect } from "vitest";
import {
  powerTransfer, walkability, entryExit, grip,
  pedalCost, needsSpecialShoe, dualSided, cleatSystem,
  bestStyle, bikePedals,
} from "../bike-pedal-calc.js";

describe("powerTransfer", () => {
  it("clipless road best power transfer", () => {
    expect(powerTransfer("clipless_road")).toBeGreaterThan(powerTransfer("flat_platform"));
  });
});

describe("walkability", () => {
  it("flat platform best walkability", () => {
    expect(walkability("flat_platform")).toBeGreaterThan(walkability("clipless_road"));
  });
});

describe("entryExit", () => {
  it("flat platform easiest entry exit", () => {
    expect(entryExit("flat_platform")).toBeGreaterThan(entryExit("clipless_road"));
  });
});

describe("grip", () => {
  it("clipless road best grip", () => {
    expect(grip("clipless_road")).toBeGreaterThan(grip("flat_platform"));
  });
});

describe("pedalCost", () => {
  it("clipless road most expensive", () => {
    expect(pedalCost("clipless_road")).toBeGreaterThan(pedalCost("flat_platform"));
  });
});

describe("needsSpecialShoe", () => {
  it("clipless road needs special shoe", () => {
    expect(needsSpecialShoe("clipless_road")).toBe(true);
  });
  it("flat platform does not", () => {
    expect(needsSpecialShoe("flat_platform")).toBe(false);
  });
});

describe("dualSided", () => {
  it("clipless mountain is dual sided", () => {
    expect(dualSided("clipless_mountain")).toBe(true);
  });
  it("clipless road is not", () => {
    expect(dualSided("clipless_road")).toBe(false);
  });
});

describe("cleatSystem", () => {
  it("clipless road uses three bolt look delta", () => {
    expect(cleatSystem("clipless_road")).toBe("three_bolt_look_delta");
  });
});

describe("bestStyle", () => {
  it("bmx pin for bmx dirt jump park", () => {
    expect(bestStyle("bmx_pin")).toBe("bmx_dirt_jump_park");
  });
});

describe("bikePedals", () => {
  it("returns 5 types", () => {
    expect(bikePedals()).toHaveLength(5);
  });
});
