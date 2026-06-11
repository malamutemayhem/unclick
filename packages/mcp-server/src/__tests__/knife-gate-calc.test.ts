import { describe, it, expect } from "vitest";
import {
  shutoff, slurryHandle, durability, actuation,
  kgCost, automated, forMining, sealType,
  bestUse, knifeGateTypes,
} from "../knife-gate-calc.js";

describe("shutoff", () => {
  it("bidirectional best shutoff", () => {
    expect(shutoff("bidirectional_full_port")).toBeGreaterThan(shutoff("rising_stem_handwheel"));
  });
});

describe("slurryHandle", () => {
  it("bidirectional best slurry", () => {
    expect(slurryHandle("bidirectional_full_port")).toBeGreaterThan(slurryHandle("non_rising_stem_bevel"));
  });
});

describe("durability", () => {
  it("electric most durable", () => {
    expect(durability("electric_motor_operated")).toBeGreaterThan(durability("non_rising_stem_bevel"));
  });
});

describe("actuation", () => {
  it("pneumatic fastest actuation", () => {
    expect(actuation("pneumatic_cylinder_actuated")).toBeGreaterThan(actuation("rising_stem_handwheel"));
  });
});

describe("kgCost", () => {
  it("bidirectional most expensive", () => {
    expect(kgCost("bidirectional_full_port")).toBeGreaterThan(kgCost("non_rising_stem_bevel"));
  });
});

describe("automated", () => {
  it("pneumatic is automated", () => {
    expect(automated("pneumatic_cylinder_actuated")).toBe(true);
  });
  it("rising stem not automated", () => {
    expect(automated("rising_stem_handwheel")).toBe(false);
  });
});

describe("forMining", () => {
  it("rising stem for mining", () => {
    expect(forMining("rising_stem_handwheel")).toBe(true);
  });
  it("non rising not mining", () => {
    expect(forMining("non_rising_stem_bevel")).toBe(false);
  });
});

describe("sealType", () => {
  it("electric uses ptfe", () => {
    expect(sealType("electric_motor_operated")).toBe("ptfe_lined_chemical_service");
  });
});

describe("bestUse", () => {
  it("bidirectional for pulp paper", () => {
    expect(bestUse("bidirectional_full_port")).toBe("high_solids_pulp_paper_process");
  });
});

describe("knifeGateTypes", () => {
  it("returns 5 types", () => {
    expect(knifeGateTypes()).toHaveLength(5);
  });
});
