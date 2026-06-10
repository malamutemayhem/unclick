import { describe, it, expect } from "vitest";
import {
  adhesion, repositionable, designVariety, writability,
  tapeCost, tearByHand, acidFree, baseMaterial,
  bestProject, washiTapes,
} from "../washi-tape-calc.js";

describe("adhesion", () => {
  it("wide masking journal strongest adhesion", () => {
    expect(adhesion("wide_masking_journal")).toBeGreaterThan(adhesion("pattern_printed_foil"));
  });
});

describe("repositionable", () => {
  it("wide masking journal most repositionable", () => {
    expect(repositionable("wide_masking_journal")).toBeGreaterThan(repositionable("glitter_sparkle_deco"));
  });
});

describe("designVariety", () => {
  it("pattern printed foil most design variety", () => {
    expect(designVariety("pattern_printed_foil")).toBeGreaterThan(designVariety("solid_color_matte"));
  });
});

describe("writability", () => {
  it("wide masking journal most writable", () => {
    expect(writability("wide_masking_journal")).toBeGreaterThan(writability("glitter_sparkle_deco"));
  });
});

describe("tapeCost", () => {
  it("pattern printed foil most expensive", () => {
    expect(tapeCost("pattern_printed_foil")).toBeGreaterThan(tapeCost("solid_color_matte"));
  });
});

describe("tearByHand", () => {
  it("solid color matte tears by hand", () => {
    expect(tearByHand("solid_color_matte")).toBe(true);
  });
  it("glitter sparkle deco does not", () => {
    expect(tearByHand("glitter_sparkle_deco")).toBe(false);
  });
});

describe("acidFree", () => {
  it("all washi tapes are acid free", () => {
    expect(acidFree("solid_color_matte")).toBe(true);
  });
  it("glitter sparkle deco is acid free", () => {
    expect(acidFree("glitter_sparkle_deco")).toBe(true);
  });
});

describe("baseMaterial", () => {
  it("pattern printed foil uses rice paper metallic foil", () => {
    expect(baseMaterial("pattern_printed_foil")).toBe("rice_paper_metallic_foil");
  });
});

describe("bestProject", () => {
  it("wide masking journal best for bullet journal heading", () => {
    expect(bestProject("wide_masking_journal")).toBe("bullet_journal_heading");
  });
});

describe("washiTapes", () => {
  it("returns 5 types", () => {
    expect(washiTapes()).toHaveLength(5);
  });
});
