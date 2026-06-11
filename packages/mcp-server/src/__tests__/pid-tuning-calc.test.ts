import { describe, it, expect } from "vitest";
import {
  settleTime, overshoot, robustness, easeOfUse,
  tuneCost, autoTune, forProcess, method,
  bestUse, pidTunings,
} from "../pid-tuning-calc.js";

describe("settleTime", () => {
  it("genetic algorithm best settle time", () => {
    expect(settleTime("genetic_algorithm")).toBeGreaterThan(settleTime("ziegler_nichols"));
  });
});

describe("overshoot", () => {
  it("genetic algorithm least overshoot", () => {
    expect(overshoot("genetic_algorithm")).toBeGreaterThan(overshoot("ziegler_nichols"));
  });
});

describe("robustness", () => {
  it("imc internal model most robust", () => {
    expect(robustness("imc_internal_model")).toBeGreaterThan(robustness("ziegler_nichols"));
  });
});

describe("easeOfUse", () => {
  it("ziegler nichols easiest to use", () => {
    expect(easeOfUse("ziegler_nichols")).toBeGreaterThan(easeOfUse("genetic_algorithm"));
  });
});

describe("tuneCost", () => {
  it("genetic algorithm most expensive", () => {
    expect(tuneCost("genetic_algorithm")).toBeGreaterThan(tuneCost("ziegler_nichols"));
  });
});

describe("autoTune", () => {
  it("relay feedback is auto tune", () => {
    expect(autoTune("relay_feedback")).toBe(true);
  });
  it("ziegler nichols not auto tune", () => {
    expect(autoTune("ziegler_nichols")).toBe(false);
  });
});

describe("forProcess", () => {
  it("imc internal model for process", () => {
    expect(forProcess("imc_internal_model")).toBe(true);
  });
  it("genetic algorithm not for process", () => {
    expect(forProcess("genetic_algorithm")).toBe(false);
  });
});

describe("method", () => {
  it("relay feedback uses relay oscillation test", () => {
    expect(method("relay_feedback")).toBe("relay_oscillation_test");
  });
});

describe("bestUse", () => {
  it("imc internal model best for chemical reactor temp", () => {
    expect(bestUse("imc_internal_model")).toBe("chemical_reactor_temp");
  });
});

describe("pidTunings", () => {
  it("returns 5 types", () => {
    expect(pidTunings()).toHaveLength(5);
  });
});
