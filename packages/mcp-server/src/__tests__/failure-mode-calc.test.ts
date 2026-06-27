import { describe, it, expect } from "vitest";
import {
  severity, detectability, occurrence, acceleration,
  fmCost, wearout, forReliability, mechanism,
  bestUse, failureModes,
} from "../failure-mode-calc.js";

describe("severity", () => {
  it("tddb oxide break highest severity", () => {
    expect(severity("tddb_oxide_break")).toBeGreaterThan(severity("hot_carrier_injection"));
  });
});

describe("detectability", () => {
  it("solder fatigue crack most detectable", () => {
    expect(detectability("solder_fatigue_crack")).toBeGreaterThan(detectability("tddb_oxide_break"));
  });
});

describe("occurrence", () => {
  it("solder fatigue crack most frequent", () => {
    expect(occurrence("solder_fatigue_crack")).toBeGreaterThan(occurrence("tddb_oxide_break"));
  });
});

describe("acceleration", () => {
  it("tddb oxide break highest acceleration factor", () => {
    expect(acceleration("tddb_oxide_break")).toBeGreaterThan(acceleration("solder_fatigue_crack"));
  });
});

describe("fmCost", () => {
  it("tddb oxide break most expensive", () => {
    expect(fmCost("tddb_oxide_break")).toBeGreaterThan(fmCost("solder_fatigue_crack"));
  });
});

describe("wearout", () => {
  it("electromigration wire is wearout", () => {
    expect(wearout("electromigration_wire")).toBe(true);
  });
  it("solder fatigue crack not wearout", () => {
    expect(wearout("solder_fatigue_crack")).toBe(false);
  });
});

describe("forReliability", () => {
  it("tddb oxide break for reliability", () => {
    expect(forReliability("tddb_oxide_break")).toBe(true);
  });
  it("solder fatigue crack not for reliability", () => {
    expect(forReliability("solder_fatigue_crack")).toBe(false);
  });
});

describe("mechanism", () => {
  it("nbti gate degrade uses interface trap stress", () => {
    expect(mechanism("nbti_gate_degrade")).toBe("interface_trap_stress");
  });
});

describe("bestUse", () => {
  it("tddb oxide break best for gate oxide qual screen", () => {
    expect(bestUse("tddb_oxide_break")).toBe("gate_oxide_qual_screen");
  });
});

describe("failureModes", () => {
  it("returns 5 types", () => {
    expect(failureModes()).toHaveLength(5);
  });
});
