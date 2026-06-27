import { describe, it, expect } from "vitest";
import {
  cutEvenness, sliceCount, adjustability, easeOfUse,
  cutterCost, multiSlice, replaceable, wireMaterial,
  bestUse, harpCutters,
} from "../harp-cutter-calc.js";

describe("cutEvenness", () => {
  it("multi wire even most even cut", () => {
    expect(cutEvenness("multi_wire_even")).toBeGreaterThan(cutEvenness("bow_cutter_fine"));
  });
});

describe("sliceCount", () => {
  it("multi wire even most slices", () => {
    expect(sliceCount("multi_wire_even")).toBeGreaterThan(sliceCount("single_wire_basic"));
  });
});

describe("adjustability", () => {
  it("adjustable set var most adjustable", () => {
    expect(adjustability("adjustable_set_var")).toBeGreaterThan(adjustability("multi_wire_even"));
  });
});

describe("easeOfUse", () => {
  it("single wire basic easiest to use", () => {
    expect(easeOfUse("single_wire_basic")).toBeGreaterThan(easeOfUse("adjustable_set_var"));
  });
});

describe("cutterCost", () => {
  it("adjustable set var most expensive", () => {
    expect(cutterCost("adjustable_set_var")).toBeGreaterThan(cutterCost("single_wire_basic"));
  });
});

describe("multiSlice", () => {
  it("multi wire even is multi slice", () => {
    expect(multiSlice("multi_wire_even")).toBe(true);
  });
  it("single wire basic not multi slice", () => {
    expect(multiSlice("single_wire_basic")).toBe(false);
  });
});

describe("replaceable", () => {
  it("single wire basic is replaceable", () => {
    expect(replaceable("single_wire_basic")).toBe(true);
  });
});

describe("wireMaterial", () => {
  it("single wire basic uses braided steel wire", () => {
    expect(wireMaterial("single_wire_basic")).toBe("braided_steel_wire");
  });
});

describe("bestUse", () => {
  it("multi wire even best for even slab batch", () => {
    expect(bestUse("multi_wire_even")).toBe("even_slab_batch");
  });
});

describe("harpCutters", () => {
  it("returns 5 types", () => {
    expect(harpCutters()).toHaveLength(5);
  });
});
