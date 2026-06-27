import { describe, it, expect } from "vitest";
import {
  crimpForce, repeatability, gaugeRange, durability,
  toolCost, ratcheted, forFine, dieType,
  bestUse, crimpTools,
} from "../crimp-tool-calc.js";

describe("crimpForce", () => {
  it("hydraulic cable lug highest crimp force", () => {
    expect(crimpForce("hydraulic_cable_lug")).toBeGreaterThan(crimpForce("dupont_pin_crimper"));
  });
});

describe("repeatability", () => {
  it("ratchet insulated most repeatable", () => {
    expect(repeatability("ratchet_insulated_term")).toBeGreaterThan(repeatability("open_barrel_hand"));
  });
});

describe("gaugeRange", () => {
  it("hydraulic cable lug widest gauge range", () => {
    expect(gaugeRange("hydraulic_cable_lug")).toBeGreaterThan(gaugeRange("dupont_pin_crimper"));
  });
});

describe("durability", () => {
  it("hydraulic cable lug most durable", () => {
    expect(durability("hydraulic_cable_lug")).toBeGreaterThan(durability("open_barrel_hand"));
  });
});

describe("toolCost", () => {
  it("hydraulic cable lug most expensive", () => {
    expect(toolCost("hydraulic_cable_lug")).toBeGreaterThan(toolCost("open_barrel_hand"));
  });
});

describe("ratcheted", () => {
  it("ratchet insulated is ratcheted", () => {
    expect(ratcheted("ratchet_insulated_term")).toBe(true);
  });
  it("open barrel hand not ratcheted", () => {
    expect(ratcheted("open_barrel_hand")).toBe(false);
  });
});

describe("forFine", () => {
  it("dupont pin crimper is for fine", () => {
    expect(forFine("dupont_pin_crimper")).toBe(true);
  });
  it("ratchet insulated not for fine", () => {
    expect(forFine("ratchet_insulated_term")).toBe(false);
  });
});

describe("dieType", () => {
  it("hydraulic cable lug uses hexagonal compress die", () => {
    expect(dieType("hydraulic_cable_lug")).toBe("hexagonal_compress_die");
  });
});

describe("bestUse", () => {
  it("dupont pin crimper best for dupont jst connector", () => {
    expect(bestUse("dupont_pin_crimper")).toBe("dupont_jst_connector");
  });
});

describe("crimpTools", () => {
  it("returns 5 types", () => {
    expect(crimpTools()).toHaveLength(5);
  });
});
