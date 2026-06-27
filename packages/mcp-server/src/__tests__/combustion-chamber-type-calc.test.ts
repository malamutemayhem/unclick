import { describe, it, expect } from "vitest";
import {
  efficiency, emissions, durability, uniformity,
  ccCost, dryLowNox, forAero, geometry,
  bestUse, combustionChamberTypes,
} from "../combustion-chamber-type-calc.js";

describe("efficiency", () => {
  it("annular most efficient", () => {
    expect(efficiency("annular_full_ring")).toBeGreaterThan(efficiency("can_tubular_individual"));
  });
});

describe("emissions", () => {
  it("rich burn best emissions score", () => {
    expect(emissions("rich_burn_quick_quench")).toBeGreaterThan(emissions("can_tubular_individual"));
  });
});

describe("durability", () => {
  it("can tubular most durable", () => {
    expect(durability("can_tubular_individual")).toBeGreaterThan(durability("rich_burn_quick_quench"));
  });
});

describe("uniformity", () => {
  it("annular best uniformity", () => {
    expect(uniformity("annular_full_ring")).toBeGreaterThan(uniformity("can_tubular_individual"));
  });
});

describe("ccCost", () => {
  it("rich burn most expensive", () => {
    expect(ccCost("rich_burn_quick_quench")).toBeGreaterThan(ccCost("can_tubular_individual"));
  });
});

describe("dryLowNox", () => {
  it("rich burn is dry low nox", () => {
    expect(dryLowNox("rich_burn_quick_quench")).toBe(true);
  });
  it("annular not dry low nox", () => {
    expect(dryLowNox("annular_full_ring")).toBe(false);
  });
});

describe("forAero", () => {
  it("annular for aero", () => {
    expect(forAero("annular_full_ring")).toBe(true);
  });
  it("can tubular not for aero", () => {
    expect(forAero("can_tubular_individual")).toBe(false);
  });
});

describe("geometry", () => {
  it("reverse flow uses folded path", () => {
    expect(geometry("reverse_flow_compact")).toBe("folded_flow_path_short_engine");
  });
});

describe("bestUse", () => {
  it("annular for modern aero engine", () => {
    expect(bestUse("annular_full_ring")).toBe("modern_aero_engine_compact_light");
  });
});

describe("combustionChamberTypes", () => {
  it("returns 5 types", () => {
    expect(combustionChamberTypes()).toHaveLength(5);
  });
});
