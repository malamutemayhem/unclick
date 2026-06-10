import { describe, it, expect } from "vitest";
import {
  blendEase, colorIntensity, waterReact, versatility,
  inkCost, waterSoluble, opaque, inkBase,
  bestUse, distressInks,
} from "../distress-ink-calc.js";

describe("blendEase", () => {
  it("classic dye fade easiest blend", () => {
    expect(blendEase("classic_dye_fade")).toBeGreaterThan(blendEase("paint_dabber_opaque"));
  });
});

describe("colorIntensity", () => {
  it("paint dabber opaque most intense", () => {
    expect(colorIntensity("paint_dabber_opaque")).toBeGreaterThan(colorIntensity("crayon_rub_stick"));
  });
});

describe("waterReact", () => {
  it("oxide hybrid react best water react", () => {
    expect(waterReact("oxide_hybrid_react")).toBeGreaterThan(waterReact("paint_dabber_opaque"));
  });
});

describe("versatility", () => {
  it("spray mist stain most versatile", () => {
    expect(versatility("spray_mist_stain")).toBeGreaterThan(versatility("crayon_rub_stick"));
  });
});

describe("inkCost", () => {
  it("oxide hybrid react most expensive", () => {
    expect(inkCost("oxide_hybrid_react")).toBeGreaterThan(inkCost("classic_dye_fade"));
  });
});

describe("waterSoluble", () => {
  it("classic dye fade is water soluble", () => {
    expect(waterSoluble("classic_dye_fade")).toBe(true);
  });
  it("paint dabber opaque not water soluble", () => {
    expect(waterSoluble("paint_dabber_opaque")).toBe(false);
  });
});

describe("opaque", () => {
  it("paint dabber opaque is opaque", () => {
    expect(opaque("paint_dabber_opaque")).toBe(true);
  });
  it("classic dye fade not opaque", () => {
    expect(opaque("classic_dye_fade")).toBe(false);
  });
});

describe("inkBase", () => {
  it("oxide hybrid react uses dye oxide hybrid", () => {
    expect(inkBase("oxide_hybrid_react")).toBe("dye_oxide_hybrid");
  });
});

describe("bestUse", () => {
  it("spray mist stain best for background spray mist", () => {
    expect(bestUse("spray_mist_stain")).toBe("background_spray_mist");
  });
});

describe("distressInks", () => {
  it("returns 5 types", () => {
    expect(distressInks()).toHaveLength(5);
  });
});
