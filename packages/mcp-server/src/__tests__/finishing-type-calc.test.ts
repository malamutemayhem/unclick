import { describe, it, expect } from "vitest";
import {
  luster, strength, handfeel, durability,
  fnCost, chemical, forCotton, process,
  bestUse, finishingTypes,
} from "../finishing-type-calc.js";

describe("luster", () => {
  it("mercerizing best luster", () => {
    expect(luster("mercerizing_caustic_soda")).toBeGreaterThan(luster("raising_napping_wire"));
  });
});

describe("strength", () => {
  it("mercerizing best strength", () => {
    expect(strength("mercerizing_caustic_soda")).toBeGreaterThan(strength("raising_napping_wire"));
  });
});

describe("handfeel", () => {
  it("raising napping best handfeel", () => {
    expect(handfeel("raising_napping_wire")).toBeGreaterThan(handfeel("plasma_surface_treatment"));
  });
});

describe("durability", () => {
  it("sanforizing most durable", () => {
    expect(durability("sanforizing_shrink_control")).toBeGreaterThan(durability("calendering_roller_press"));
  });
});

describe("fnCost", () => {
  it("plasma most expensive", () => {
    expect(fnCost("plasma_surface_treatment")).toBeGreaterThan(fnCost("sanforizing_shrink_control"));
  });
});

describe("chemical", () => {
  it("mercerizing is chemical", () => {
    expect(chemical("mercerizing_caustic_soda")).toBe(true);
  });
  it("sanforizing not chemical", () => {
    expect(chemical("sanforizing_shrink_control")).toBe(false);
  });
});

describe("forCotton", () => {
  it("mercerizing for cotton", () => {
    expect(forCotton("mercerizing_caustic_soda")).toBe(true);
  });
  it("plasma not for cotton", () => {
    expect(forCotton("plasma_surface_treatment")).toBe(false);
  });
});

describe("process", () => {
  it("calendering uses heated roller nip", () => {
    expect(process("calendering_roller_press")).toBe("heated_roller_nip_pressure");
  });
});

describe("bestUse", () => {
  it("raising napping best for flannel fleece", () => {
    expect(bestUse("raising_napping_wire")).toBe("flannel_fleece_blanket_soft_pile");
  });
});

describe("finishingTypes", () => {
  it("returns 5 types", () => {
    expect(finishingTypes()).toHaveLength(5);
  });
});
