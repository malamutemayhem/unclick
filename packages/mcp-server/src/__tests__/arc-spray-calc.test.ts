import { describe, it, expect } from "vitest";
import {
  deposition, adhesion, portability, oxidation,
  asCost, portable, forLargeArea, feedstock,
  bestUse, arcSprayTypes,
} from "../arc-spray-calc.js";

describe("deposition", () => {
  it("twin wire highest deposition", () => {
    expect(deposition("twin_wire_standard")).toBeGreaterThan(deposition("ceramic_rod_flame"));
  });
});

describe("adhesion", () => {
  it("cold spray best adhesion", () => {
    expect(adhesion("cold_spray_kinetic")).toBeGreaterThan(adhesion("ceramic_rod_flame"));
  });
});

describe("portability", () => {
  it("ceramic rod most portable", () => {
    expect(portability("ceramic_rod_flame")).toBeGreaterThan(portability("cold_spray_kinetic"));
  });
});

describe("oxidation", () => {
  it("cold spray lowest oxidation", () => {
    expect(oxidation("cold_spray_kinetic")).toBeGreaterThan(oxidation("ceramic_rod_flame"));
  });
});

describe("asCost", () => {
  it("cold spray most expensive", () => {
    expect(asCost("cold_spray_kinetic")).toBeGreaterThan(asCost("ceramic_rod_flame"));
  });
});

describe("portable", () => {
  it("twin wire is portable", () => {
    expect(portable("twin_wire_standard")).toBe(true);
  });
  it("cold spray not portable", () => {
    expect(portable("cold_spray_kinetic")).toBe(false);
  });
});

describe("forLargeArea", () => {
  it("twin wire for large area", () => {
    expect(forLargeArea("twin_wire_standard")).toBe(true);
  });
  it("cold spray not for large area", () => {
    expect(forLargeArea("cold_spray_kinetic")).toBe(false);
  });
});

describe("feedstock", () => {
  it("cold spray uses supersonic gas jet", () => {
    expect(feedstock("cold_spray_kinetic")).toBe("powder_supersonic_gas_jet_no_melt");
  });
});

describe("bestUse", () => {
  it("twin wire for bridge corrosion zinc", () => {
    expect(bestUse("twin_wire_standard")).toBe("bridge_steel_structure_corrosion_zinc");
  });
});

describe("arcSprayTypes", () => {
  it("returns 5 types", () => {
    expect(arcSprayTypes()).toHaveLength(5);
  });
});
