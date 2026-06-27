import { describe, it, expect } from "vitest";
import {
  cookQuality, grainVariety, cookSpeed, keepWarm,
  cookerCost, timerDelay, multiFunction, heatMethod,
  bestFor, riceCookers,
} from "../rice-cooker-calc.js";

describe("cookQuality", () => {
  it("induction pressure best cook quality", () => {
    expect(cookQuality("induction_pressure")).toBeGreaterThan(cookQuality("basic_one_button"));
  });
});

describe("grainVariety", () => {
  it("induction pressure most grain variety", () => {
    expect(grainVariety("induction_pressure")).toBeGreaterThan(grainVariety("microwave_pot"));
  });
});

describe("cookSpeed", () => {
  it("microwave pot fastest cook speed", () => {
    expect(cookSpeed("microwave_pot")).toBeGreaterThan(cookSpeed("basic_one_button"));
  });
});

describe("keepWarm", () => {
  it("induction pressure best keep warm", () => {
    expect(keepWarm("induction_pressure")).toBeGreaterThan(keepWarm("microwave_pot"));
  });
});

describe("cookerCost", () => {
  it("induction pressure most expensive", () => {
    expect(cookerCost("induction_pressure")).toBeGreaterThan(cookerCost("basic_one_button"));
  });
});

describe("timerDelay", () => {
  it("fuzzy logic has timer delay", () => {
    expect(timerDelay("fuzzy_logic")).toBe(true);
  });
  it("basic one button does not", () => {
    expect(timerDelay("basic_one_button")).toBe(false);
  });
});

describe("multiFunction", () => {
  it("multi cooker combo is multi function", () => {
    expect(multiFunction("multi_cooker_combo")).toBe(true);
  });
  it("fuzzy logic is not", () => {
    expect(multiFunction("fuzzy_logic")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("induction pressure uses induction coil pressure seal", () => {
    expect(heatMethod("induction_pressure")).toBe("induction_coil_pressure_seal");
  });
});

describe("bestFor", () => {
  it("fuzzy logic for daily japanese rice", () => {
    expect(bestFor("fuzzy_logic")).toBe("daily_japanese_rice");
  });
});

describe("riceCookers", () => {
  it("returns 5 types", () => {
    expect(riceCookers()).toHaveLength(5);
  });
});
