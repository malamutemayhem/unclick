import { describe, it, expect } from "vitest";
import {
  waterproof, movement, durability, installEase,
  wsCost, swelling, forJoint, material,
  bestUse, waterstopTypes,
} from "../waterstop-calc.js";

describe("waterproof", () => {
  it("metal most waterproof", () => {
    expect(waterproof("metal_copper_stainless_plate")).toBeGreaterThan(waterproof("hydrophilic_swelling_strip"));
  });
});

describe("movement", () => {
  it("metal best movement", () => {
    expect(movement("metal_copper_stainless_plate")).toBeGreaterThan(movement("hydrophilic_swelling_strip"));
  });
});

describe("durability", () => {
  it("metal most durable", () => {
    expect(durability("metal_copper_stainless_plate")).toBeGreaterThan(durability("hydrophilic_swelling_strip"));
  });
});

describe("installEase", () => {
  it("hydrophilic easiest install", () => {
    expect(installEase("hydrophilic_swelling_strip")).toBeGreaterThan(installEase("metal_copper_stainless_plate"));
  });
});

describe("wsCost", () => {
  it("metal most expensive", () => {
    expect(wsCost("metal_copper_stainless_plate")).toBeGreaterThan(wsCost("hydrophilic_swelling_strip"));
  });
});

describe("swelling", () => {
  it("hydrophilic is swelling", () => {
    expect(swelling("hydrophilic_swelling_strip")).toBe(true);
  });
  it("pvc not swelling", () => {
    expect(swelling("pvc_dumbbell_center_bulb")).toBe(false);
  });
});

describe("forJoint", () => {
  it("all for joint", () => {
    expect(forJoint("injectable_grout_tube_hose")).toBe(true);
  });
});

describe("material", () => {
  it("injectable uses perforated hose", () => {
    expect(material("injectable_grout_tube_hose")).toBe("perforated_hose_grout_inject");
  });
});

describe("bestUse", () => {
  it("metal for dam tunnel critical", () => {
    expect(bestUse("metal_copper_stainless_plate")).toBe("dam_tunnel_critical_movement_joint");
  });
});

describe("waterstopTypes", () => {
  it("returns 5 types", () => {
    expect(waterstopTypes()).toHaveLength(5);
  });
});
