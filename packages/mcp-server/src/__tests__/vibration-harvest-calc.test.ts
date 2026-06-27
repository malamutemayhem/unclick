import { describe, it, expect } from "vitest";
import {
  powerOutput, bandwidth, size, durability,
  vhCost, noMagnet, forBridge, transduction,
  bestUse, vibrationHarvests,
} from "../vibration-harvest-calc.js";

describe("powerOutput", () => {
  it("magnetostrictive rod highest power output", () => {
    expect(powerOutput("magnetostrictive_rod")).toBeGreaterThan(powerOutput("electrostatic_comb"));
  });
});

describe("bandwidth", () => {
  it("triboelectric contact widest bandwidth", () => {
    expect(bandwidth("triboelectric_contact")).toBeGreaterThan(bandwidth("magnetostrictive_rod"));
  });
});

describe("size", () => {
  it("electrostatic comb smallest size", () => {
    expect(size("electrostatic_comb")).toBeGreaterThan(size("magnetostrictive_rod"));
  });
});

describe("durability", () => {
  it("magnetostrictive rod most durable", () => {
    expect(durability("magnetostrictive_rod")).toBeGreaterThan(durability("triboelectric_contact"));
  });
});

describe("vhCost", () => {
  it("magnetostrictive rod most expensive", () => {
    expect(vhCost("magnetostrictive_rod")).toBeGreaterThan(vhCost("triboelectric_contact"));
  });
});

describe("noMagnet", () => {
  it("electrostatic comb has no magnet", () => {
    expect(noMagnet("electrostatic_comb")).toBe(true);
  });
  it("electromagnetic coil uses magnet", () => {
    expect(noMagnet("electromagnetic_coil")).toBe(false);
  });
});

describe("forBridge", () => {
  it("electromagnetic coil for bridge", () => {
    expect(forBridge("electromagnetic_coil")).toBe(true);
  });
  it("electrostatic comb not for bridge", () => {
    expect(forBridge("electrostatic_comb")).toBe(false);
  });
});

describe("transduction", () => {
  it("triboelectric contact uses contact electrification", () => {
    expect(transduction("triboelectric_contact")).toBe("contact_electrification");
  });
});

describe("bestUse", () => {
  it("magnetostrictive rod best for rail track vibration node", () => {
    expect(bestUse("magnetostrictive_rod")).toBe("rail_track_vibration_node");
  });
});

describe("vibrationHarvests", () => {
  it("returns 5 types", () => {
    expect(vibrationHarvests()).toHaveLength(5);
  });
});
