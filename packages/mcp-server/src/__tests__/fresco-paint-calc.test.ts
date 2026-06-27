import { describe, it, expect } from "vitest";
import {
  colorFast, bindStrength, mixEase, colorRange,
  paintCost, natural, limeProof, pigmentSource,
  bestUse, frescoPaynts,
} from "../fresco-paint-calc.js";

describe("colorFast", () => {
  it("mineral pigment pure most color fast", () => {
    expect(colorFast("mineral_pigment_pure")).toBeGreaterThan(colorFast("synthetic_pigment_bright"));
  });
});

describe("bindStrength", () => {
  it("lime white base strongest bind", () => {
    expect(bindStrength("lime_white_base")).toBeGreaterThan(bindStrength("synthetic_pigment_bright"));
  });
});

describe("mixEase", () => {
  it("lime white base easiest mix", () => {
    expect(mixEase("lime_white_base")).toBeGreaterThan(mixEase("mineral_pigment_pure"));
  });
});

describe("colorRange", () => {
  it("synthetic pigment bright widest color range", () => {
    expect(colorRange("synthetic_pigment_bright")).toBeGreaterThan(colorRange("lime_white_base"));
  });
});

describe("paintCost", () => {
  it("mineral pigment pure most expensive", () => {
    expect(paintCost("mineral_pigment_pure")).toBeGreaterThan(paintCost("lime_white_base"));
  });
});

describe("natural", () => {
  it("earth pigment natural is natural", () => {
    expect(natural("earth_pigment_natural")).toBe(true);
  });
  it("synthetic pigment bright not natural", () => {
    expect(natural("synthetic_pigment_bright")).toBe(false);
  });
});

describe("limeProof", () => {
  it("earth pigment natural is lime proof", () => {
    expect(limeProof("earth_pigment_natural")).toBe(true);
  });
  it("synthetic pigment bright not lime proof", () => {
    expect(limeProof("synthetic_pigment_bright")).toBe(false);
  });
});

describe("pigmentSource", () => {
  it("oxide pigment strong uses iron oxide mineral", () => {
    expect(pigmentSource("oxide_pigment_strong")).toBe("iron_oxide_mineral");
  });
});

describe("bestUse", () => {
  it("earth pigment natural best for traditional buon fresco", () => {
    expect(bestUse("earth_pigment_natural")).toBe("traditional_buon_fresco");
  });
});

describe("frescoPaynts", () => {
  it("returns 5 types", () => {
    expect(frescoPaynts()).toHaveLength(5);
  });
});
