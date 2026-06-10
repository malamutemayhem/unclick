import { describe, it, expect } from "vitest";
import {
  toneRange, grainControl, setupSpeed, repeatability,
  aquatintCost, needsHeat, paintable, groundType,
  bestUse, aquatints,
} from "../aquatint-calc.js";

describe("toneRange", () => {
  it("rosin dust box widest tone range", () => {
    expect(toneRange("rosin_dust_box")).toBeGreaterThan(toneRange("sandpaper_texture_lift"));
  });
});

describe("grainControl", () => {
  it("airbrush fine mist best grain control", () => {
    expect(grainControl("airbrush_fine_mist")).toBeGreaterThan(grainControl("sandpaper_texture_lift"));
  });
});

describe("setupSpeed", () => {
  it("spray paint quick fastest setup", () => {
    expect(setupSpeed("spray_paint_quick")).toBeGreaterThan(setupSpeed("sugar_lift_paint"));
  });
});

describe("repeatability", () => {
  it("airbrush fine mist most repeatable", () => {
    expect(repeatability("airbrush_fine_mist")).toBeGreaterThan(repeatability("sandpaper_texture_lift"));
  });
});

describe("aquatintCost", () => {
  it("airbrush fine mist most expensive", () => {
    expect(aquatintCost("airbrush_fine_mist")).toBeGreaterThan(aquatintCost("spray_paint_quick"));
  });
});

describe("needsHeat", () => {
  it("rosin dust box needs heat", () => {
    expect(needsHeat("rosin_dust_box")).toBe(true);
  });
  it("spray paint quick no heat needed", () => {
    expect(needsHeat("spray_paint_quick")).toBe(false);
  });
});

describe("paintable", () => {
  it("sugar lift paint is paintable", () => {
    expect(paintable("sugar_lift_paint")).toBe(true);
  });
  it("rosin dust box not paintable", () => {
    expect(paintable("rosin_dust_box")).toBe(false);
  });
});

describe("groundType", () => {
  it("rosin dust box uses rosin powder fused", () => {
    expect(groundType("rosin_dust_box")).toBe("rosin_powder_fused");
  });
});

describe("bestUse", () => {
  it("airbrush fine mist best for precise gradient tone", () => {
    expect(bestUse("airbrush_fine_mist")).toBe("precise_gradient_tone");
  });
});

describe("aquatints", () => {
  it("returns 5 types", () => {
    expect(aquatints()).toHaveLength(5);
  });
});
