import { describe, it, expect } from "vitest";
import {
  efficiency, zoning, comfort, installEase,
  vrfCost, simultaneous, forHighRise, refrigerant,
  bestUse, vrfSystemTypes,
} from "../vrf-system-calc.js";

describe("efficiency", () => {
  it("heat recovery most efficient", () => {
    expect(efficiency("heat_recovery_3_pipe")).toBeGreaterThan(efficiency("mini_vrf_light_commercial"));
  });
});

describe("zoning", () => {
  it("heat recovery best zoning", () => {
    expect(zoning("heat_recovery_3_pipe")).toBeGreaterThan(zoning("mini_vrf_light_commercial"));
  });
});

describe("comfort", () => {
  it("heat recovery best comfort", () => {
    expect(comfort("heat_recovery_3_pipe")).toBeGreaterThan(comfort("heat_pump_2_pipe"));
  });
});

describe("installEase", () => {
  it("mini vrf easiest install", () => {
    expect(installEase("mini_vrf_light_commercial")).toBeGreaterThan(installEase("water_cooled_vrf"));
  });
});

describe("vrfCost", () => {
  it("water cooled most expensive", () => {
    expect(vrfCost("water_cooled_vrf")).toBeGreaterThan(vrfCost("mini_vrf_light_commercial"));
  });
});

describe("simultaneous", () => {
  it("heat recovery is simultaneous", () => {
    expect(simultaneous("heat_recovery_3_pipe")).toBe(true);
  });
  it("heat pump not simultaneous", () => {
    expect(simultaneous("heat_pump_2_pipe")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("water cooled for high rise", () => {
    expect(forHighRise("water_cooled_vrf")).toBe(true);
  });
  it("mini vrf not high rise", () => {
    expect(forHighRise("mini_vrf_light_commercial")).toBe(false);
  });
});

describe("refrigerant", () => {
  it("mini uses r32", () => {
    expect(refrigerant("mini_vrf_light_commercial")).toBe("r32_compact_outdoor_multi_split");
  });
});

describe("bestUse", () => {
  it("heat recovery for mixed use tower", () => {
    expect(bestUse("heat_recovery_3_pipe")).toBe("mixed_use_tower_perimeter_core");
  });
});

describe("vrfSystemTypes", () => {
  it("returns 5 types", () => {
    expect(vrfSystemTypes()).toHaveLength(5);
  });
});
