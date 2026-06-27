import { describe, it, expect } from "vitest";
import {
  response, reliability, frostProtect, falseTrigger,
  avCost, supervised, forFreezing, trim,
  bestUse, alarmValveTypes,
} from "../alarm-valve-calc.js";

describe("response", () => {
  it("deluge fastest response", () => {
    expect(response("deluge_open_head")).toBeGreaterThan(response("dry_pipe_air_clapper"));
  });
});

describe("reliability", () => {
  it("wet pipe most reliable", () => {
    expect(reliability("wet_pipe_alarm_check")).toBeGreaterThan(reliability("dry_pipe_air_clapper"));
  });
});

describe("frostProtect", () => {
  it("dry pipe best frost protection", () => {
    expect(frostProtect("dry_pipe_air_clapper")).toBeGreaterThan(frostProtect("wet_pipe_alarm_check"));
  });
});

describe("falseTrigger", () => {
  it("double interlock lowest false trigger", () => {
    expect(falseTrigger("double_interlock_preaction")).toBeGreaterThan(falseTrigger("deluge_open_head"));
  });
});

describe("avCost", () => {
  it("double interlock most expensive", () => {
    expect(avCost("double_interlock_preaction")).toBeGreaterThan(avCost("wet_pipe_alarm_check"));
  });
});

describe("supervised", () => {
  it("all types supervised", () => {
    expect(supervised("wet_pipe_alarm_check")).toBe(true);
  });
});

describe("forFreezing", () => {
  it("dry pipe for freezing", () => {
    expect(forFreezing("dry_pipe_air_clapper")).toBe(true);
  });
  it("wet pipe not for freezing", () => {
    expect(forFreezing("wet_pipe_alarm_check")).toBe(false);
  });
});

describe("trim", () => {
  it("preaction uses solenoid panel", () => {
    expect(trim("preaction_electric_release")).toBe("solenoid_detector_panel_trip");
  });
});

describe("bestUse", () => {
  it("deluge for aircraft hangar", () => {
    expect(bestUse("deluge_open_head")).toBe("aircraft_hangar_chemical_plant");
  });
});

describe("alarmValveTypes", () => {
  it("returns 5 types", () => {
    expect(alarmValveTypes()).toHaveLength(5);
  });
});
