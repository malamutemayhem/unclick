import { describe, it, expect } from "vitest";
import {
  writingComfort, deskProtection, mouseTracking, easyClean,
  padCost, waterResistant, nonSlip, surfaceMaterial,
  bestSetup, deskPads,
} from "../desk-pad-calc.js";

describe("writingComfort", () => {
  it("leather executive most comfortable writing", () => {
    expect(writingComfort("leather_executive")).toBeGreaterThan(writingComfort("clear_vinyl_overlay"));
  });
});

describe("deskProtection", () => {
  it("clear vinyl overlay best protection", () => {
    expect(deskProtection("clear_vinyl_overlay")).toBeGreaterThan(deskProtection("extended_mouse_pad"));
  });
});

describe("mouseTracking", () => {
  it("extended mouse pad best tracking", () => {
    expect(mouseTracking("extended_mouse_pad")).toBeGreaterThan(mouseTracking("clear_vinyl_overlay"));
  });
});

describe("easyClean", () => {
  it("clear vinyl overlay easiest to clean", () => {
    expect(easyClean("clear_vinyl_overlay")).toBeGreaterThan(easyClean("felt_wool_blend"));
  });
});

describe("padCost", () => {
  it("leather executive most expensive", () => {
    expect(padCost("leather_executive")).toBeGreaterThan(padCost("clear_vinyl_overlay"));
  });
});

describe("waterResistant", () => {
  it("leather executive is water resistant", () => {
    expect(waterResistant("leather_executive")).toBe(true);
  });
  it("felt wool blend is not", () => {
    expect(waterResistant("felt_wool_blend")).toBe(false);
  });
});

describe("nonSlip", () => {
  it("cork natural is non slip", () => {
    expect(nonSlip("cork_natural")).toBe(true);
  });
  it("clear vinyl overlay is not", () => {
    expect(nonSlip("clear_vinyl_overlay")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("cork natural uses sustainable cork sheet", () => {
    expect(surfaceMaterial("cork_natural")).toBe("sustainable_cork_sheet");
  });
});

describe("bestSetup", () => {
  it("extended mouse pad best for gaming dual monitor", () => {
    expect(bestSetup("extended_mouse_pad")).toBe("gaming_dual_monitor");
  });
});

describe("deskPads", () => {
  it("returns 5 types", () => {
    expect(deskPads()).toHaveLength(5);
  });
});
