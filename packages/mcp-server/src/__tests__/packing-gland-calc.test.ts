import { describe, it, expect } from "vitest";
import {
  sealing, temperature, chemResist, wear,
  pgCost, liveLoaded, forValve, fiber,
  bestUse, packingGlandTypes,
} from "../packing-gland-calc.js";

describe("sealing", () => {
  it("injectable live loaded best sealing", () => {
    expect(sealing("injectable_live_loaded")).toBeGreaterThan(sealing("aramid_kevlar_abrasive"));
  });
});

describe("temperature", () => {
  it("carbon fiber highest temperature", () => {
    expect(temperature("carbon_fiber_high_temp")).toBeGreaterThan(temperature("ptfe_yarn_chemical"));
  });
});

describe("chemResist", () => {
  it("PTFE yarn best chemical resistance", () => {
    expect(chemResist("ptfe_yarn_chemical")).toBeGreaterThan(chemResist("aramid_kevlar_abrasive"));
  });
});

describe("wear", () => {
  it("aramid Kevlar best wear resistance", () => {
    expect(wear("aramid_kevlar_abrasive")).toBeGreaterThan(wear("ptfe_yarn_chemical"));
  });
});

describe("pgCost", () => {
  it("injectable most expensive", () => {
    expect(pgCost("injectable_live_loaded")).toBeGreaterThan(pgCost("braided_graphite_general"));
  });
});

describe("liveLoaded", () => {
  it("injectable is live loaded", () => {
    expect(liveLoaded("injectable_live_loaded")).toBe(true);
  });
  it("braided graphite not live loaded", () => {
    expect(liveLoaded("braided_graphite_general")).toBe(false);
  });
});

describe("forValve", () => {
  it("braided graphite for valves", () => {
    expect(forValve("braided_graphite_general")).toBe(true);
  });
  it("carbon fiber not for valves", () => {
    expect(forValve("carbon_fiber_high_temp")).toBe(false);
  });
});

describe("fiber", () => {
  it("aramid uses para-Kevlar lubricated", () => {
    expect(fiber("aramid_kevlar_abrasive")).toBe("aramid_para_kevlar_lubricated");
  });
});

describe("bestUse", () => {
  it("injectable for fugitive emission valve", () => {
    expect(bestUse("injectable_live_loaded")).toBe("fugitive_emission_valve_epa_zero");
  });
});

describe("packingGlandTypes", () => {
  it("returns 5 types", () => {
    expect(packingGlandTypes()).toHaveLength(5);
  });
});
