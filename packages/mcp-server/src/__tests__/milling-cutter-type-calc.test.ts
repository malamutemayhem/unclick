import { describe, it, expect } from "vitest";
import {
  mrr, finish_, versatility, toolLife,
  mcCost, indexable, forSlot, geometry,
  bestUse, millingCutterTypes,
} from "../milling-cutter-type-calc.js";

describe("mrr", () => {
  it("face mill highest mrr", () => {
    expect(mrr("face_mill_indexable")).toBeGreaterThan(mrr("ball_nose_end_mill"));
  });
});

describe("finish_", () => {
  it("ball nose best finish", () => {
    expect(finish_("ball_nose_end_mill")).toBeGreaterThan(finish_("slab_mill_plain_cylindrical"));
  });
});

describe("versatility", () => {
  it("flat end mill most versatile", () => {
    expect(versatility("flat_end_mill_square")).toBeGreaterThan(versatility("form_cutter_concave_convex"));
  });
});

describe("toolLife", () => {
  it("face mill longest life", () => {
    expect(toolLife("face_mill_indexable")).toBeGreaterThan(toolLife("ball_nose_end_mill"));
  });
});

describe("mcCost", () => {
  it("face mill most expensive", () => {
    expect(mcCost("face_mill_indexable")).toBeGreaterThan(mcCost("flat_end_mill_square"));
  });
});

describe("indexable", () => {
  it("face mill is indexable", () => {
    expect(indexable("face_mill_indexable")).toBe(true);
  });
  it("flat end not indexable", () => {
    expect(indexable("flat_end_mill_square")).toBe(false);
  });
});

describe("forSlot", () => {
  it("flat end for slot", () => {
    expect(forSlot("flat_end_mill_square")).toBe(true);
  });
  it("face mill not for slot", () => {
    expect(forSlot("face_mill_indexable")).toBe(false);
  });
});

describe("geometry", () => {
  it("ball nose uses hemispherical tip", () => {
    expect(geometry("ball_nose_end_mill")).toBe("hemispherical_tip_helical");
  });
});

describe("bestUse", () => {
  it("flat end for general purpose", () => {
    expect(bestUse("flat_end_mill_square")).toBe("general_purpose_slot_pocket");
  });
});

describe("millingCutterTypes", () => {
  it("returns 5 types", () => {
    expect(millingCutterTypes()).toHaveLength(5);
  });
});
