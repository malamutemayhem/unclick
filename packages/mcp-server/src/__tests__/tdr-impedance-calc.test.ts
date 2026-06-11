import { describe, it, expect } from "vitest";
import {
  resolution, dynamicRange, speed, accuracy,
  tdrCost, liveTraffic, forPcb, excitation,
  bestUse, tdrImpedances,
} from "../tdr-impedance-calc.js";

describe("resolution", () => {
  it("vna based time gate highest resolution", () => {
    expect(resolution("vna_based_time_gate")).toBeGreaterThan(resolution("spread_spectrum_stdr"));
  });
});

describe("dynamicRange", () => {
  it("vna based time gate highest dynamic range", () => {
    expect(dynamicRange("vna_based_time_gate")).toBeGreaterThan(dynamicRange("step_tdr_single"));
  });
});

describe("speed", () => {
  it("spread spectrum stdr fastest", () => {
    expect(speed("spread_spectrum_stdr")).toBeGreaterThan(speed("vna_based_time_gate"));
  });
});

describe("accuracy", () => {
  it("vna based time gate most accurate", () => {
    expect(accuracy("vna_based_time_gate")).toBeGreaterThan(accuracy("spread_spectrum_stdr"));
  });
});

describe("tdrCost", () => {
  it("vna based time gate most expensive", () => {
    expect(tdrCost("vna_based_time_gate")).toBeGreaterThan(tdrCost("spread_spectrum_stdr"));
  });
});

describe("liveTraffic", () => {
  it("spread spectrum stdr supports live traffic", () => {
    expect(liveTraffic("spread_spectrum_stdr")).toBe(true);
  });
  it("step tdr single does not support live traffic", () => {
    expect(liveTraffic("step_tdr_single")).toBe(false);
  });
});

describe("forPcb", () => {
  it("differential tdr pair for pcb", () => {
    expect(forPcb("differential_tdr_pair")).toBe(true);
  });
  it("spread spectrum stdr not for pcb", () => {
    expect(forPcb("spread_spectrum_stdr")).toBe(false);
  });
});

describe("excitation", () => {
  it("spread spectrum stdr uses pseudo random bit seq", () => {
    expect(excitation("spread_spectrum_stdr")).toBe("pseudo_random_bit_seq");
  });
});

describe("bestUse", () => {
  it("vna based time gate best for backplane channel extraction", () => {
    expect(bestUse("vna_based_time_gate")).toBe("backplane_channel_extraction");
  });
});

describe("tdrImpedances", () => {
  it("returns 5 types", () => {
    expect(tdrImpedances()).toHaveLength(5);
  });
});
