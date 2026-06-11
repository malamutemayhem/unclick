import { describe, it, expect } from "vitest";
import {
  holeClean, depthCapacity, alignAccuracy, speedBore,
  boringCost, powered, portable, driveMethod,
  bestUse, boringMachineTimbers,
} from "../boring-machine-timber-calc.js";

describe("holeClean", () => {
  it("forstner bit flat cleanest hole", () => {
    expect(holeClean("forstner_bit_flat")).toBeGreaterThan(holeClean("electric_drill_modern"));
  });
});

describe("depthCapacity", () => {
  it("beam boring machine deepest capacity", () => {
    expect(depthCapacity("beam_boring_machine")).toBeGreaterThan(depthCapacity("forstner_bit_flat"));
  });
});

describe("alignAccuracy", () => {
  it("beam boring machine most accurate alignment", () => {
    expect(alignAccuracy("beam_boring_machine")).toBeGreaterThan(alignAccuracy("electric_drill_modern"));
  });
});

describe("speedBore", () => {
  it("electric drill modern fastest bore", () => {
    expect(speedBore("electric_drill_modern")).toBeGreaterThan(speedBore("hand_brace_ratchet"));
  });
});

describe("boringCost", () => {
  it("beam boring machine most expensive", () => {
    expect(boringCost("beam_boring_machine")).toBeGreaterThan(boringCost("hand_brace_ratchet"));
  });
});

describe("powered", () => {
  it("electric drill modern is powered", () => {
    expect(powered("electric_drill_modern")).toBe(true);
  });
  it("hand brace ratchet not powered", () => {
    expect(powered("hand_brace_ratchet")).toBe(false);
  });
});

describe("portable", () => {
  it("hand brace ratchet is portable", () => {
    expect(portable("hand_brace_ratchet")).toBe(true);
  });
  it("beam boring machine not portable", () => {
    expect(portable("beam_boring_machine")).toBe(false);
  });
});

describe("driveMethod", () => {
  it("beam boring machine uses geared crank guide", () => {
    expect(driveMethod("beam_boring_machine")).toBe("geared_crank_guide");
  });
});

describe("bestUse", () => {
  it("forstner bit flat best for flat bottom bore", () => {
    expect(bestUse("forstner_bit_flat")).toBe("flat_bottom_bore");
  });
});

describe("boringMachineTimbers", () => {
  it("returns 5 types", () => {
    expect(boringMachineTimbers()).toHaveLength(5);
  });
});
