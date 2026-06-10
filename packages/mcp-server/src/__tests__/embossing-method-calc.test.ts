import { describe, it, expect } from "vitest";
import {
  visualImpact, tactileDepth, detailResolution, productionSpeed,
  dieCost, requiresHeat, usesMetallicFoil, dieType,
  bestApplication, embossingMethods,
} from "../embossing-method-calc.js";

describe("visualImpact", () => {
  it("combo emboss foil highest visual impact", () => {
    expect(visualImpact("combo_emboss_foil")).toBeGreaterThan(visualImpact("deboss"));
  });
});

describe("tactileDepth", () => {
  it("sculptured deepest tactile", () => {
    expect(tactileDepth("sculptured")).toBeGreaterThan(tactileDepth("foil_stamp"));
  });
});

describe("detailResolution", () => {
  it("sculptured finest detail", () => {
    expect(detailResolution("sculptured")).toBeGreaterThan(detailResolution("deboss"));
  });
});

describe("productionSpeed", () => {
  it("deboss fastest production", () => {
    expect(productionSpeed("deboss")).toBeGreaterThan(productionSpeed("sculptured"));
  });
});

describe("dieCost", () => {
  it("sculptured most expensive die", () => {
    expect(dieCost("sculptured")).toBeGreaterThan(dieCost("blind_emboss"));
  });
});

describe("requiresHeat", () => {
  it("all methods require heat", () => {
    expect(requiresHeat("blind_emboss")).toBe(true);
    expect(requiresHeat("sculptured")).toBe(true);
  });
});

describe("usesMetallicFoil", () => {
  it("foil stamp uses metallic foil", () => {
    expect(usesMetallicFoil("foil_stamp")).toBe(true);
  });
  it("blind emboss does not", () => {
    expect(usesMetallicFoil("blind_emboss")).toBe(false);
  });
});

describe("dieType", () => {
  it("sculptured uses hand tooled multilevel", () => {
    expect(dieType("sculptured")).toBe("hand_tooled_multilevel");
  });
});

describe("bestApplication", () => {
  it("combo emboss foil for premium packaging", () => {
    expect(bestApplication("combo_emboss_foil")).toBe("premium_packaging_invite");
  });
});

describe("embossingMethods", () => {
  it("returns 5 methods", () => {
    expect(embossingMethods()).toHaveLength(5);
  });
});
