import { describe, it, expect } from "vitest";
import {
  tensileStrength, installEase, tamperResist, vibrationResist,
  boltCost, needsWasher, squareNeck, headProfile,
  bestUse, machineBolts,
} from "../machine-bolt-calc.js";

describe("tensileStrength", () => {
  it("socket head cap strongest", () => {
    expect(tensileStrength("socket_head_cap")).toBeGreaterThan(tensileStrength("carriage_bolt_round"));
  });
});

describe("installEase", () => {
  it("carriage bolt round easiest install", () => {
    expect(installEase("carriage_bolt_round")).toBeGreaterThan(installEase("socket_head_cap"));
  });
});

describe("tamperResist", () => {
  it("carriage bolt round most tamper resistant", () => {
    expect(tamperResist("carriage_bolt_round")).toBeGreaterThan(tamperResist("hex_head_grade_5"));
  });
});

describe("vibrationResist", () => {
  it("flange bolt serrated best vibration resistance", () => {
    expect(vibrationResist("flange_bolt_serrated")).toBeGreaterThan(vibrationResist("hex_head_grade_5"));
  });
});

describe("boltCost", () => {
  it("socket head cap most expensive", () => {
    expect(boltCost("socket_head_cap")).toBeGreaterThan(boltCost("hex_head_grade_5"));
  });
});

describe("needsWasher", () => {
  it("hex head grade 5 needs washer", () => {
    expect(needsWasher("hex_head_grade_5")).toBe(true);
  });
  it("flange bolt serrated does not", () => {
    expect(needsWasher("flange_bolt_serrated")).toBe(false);
  });
});

describe("squareNeck", () => {
  it("carriage bolt round has square neck", () => {
    expect(squareNeck("carriage_bolt_round")).toBe(true);
  });
  it("hex head grade 5 does not", () => {
    expect(squareNeck("hex_head_grade_5")).toBe(false);
  });
});

describe("headProfile", () => {
  it("socket head cap uses cylindrical allen key", () => {
    expect(headProfile("socket_head_cap")).toBe("cylindrical_allen_key");
  });
});

describe("bestUse", () => {
  it("flange bolt serrated best for automotive engine mount", () => {
    expect(bestUse("flange_bolt_serrated")).toBe("automotive_engine_mount");
  });
});

describe("machineBolts", () => {
  it("returns 5 types", () => {
    expect(machineBolts()).toHaveLength(5);
  });
});
