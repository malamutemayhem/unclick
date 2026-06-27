import { describe, it, expect } from "vitest";
import {
  mixEven, deairQuality, throughput, clayRange,
  pugCost, powered, hasVacuum, augerType,
  bestUse, pugMills,
} from "../pug-mill-calc.js";

describe("mixEven", () => {
  it("dual shaft mix most even mix", () => {
    expect(mixEven("dual_shaft_mix")).toBeGreaterThan(mixEven("hand_crank_small"));
  });
});

describe("deairQuality", () => {
  it("deairing vacuum pro best deair quality", () => {
    expect(deairQuality("deairing_vacuum_pro")).toBeGreaterThan(deairQuality("hand_crank_small"));
  });
});

describe("throughput", () => {
  it("dual shaft mix highest throughput", () => {
    expect(throughput("dual_shaft_mix")).toBeGreaterThan(throughput("portable_mini_bench"));
  });
});

describe("clayRange", () => {
  it("dual shaft mix widest clay range", () => {
    expect(clayRange("dual_shaft_mix")).toBeGreaterThan(clayRange("portable_mini_bench"));
  });
});

describe("pugCost", () => {
  it("deairing vacuum pro most expensive", () => {
    expect(pugCost("deairing_vacuum_pro")).toBeGreaterThan(pugCost("hand_crank_small"));
  });
});

describe("powered", () => {
  it("electric auger standard is powered", () => {
    expect(powered("electric_auger_standard")).toBe(true);
  });
  it("hand crank small not powered", () => {
    expect(powered("hand_crank_small")).toBe(false);
  });
});

describe("hasVacuum", () => {
  it("deairing vacuum pro has vacuum", () => {
    expect(hasVacuum("deairing_vacuum_pro")).toBe(true);
  });
  it("electric auger standard no vacuum", () => {
    expect(hasVacuum("electric_auger_standard")).toBe(false);
  });
});

describe("augerType", () => {
  it("dual shaft mix uses dual counter shaft", () => {
    expect(augerType("dual_shaft_mix")).toBe("dual_counter_shaft");
  });
});

describe("bestUse", () => {
  it("deairing vacuum pro best for production deair mix", () => {
    expect(bestUse("deairing_vacuum_pro")).toBe("production_deair_mix");
  });
});

describe("pugMills", () => {
  it("returns 5 types", () => {
    expect(pugMills()).toHaveLength(5);
  });
});
