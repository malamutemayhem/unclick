import { describe, it, expect } from "vitest";
import {
  clarity, tempRange, chemResist, automation,
  cfCost, backwash, forHotGas, element,
  bestUse, candleFilterTypes,
} from "../candle-filter-calc.js";

describe("clarity", () => {
  it("precoat candle best clarity", () => {
    expect(clarity("precoat_candle_clarity")).toBeGreaterThan(clarity("polymer_candle_chemical"));
  });
});

describe("tempRange", () => {
  it("ceramic candle widest temp range", () => {
    expect(tempRange("ceramic_candle_hot_gas")).toBeGreaterThan(tempRange("polymer_candle_chemical"));
  });
});

describe("chemResist", () => {
  it("ceramic candle best chemical resistance", () => {
    expect(chemResist("ceramic_candle_hot_gas")).toBeGreaterThan(chemResist("precoat_candle_clarity"));
  });
});

describe("automation", () => {
  it("backwash candle most automated", () => {
    expect(automation("backwash_candle_auto")).toBeGreaterThan(automation("precoat_candle_clarity"));
  });
});

describe("cfCost", () => {
  it("ceramic candle most expensive", () => {
    expect(cfCost("ceramic_candle_hot_gas")).toBeGreaterThan(cfCost("polymer_candle_chemical"));
  });
});

describe("backwash", () => {
  it("metal candle has backwash", () => {
    expect(backwash("metal_candle_sintered")).toBe(true);
  });
  it("polymer candle no backwash", () => {
    expect(backwash("polymer_candle_chemical")).toBe(false);
  });
});

describe("forHotGas", () => {
  it("ceramic candle for hot gas", () => {
    expect(forHotGas("ceramic_candle_hot_gas")).toBe(true);
  });
  it("polymer candle not for hot gas", () => {
    expect(forHotGas("polymer_candle_chemical")).toBe(false);
  });
});

describe("element", () => {
  it("backwash candle uses auto pulse reverse", () => {
    expect(element("backwash_candle_auto")).toBe("auto_pulse_reverse_flow_clean_cycle");
  });
});

describe("bestUse", () => {
  it("precoat candle for beverage edible oil", () => {
    expect(bestUse("precoat_candle_clarity")).toBe("beverage_edible_oil_fine_polish_clear");
  });
});

describe("candleFilterTypes", () => {
  it("returns 5 types", () => {
    expect(candleFilterTypes()).toHaveLength(5);
  });
});
