import { describe, it, expect } from "vitest";
import {
  slurryHandling, tightShutoff, abrasionResist, cycleLife,
  gkCost, bidirectional, forPulp, gate,
  bestUse, gateValveKnifeTypes,
} from "../gate-valve-knife-calc.js";

describe("slurryHandling", () => {
  it("slurry knife best slurry handling", () => {
    expect(slurryHandling("slurry_knife_heavy")).toBeGreaterThan(slurryHandling("bi_directional_sealed"));
  });
});

describe("tightShutoff", () => {
  it("bi directional tightest shutoff", () => {
    expect(tightShutoff("bi_directional_sealed")).toBeGreaterThan(tightShutoff("knife_gate_wafer"));
  });
});

describe("abrasionResist", () => {
  it("slurry knife best abrasion resist", () => {
    expect(abrasionResist("slurry_knife_heavy")).toBeGreaterThan(abrasionResist("knife_gate_wafer"));
  });
});

describe("cycleLife", () => {
  it("bi directional longest cycle life", () => {
    expect(cycleLife("bi_directional_sealed")).toBeGreaterThan(cycleLife("knife_gate_wafer"));
  });
});

describe("gkCost", () => {
  it("slurry knife most expensive", () => {
    expect(gkCost("slurry_knife_heavy")).toBeGreaterThan(gkCost("knife_gate_wafer"));
  });
});

describe("bidirectional", () => {
  it("bi directional is bidirectional", () => {
    expect(bidirectional("bi_directional_sealed")).toBe(true);
  });
  it("knife gate wafer not bidirectional", () => {
    expect(bidirectional("knife_gate_wafer")).toBe(false);
  });
});

describe("forPulp", () => {
  it("knife gate wafer for pulp", () => {
    expect(forPulp("knife_gate_wafer")).toBe(true);
  });
  it("slurry knife not for pulp", () => {
    expect(forPulp("slurry_knife_heavy")).toBe(false);
  });
});

describe("gate", () => {
  it("pneumatic uses cylinder actuated", () => {
    expect(gate("pneumatic_knife_auto")).toBe("pneumatic_cylinder_actuated_spring_return_fail");
  });
});

describe("bestUse", () => {
  it("bi directional for chemical tank isolation", () => {
    expect(bestUse("bi_directional_sealed")).toBe("chemical_process_tank_isolation_bi_direction");
  });
});

describe("gateValveKnifeTypes", () => {
  it("returns 5 types", () => {
    expect(gateValveKnifeTypes()).toHaveLength(5);
  });
});
