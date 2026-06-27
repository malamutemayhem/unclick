import { describe, it, expect } from "vitest";
import {
  temperature, throughput, retention, fuelEfficiency,
  krCost, continuous, forCalcination, lining,
  bestUse, kilnRotaryTypes,
} from "../kiln-rotary-calc.js";

describe("temperature", () => {
  it("calcining highest temperature", () => {
    expect(temperature("calcining")).toBeGreaterThan(temperature("indirect_fired"));
  });
});

describe("throughput", () => {
  it("direct fired highest throughput", () => {
    expect(throughput("direct_fired")).toBeGreaterThan(throughput("indirect_fired"));
  });
});

describe("retention", () => {
  it("waste incineration longest retention", () => {
    expect(retention("waste_incineration")).toBeGreaterThan(retention("direct_fired"));
  });
});

describe("fuelEfficiency", () => {
  it("indirect fired and lime reburning most fuel efficient", () => {
    expect(fuelEfficiency("indirect_fired")).toBeGreaterThan(fuelEfficiency("waste_incineration"));
    expect(fuelEfficiency("lime_reburning")).toBeGreaterThan(fuelEfficiency("waste_incineration"));
  });
});

describe("krCost", () => {
  it("waste incineration most expensive", () => {
    expect(krCost("waste_incineration")).toBeGreaterThan(krCost("lime_reburning"));
  });
});

describe("continuous", () => {
  it("all types are continuous", () => {
    expect(continuous("direct_fired")).toBe(true);
    expect(continuous("waste_incineration")).toBe(true);
  });
});

describe("forCalcination", () => {
  it("calcining for calcination", () => {
    expect(forCalcination("calcining")).toBe(true);
  });
  it("indirect fired not for calcination", () => {
    expect(forCalcination("indirect_fired")).toBe(false);
  });
});

describe("lining", () => {
  it("waste incineration uses high chrome refractory", () => {
    expect(lining("waste_incineration")).toBe("high_chrome_refractory_acid_resistant_waste_combustion");
  });
});

describe("bestUse", () => {
  it("lime reburning for pulp mill", () => {
    expect(bestUse("lime_reburning")).toBe("pulp_mill_lime_mud_recausticizing_quicklime_regeneration");
  });
});

describe("kilnRotaryTypes", () => {
  it("returns 5 types", () => {
    expect(kilnRotaryTypes()).toHaveLength(5);
  });
});
