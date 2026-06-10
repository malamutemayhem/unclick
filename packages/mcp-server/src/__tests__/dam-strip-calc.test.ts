import { describe, it, expect } from "vitest";
import {
  containForce, shapeability, surfaceFinish, reusability,
  stripCost, heatProof, curved, damMaterial,
  bestUse, damStrips,
} from "../dam-strip-calc.js";

describe("containForce", () => {
  it("stainless bar rigid strongest contain", () => {
    expect(containForce("stainless_bar_rigid")).toBeGreaterThan(containForce("alumina_tape_thin"));
  });
});

describe("shapeability", () => {
  it("ceramic rope round most shapeable", () => {
    expect(shapeability("ceramic_rope_round")).toBeGreaterThan(shapeability("stainless_bar_rigid"));
  });
});

describe("surfaceFinish", () => {
  it("graphite block carve best surface finish", () => {
    expect(surfaceFinish("graphite_block_carve")).toBeGreaterThan(surfaceFinish("ceramic_rope_round"));
  });
});

describe("reusability", () => {
  it("stainless bar rigid most reusable", () => {
    expect(reusability("stainless_bar_rigid")).toBeGreaterThan(reusability("alumina_tape_thin"));
  });
});

describe("stripCost", () => {
  it("graphite block carve most expensive", () => {
    expect(stripCost("graphite_block_carve")).toBeGreaterThan(stripCost("fiber_strip_flex"));
  });
});

describe("heatProof", () => {
  it("fiber strip flex is heat proof", () => {
    expect(heatProof("fiber_strip_flex")).toBe(true);
  });
});

describe("curved", () => {
  it("ceramic rope round is curved", () => {
    expect(curved("ceramic_rope_round")).toBe(true);
  });
  it("stainless bar rigid not curved", () => {
    expect(curved("stainless_bar_rigid")).toBe(false);
  });
});

describe("damMaterial", () => {
  it("stainless bar rigid uses stainless steel flat", () => {
    expect(damMaterial("stainless_bar_rigid")).toBe("stainless_steel_flat");
  });
});

describe("bestUse", () => {
  it("graphite block carve best for polished edge form", () => {
    expect(bestUse("graphite_block_carve")).toBe("polished_edge_form");
  });
});

describe("damStrips", () => {
  it("returns 5 types", () => {
    expect(damStrips()).toHaveLength(5);
  });
});
