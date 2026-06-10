import { describe, it, expect } from "vitest";
import {
  colorVibrancy, fadeResistance, allergyRisk, laserRemovalEase,
  costPerOz, euCompliant, visibleUnderNormalLight, pigmentBase,
  bestApplication, tattooInks,
} from "../tattoo-ink-calc.js";

describe("colorVibrancy", () => {
  it("carbon black most vibrant", () => {
    expect(colorVibrancy("carbon_black")).toBeGreaterThan(colorVibrancy("white"));
  });
});

describe("fadeResistance", () => {
  it("carbon black most fade resistant", () => {
    expect(fadeResistance("carbon_black")).toBeGreaterThan(fadeResistance("uv_reactive"));
  });
});

describe("allergyRisk", () => {
  it("uv reactive highest allergy risk", () => {
    expect(allergyRisk("uv_reactive")).toBeGreaterThan(allergyRisk("carbon_black"));
  });
});

describe("laserRemovalEase", () => {
  it("carbon black easiest to remove", () => {
    expect(laserRemovalEase("carbon_black")).toBeGreaterThan(laserRemovalEase("white"));
  });
});

describe("costPerOz", () => {
  it("uv reactive most expensive", () => {
    expect(costPerOz("uv_reactive")).toBeGreaterThan(costPerOz("carbon_black"));
  });
});

describe("euCompliant", () => {
  it("carbon black is eu compliant", () => {
    expect(euCompliant("carbon_black")).toBe(true);
  });
  it("organic pigment is not", () => {
    expect(euCompliant("organic_pigment")).toBe(false);
  });
});

describe("visibleUnderNormalLight", () => {
  it("carbon black visible", () => {
    expect(visibleUnderNormalLight("carbon_black")).toBe(true);
  });
  it("uv reactive not visible", () => {
    expect(visibleUnderNormalLight("uv_reactive")).toBe(false);
  });
});

describe("pigmentBase", () => {
  it("carbon black is carbon soot", () => {
    expect(pigmentBase("carbon_black")).toBe("carbon_soot_magnetite");
  });
});

describe("bestApplication", () => {
  it("carbon black for linework", () => {
    expect(bestApplication("carbon_black")).toBe("linework_blackwork");
  });
});

describe("tattooInks", () => {
  it("returns 5 inks", () => {
    expect(tattooInks()).toHaveLength(5);
  });
});
