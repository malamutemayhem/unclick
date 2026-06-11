import { describe, it, expect } from "vitest";
import {
  movement, durability, rideQuality, waterproof,
  ejCost, sealed, forBridge, material,
  bestUse, expansionJointTypes,
} from "../expansion-joint-calc.js";

describe("movement", () => {
  it("modular highest movement", () => {
    expect(movement("modular_multiple_seal_gap")).toBeGreaterThan(movement("compression_seal_preformed"));
  });
});

describe("durability", () => {
  it("finger plate most durable", () => {
    expect(durability("finger_plate_cantilever")).toBeGreaterThan(durability("compression_seal_preformed"));
  });
});

describe("rideQuality", () => {
  it("compression seal best ride", () => {
    expect(rideQuality("compression_seal_preformed")).toBeGreaterThan(rideQuality("sliding_plate_steel_ptfe"));
  });
});

describe("waterproof", () => {
  it("strip seal most waterproof", () => {
    expect(waterproof("strip_seal_steel_neoprene")).toBeGreaterThan(waterproof("sliding_plate_steel_ptfe"));
  });
});

describe("ejCost", () => {
  it("modular most expensive", () => {
    expect(ejCost("modular_multiple_seal_gap")).toBeGreaterThan(ejCost("compression_seal_preformed"));
  });
});

describe("sealed", () => {
  it("strip seal is sealed", () => {
    expect(sealed("strip_seal_steel_neoprene")).toBe(true);
  });
  it("finger plate not sealed", () => {
    expect(sealed("finger_plate_cantilever")).toBe(false);
  });
});

describe("forBridge", () => {
  it("all for bridge", () => {
    expect(forBridge("modular_multiple_seal_gap")).toBe(true);
  });
});

describe("material", () => {
  it("finger plate uses steel finger plate", () => {
    expect(material("finger_plate_cantilever")).toBe("steel_finger_plate_meshed");
  });
});

describe("bestUse", () => {
  it("strip seal for highway bridge", () => {
    expect(bestUse("strip_seal_steel_neoprene")).toBe("highway_bridge_moderate_movement");
  });
});

describe("expansionJointTypes", () => {
  it("returns 5 types", () => {
    expect(expansionJointTypes()).toHaveLength(5);
  });
});
