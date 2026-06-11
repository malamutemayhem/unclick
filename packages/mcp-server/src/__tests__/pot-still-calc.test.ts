import { describe, it, expect } from "vitest";
import {
  flavorComplexity, distillationRate, copperContact, refluxControl,
  psCost_, batchProcess, forWhisky, stillConfig,
  bestUse, potStillTypes,
} from "../pot-still-calc.js";

describe("flavorComplexity", () => {
  it("alembic copper highest flavor complexity", () => {
    expect(flavorComplexity("alembic_copper")).toBeGreaterThan(flavorComplexity("hybrid_column_pot"));
  });
});

describe("distillationRate", () => {
  it("hybrid column pot fastest distillation rate", () => {
    expect(distillationRate("hybrid_column_pot")).toBeGreaterThan(distillationRate("alembic_copper"));
  });
});

describe("copperContact", () => {
  it("alembic copper most copper contact", () => {
    expect(copperContact("alembic_copper")).toBeGreaterThan(copperContact("lomond"));
  });
});

describe("refluxControl", () => {
  it("lomond best reflux control", () => {
    expect(refluxControl("lomond")).toBeGreaterThan(refluxControl("alembic_copper"));
  });
});

describe("psCost_", () => {
  it("hybrid column pot most expensive", () => {
    expect(psCost_("hybrid_column_pot")).toBeGreaterThan(psCost_("alembic_copper"));
  });
});

describe("batchProcess", () => {
  it("all pot stills are batch process", () => {
    expect(batchProcess("alembic_copper")).toBe(true);
    expect(batchProcess("hybrid_column_pot")).toBe(true);
  });
});

describe("forWhisky", () => {
  it("alembic copper for whisky", () => {
    expect(forWhisky("alembic_copper")).toBe(true);
  });
  it("hybrid column pot not for whisky", () => {
    expect(forWhisky("hybrid_column_pot")).toBe(false);
  });
});

describe("stillConfig", () => {
  it("lomond uses cylindrical neck internal plate", () => {
    expect(stillConfig("lomond")).toBe("lomond_still_cylindrical_neck_internal_plate_variable_reflux");
  });
});

describe("bestUse", () => {
  it("lantern neck for lighter spirit irish whiskey", () => {
    expect(bestUse("lantern_neck")).toBe("lighter_spirit_irish_whiskey_lantern_neck_boil_ball_reflux");
  });
});

describe("potStillTypes", () => {
  it("returns 5 types", () => {
    expect(potStillTypes()).toHaveLength(5);
  });
});
