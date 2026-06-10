import { describe, it, expect } from "vitest";
import {
  coverage, precision, cleanUp, durability,
  brushCost, disposable, selfContained, tipMaterial,
  bestUse, fluxBrushes,
} from "../flux-brush-calc.js";

describe("coverage", () => {
  it("acid bristle stiff most coverage", () => {
    expect(coverage("acid_bristle_stiff")).toBeGreaterThan(coverage("fiberglass_prep_stick"));
  });
});

describe("precision", () => {
  it("liquid flow pen most precise", () => {
    expect(precision("liquid_flow_pen")).toBeGreaterThan(precision("acid_bristle_stiff"));
  });
});

describe("cleanUp", () => {
  it("no clean foam tip easiest cleanup", () => {
    expect(cleanUp("no_clean_foam_tip")).toBeGreaterThan(cleanUp("acid_bristle_stiff"));
  });
});

describe("durability", () => {
  it("liquid flow pen most durable", () => {
    expect(durability("liquid_flow_pen")).toBeGreaterThan(durability("no_clean_foam_tip"));
  });
});

describe("brushCost", () => {
  it("liquid flow pen most expensive", () => {
    expect(brushCost("liquid_flow_pen")).toBeGreaterThan(brushCost("acid_bristle_stiff"));
  });
});

describe("disposable", () => {
  it("paste applicator dab is disposable", () => {
    expect(disposable("paste_applicator_dab")).toBe(true);
  });
  it("acid bristle stiff not disposable", () => {
    expect(disposable("acid_bristle_stiff")).toBe(false);
  });
});

describe("selfContained", () => {
  it("liquid flow pen is self contained", () => {
    expect(selfContained("liquid_flow_pen")).toBe(true);
  });
  it("acid bristle stiff not self contained", () => {
    expect(selfContained("acid_bristle_stiff")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("acid bristle stiff uses natural hog bristle", () => {
    expect(tipMaterial("acid_bristle_stiff")).toBe("natural_hog_bristle");
  });
});

describe("bestUse", () => {
  it("liquid flow pen best for precise flux line", () => {
    expect(bestUse("liquid_flow_pen")).toBe("precise_flux_line");
  });
});

describe("fluxBrushes", () => {
  it("returns 5 types", () => {
    expect(fluxBrushes()).toHaveLength(5);
  });
});
