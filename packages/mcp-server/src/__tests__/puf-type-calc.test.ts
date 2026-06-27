import { describe, it, expect } from "vitest";
import {
  uniqueness, reliability, bitRate, tamperResist,
  pufCost, volatile_, forIot, source,
  bestUse, pufTypes,
} from "../puf-type-calc.js";

describe("uniqueness", () => {
  it("coating optical highest uniqueness", () => {
    expect(uniqueness("coating_optical")).toBeGreaterThan(uniqueness("ring_oscillator"));
  });
});

describe("reliability", () => {
  it("coating optical most reliable", () => {
    expect(reliability("coating_optical")).toBeGreaterThan(reliability("arbiter_delay"));
  });
});

describe("bitRate", () => {
  it("sram startup highest bit rate", () => {
    expect(bitRate("sram_startup")).toBeGreaterThan(bitRate("coating_optical"));
  });
});

describe("tamperResist", () => {
  it("coating optical highest tamper resistance", () => {
    expect(tamperResist("coating_optical")).toBeGreaterThan(tamperResist("sram_startup"));
  });
});

describe("pufCost", () => {
  it("coating optical most expensive", () => {
    expect(pufCost("coating_optical")).toBeGreaterThan(pufCost("sram_startup"));
  });
});

describe("volatile_", () => {
  it("sram startup is volatile", () => {
    expect(volatile_("sram_startup")).toBe(true);
  });
  it("ring oscillator not volatile", () => {
    expect(volatile_("ring_oscillator")).toBe(false);
  });
});

describe("forIot", () => {
  it("sram startup for iot", () => {
    expect(forIot("sram_startup")).toBe(true);
  });
  it("arbiter delay not for iot", () => {
    expect(forIot("arbiter_delay")).toBe(false);
  });
});

describe("source", () => {
  it("butterfly cross uses cross coupled latch meta", () => {
    expect(source("butterfly_cross")).toBe("cross_coupled_latch_meta");
  });
});

describe("bestUse", () => {
  it("coating optical best for anti counterfeit package", () => {
    expect(bestUse("coating_optical")).toBe("anti_counterfeit_package");
  });
});

describe("pufTypes", () => {
  it("returns 5 types", () => {
    expect(pufTypes()).toHaveLength(5);
  });
});
