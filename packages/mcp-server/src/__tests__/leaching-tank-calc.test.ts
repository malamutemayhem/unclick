import { describe, it, expect } from "vitest";
import {
  extractionRate, throughput, reagentEfficiency, recoveryRate,
  ltCost, pressurized, forGold, tankConfig,
  bestUse, leachingTankTypes,
} from "../leaching-tank-calc.js";

describe("extractionRate", () => {
  it("acid pressure best extraction rate", () => {
    expect(extractionRate("acid_pressure")).toBeGreaterThan(extractionRate("heap_leach_pad"));
  });
});

describe("throughput", () => {
  it("heap leach pad highest throughput", () => {
    expect(throughput("heap_leach_pad")).toBeGreaterThan(throughput("bioleach_reactor"));
  });
});

describe("reagentEfficiency", () => {
  it("bioleach reactor best reagent efficiency", () => {
    expect(reagentEfficiency("bioleach_reactor")).toBeGreaterThan(reagentEfficiency("agitated_cyanide"));
  });
});

describe("recoveryRate", () => {
  it("acid pressure best recovery rate", () => {
    expect(recoveryRate("acid_pressure")).toBeGreaterThan(recoveryRate("heap_leach_pad"));
  });
});

describe("ltCost", () => {
  it("acid pressure most expensive", () => {
    expect(ltCost("acid_pressure")).toBeGreaterThan(ltCost("heap_leach_pad"));
  });
});

describe("pressurized", () => {
  it("acid pressure is pressurized", () => {
    expect(pressurized("acid_pressure")).toBe(true);
  });
  it("agitated cyanide not pressurized", () => {
    expect(pressurized("agitated_cyanide")).toBe(false);
  });
});

describe("forGold", () => {
  it("agitated cyanide for gold", () => {
    expect(forGold("agitated_cyanide")).toBe(true);
  });
  it("acid pressure not for gold", () => {
    expect(forGold("acid_pressure")).toBe(false);
  });
});

describe("tankConfig", () => {
  it("bioleach reactor uses bacteria oxidize sulfide mineral liberate metal", () => {
    expect(tankConfig("bioleach_reactor")).toBe("bioleach_reactor_bacteria_oxidize_sulfide_mineral_liberate_metal");
  });
});

describe("bestUse", () => {
  it("heap leach pad for low grade gold copper large tonnage low cost", () => {
    expect(bestUse("heap_leach_pad")).toBe("low_grade_gold_copper_heap_leach_pad_large_tonnage_low_cost");
  });
});

describe("leachingTankTypes", () => {
  it("returns 5 types", () => {
    expect(leachingTankTypes()).toHaveLength(5);
  });
});
