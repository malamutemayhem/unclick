import { describe, it, expect } from "vitest";
import {
  pressure, speed, life, friction,
  slCost, contactFree, forHighTemp, material,
  bestUse, sealTypes,
} from "../seal-type-calc.js";

describe("pressure", () => {
  it("gasket spiral wound highest pressure", () => {
    expect(pressure("gasket_spiral_wound")).toBeGreaterThan(pressure("labyrinth_non_contact"));
  });
});

describe("speed", () => {
  it("labyrinth highest speed", () => {
    expect(speed("labyrinth_non_contact")).toBeGreaterThan(speed("gasket_spiral_wound"));
  });
});

describe("life", () => {
  it("labyrinth longest life", () => {
    expect(life("labyrinth_non_contact")).toBeGreaterThan(life("lip_seal_radial_shaft"));
  });
});

describe("friction", () => {
  it("labyrinth lowest friction", () => {
    expect(friction("labyrinth_non_contact")).toBeGreaterThan(friction("oring_static_groove"));
  });
});

describe("slCost", () => {
  it("mechanical face most expensive", () => {
    expect(slCost("mechanical_face_rotary")).toBeGreaterThan(slCost("oring_static_groove"));
  });
});

describe("contactFree", () => {
  it("labyrinth is contact free", () => {
    expect(contactFree("labyrinth_non_contact")).toBe(true);
  });
  it("oring not contact free", () => {
    expect(contactFree("oring_static_groove")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("mechanical face for high temp", () => {
    expect(forHighTemp("mechanical_face_rotary")).toBe(true);
  });
  it("oring not for high temp", () => {
    expect(forHighTemp("oring_static_groove")).toBe(false);
  });
});

describe("material", () => {
  it("gasket uses stainless graphite spiral", () => {
    expect(material("gasket_spiral_wound")).toBe("stainless_graphite_spiral");
  });
});

describe("bestUse", () => {
  it("labyrinth best for turbine shaft", () => {
    expect(bestUse("labyrinth_non_contact")).toBe("turbine_shaft_bearing_isolator");
  });
});

describe("sealTypes", () => {
  it("returns 5 types", () => {
    expect(sealTypes()).toHaveLength(5);
  });
});
