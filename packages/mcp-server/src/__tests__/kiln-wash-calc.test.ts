import { describe, it, expect } from "vitest";
import {
  releaseQuality, surfaceSmoothness, applicationEase, reusability,
  washCost, singleUse, sprayApply, baseIngredient,
  bestFiring, kilnWashes,
} from "../kiln-wash-calc.js";

describe("releaseQuality", () => {
  it("boron nitride spray best release quality", () => {
    expect(releaseQuality("boron_nitride_spray")).toBeGreaterThan(releaseQuality("shelf_primer_paint"));
  });
});

describe("surfaceSmoothness", () => {
  it("thinfire sheet smooth best surface smoothness", () => {
    expect(surfaceSmoothness("thinfire_sheet_smooth")).toBeGreaterThan(surfaceSmoothness("alumina_hydrate_brush"));
  });
});

describe("applicationEase", () => {
  it("kiln paper fiber easiest application", () => {
    expect(applicationEase("kiln_paper_fiber")).toBeGreaterThan(applicationEase("shelf_primer_paint"));
  });
});

describe("reusability", () => {
  it("shelf primer paint most reusable", () => {
    expect(reusability("shelf_primer_paint")).toBeGreaterThan(reusability("kiln_paper_fiber"));
  });
});

describe("washCost", () => {
  it("boron nitride spray most expensive", () => {
    expect(washCost("boron_nitride_spray")).toBeGreaterThan(washCost("alumina_hydrate_brush"));
  });
});

describe("singleUse", () => {
  it("kiln paper fiber is single use", () => {
    expect(singleUse("kiln_paper_fiber")).toBe(true);
  });
  it("alumina hydrate brush is not single use", () => {
    expect(singleUse("alumina_hydrate_brush")).toBe(false);
  });
});

describe("sprayApply", () => {
  it("boron nitride spray uses spray apply", () => {
    expect(sprayApply("boron_nitride_spray")).toBe(true);
  });
  it("kiln paper fiber does not use spray apply", () => {
    expect(sprayApply("kiln_paper_fiber")).toBe(false);
  });
});

describe("baseIngredient", () => {
  it("boron nitride spray uses hexagonal boron nitride", () => {
    expect(baseIngredient("boron_nitride_spray")).toBe("hexagonal_boron_nitride");
  });
});

describe("bestFiring", () => {
  it("thinfire sheet smooth best for smooth bottom fuse", () => {
    expect(bestFiring("thinfire_sheet_smooth")).toBe("smooth_bottom_fuse");
  });
});

describe("kilnWashes", () => {
  it("returns 5 types", () => {
    expect(kilnWashes()).toHaveLength(5);
  });
});
