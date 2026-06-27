import { describe, it, expect } from "vitest";
import {
  darkRange, blendAbility, detailControl, erasability,
  pencilCost, messyToUse, needsFixative, charcoalSource,
  bestTechnique, charcoalPencils,
} from "../charcoal-pencil-calc.js";

describe("darkRange", () => {
  it("compressed hard stick darkest range", () => {
    expect(darkRange("compressed_hard_stick")).toBeGreaterThan(darkRange("charcoal_pencil_wood"));
  });
});

describe("blendAbility", () => {
  it("vine willow soft best blending", () => {
    expect(blendAbility("vine_willow_soft")).toBeGreaterThan(blendAbility("compressed_hard_stick"));
  });
});

describe("detailControl", () => {
  it("charcoal pencil wood best detail", () => {
    expect(detailControl("charcoal_pencil_wood")).toBeGreaterThan(detailControl("vine_willow_soft"));
  });
});

describe("erasability", () => {
  it("vine willow soft most erasable", () => {
    expect(erasability("vine_willow_soft")).toBeGreaterThan(erasability("compressed_hard_stick"));
  });
});

describe("pencilCost", () => {
  it("white charcoal highlight most expensive", () => {
    expect(pencilCost("white_charcoal_highlight")).toBeGreaterThan(pencilCost("vine_willow_soft"));
  });
});

describe("messyToUse", () => {
  it("vine willow soft is messy", () => {
    expect(messyToUse("vine_willow_soft")).toBe(true);
  });
  it("charcoal pencil wood is not", () => {
    expect(messyToUse("charcoal_pencil_wood")).toBe(false);
  });
});

describe("needsFixative", () => {
  it("all charcoal needs fixative", () => {
    expect(needsFixative("vine_willow_soft")).toBe(true);
  });
  it("compressed hard stick also needs fixative", () => {
    expect(needsFixative("compressed_hard_stick")).toBe(true);
  });
});

describe("charcoalSource", () => {
  it("vine willow soft uses natural willow branch", () => {
    expect(charcoalSource("vine_willow_soft")).toBe("natural_willow_branch");
  });
});

describe("bestTechnique", () => {
  it("charcoal pencil wood best for fine detail portrait", () => {
    expect(bestTechnique("charcoal_pencil_wood")).toBe("fine_detail_portrait");
  });
});

describe("charcoalPencils", () => {
  it("returns 5 types", () => {
    expect(charcoalPencils()).toHaveLength(5);
  });
});
