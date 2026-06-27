import { describe, it, expect } from "vitest";
import {
  isolation, insertionLoss, speed, reliability,
  swCost, latching, forRf, actuation,
  bestUse, memsSwitches,
} from "../mems-switch-calc.js";

describe("isolation", () => {
  it("capacitive shunt best isolation", () => {
    expect(isolation("capacitive_shunt")).toBeGreaterThan(isolation("lateral_comb_drive"));
  });
});

describe("insertionLoss", () => {
  it("piezo actuated beam lowest insertion loss", () => {
    expect(insertionLoss("piezo_actuated_beam")).toBeGreaterThan(insertionLoss("lateral_comb_drive"));
  });
});

describe("speed", () => {
  it("piezo actuated beam fastest", () => {
    expect(speed("piezo_actuated_beam")).toBeGreaterThan(speed("magnetic_bistable"));
  });
});

describe("reliability", () => {
  it("magnetic bistable most reliable", () => {
    expect(reliability("magnetic_bistable")).toBeGreaterThan(reliability("ohmic_cantilever"));
  });
});

describe("swCost", () => {
  it("piezo actuated beam most expensive", () => {
    expect(swCost("piezo_actuated_beam")).toBeGreaterThan(swCost("capacitive_shunt"));
  });
});

describe("latching", () => {
  it("magnetic bistable is latching", () => {
    expect(latching("magnetic_bistable")).toBe(true);
  });
  it("ohmic cantilever not latching", () => {
    expect(latching("ohmic_cantilever")).toBe(false);
  });
});

describe("forRf", () => {
  it("ohmic cantilever for rf", () => {
    expect(forRf("ohmic_cantilever")).toBe(true);
  });
  it("lateral comb drive not for rf", () => {
    expect(forRf("lateral_comb_drive")).toBe(false);
  });
});

describe("actuation", () => {
  it("magnetic bistable uses permanent magnet toggle", () => {
    expect(actuation("magnetic_bistable")).toBe("permanent_magnet_toggle");
  });
});

describe("bestUse", () => {
  it("piezo actuated beam best for mmwave 5g phase shift", () => {
    expect(bestUse("piezo_actuated_beam")).toBe("mmwave_5g_phase_shift");
  });
});

describe("memsSwitches", () => {
  it("returns 5 types", () => {
    expect(memsSwitches()).toHaveLength(5);
  });
});
