import { describe, it, expect } from "vitest";
import {
  voltageRating, currentRating, switchingSpeed, thermalRes,
  moduleCost, antiParallel, forInverter, packageType,
  bestUse, igbtModules,
} from "../igbt-module-calc.js";

describe("voltageRating", () => {
  it("npc 3level highest voltage rating", () => {
    expect(voltageRating("npc_3level")).toBeGreaterThan(voltageRating("single_switch"));
  });
});

describe("currentRating", () => {
  it("npc 3level highest current rating", () => {
    expect(currentRating("npc_3level")).toBeGreaterThan(currentRating("single_switch"));
  });
});

describe("switchingSpeed", () => {
  it("chopper brake fastest switching", () => {
    expect(switchingSpeed("chopper_brake")).toBeGreaterThan(switchingSpeed("npc_3level"));
  });
});

describe("thermalRes", () => {
  it("chopper brake highest thermal resistance", () => {
    expect(thermalRes("chopper_brake")).toBeGreaterThan(thermalRes("npc_3level"));
  });
});

describe("moduleCost", () => {
  it("npc 3level most expensive", () => {
    expect(moduleCost("npc_3level")).toBeGreaterThan(moduleCost("single_switch"));
  });
});

describe("antiParallel", () => {
  it("half bridge leg has anti parallel", () => {
    expect(antiParallel("half_bridge_leg")).toBe(true);
  });
  it("single switch no anti parallel", () => {
    expect(antiParallel("single_switch")).toBe(false);
  });
});

describe("forInverter", () => {
  it("six pack 3phase is for inverter", () => {
    expect(forInverter("six_pack_3phase")).toBe(true);
  });
  it("single switch not for inverter", () => {
    expect(forInverter("single_switch")).toBe(false);
  });
});

describe("packageType", () => {
  it("single switch uses to 247 discrete", () => {
    expect(packageType("single_switch")).toBe("to_247_discrete");
  });
});

describe("bestUse", () => {
  it("npc 3level best for mw wind converter", () => {
    expect(bestUse("npc_3level")).toBe("mw_wind_converter");
  });
});

describe("igbtModules", () => {
  it("returns 5 types", () => {
    expect(igbtModules()).toHaveLength(5);
  });
});
