import { describe, it, expect } from "vitest";
import {
  power, speed, weight, durability,
  ptCost, rotary, forAssembly, drive,
  bestUse, pneumaticToolTypes,
} from "../pneumatic-tool-calc.js";

describe("power", () => {
  it("air hammer most powerful", () => {
    expect(power("air_hammer_chisel")).toBeGreaterThan(power("orbital_sander_palm"));
  });
});

describe("speed", () => {
  it("die grinder fastest", () => {
    expect(speed("die_grinder_rotary")).toBeGreaterThan(speed("air_hammer_chisel"));
  });
});

describe("weight", () => {
  it("air hammer heaviest", () => {
    expect(weight("air_hammer_chisel")).toBeGreaterThan(weight("orbital_sander_palm"));
  });
});

describe("durability", () => {
  it("impact wrench most durable", () => {
    expect(durability("impact_wrench_socket")).toBeGreaterThan(durability("orbital_sander_palm"));
  });
});

describe("ptCost", () => {
  it("impact wrench most expensive", () => {
    expect(ptCost("impact_wrench_socket")).toBeGreaterThan(ptCost("orbital_sander_palm"));
  });
});

describe("rotary", () => {
  it("die grinder is rotary", () => {
    expect(rotary("die_grinder_rotary")).toBe(true);
  });
  it("air hammer not rotary", () => {
    expect(rotary("air_hammer_chisel")).toBe(false);
  });
});

describe("forAssembly", () => {
  it("impact wrench for assembly", () => {
    expect(forAssembly("impact_wrench_socket")).toBe(true);
  });
  it("die grinder not for assembly", () => {
    expect(forAssembly("die_grinder_rotary")).toBe(false);
  });
});

describe("drive", () => {
  it("orbital sander uses eccentric orbit", () => {
    expect(drive("orbital_sander_palm")).toBe("eccentric_orbit_pad_velcro");
  });
});

describe("bestUse", () => {
  it("impact wrench for bolt torque", () => {
    expect(bestUse("impact_wrench_socket")).toBe("bolt_torque_lug_nut_assembly");
  });
});

describe("pneumaticToolTypes", () => {
  it("returns 5 types", () => {
    expect(pneumaticToolTypes()).toHaveLength(5);
  });
});
