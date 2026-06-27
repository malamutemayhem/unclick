import { describe, it, expect } from "vitest";
import {
  surfaceFinish, nipPressure, lineSpeed, rollTemperature,
  crCost, heated, forPaper, rollConfig,
  bestUse, calenderingRollTypes,
} from "../calendering-roll-calc.js";

describe("surfaceFinish", () => {
  it("supercalender best surface finish", () => {
    expect(surfaceFinish("supercalender")).toBeGreaterThan(surfaceFinish("thermobonding"));
  });
});

describe("nipPressure", () => {
  it("supercalender highest nip pressure", () => {
    expect(nipPressure("supercalender")).toBeGreaterThan(nipPressure("chilled_cast"));
  });
});

describe("lineSpeed", () => {
  it("supercalender and chilled cast fastest line speed", () => {
    expect(lineSpeed("supercalender")).toBeGreaterThan(lineSpeed("friction_calender"));
    expect(lineSpeed("chilled_cast")).toBeGreaterThan(lineSpeed("friction_calender"));
  });
});

describe("rollTemperature", () => {
  it("thermobonding highest roll temperature", () => {
    expect(rollTemperature("thermobonding")).toBeGreaterThan(rollTemperature("chilled_cast"));
  });
});

describe("crCost", () => {
  it("supercalender most expensive", () => {
    expect(crCost("supercalender")).toBeGreaterThan(crCost("thermobonding"));
  });
});

describe("heated", () => {
  it("friction calender is heated", () => {
    expect(heated("friction_calender")).toBe(true);
  });
  it("supercalender not heated", () => {
    expect(heated("supercalender")).toBe(false);
  });
});

describe("forPaper", () => {
  it("supercalender for paper", () => {
    expect(forPaper("supercalender")).toBe(true);
  });
  it("friction calender not for paper", () => {
    expect(forPaper("friction_calender")).toBe(false);
  });
});

describe("rollConfig", () => {
  it("thermobonding uses heated engraved roll", () => {
    expect(rollConfig("thermobonding")).toBe("heated_engraved_roll_bond_nonwoven_fiber_web_point_fusion");
  });
});

describe("bestUse", () => {
  it("chilled cast for cpp film packaging", () => {
    expect(bestUse("chilled_cast")).toBe("cast_polypropylene_cpp_film_stretch_wrap_food_packaging");
  });
});

describe("calenderingRollTypes", () => {
  it("returns 5 types", () => {
    expect(calenderingRollTypes()).toHaveLength(5);
  });
});
