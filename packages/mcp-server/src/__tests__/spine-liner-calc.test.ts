import { describe, it, expect } from "vitest";
import {
  adhesion, flexibility, strength, transparency,
  linerCost, selfAdhesive, archival, linerFiber,
  bestUse, spineLiners,
} from "../spine-liner-calc.js";

describe("adhesion", () => {
  it("super cloth tight best adhesion", () => {
    expect(adhesion("super_cloth_tight")).toBeGreaterThan(adhesion("kraft_paper_strip"));
  });
});

describe("flexibility", () => {
  it("japanese tissue thin most flexible", () => {
    expect(flexibility("japanese_tissue_thin")).toBeGreaterThan(flexibility("kraft_paper_strip"));
  });
});

describe("strength", () => {
  it("super cloth tight strongest", () => {
    expect(strength("super_cloth_tight")).toBeGreaterThan(strength("japanese_tissue_thin"));
  });
});

describe("transparency", () => {
  it("japanese tissue thin most transparent", () => {
    expect(transparency("japanese_tissue_thin")).toBeGreaterThan(transparency("kraft_paper_strip"));
  });
});

describe("linerCost", () => {
  it("japanese tissue thin more expensive", () => {
    expect(linerCost("japanese_tissue_thin")).toBeGreaterThan(linerCost("mull_open_weave"));
  });
});

describe("selfAdhesive", () => {
  it("linen hinge tape is self adhesive", () => {
    expect(selfAdhesive("linen_hinge_tape")).toBe(true);
  });
  it("mull open weave not self adhesive", () => {
    expect(selfAdhesive("mull_open_weave")).toBe(false);
  });
});

describe("archival", () => {
  it("mull open weave is archival", () => {
    expect(archival("mull_open_weave")).toBe(true);
  });
  it("kraft paper strip not archival", () => {
    expect(archival("kraft_paper_strip")).toBe(false);
  });
});

describe("linerFiber", () => {
  it("mull open weave uses cotton gauze open", () => {
    expect(linerFiber("mull_open_weave")).toBe("cotton_gauze_open");
  });
});

describe("bestUse", () => {
  it("super cloth tight best for heavy text block", () => {
    expect(bestUse("super_cloth_tight")).toBe("heavy_text_block");
  });
});

describe("spineLiners", () => {
  it("returns 5 types", () => {
    expect(spineLiners()).toHaveLength(5);
  });
});
