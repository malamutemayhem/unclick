import { describe, it, expect } from "vitest";
import {
  loadBearing, adjustability, installSpeed, equipmentCost,
  heightCapacity, requiresCrane, reusable, supportType,
  bestApplication, shoringMethods,
} from "../shoring-method-calc.js";

describe("loadBearing", () => {
  it("flying form highest load bearing", () => {
    expect(loadBearing("flying_form")).toBeGreaterThan(loadBearing("timber_shoring"));
  });
});

describe("adjustability", () => {
  it("hydraulic jack most adjustable", () => {
    expect(adjustability("hydraulic_jack")).toBeGreaterThan(adjustability("timber_shoring"));
  });
});

describe("installSpeed", () => {
  it("flying form fastest install", () => {
    expect(installSpeed("flying_form")).toBeGreaterThan(installSpeed("timber_shoring"));
  });
});

describe("equipmentCost", () => {
  it("flying form most expensive", () => {
    expect(equipmentCost("flying_form")).toBeGreaterThan(equipmentCost("timber_shoring"));
  });
});

describe("heightCapacity", () => {
  it("flying form greatest height", () => {
    expect(heightCapacity("flying_form")).toBeGreaterThan(heightCapacity("timber_shoring"));
  });
});

describe("requiresCrane", () => {
  it("flying form requires crane", () => {
    expect(requiresCrane("flying_form")).toBe(true);
  });
  it("post shore does not", () => {
    expect(requiresCrane("post_shore")).toBe(false);
  });
});

describe("reusable", () => {
  it("steel beam is reusable", () => {
    expect(reusable("steel_beam")).toBe(true);
  });
  it("timber shoring is not", () => {
    expect(reusable("timber_shoring")).toBe(false);
  });
});

describe("supportType", () => {
  it("flying form is table form crane moved", () => {
    expect(supportType("flying_form")).toBe("table_form_crane_moved");
  });
});

describe("bestApplication", () => {
  it("hydraulic jack for bridge deck precise level", () => {
    expect(bestApplication("hydraulic_jack")).toBe("bridge_deck_precise_level");
  });
});

describe("shoringMethods", () => {
  it("returns 5 methods", () => {
    expect(shoringMethods()).toHaveLength(5);
  });
});
