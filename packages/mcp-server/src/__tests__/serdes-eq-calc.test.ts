import { describe, it, expect } from "vitest";
import {
  reach, powerEff, latency, complexity,
  eqCost, adaptive, forPam4, technique,
  bestUse, serdesEqs,
} from "../serdes-eq-calc.js";

describe("reach", () => {
  it("pam4 mlse longest reach", () => {
    expect(reach("pam4_mlse")).toBeGreaterThan(reach("ctle_continuous"));
  });
});

describe("powerEff", () => {
  it("ctle continuous best power efficiency", () => {
    expect(powerEff("ctle_continuous")).toBeGreaterThan(powerEff("pam4_mlse"));
  });
});

describe("latency", () => {
  it("ctle continuous lowest latency", () => {
    expect(latency("ctle_continuous")).toBeGreaterThan(latency("pam4_mlse"));
  });
});

describe("complexity", () => {
  it("pam4 mlse most complex", () => {
    expect(complexity("pam4_mlse")).toBeGreaterThan(complexity("ctle_continuous"));
  });
});

describe("eqCost", () => {
  it("pam4 mlse most expensive", () => {
    expect(eqCost("pam4_mlse")).toBeGreaterThan(eqCost("ctle_continuous"));
  });
});

describe("adaptive", () => {
  it("dfe decision is adaptive", () => {
    expect(adaptive("dfe_decision")).toBe(true);
  });
  it("ctle continuous not adaptive", () => {
    expect(adaptive("ctle_continuous")).toBe(false);
  });
});

describe("forPam4", () => {
  it("pam4 mlse for pam4", () => {
    expect(forPam4("pam4_mlse")).toBe(true);
  });
  it("ctle continuous not for pam4", () => {
    expect(forPam4("ctle_continuous")).toBe(false);
  });
});

describe("technique", () => {
  it("pam4 mlse uses viterbi sequence estimate", () => {
    expect(technique("pam4_mlse")).toBe("viterbi_sequence_estimate");
  });
});

describe("bestUse", () => {
  it("cdr baud rate best for nrz retimer repeater", () => {
    expect(bestUse("cdr_baud_rate")).toBe("nrz_retimer_repeater");
  });
});

describe("serdesEqs", () => {
  it("returns 5 types", () => {
    expect(serdesEqs()).toHaveLength(5);
  });
});
