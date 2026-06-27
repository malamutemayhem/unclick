import { describe, it, expect } from "vitest";
import {
  capacity, safety, hygiene, noise,
  tcCost, fireRated, forHighRise, discharge,
  bestUse, trashChuteTypes,
} from "../trash-chute-calc.js";

describe("capacity", () => {
  it("compactor highest capacity", () => {
    expect(capacity("compactor_integrated")).toBeGreaterThan(capacity("tri_sorter_recycling"));
  });
});

describe("safety", () => {
  it("fire rated safest", () => {
    expect(safety("fire_rated_uf_listed")).toBeGreaterThan(safety("gravity_stainless_round"));
  });
});

describe("hygiene", () => {
  it("pneumatic best hygiene", () => {
    expect(hygiene("pneumatic_vacuum_tube")).toBeGreaterThan(hygiene("gravity_stainless_round"));
  });
});

describe("noise", () => {
  it("fire rated quieter than pneumatic", () => {
    expect(noise("fire_rated_uf_listed")).toBeGreaterThan(noise("pneumatic_vacuum_tube"));
  });
});

describe("tcCost", () => {
  it("pneumatic most expensive", () => {
    expect(tcCost("pneumatic_vacuum_tube")).toBeGreaterThan(tcCost("gravity_stainless_round"));
  });
});

describe("fireRated", () => {
  it("fire rated is fire rated", () => {
    expect(fireRated("fire_rated_uf_listed")).toBe(true);
  });
  it("gravity not fire rated", () => {
    expect(fireRated("gravity_stainless_round")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("compactor for high rise", () => {
    expect(forHighRise("compactor_integrated")).toBe(true);
  });
  it("gravity not high rise", () => {
    expect(forHighRise("gravity_stainless_round")).toBe(false);
  });
});

describe("discharge", () => {
  it("pneumatic uses vacuum pipe", () => {
    expect(discharge("pneumatic_vacuum_tube")).toBe("vacuum_pipe_central_collect");
  });
});

describe("bestUse", () => {
  it("tri sorter for green building", () => {
    expect(bestUse("tri_sorter_recycling")).toBe("green_building_leed_recycle");
  });
});

describe("trashChuteTypes", () => {
  it("returns 5 types", () => {
    expect(trashChuteTypes()).toHaveLength(5);
  });
});
