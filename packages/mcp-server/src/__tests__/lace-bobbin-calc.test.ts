import { describe, it, expect } from "vitest";
import {
  threadControl, weightBalance, fineness, durability,
  bobbinCost, hasSpangle, forFineLace, bobbinMaterial,
  bestProject, laceBobbins,
} from "../lace-bobbin-calc.js";

describe("threadControl", () => {
  it("honiton fine light best thread control", () => {
    expect(threadControl("honiton_fine_light")).toBeGreaterThan(threadControl("jumbo_thick_cord"));
  });
});

describe("weightBalance", () => {
  it("spangled bead weight best balance", () => {
    expect(weightBalance("spangled_bead_weight")).toBeGreaterThan(weightBalance("honiton_fine_light"));
  });
});

describe("fineness", () => {
  it("honiton fine light finest", () => {
    expect(fineness("honiton_fine_light")).toBeGreaterThan(fineness("jumbo_thick_cord"));
  });
});

describe("durability", () => {
  it("jumbo thick cord most durable", () => {
    expect(durability("jumbo_thick_cord")).toBeGreaterThan(durability("honiton_fine_light"));
  });
});

describe("bobbinCost", () => {
  it("spangled bead weight most expensive", () => {
    expect(bobbinCost("spangled_bead_weight")).toBeGreaterThan(bobbinCost("jumbo_thick_cord"));
  });
});

describe("hasSpangle", () => {
  it("spangled bead weight has spangle", () => {
    expect(hasSpangle("spangled_bead_weight")).toBe(true);
  });
  it("midland square cut has no spangle", () => {
    expect(hasSpangle("midland_square_cut")).toBe(false);
  });
});

describe("forFineLace", () => {
  it("honiton fine light is for fine lace", () => {
    expect(forFineLace("honiton_fine_light")).toBe(true);
  });
  it("jumbo thick cord is not for fine lace", () => {
    expect(forFineLace("jumbo_thick_cord")).toBe(false);
  });
});

describe("bobbinMaterial", () => {
  it("honiton fine light uses boxwood fine turned", () => {
    expect(bobbinMaterial("honiton_fine_light")).toBe("boxwood_fine_turned");
  });
});

describe("bestProject", () => {
  it("spangled bead weight best for pillow lace tension", () => {
    expect(bestProject("spangled_bead_weight")).toBe("pillow_lace_tension");
  });
});

describe("laceBobbins", () => {
  it("returns 5 types", () => {
    expect(laceBobbins()).toHaveLength(5);
  });
});
