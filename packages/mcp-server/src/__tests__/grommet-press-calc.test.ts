import { describe, it, expect } from "vitest";
import {
  setForce, alignment, sizeRange, portability,
  pressCost, noPunchNeeded, benchMounted, mechanism,
  bestUse, grommetPresses,
} from "../grommet-press-calc.js";

describe("setForce", () => {
  it("bench press heavy strongest set force", () => {
    expect(setForce("bench_press_heavy")).toBeGreaterThan(setForce("self_pierce_snap"));
  });
});

describe("alignment", () => {
  it("bench press heavy best alignment", () => {
    expect(alignment("bench_press_heavy")).toBeGreaterThan(alignment("self_pierce_snap"));
  });
});

describe("sizeRange", () => {
  it("bench press heavy widest size range", () => {
    expect(sizeRange("bench_press_heavy")).toBeGreaterThan(sizeRange("self_pierce_snap"));
  });
});

describe("portability", () => {
  it("hand plier squeeze most portable", () => {
    expect(portability("hand_plier_squeeze")).toBeGreaterThan(portability("bench_press_heavy"));
  });
});

describe("pressCost", () => {
  it("bench press heavy most expensive", () => {
    expect(pressCost("bench_press_heavy")).toBeGreaterThan(pressCost("hand_plier_squeeze"));
  });
});

describe("noPunchNeeded", () => {
  it("self pierce snap needs no punch", () => {
    expect(noPunchNeeded("self_pierce_snap")).toBe(true);
  });
  it("hand plier squeeze needs punch", () => {
    expect(noPunchNeeded("hand_plier_squeeze")).toBe(false);
  });
});

describe("benchMounted", () => {
  it("bench press heavy is bench mounted", () => {
    expect(benchMounted("bench_press_heavy")).toBe(true);
  });
  it("hand plier squeeze not bench mounted", () => {
    expect(benchMounted("hand_plier_squeeze")).toBe(false);
  });
});

describe("mechanism", () => {
  it("hand plier squeeze uses spring plier squeeze", () => {
    expect(mechanism("hand_plier_squeeze")).toBe("spring_plier_squeeze");
  });
});

describe("bestUse", () => {
  it("bench press heavy best for production heavy duty", () => {
    expect(bestUse("bench_press_heavy")).toBe("production_heavy_duty");
  });
});

describe("grommetPresses", () => {
  it("returns 5 types", () => {
    expect(grommetPresses()).toHaveLength(5);
  });
});
