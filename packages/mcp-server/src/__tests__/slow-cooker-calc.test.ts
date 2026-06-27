import { describe, it, expect } from "vitest";
import {
  capacity, versatility, setAndForget, portability,
  cookerCost, hasTimer, pressureCook, insertType,
  bestMeal, slowCookers,
} from "../slow-cooker-calc.js";

describe("capacity", () => {
  it("commercial large batch biggest capacity", () => {
    expect(capacity("commercial_large_batch")).toBeGreaterThan(capacity("travel_portable_mini"));
  });
});

describe("versatility", () => {
  it("multi cooker pressure most versatile", () => {
    expect(versatility("multi_cooker_pressure")).toBeGreaterThan(versatility("basic_manual_dial"));
  });
});

describe("setAndForget", () => {
  it("programmable digital best set and forget", () => {
    expect(setAndForget("programmable_digital")).toBeGreaterThan(setAndForget("basic_manual_dial"));
  });
});

describe("portability", () => {
  it("travel portable mini most portable", () => {
    expect(portability("travel_portable_mini")).toBeGreaterThan(portability("commercial_large_batch"));
  });
});

describe("cookerCost", () => {
  it("commercial large batch most expensive", () => {
    expect(cookerCost("commercial_large_batch")).toBeGreaterThan(cookerCost("basic_manual_dial"));
  });
});

describe("hasTimer", () => {
  it("programmable digital has timer", () => {
    expect(hasTimer("programmable_digital")).toBe(true);
  });
  it("basic manual dial does not", () => {
    expect(hasTimer("basic_manual_dial")).toBe(false);
  });
});

describe("pressureCook", () => {
  it("multi cooker pressure can pressure cook", () => {
    expect(pressureCook("multi_cooker_pressure")).toBe(true);
  });
  it("programmable digital cannot", () => {
    expect(pressureCook("programmable_digital")).toBe(false);
  });
});

describe("insertType", () => {
  it("multi cooker pressure uses stainless steel sealed", () => {
    expect(insertType("multi_cooker_pressure")).toBe("stainless_steel_sealed");
  });
});

describe("bestMeal", () => {
  it("basic manual dial best for simple stew chili roast", () => {
    expect(bestMeal("basic_manual_dial")).toBe("simple_stew_chili_roast");
  });
});

describe("slowCookers", () => {
  it("returns 5 types", () => {
    expect(slowCookers()).toHaveLength(5);
  });
});
