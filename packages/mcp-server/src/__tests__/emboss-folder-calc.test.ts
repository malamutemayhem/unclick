import { describe, it, expect } from "vitest";
import {
  embossDepth, detailLevel, designVariety, easeOfUse,
  folderCost, needsMachine, cutAndEmboss, folderMaterial,
  bestProject, embossFolders,
} from "../emboss-folder-calc.js";

describe("embossDepth", () => {
  it("metal stencil deep best emboss depth", () => {
    expect(embossDepth("metal_stencil_deep")).toBeGreaterThan(embossDepth("border_strip_edge"));
  });
});

describe("detailLevel", () => {
  it("3d textured multi best detail level", () => {
    expect(detailLevel("3d_textured_multi")).toBeGreaterThan(detailLevel("border_strip_edge"));
  });
});

describe("designVariety", () => {
  it("plastic template press widest design variety", () => {
    expect(designVariety("plastic_template_press")).toBeGreaterThan(designVariety("die_cut_combo_dual"));
  });
});

describe("easeOfUse", () => {
  it("plastic template press easiest to use", () => {
    expect(easeOfUse("plastic_template_press")).toBeGreaterThan(easeOfUse("die_cut_combo_dual"));
  });
});

describe("folderCost", () => {
  it("metal stencil deep more expensive than plastic template", () => {
    expect(folderCost("metal_stencil_deep")).toBeGreaterThan(folderCost("plastic_template_press"));
  });
});

describe("needsMachine", () => {
  it("plastic template press needs machine", () => {
    expect(needsMachine("plastic_template_press")).toBe(true);
  });
});

describe("cutAndEmboss", () => {
  it("die cut combo dual can cut and emboss", () => {
    expect(cutAndEmboss("die_cut_combo_dual")).toBe(true);
  });
  it("plastic template press cannot cut and emboss", () => {
    expect(cutAndEmboss("plastic_template_press")).toBe(false);
  });
});

describe("folderMaterial", () => {
  it("3d textured multi uses layered polymer 3d", () => {
    expect(folderMaterial("3d_textured_multi")).toBe("layered_polymer_3d");
  });
});

describe("bestProject", () => {
  it("metal stencil deep best for invitation formal deep", () => {
    expect(bestProject("metal_stencil_deep")).toBe("invitation_formal_deep");
  });
});

describe("embossFolders", () => {
  it("returns 5 types", () => {
    expect(embossFolders()).toHaveLength(5);
  });
});
