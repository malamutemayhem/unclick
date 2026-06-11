import { describe, it, expect } from "vitest";
import {
  loadCapacity, rotation, movement, durability,
  bpCost, steelReinforced, forBridge, material,
  bestUse, bearingPadTypes,
} from "../bearing-pad-calc.js";

describe("loadCapacity", () => {
  it("spherical highest load capacity", () => {
    expect(loadCapacity("spherical_curved_ptfe_surface")).toBeGreaterThan(loadCapacity("elastomeric_plain_neoprene"));
  });
});

describe("rotation", () => {
  it("spherical best rotation", () => {
    expect(rotation("spherical_curved_ptfe_surface")).toBeGreaterThan(rotation("elastomeric_plain_neoprene"));
  });
});

describe("movement", () => {
  it("spherical best movement", () => {
    expect(movement("spherical_curved_ptfe_surface")).toBeGreaterThan(movement("pot_bearing_confined_rubber"));
  });
});

describe("durability", () => {
  it("pot bearing very durable", () => {
    expect(durability("pot_bearing_confined_rubber")).toBeGreaterThan(durability("elastomeric_plain_neoprene"));
  });
});

describe("bpCost", () => {
  it("spherical most expensive", () => {
    expect(bpCost("spherical_curved_ptfe_surface")).toBeGreaterThan(bpCost("elastomeric_plain_neoprene"));
  });
});

describe("steelReinforced", () => {
  it("pot bearing is steel reinforced", () => {
    expect(steelReinforced("pot_bearing_confined_rubber")).toBe(true);
  });
  it("plain neoprene not steel reinforced", () => {
    expect(steelReinforced("elastomeric_plain_neoprene")).toBe(false);
  });
});

describe("forBridge", () => {
  it("all for bridge", () => {
    expect(forBridge("disc_bearing_polyether_urethane")).toBe(true);
  });
});

describe("material", () => {
  it("pot bearing uses confined rubber disc", () => {
    expect(material("pot_bearing_confined_rubber")).toBe("steel_pot_confined_rubber_disc");
  });
});

describe("bestUse", () => {
  it("spherical for long span cable stayed", () => {
    expect(bestUse("spherical_curved_ptfe_surface")).toBe("long_span_cable_stayed_bridge");
  });
});

describe("bearingPadTypes", () => {
  it("returns 5 types", () => {
    expect(bearingPadTypes()).toHaveLength(5);
  });
});
