import { describe, it, expect } from "vitest";
import {
  precision, automation, energy, aesthetic,
  shCost, motorized, forFacade, drive,
  bestUse, shadeControlTypes,
} from "../shade-control-calc.js";

describe("precision", () => {
  it("bms most precise", () => {
    expect(precision("integrated_bms_facade")).toBeGreaterThan(precision("manual_chain_clutch"));
  });
});

describe("automation", () => {
  it("bms most automated", () => {
    expect(automation("integrated_bms_facade")).toBeGreaterThan(automation("manual_chain_clutch"));
  });
});

describe("energy", () => {
  it("bms best energy", () => {
    expect(energy("integrated_bms_facade")).toBeGreaterThan(energy("manual_chain_clutch"));
  });
});

describe("aesthetic", () => {
  it("bms best aesthetic", () => {
    expect(aesthetic("integrated_bms_facade")).toBeGreaterThan(aesthetic("manual_chain_clutch"));
  });
});

describe("shCost", () => {
  it("bms most expensive", () => {
    expect(shCost("integrated_bms_facade")).toBeGreaterThan(shCost("manual_chain_clutch"));
  });
});

describe("motorized", () => {
  it("rf remote is motorized", () => {
    expect(motorized("motorized_rf_remote")).toBe(true);
  });
  it("manual not motorized", () => {
    expect(motorized("manual_chain_clutch")).toBe(false);
  });
});

describe("forFacade", () => {
  it("bms for facade", () => {
    expect(forFacade("integrated_bms_facade")).toBe(true);
  });
  it("solar track not facade", () => {
    expect(forFacade("automated_solar_track")).toBe(false);
  });
});

describe("drive", () => {
  it("exterior uses wind sensor", () => {
    expect(drive("exterior_louver_wind")).toBe("exterior_louver_wind_sensor");
  });
});

describe("bestUse", () => {
  it("manual for budget office", () => {
    expect(bestUse("manual_chain_clutch")).toBe("budget_office_window_shade");
  });
});

describe("shadeControlTypes", () => {
  it("returns 5 types", () => {
    expect(shadeControlTypes()).toHaveLength(5);
  });
});
