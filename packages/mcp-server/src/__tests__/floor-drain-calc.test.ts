import { describe, it, expect } from "vitest";
import {
  flow, durability, aesthetic, maintenance,
  fdCost, trapSeal, forCommercial, grate,
  bestUse, floorDrainTypes,
} from "../floor-drain-calc.js";

describe("flow", () => {
  it("industrial highest flow", () => {
    expect(flow("industrial_heavy_duty")).toBeGreaterThan(flow("standard_round_cast_iron"));
  });
});

describe("durability", () => {
  it("industrial most durable", () => {
    expect(durability("industrial_heavy_duty")).toBeGreaterThan(durability("linear_trench_channel"));
  });
});

describe("aesthetic", () => {
  it("linear trench best aesthetic", () => {
    expect(aesthetic("linear_trench_channel")).toBeGreaterThan(aesthetic("industrial_heavy_duty"));
  });
});

describe("maintenance", () => {
  it("primed trap lowest maintenance", () => {
    expect(maintenance("primed_trap_seal")).toBeGreaterThan(maintenance("standard_round_cast_iron"));
  });
});

describe("fdCost", () => {
  it("linear trench most expensive", () => {
    expect(fdCost("linear_trench_channel")).toBeGreaterThan(fdCost("standard_round_cast_iron"));
  });
});

describe("trapSeal", () => {
  it("all have trap seal", () => {
    expect(trapSeal("standard_round_cast_iron")).toBe(true);
  });
});

describe("forCommercial", () => {
  it("linear trench for commercial", () => {
    expect(forCommercial("linear_trench_channel")).toBe(true);
  });
  it("standard not commercial", () => {
    expect(forCommercial("standard_round_cast_iron")).toBe(false);
  });
});

describe("grate", () => {
  it("industrial uses ductile iron", () => {
    expect(grate("industrial_heavy_duty")).toBe("ductile_iron_heavy_traffic_rated");
  });
});

describe("bestUse", () => {
  it("primed for mechanical room", () => {
    expect(bestUse("primed_trap_seal")).toBe("mechanical_room_infrequent_use");
  });
});

describe("floorDrainTypes", () => {
  it("returns 5 types", () => {
    expect(floorDrainTypes()).toHaveLength(5);
  });
});
