import { describe, it, expect } from "vitest";
import {
  stencilThickness, reuses, bridgeWidth, cutterBladeAngle,
  paintCoverage, dryingTime, layerCount, registrationMarks,
  adhesiveNeeded, bleedRisk, maskingTapeM, projectTime,
  costPerPrint, stencilMaterials,
} from "../stencil-art.js";

describe("stencilThickness", () => {
  it("cardboard thickest", () => {
    expect(stencilThickness("cardboard")).toBeGreaterThan(stencilThickness("mylar"));
  });
});

describe("reuses", () => {
  it("metal lasts longest", () => {
    expect(reuses("metal")).toBeGreaterThan(reuses("mylar"));
  });
  it("vinyl is single use", () => {
    expect(reuses("vinyl")).toBe(1);
  });
});

describe("bridgeWidth", () => {
  it("positive mm", () => {
    expect(bridgeWidth(20)).toBeGreaterThan(0);
  });
});

describe("cutterBladeAngle", () => {
  it("metal uses steeper angle", () => {
    expect(cutterBladeAngle("metal")).toBeGreaterThan(cutterBladeAngle("cardboard"));
  });
});

describe("paintCoverage", () => {
  it("positive ml", () => {
    expect(paintCoverage(500, 2)).toBeGreaterThan(0);
  });
});

describe("dryingTime", () => {
  it("airbrush dries fastest", () => {
    expect(dryingTime("airbrush")).toBeLessThan(dryingTime("brush"));
  });
});

describe("layerCount", () => {
  it("matches color count", () => {
    expect(layerCount(3)).toBe(3);
  });
});

describe("registrationMarks", () => {
  it("needed for multi-layer", () => {
    expect(registrationMarks(3)).toBe(3);
  });
  it("not needed for single", () => {
    expect(registrationMarks(1)).toBe(0);
  });
});

describe("adhesiveNeeded", () => {
  it("large mylar needs adhesive", () => {
    expect(adhesiveNeeded(300, "mylar")).toBe(true);
  });
  it("vinyl does not", () => {
    expect(adhesiveNeeded(300, "vinyl")).toBe(false);
  });
});

describe("bleedRisk", () => {
  it("spray is high risk", () => {
    expect(bleedRisk("spray")).toContain("high");
  });
  it("sponge is low", () => {
    expect(bleedRisk("sponge")).toBe("low");
  });
});

describe("maskingTapeM", () => {
  it("positive meters", () => {
    expect(maskingTapeM(200)).toBeGreaterThan(0);
  });
});

describe("projectTime", () => {
  it("positive minutes", () => {
    expect(projectTime(200, 2, 10)).toBeGreaterThan(0);
  });
});

describe("costPerPrint", () => {
  it("positive cost", () => {
    expect(costPerPrint(10, 0.1, 5, 100)).toBeGreaterThan(0);
  });
});

describe("stencilMaterials", () => {
  it("returns 6 materials", () => {
    expect(stencilMaterials()).toHaveLength(6);
  });
});
