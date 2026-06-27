import { describe, it, expect } from "vitest";
import {
  removalEff, hydraulicLoad, sludgeHandling, footprint,
  clCost, compact, forPrimary, mechanism,
  bestUse, clarifierTankTypes,
} from "../clarifier-tank-calc.js";

describe("removalEff", () => {
  it("lamella plate best removal efficiency", () => {
    expect(removalEff("lamella_plate_settler")).toBeGreaterThan(removalEff("rectangular_chain_flight"));
  });
});

describe("hydraulicLoad", () => {
  it("lamella plate highest hydraulic load", () => {
    expect(hydraulicLoad("lamella_plate_settler")).toBeGreaterThan(hydraulicLoad("circular_center_feed"));
  });
});

describe("sludgeHandling", () => {
  it("circular center feed best sludge handling", () => {
    expect(sludgeHandling("circular_center_feed")).toBeGreaterThan(sludgeHandling("lamella_plate_settler"));
  });
});

describe("footprint", () => {
  it("lamella plate smallest footprint", () => {
    expect(footprint("lamella_plate_settler")).toBeGreaterThan(footprint("circular_center_feed"));
  });
});

describe("clCost", () => {
  it("solids contact most expensive", () => {
    expect(clCost("solids_contact_upflow")).toBeGreaterThan(clCost("rectangular_chain_flight"));
  });
});

describe("compact", () => {
  it("lamella plate is compact", () => {
    expect(compact("lamella_plate_settler")).toBe(true);
  });
  it("circular center feed not compact", () => {
    expect(compact("circular_center_feed")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("circular center feed for primary", () => {
    expect(forPrimary("circular_center_feed")).toBe(true);
  });
  it("lamella plate not for primary", () => {
    expect(forPrimary("lamella_plate_settler")).toBe(false);
  });
});

describe("mechanism", () => {
  it("dissolved air flotation uses micro bubble", () => {
    expect(mechanism("dissolved_air_flotation")).toBe("pressurized_recycle_micro_bubble_float_skim");
  });
});

describe("bestUse", () => {
  it("solids contact for lime softening", () => {
    expect(bestUse("solids_contact_upflow")).toBe("lime_softening_coagulation_water_treatment");
  });
});

describe("clarifierTankTypes", () => {
  it("returns 5 types", () => {
    expect(clarifierTankTypes()).toHaveLength(5);
  });
});
