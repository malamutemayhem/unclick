import { describe, it, expect } from "vitest";
import {
  thermalPerform, airflowEase, durability, weightLight,
  sinkCost, passive, forHighPower, finStyle,
  bestUse, heatSinks,
} from "../heat-sink-calc.js";

describe("thermalPerform", () => {
  it("forged copper block best thermal perform", () => {
    expect(thermalPerform("forged_copper_block")).toBeGreaterThan(thermalPerform("stamped_steel_flat"));
  });
});

describe("airflowEase", () => {
  it("pin fin radial best airflow ease", () => {
    expect(airflowEase("pin_fin_radial")).toBeGreaterThan(airflowEase("forged_copper_block"));
  });
});

describe("durability", () => {
  it("stamped steel flat most durable", () => {
    expect(durability("stamped_steel_flat")).toBeGreaterThan(durability("pin_fin_radial"));
  });
});

describe("weightLight", () => {
  it("extruded aluminum fin lightest weight", () => {
    expect(weightLight("extruded_aluminum_fin")).toBeGreaterThan(weightLight("forged_copper_block"));
  });
});

describe("sinkCost", () => {
  it("heat pipe tower most expensive", () => {
    expect(sinkCost("heat_pipe_tower")).toBeGreaterThan(sinkCost("stamped_steel_flat"));
  });
});

describe("passive", () => {
  it("extruded aluminum fin is passive", () => {
    expect(passive("extruded_aluminum_fin")).toBe(true);
  });
  it("heat pipe tower not passive", () => {
    expect(passive("heat_pipe_tower")).toBe(false);
  });
});

describe("forHighPower", () => {
  it("forged copper block is for high power", () => {
    expect(forHighPower("forged_copper_block")).toBe(true);
  });
  it("extruded aluminum fin not for high power", () => {
    expect(forHighPower("extruded_aluminum_fin")).toBe(false);
  });
});

describe("finStyle", () => {
  it("pin fin radial uses radial pin array", () => {
    expect(finStyle("pin_fin_radial")).toBe("radial_pin_array");
  });
});

describe("bestUse", () => {
  it("stamped steel flat best for budget low power", () => {
    expect(bestUse("stamped_steel_flat")).toBe("budget_low_power");
  });
});

describe("heatSinks", () => {
  it("returns 5 types", () => {
    expect(heatSinks()).toHaveLength(5);
  });
});
