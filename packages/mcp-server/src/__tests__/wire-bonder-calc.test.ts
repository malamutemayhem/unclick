import { describe, it, expect } from "vitest";
import {
  bondSpeed, bondReliability, wirePitch, loopControl,
  wbCost, thermosonic, forFine, bonderConfig,
  bestUse, wireBonderTypes,
} from "../wire-bonder-calc.js";

describe("bondSpeed", () => {
  it("ball bond gold fastest bond speed", () => {
    expect(bondSpeed("ball_bond_gold")).toBeGreaterThan(bondSpeed("heavy_wire"));
  });
});

describe("bondReliability", () => {
  it("heavy wire best bond reliability", () => {
    expect(bondReliability("heavy_wire")).toBeGreaterThan(bondReliability("ball_bond_copper"));
  });
});

describe("wirePitch", () => {
  it("ball bond gold finest wire pitch", () => {
    expect(wirePitch("ball_bond_gold")).toBeGreaterThan(wirePitch("heavy_wire"));
  });
});

describe("loopControl", () => {
  it("ball bond gold best loop control", () => {
    expect(loopControl("ball_bond_gold")).toBeGreaterThan(loopControl("heavy_wire"));
  });
});

describe("wbCost", () => {
  it("ball bond gold most expensive", () => {
    expect(wbCost("ball_bond_gold")).toBeGreaterThan(wbCost("wedge_bond_aluminum"));
  });
});

describe("thermosonic", () => {
  it("ball bond gold is thermosonic", () => {
    expect(thermosonic("ball_bond_gold")).toBe(true);
  });
  it("wedge bond aluminum not thermosonic", () => {
    expect(thermosonic("wedge_bond_aluminum")).toBe(false);
  });
});

describe("forFine", () => {
  it("ball bond copper for fine pitch", () => {
    expect(forFine("ball_bond_copper")).toBe(true);
  });
  it("heavy wire not for fine", () => {
    expect(forFine("heavy_wire")).toBe(false);
  });
});

describe("bonderConfig", () => {
  it("ribbon bond uses flat conductor low inductance", () => {
    expect(bonderConfig("ribbon_bond")).toBe("ribbon_bond_flat_conductor_low_inductance_rf_power_module");
  });
});

describe("bestUse", () => {
  it("heavy wire for high current power module", () => {
    expect(bestUse("heavy_wire")).toBe("high_current_power_module_ev_inverter_heavy_wire_thick_bond");
  });
});

describe("wireBonderTypes", () => {
  it("returns 5 types", () => {
    expect(wireBonderTypes()).toHaveLength(5);
  });
});
