import { describe, it, expect } from "vitest";
import {
  releaseEase, surfaceFinish, applicationEase, moldLife,
  releaseCost, foodSafe, waterBased, releaseBase,
  bestUse, moldReleases,
} from "../mold-release-calc.js";

describe("releaseEase", () => {
  it("ptfe dry film easiest release", () => {
    expect(releaseEase("ptfe_dry_film")).toBeGreaterThan(releaseEase("natural_oil_plant"));
  });
});

describe("surfaceFinish", () => {
  it("ptfe dry film best surface finish", () => {
    expect(surfaceFinish("ptfe_dry_film")).toBeGreaterThan(surfaceFinish("natural_oil_plant"));
  });
});

describe("applicationEase", () => {
  it("spray silicone quick easiest application", () => {
    expect(applicationEase("spray_silicone_quick")).toBeGreaterThan(applicationEase("paste_wax_buff"));
  });
});

describe("moldLife", () => {
  it("ptfe dry film longest mold life", () => {
    expect(moldLife("ptfe_dry_film")).toBeGreaterThan(moldLife("natural_oil_plant"));
  });
});

describe("releaseCost", () => {
  it("ptfe dry film most expensive", () => {
    expect(releaseCost("ptfe_dry_film")).toBeGreaterThan(releaseCost("natural_oil_plant"));
  });
});

describe("foodSafe", () => {
  it("natural oil plant is food safe", () => {
    expect(foodSafe("natural_oil_plant")).toBe(true);
  });
  it("spray silicone quick is not food safe", () => {
    expect(foodSafe("spray_silicone_quick")).toBe(false);
  });
});

describe("waterBased", () => {
  it("pva water film is water based", () => {
    expect(waterBased("pva_water_film")).toBe(true);
  });
  it("paste wax buff is not water based", () => {
    expect(waterBased("paste_wax_buff")).toBe(false);
  });
});

describe("releaseBase", () => {
  it("paste wax buff uses carnauba wax blend", () => {
    expect(releaseBase("paste_wax_buff")).toBe("carnauba_wax_blend");
  });
});

describe("bestUse", () => {
  it("natural oil plant best for soap candle natural", () => {
    expect(bestUse("natural_oil_plant")).toBe("soap_candle_natural");
  });
});

describe("moldReleases", () => {
  it("returns 5 types", () => {
    expect(moldReleases()).toHaveLength(5);
  });
});
