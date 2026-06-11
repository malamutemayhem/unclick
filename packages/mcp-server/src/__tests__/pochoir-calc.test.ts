import { describe, it, expect } from "vitest";
import {
  edgeCrisp, durability, cutEase, detailFine,
  pochoirCost, reusable, transparent, stencilBase,
  bestUse, pochoirs,
} from "../pochoir-calc.js";

describe("edgeCrisp", () => {
  it("brass stencil fine crispest edge", () => {
    expect(edgeCrisp("brass_stencil_fine")).toBeGreaterThan(edgeCrisp("paper_stencil_disposable"));
  });
});

describe("durability", () => {
  it("brass stencil fine most durable", () => {
    expect(durability("brass_stencil_fine")).toBeGreaterThan(durability("paper_stencil_disposable"));
  });
});

describe("cutEase", () => {
  it("paper stencil disposable easiest cut", () => {
    expect(cutEase("paper_stencil_disposable")).toBeGreaterThan(cutEase("brass_stencil_fine"));
  });
});

describe("detailFine", () => {
  it("brass stencil fine finest detail", () => {
    expect(detailFine("brass_stencil_fine")).toBeGreaterThan(detailFine("paper_stencil_disposable"));
  });
});

describe("pochoirCost", () => {
  it("brass stencil fine most expensive", () => {
    expect(pochoirCost("brass_stencil_fine")).toBeGreaterThan(pochoirCost("paper_stencil_disposable"));
  });
});

describe("reusable", () => {
  it("metal stencil precise is reusable", () => {
    expect(reusable("metal_stencil_precise")).toBe(true);
  });
  it("paper stencil disposable not reusable", () => {
    expect(reusable("paper_stencil_disposable")).toBe(false);
  });
});

describe("transparent", () => {
  it("acetate stencil clear is transparent", () => {
    expect(transparent("acetate_stencil_clear")).toBe(true);
  });
  it("metal stencil precise not transparent", () => {
    expect(transparent("metal_stencil_precise")).toBe(false);
  });
});

describe("stencilBase", () => {
  it("mylar stencil durable uses polyester mylar film", () => {
    expect(stencilBase("mylar_stencil_durable")).toBe("polyester_mylar_film");
  });
});

describe("bestUse", () => {
  it("acetate stencil clear best for general pochoir print", () => {
    expect(bestUse("acetate_stencil_clear")).toBe("general_pochoir_print");
  });
});

describe("pochoirs", () => {
  it("returns 5 types", () => {
    expect(pochoirs()).toHaveLength(5);
  });
});
