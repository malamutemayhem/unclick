import { describe, it, expect } from "vitest";
import {
  windSpeed, threadCare, portability, bobbinFit,
  winderCost, autoStop, needsPower, driveType,
  bestSetup, bobbinWinders,
} from "../bobbin-winder-calc.js";

describe("windSpeed", () => {
  it("industrial auto stop fastest wind speed", () => {
    expect(windSpeed("industrial_auto_stop")).toBeGreaterThan(windSpeed("hand_crank_portable"));
  });
});

describe("threadCare", () => {
  it("hand crank portable best thread care", () => {
    expect(threadCare("hand_crank_portable")).toBeGreaterThan(threadCare("standalone_electric_speed"));
  });
});

describe("portability", () => {
  it("hand crank portable most portable", () => {
    expect(portability("hand_crank_portable")).toBeGreaterThan(portability("industrial_auto_stop"));
  });
});

describe("bobbinFit", () => {
  it("built in machine side best bobbin fit", () => {
    expect(bobbinFit("built_in_machine_side")).toBeGreaterThan(bobbinFit("hand_crank_portable"));
  });
});

describe("winderCost", () => {
  it("industrial auto stop most expensive", () => {
    expect(winderCost("industrial_auto_stop")).toBeGreaterThan(winderCost("hand_crank_portable"));
  });
});

describe("autoStop", () => {
  it("industrial auto stop has auto stop", () => {
    expect(autoStop("industrial_auto_stop")).toBe(true);
  });
  it("hand crank portable has no auto stop", () => {
    expect(autoStop("hand_crank_portable")).toBe(false);
  });
});

describe("needsPower", () => {
  it("standalone electric speed needs power", () => {
    expect(needsPower("standalone_electric_speed")).toBe(true);
  });
  it("hand crank portable needs no power", () => {
    expect(needsPower("hand_crank_portable")).toBe(false);
  });
});

describe("driveType", () => {
  it("hand crank portable uses manual gear handle", () => {
    expect(driveType("hand_crank_portable")).toBe("manual_gear_handle");
  });
});

describe("bestSetup", () => {
  it("industrial auto stop best for production garment factory", () => {
    expect(bestSetup("industrial_auto_stop")).toBe("production_garment_factory");
  });
});

describe("bobbinWinders", () => {
  it("returns 5 types", () => {
    expect(bobbinWinders()).toHaveLength(5);
  });
});
