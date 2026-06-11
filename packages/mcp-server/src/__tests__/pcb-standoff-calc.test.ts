import { describe, it, expect } from "vitest";
import {
  loadCapacity, installEase, vibrationResist, sizeCompact,
  standoffCost, reusable, conductive, mountMethod,
  bestUse, pcbStandoffs,
} from "../pcb-standoff-calc.js";

describe("loadCapacity", () => {
  it("threaded steel stud highest load capacity", () => {
    expect(loadCapacity("threaded_steel_stud")).toBeGreaterThan(loadCapacity("adhesive_rubber_bump"));
  });
});

describe("installEase", () => {
  it("round nylon snap easiest install", () => {
    expect(installEase("round_nylon_snap")).toBeGreaterThan(installEase("swage_press_fit"));
  });
});

describe("vibrationResist", () => {
  it("threaded steel stud best vibration resistance", () => {
    expect(vibrationResist("threaded_steel_stud")).toBeGreaterThan(vibrationResist("round_nylon_snap"));
  });
});

describe("sizeCompact", () => {
  it("adhesive rubber bump most compact", () => {
    expect(sizeCompact("adhesive_rubber_bump")).toBeGreaterThan(sizeCompact("threaded_steel_stud"));
  });
});

describe("standoffCost", () => {
  it("threaded steel stud most expensive", () => {
    expect(standoffCost("threaded_steel_stud")).toBeGreaterThan(standoffCost("round_nylon_snap"));
  });
});

describe("reusable", () => {
  it("hex male female brass is reusable", () => {
    expect(reusable("hex_male_female_brass")).toBe(true);
  });
  it("adhesive rubber bump not reusable", () => {
    expect(reusable("adhesive_rubber_bump")).toBe(false);
  });
});

describe("conductive", () => {
  it("hex male female brass is conductive", () => {
    expect(conductive("hex_male_female_brass")).toBe(true);
  });
  it("round nylon snap not conductive", () => {
    expect(conductive("round_nylon_snap")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("adhesive rubber bump uses peel stick adhesive", () => {
    expect(mountMethod("adhesive_rubber_bump")).toBe("peel_stick_adhesive");
  });
});

describe("bestUse", () => {
  it("hex male female brass best for stacked pcb assembly", () => {
    expect(bestUse("hex_male_female_brass")).toBe("stacked_pcb_assembly");
  });
});

describe("pcbStandoffs", () => {
  it("returns 5 types", () => {
    expect(pcbStandoffs()).toHaveLength(5);
  });
});
