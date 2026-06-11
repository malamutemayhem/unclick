import { describe, it, expect } from "vitest";
import {
  voltageGain, efficiency, ripple, loadCapacity,
  pumpCost, regulated, forFlash, topology,
  bestUse, chargePumps,
} from "../charge-pump-calc.js";

describe("voltageGain", () => {
  it("cockcroft walton highest voltage gain", () => {
    expect(voltageGain("cockcroft_walton")).toBeGreaterThan(voltageGain("regulated_ldo_cp"));
  });
});

describe("efficiency", () => {
  it("cross coupled cmos best efficiency", () => {
    expect(efficiency("cross_coupled_cmos")).toBeGreaterThan(efficiency("cockcroft_walton"));
  });
});

describe("ripple", () => {
  it("regulated ldo cp lowest ripple", () => {
    expect(ripple("regulated_ldo_cp")).toBeGreaterThan(ripple("cockcroft_walton"));
  });
});

describe("loadCapacity", () => {
  it("regulated ldo cp best load capacity", () => {
    expect(loadCapacity("regulated_ldo_cp")).toBeGreaterThan(loadCapacity("cockcroft_walton"));
  });
});

describe("pumpCost", () => {
  it("regulated ldo cp most expensive", () => {
    expect(pumpCost("regulated_ldo_cp")).toBeGreaterThan(pumpCost("cross_coupled_cmos"));
  });
});

describe("regulated", () => {
  it("regulated ldo cp is regulated", () => {
    expect(regulated("regulated_ldo_cp")).toBe(true);
  });
  it("dickson cascade not regulated", () => {
    expect(regulated("dickson_cascade")).toBe(false);
  });
});

describe("forFlash", () => {
  it("dickson cascade is for flash", () => {
    expect(forFlash("dickson_cascade")).toBe(true);
  });
  it("cockcroft walton not for flash", () => {
    expect(forFlash("cockcroft_walton")).toBe(false);
  });
});

describe("topology", () => {
  it("cockcroft walton uses voltage multiplier ac", () => {
    expect(topology("cockcroft_walton")).toBe("voltage_multiplier_ac");
  });
});

describe("bestUse", () => {
  it("cross coupled cmos best for sram word line boost", () => {
    expect(bestUse("cross_coupled_cmos")).toBe("sram_word_line_boost");
  });
});

describe("chargePumps", () => {
  it("returns 5 types", () => {
    expect(chargePumps()).toHaveLength(5);
  });
});
