import { describe, it, expect } from "vitest";
import {
  steamRate, pressure, efficiency, startupTime,
  blCost, electric, forPower, circulation,
  bestUse, boilerTypes,
} from "../boiler-type-calc.js";

describe("steamRate", () => {
  it("once through highest steam rate", () => {
    expect(steamRate("once_through_supercritical")).toBeGreaterThan(steamRate("fire_tube_shell_scotch"));
  });
});

describe("pressure", () => {
  it("once through highest pressure", () => {
    expect(pressure("once_through_supercritical")).toBeGreaterThan(pressure("fire_tube_shell_scotch"));
  });
});

describe("efficiency", () => {
  it("once through most efficient", () => {
    expect(efficiency("once_through_supercritical")).toBeGreaterThan(efficiency("fire_tube_shell_scotch"));
  });
});

describe("startupTime", () => {
  it("electric fastest startup", () => {
    expect(startupTime("electric_resistance_element")).toBeGreaterThan(startupTime("once_through_supercritical"));
  });
});

describe("blCost", () => {
  it("once through most expensive", () => {
    expect(blCost("once_through_supercritical")).toBeGreaterThan(blCost("electric_resistance_element"));
  });
});

describe("electric", () => {
  it("electric resistance is electric", () => {
    expect(electric("electric_resistance_element")).toBe(true);
  });
  it("fire tube not electric", () => {
    expect(electric("fire_tube_shell_scotch")).toBe(false);
  });
});

describe("forPower", () => {
  it("water tube for power", () => {
    expect(forPower("water_tube_drum_header")).toBe(true);
  });
  it("fire tube not for power", () => {
    expect(forPower("fire_tube_shell_scotch")).toBe(false);
  });
});

describe("circulation", () => {
  it("once through uses forced flow", () => {
    expect(circulation("once_through_supercritical")).toBe("forced_flow_no_drum_supercritical");
  });
});

describe("bestUse", () => {
  it("fire tube for process steam", () => {
    expect(bestUse("fire_tube_shell_scotch")).toBe("process_steam_heating_small_plant");
  });
});

describe("boilerTypes", () => {
  it("returns 5 types", () => {
    expect(boilerTypes()).toHaveLength(5);
  });
});
