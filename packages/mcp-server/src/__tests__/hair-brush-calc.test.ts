import { describe, it, expect } from "vitest";
import {
  smoothing, volumeBoost, gentleness, dryingSpeed,
  brushCost, wetUse, naturalBristle, bristleMaterial,
  bestUse, hairBrushes,
} from "../hair-brush-calc.js";

describe("smoothing", () => {
  it("paddle flat smooth best at smoothing", () => {
    expect(smoothing("paddle_flat_smooth")).toBeGreaterThan(smoothing("vent_quick_dry"));
  });
});

describe("volumeBoost", () => {
  it("round blow dry best volume boost", () => {
    expect(volumeBoost("round_blow_dry")).toBeGreaterThan(volumeBoost("paddle_flat_smooth"));
  });
});

describe("gentleness", () => {
  it("detangle wet flex most gentle", () => {
    expect(gentleness("detangle_wet_flex")).toBeGreaterThan(gentleness("round_blow_dry"));
  });
});

describe("dryingSpeed", () => {
  it("vent quick dry fastest drying", () => {
    expect(dryingSpeed("vent_quick_dry")).toBeGreaterThan(dryingSpeed("boar_bristle_natural"));
  });
});

describe("brushCost", () => {
  it("boar bristle natural most expensive", () => {
    expect(brushCost("boar_bristle_natural")).toBeGreaterThan(brushCost("vent_quick_dry"));
  });
});

describe("wetUse", () => {
  it("detangle wet flex safe for wet use", () => {
    expect(wetUse("detangle_wet_flex")).toBe(true);
  });
  it("boar bristle natural is not", () => {
    expect(wetUse("boar_bristle_natural")).toBe(false);
  });
});

describe("naturalBristle", () => {
  it("boar bristle natural has natural bristle", () => {
    expect(naturalBristle("boar_bristle_natural")).toBe(true);
  });
  it("paddle flat smooth does not", () => {
    expect(naturalBristle("paddle_flat_smooth")).toBe(false);
  });
});

describe("bristleMaterial", () => {
  it("boar bristle natural uses wild boar bristle", () => {
    expect(bristleMaterial("boar_bristle_natural")).toBe("wild_boar_bristle");
  });
});

describe("bestUse", () => {
  it("round blow dry best for blowout curl styling", () => {
    expect(bestUse("round_blow_dry")).toBe("blowout_curl_styling");
  });
});

describe("hairBrushes", () => {
  it("returns 5 types", () => {
    expect(hairBrushes()).toHaveLength(5);
  });
});
