import { describe, it, expect } from "vitest";
import {
  finishConsistency, throughput, loadCapacity, cuttingAction,
  btCost, wetProcess, forBulkSmall, tumblerConfig,
  bestUse, barrelTumblerTypes,
} from "../barrel-tumbler-calc.js";

describe("finishConsistency", () => {
  it("compartment barrel best finish consistency", () => {
    expect(finishConsistency("compartment_barrel")).toBeGreaterThan(finishConsistency("rotary_barrel"));
  });
});

describe("throughput", () => {
  it("tilting barrel highest throughput", () => {
    expect(throughput("tilting_barrel")).toBeGreaterThan(throughput("compartment_barrel"));
  });
});

describe("loadCapacity", () => {
  it("rotary barrel best load capacity", () => {
    expect(loadCapacity("rotary_barrel")).toBeGreaterThan(loadCapacity("compartment_barrel"));
  });
});

describe("cuttingAction", () => {
  it("compartment barrel best cutting action", () => {
    expect(cuttingAction("compartment_barrel")).toBeGreaterThan(cuttingAction("rotary_barrel"));
  });
});

describe("btCost", () => {
  it("compartment barrel most expensive", () => {
    expect(btCost("compartment_barrel")).toBeGreaterThan(btCost("rotary_barrel"));
  });
});

describe("wetProcess", () => {
  it("rotary barrel is wet process", () => {
    expect(wetProcess("rotary_barrel")).toBe(true);
  });
});

describe("forBulkSmall", () => {
  it("rotary barrel for bulk small", () => {
    expect(forBulkSmall("rotary_barrel")).toBe(true);
  });
  it("compartment barrel not for bulk small", () => {
    expect(forBulkSmall("compartment_barrel")).toBe(false);
  });
});

describe("tumblerConfig", () => {
  it("oblique uses angled axis cascade action gentle finish", () => {
    expect(tumblerConfig("oblique_barrel")).toBe("oblique_barrel_tumbler_angled_axis_cascade_action_gentle_finish");
  });
});

describe("bestUse", () => {
  it("submerged barrel for brass fitting chemical bright finish clean", () => {
    expect(bestUse("submerged_barrel")).toBe("brass_fitting_submerged_barrel_tumbler_chemical_bright_finish_clean");
  });
});

describe("barrelTumblerTypes", () => {
  it("returns 5 types", () => {
    expect(barrelTumblerTypes()).toHaveLength(5);
  });
});
