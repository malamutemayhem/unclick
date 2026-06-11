import { describe, it, expect } from "vitest";
import {
  shedClean, patternRange, treadleEase, fabricWidth,
  loomCost, counterbalance, countermarch, shaftCount,
  bestUse, treadleLooms,
} from "../treadle-loom-calc.js";

describe("shedClean", () => {
  it("countermarch independent cleanest shed", () => {
    expect(shedClean("countermarch_independent")).toBeGreaterThan(shedClean("four_shaft_standard"));
  });
});

describe("patternRange", () => {
  it("sixteen shaft fine widest pattern range", () => {
    expect(patternRange("sixteen_shaft_fine")).toBeGreaterThan(patternRange("counterbalance_pair"));
  });
});

describe("treadleEase", () => {
  it("four shaft standard easiest treadle", () => {
    expect(treadleEase("four_shaft_standard")).toBeGreaterThan(treadleEase("sixteen_shaft_fine"));
  });
});

describe("fabricWidth", () => {
  it("counterbalance pair widest fabric", () => {
    expect(fabricWidth("counterbalance_pair")).toBeGreaterThan(fabricWidth("sixteen_shaft_fine"));
  });
});

describe("loomCost", () => {
  it("sixteen shaft fine most expensive", () => {
    expect(loomCost("sixteen_shaft_fine")).toBeGreaterThan(loomCost("four_shaft_standard"));
  });
});

describe("counterbalance", () => {
  it("counterbalance pair is counterbalance", () => {
    expect(counterbalance("counterbalance_pair")).toBe(true);
  });
  it("four shaft standard not counterbalance", () => {
    expect(counterbalance("four_shaft_standard")).toBe(false);
  });
});

describe("countermarch", () => {
  it("countermarch independent is countermarch", () => {
    expect(countermarch("countermarch_independent")).toBe(true);
  });
  it("four shaft standard not countermarch", () => {
    expect(countermarch("four_shaft_standard")).toBe(false);
  });
});

describe("shaftCount", () => {
  it("eight shaft complex uses eight shaft jack", () => {
    expect(shaftCount("eight_shaft_complex")).toBe("eight_shaft_jack");
  });
});

describe("bestUse", () => {
  it("four shaft standard best for general tabby twill", () => {
    expect(bestUse("four_shaft_standard")).toBe("general_tabby_twill");
  });
});

describe("treadleLooms", () => {
  it("returns 5 types", () => {
    expect(treadleLooms()).toHaveLength(5);
  });
});
