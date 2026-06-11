import { describe, it, expect } from "vitest";
import {
  flow, pressure, gentleness, selfPrime,
  ppCost, sealless, forAbrasive, tubing,
  bestUse, peristalticPumpTypes,
} from "../peristaltic-pump-calc.js";

describe("flow", () => {
  it("shoe highest flow", () => {
    expect(flow("shoe_squeeze_heavy_duty")).toBeGreaterThan(flow("micro_tubing_lab"));
  });
});

describe("pressure", () => {
  it("high pressure mining highest", () => {
    expect(pressure("high_pressure_mining")).toBeGreaterThan(pressure("micro_tubing_lab"));
  });
});

describe("gentleness", () => {
  it("micro most gentle", () => {
    expect(gentleness("micro_tubing_lab")).toBeGreaterThan(gentleness("high_pressure_mining"));
  });
});

describe("selfPrime", () => {
  it("roller best self prime", () => {
    expect(selfPrime("roller_industrial_hose")).toBeGreaterThan(selfPrime("micro_tubing_lab"));
  });
});

describe("ppCost", () => {
  it("high pressure most expensive", () => {
    expect(ppCost("high_pressure_mining")).toBeGreaterThan(ppCost("micro_tubing_lab"));
  });
});

describe("sealless", () => {
  it("all are sealless", () => {
    expect(sealless("roller_industrial_hose")).toBe(true);
  });
  it("micro is sealless", () => {
    expect(sealless("micro_tubing_lab")).toBe(true);
  });
});

describe("forAbrasive", () => {
  it("shoe for abrasive", () => {
    expect(forAbrasive("shoe_squeeze_heavy_duty")).toBe(true);
  });
  it("micro not abrasive", () => {
    expect(forAbrasive("micro_tubing_lab")).toBe(false);
  });
});

describe("tubing", () => {
  it("sanitary uses platinum cured", () => {
    expect(tubing("sanitary_pharma_grade")).toBe("platinum_cured_silicone_usp");
  });
});

describe("bestUse", () => {
  it("micro for laboratory", () => {
    expect(bestUse("micro_tubing_lab")).toBe("laboratory_cell_culture_reagent");
  });
});

describe("peristalticPumpTypes", () => {
  it("returns 5 types", () => {
    expect(peristalticPumpTypes()).toHaveLength(5);
  });
});
