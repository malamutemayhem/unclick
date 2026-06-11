import { describe, it, expect } from "vitest";
import {
  solidsRemoval, throughput, selfCleaning, meshFineness,
  sfCost, automated, forFine, screenConfig,
  bestUse, screenFilterTypes,
} from "../screen-filter-calc.js";

describe("solidsRemoval", () => {
  it("micro screen best solids removal", () => {
    expect(solidsRemoval("micro_screen")).toBeGreaterThan(solidsRemoval("bar_screen"));
  });
});

describe("throughput", () => {
  it("bar screen highest throughput", () => {
    expect(throughput("bar_screen")).toBeGreaterThan(throughput("micro_screen"));
  });
});

describe("selfCleaning", () => {
  it("step screen best self cleaning", () => {
    expect(selfCleaning("step_screen")).toBeGreaterThan(selfCleaning("bar_screen"));
  });
});

describe("meshFineness", () => {
  it("micro screen finest mesh", () => {
    expect(meshFineness("micro_screen")).toBeGreaterThan(meshFineness("bar_screen"));
  });
});

describe("sfCost", () => {
  it("micro screen most expensive", () => {
    expect(sfCost("micro_screen")).toBeGreaterThan(sfCost("bar_screen"));
  });
});

describe("automated", () => {
  it("bar screen is automated", () => {
    expect(automated("bar_screen")).toBe(true);
  });
  it("wedge wire not automated", () => {
    expect(automated("wedge_wire")).toBe(false);
  });
});

describe("forFine", () => {
  it("micro screen for fine screening", () => {
    expect(forFine("micro_screen")).toBe(true);
  });
  it("bar screen not for fine", () => {
    expect(forFine("bar_screen")).toBe(false);
  });
});

describe("screenConfig", () => {
  it("step screen uses moving lamella self clean lift solids out", () => {
    expect(screenConfig("step_screen")).toBe("step_screen_filter_moving_lamella_self_clean_lift_solids_out");
  });
});

describe("bestUse", () => {
  it("wedge wire for food process dewatering starch fiber recovery", () => {
    expect(bestUse("wedge_wire")).toBe("food_process_wedge_wire_screen_dewatering_starch_fiber_recovery");
  });
});

describe("screenFilterTypes", () => {
  it("returns 5 types", () => {
    expect(screenFilterTypes()).toHaveLength(5);
  });
});
