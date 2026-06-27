import { describe, it, expect } from "vitest";
import {
  dexterity, protection, grip, durability,
  sgCost, disposable, forCut, material,
  bestUse, safetyGloveTypes,
} from "../safety-glove-calc.js";

describe("dexterity", () => {
  it("cut resistant best dexterity", () => {
    expect(dexterity("cut_resistant_hppe_steel")).toBeGreaterThan(dexterity("arc_flash_electrical_rated"));
  });
});

describe("protection", () => {
  it("arc flash highest protection", () => {
    expect(protection("arc_flash_electrical_rated")).toBeGreaterThan(protection("leather_work_general"));
  });
});

describe("grip", () => {
  it("cut resistant best grip", () => {
    expect(grip("cut_resistant_hppe_steel")).toBeGreaterThan(grip("arc_flash_electrical_rated"));
  });
});

describe("durability", () => {
  it("leather most durable", () => {
    expect(durability("leather_work_general")).toBeGreaterThan(durability("nitrile_chemical_resist"));
  });
});

describe("sgCost", () => {
  it("arc flash most expensive", () => {
    expect(sgCost("arc_flash_electrical_rated")).toBeGreaterThan(sgCost("nitrile_chemical_resist"));
  });
});

describe("disposable", () => {
  it("nitrile is disposable", () => {
    expect(disposable("nitrile_chemical_resist")).toBe(true);
  });
  it("leather not disposable", () => {
    expect(disposable("leather_work_general")).toBe(false);
  });
});

describe("forCut", () => {
  it("cut resistant for cut", () => {
    expect(forCut("cut_resistant_hppe_steel")).toBe(true);
  });
  it("nitrile not for cut", () => {
    expect(forCut("nitrile_chemical_resist")).toBe(false);
  });
});

describe("material", () => {
  it("arc flash uses rubber insulated leather", () => {
    expect(material("arc_flash_electrical_rated")).toBe("rubber_insulated_leather_protector");
  });
});

describe("bestUse", () => {
  it("leather for general handling", () => {
    expect(bestUse("leather_work_general")).toBe("general_handling_abrasion_heat");
  });
});

describe("safetyGloveTypes", () => {
  it("returns 5 types", () => {
    expect(safetyGloveTypes()).toHaveLength(5);
  });
});
