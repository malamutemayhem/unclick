import { describe, it, expect } from "vitest";
import {
  scratchResistance, touchSensitivity, clarity, installEase,
  protectorCost, shatterProof, selfHealing, surfaceFinish,
  bestDevice, screenProtectors,
} from "../screen-protector-calc.js";

describe("scratchResistance", () => {
  it("tempered glass 9h most scratch resistant", () => {
    expect(scratchResistance("tempered_glass_9h")).toBeGreaterThan(scratchResistance("hydrogel_self_heal"));
  });
});

describe("touchSensitivity", () => {
  it("hydrogel self heal best touch sensitivity", () => {
    expect(touchSensitivity("hydrogel_self_heal")).toBeGreaterThan(touchSensitivity("privacy_filter"));
  });
});

describe("clarity", () => {
  it("tempered glass 9h best clarity", () => {
    expect(clarity("tempered_glass_9h")).toBeGreaterThan(clarity("matte_anti_glare"));
  });
});

describe("installEase", () => {
  it("tempered glass 9h easiest install", () => {
    expect(installEase("tempered_glass_9h")).toBeGreaterThan(installEase("hydrogel_self_heal"));
  });
});

describe("protectorCost", () => {
  it("privacy filter most expensive", () => {
    expect(protectorCost("privacy_filter")).toBeGreaterThan(protectorCost("matte_anti_glare"));
  });
});

describe("shatterProof", () => {
  it("tempered glass 9h is shatter proof", () => {
    expect(shatterProof("tempered_glass_9h")).toBe(true);
  });
  it("matte anti glare is not", () => {
    expect(shatterProof("matte_anti_glare")).toBe(false);
  });
});

describe("selfHealing", () => {
  it("hydrogel self heal is self healing", () => {
    expect(selfHealing("hydrogel_self_heal")).toBe(true);
  });
  it("tempered glass 9h is not", () => {
    expect(selfHealing("tempered_glass_9h")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("matte anti glare uses etched diffusion layer", () => {
    expect(surfaceFinish("matte_anti_glare")).toBe("etched_diffusion_layer");
  });
});

describe("bestDevice", () => {
  it("privacy filter for public transit office", () => {
    expect(bestDevice("privacy_filter")).toBe("public_transit_office");
  });
});

describe("screenProtectors", () => {
  it("returns 5 types", () => {
    expect(screenProtectors()).toHaveLength(5);
  });
});
