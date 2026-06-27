import { describe, it, expect } from "vitest";
import {
  headbandCare, deskFootprint, aesthetics, capacity,
  standCost, hasCharger, savesDesk, standMaterial,
  bestSetup, headphoneStands,
} from "../headphone-stand-calc.js";

describe("headbandCare", () => {
  it("wood single arm best headband care", () => {
    expect(headbandCare("wood_single_arm")).toBeGreaterThan(headbandCare("under_desk_clamp"));
  });
});

describe("deskFootprint", () => {
  it("under desk clamp smallest footprint", () => {
    expect(deskFootprint("under_desk_clamp")).toBeGreaterThan(deskFootprint("metal_dual_hanger"));
  });
});

describe("aesthetics", () => {
  it("wood single arm best aesthetics", () => {
    expect(aesthetics("wood_single_arm")).toBeGreaterThan(aesthetics("under_desk_clamp"));
  });
});

describe("capacity", () => {
  it("metal dual hanger most capacity", () => {
    expect(capacity("metal_dual_hanger")).toBeGreaterThan(capacity("wood_single_arm"));
  });
});

describe("standCost", () => {
  it("charging dock wireless most expensive", () => {
    expect(standCost("charging_dock_wireless")).toBeGreaterThan(standCost("under_desk_clamp"));
  });
});

describe("hasCharger", () => {
  it("charging dock wireless has charger", () => {
    expect(hasCharger("charging_dock_wireless")).toBe(true);
  });
  it("wood single arm has no charger", () => {
    expect(hasCharger("wood_single_arm")).toBe(false);
  });
});

describe("savesDesk", () => {
  it("under desk clamp saves desk", () => {
    expect(savesDesk("under_desk_clamp")).toBe(true);
  });
  it("wood single arm does not save desk", () => {
    expect(savesDesk("wood_single_arm")).toBe(false);
  });
});

describe("standMaterial", () => {
  it("wood single arm uses walnut hardwood finish", () => {
    expect(standMaterial("wood_single_arm")).toBe("walnut_hardwood_finish");
  });
});

describe("bestSetup", () => {
  it("metal dual hanger best for multi headphone studio", () => {
    expect(bestSetup("metal_dual_hanger")).toBe("multi_headphone_studio");
  });
});

describe("headphoneStands", () => {
  it("returns 5 types", () => {
    expect(headphoneStands()).toHaveLength(5);
  });
});
