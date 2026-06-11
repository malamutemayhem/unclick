import { describe, it, expect } from "vitest";
import {
  toolFit, swapSpeed, loadCapacity, sizeRange,
  holeCost, quickChange, stepped, holeProfile,
  bestUse, hardyHoles,
} from "../hardy-hole-calc.js";

describe("toolFit", () => {
  it("tapered hardy wedge best tool fit", () => {
    expect(toolFit("tapered_hardy_wedge")).toBeGreaterThan(toolFit("round_hardy_insert"));
  });
});

describe("swapSpeed", () => {
  it("quick change lock fastest swap", () => {
    expect(swapSpeed("quick_change_lock")).toBeGreaterThan(swapSpeed("tapered_hardy_wedge"));
  });
});

describe("loadCapacity", () => {
  it("tapered hardy wedge highest load capacity", () => {
    expect(loadCapacity("tapered_hardy_wedge")).toBeGreaterThan(loadCapacity("round_hardy_insert"));
  });
});

describe("sizeRange", () => {
  it("stepped hardy multi widest size range", () => {
    expect(sizeRange("stepped_hardy_multi")).toBeGreaterThan(sizeRange("round_hardy_insert"));
  });
});

describe("holeCost", () => {
  it("quick change lock most expensive", () => {
    expect(holeCost("quick_change_lock")).toBeGreaterThan(holeCost("square_hardy_standard"));
  });
});

describe("quickChange", () => {
  it("quick change lock has quick change", () => {
    expect(quickChange("quick_change_lock")).toBe(true);
  });
  it("square hardy standard no quick change", () => {
    expect(quickChange("square_hardy_standard")).toBe(false);
  });
});

describe("stepped", () => {
  it("stepped hardy multi is stepped", () => {
    expect(stepped("stepped_hardy_multi")).toBe(true);
  });
  it("square hardy standard not stepped", () => {
    expect(stepped("square_hardy_standard")).toBe(false);
  });
});

describe("holeProfile", () => {
  it("tapered hardy wedge uses tapered wedge lock", () => {
    expect(holeProfile("tapered_hardy_wedge")).toBe("tapered_wedge_lock");
  });
});

describe("bestUse", () => {
  it("square hardy standard best for general hardy mount", () => {
    expect(bestUse("square_hardy_standard")).toBe("general_hardy_mount");
  });
});

describe("hardyHoles", () => {
  it("returns 5 types", () => {
    expect(hardyHoles()).toHaveLength(5);
  });
});
