import { describe, it, expect } from "vitest";
import {
  span, depth, loadCapacity, fireRating,
  jtCost, engineered, forLongSpan, web,
  bestUse, joistTypeTypes,
} from "../joist-type-calc.js";

describe("span", () => {
  it("concrete plank longest span", () => {
    expect(span("concrete_prestress_plank")).toBeGreaterThan(span("solid_sawn_dimensional"));
  });
});

describe("depth", () => {
  it("concrete plank deepest", () => {
    expect(depth("concrete_prestress_plank")).toBeGreaterThan(depth("solid_sawn_dimensional"));
  });
});

describe("loadCapacity", () => {
  it("concrete plank highest load", () => {
    expect(loadCapacity("concrete_prestress_plank")).toBeGreaterThan(loadCapacity("solid_sawn_dimensional"));
  });
});

describe("fireRating", () => {
  it("concrete plank best fire rating", () => {
    expect(fireRating("concrete_prestress_plank")).toBeGreaterThan(fireRating("wood_i_joist_engineered"));
  });
});

describe("jtCost", () => {
  it("concrete plank most expensive", () => {
    expect(jtCost("concrete_prestress_plank")).toBeGreaterThan(jtCost("solid_sawn_dimensional"));
  });
});

describe("engineered", () => {
  it("open web steel is engineered", () => {
    expect(engineered("open_web_steel_bar")).toBe(true);
  });
  it("solid sawn not engineered", () => {
    expect(engineered("solid_sawn_dimensional")).toBe(false);
  });
});

describe("forLongSpan", () => {
  it("open web for long span", () => {
    expect(forLongSpan("open_web_steel_bar")).toBe(true);
  });
  it("solid sawn not for long span", () => {
    expect(forLongSpan("solid_sawn_dimensional")).toBe(false);
  });
});

describe("web", () => {
  it("cfs uses punched steel", () => {
    expect(web("cold_formed_cfs_track")).toBe("punched_steel_stiffened_lip");
  });
});

describe("bestUse", () => {
  it("wood i joist for residential floor", () => {
    expect(bestUse("wood_i_joist_engineered")).toBe("residential_floor_uniform_depth");
  });
});

describe("joistTypeTypes", () => {
  it("returns 5 types", () => {
    expect(joistTypeTypes()).toHaveLength(5);
  });
});
