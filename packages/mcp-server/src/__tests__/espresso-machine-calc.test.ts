import { describe, it, expect } from "vitest";
import {
  shotQuality, consistency, userControl, convenienceScore,
  machineCost, builtInGrinder, steamWand, brewMethod,
  bestUser, espressoMachines,
} from "../espresso-machine-calc.js";

describe("shotQuality", () => {
  it("manual lever best shot quality", () => {
    expect(shotQuality("manual_lever")).toBeGreaterThan(shotQuality("capsule_pod"));
  });
});

describe("consistency", () => {
  it("super auto most consistent", () => {
    expect(consistency("super_auto")).toBeGreaterThan(consistency("manual_lever"));
  });
});

describe("userControl", () => {
  it("manual lever most control", () => {
    expect(userControl("manual_lever")).toBeGreaterThan(userControl("capsule_pod"));
  });
});

describe("convenienceScore", () => {
  it("capsule pod most convenient", () => {
    expect(convenienceScore("capsule_pod")).toBeGreaterThan(convenienceScore("manual_lever"));
  });
});

describe("machineCost", () => {
  it("super auto most expensive", () => {
    expect(machineCost("super_auto")).toBeGreaterThan(machineCost("capsule_pod"));
  });
});

describe("builtInGrinder", () => {
  it("super auto has grinder", () => {
    expect(builtInGrinder("super_auto")).toBe(true);
  });
  it("semi auto does not", () => {
    expect(builtInGrinder("semi_auto")).toBe(false);
  });
});

describe("steamWand", () => {
  it("semi auto has steam wand", () => {
    expect(steamWand("semi_auto")).toBe(true);
  });
  it("capsule pod does not", () => {
    expect(steamWand("capsule_pod")).toBe(false);
  });
});

describe("brewMethod", () => {
  it("manual lever uses piston direct pressure pull", () => {
    expect(brewMethod("manual_lever")).toBe("piston_direct_pressure_pull");
  });
});

describe("bestUser", () => {
  it("capsule pod for quick no mess minimal", () => {
    expect(bestUser("capsule_pod")).toBe("quick_no_mess_minimal");
  });
});

describe("espressoMachines", () => {
  it("returns 5 types", () => {
    expect(espressoMachines()).toHaveLength(5);
  });
});
