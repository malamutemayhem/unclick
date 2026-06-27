import { describe, it, expect } from "vitest";
import {
  flowPrecision, coverageArea, clogResist, installEase,
  emitterCost, adjustableRate, pressureCompensating, emitterDesign,
  bestPlant, dripEmitters,
} from "../drip-emitter-calc.js";

describe("flowPrecision", () => {
  it("inline pressure compensate best flow precision", () => {
    expect(flowPrecision("inline_pressure_compensate")).toBeGreaterThan(flowPrecision("micro_sprayer_fan"));
  });
});

describe("coverageArea", () => {
  it("micro sprayer fan most coverage area", () => {
    expect(coverageArea("micro_sprayer_fan")).toBeGreaterThan(coverageArea("drip_stake_potted"));
  });
});

describe("clogResist", () => {
  it("inline pressure compensate best clog resist", () => {
    expect(clogResist("inline_pressure_compensate")).toBeGreaterThan(clogResist("micro_sprayer_fan"));
  });
});

describe("installEase", () => {
  it("drip stake potted easiest to install", () => {
    expect(installEase("drip_stake_potted")).toBeGreaterThan(installEase("inline_pressure_compensate"));
  });
});

describe("emitterCost", () => {
  it("inline pressure compensate most expensive", () => {
    expect(emitterCost("inline_pressure_compensate")).toBeGreaterThan(emitterCost("button_dripper_adjustable"));
  });
});

describe("adjustableRate", () => {
  it("button dripper adjustable has adjustable rate", () => {
    expect(adjustableRate("button_dripper_adjustable")).toBe(true);
  });
  it("inline pressure compensate has no adjustable rate", () => {
    expect(adjustableRate("inline_pressure_compensate")).toBe(false);
  });
});

describe("pressureCompensating", () => {
  it("inline pressure compensate is pressure compensating", () => {
    expect(pressureCompensating("inline_pressure_compensate")).toBe(true);
  });
  it("button dripper adjustable is not pressure compensating", () => {
    expect(pressureCompensating("button_dripper_adjustable")).toBe(false);
  });
});

describe("emitterDesign", () => {
  it("micro sprayer fan uses spinner deflector head", () => {
    expect(emitterDesign("micro_sprayer_fan")).toBe("spinner_deflector_head");
  });
});

describe("bestPlant", () => {
  it("drip stake potted best for container pot single", () => {
    expect(bestPlant("drip_stake_potted")).toBe("container_pot_single");
  });
});

describe("dripEmitters", () => {
  it("returns 5 types", () => {
    expect(dripEmitters()).toHaveLength(5);
  });
});
