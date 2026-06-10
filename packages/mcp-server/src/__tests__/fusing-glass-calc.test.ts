import { describe, it, expect } from "vitest";
import {
  peakTempCelsius, holdTimeMinutes, layersMax, textureRetention,
  moldRequired, annealingHours, compatibilityStrictness, skillLevel,
  costPerFiring, fuseTypes,
} from "../fusing-glass-calc.js";

describe("peakTempCelsius", () => {
  it("full fuse is hottest", () => {
    expect(peakTempCelsius("full_fuse")).toBeGreaterThan(
      peakTempCelsius("slump")
    );
  });
});

describe("holdTimeMinutes", () => {
  it("full fuse holds longest", () => {
    expect(holdTimeMinutes("full_fuse")).toBeGreaterThanOrEqual(
      holdTimeMinutes("tack_fuse")
    );
  });
});

describe("layersMax", () => {
  it("full fuse supports most layers", () => {
    expect(layersMax("full_fuse")).toBeGreaterThan(layersMax("slump"));
  });
});

describe("textureRetention", () => {
  it("tack fuse retains most texture", () => {
    expect(textureRetention("tack_fuse")).toBeGreaterThan(
      textureRetention("full_fuse")
    );
  });
});

describe("moldRequired", () => {
  it("slump needs a mold", () => {
    expect(moldRequired("slump")).toBe(true);
  });
  it("tack fuse does not", () => {
    expect(moldRequired("tack_fuse")).toBe(false);
  });
});

describe("annealingHours", () => {
  it("full fuse anneals longest", () => {
    expect(annealingHours("full_fuse")).toBeGreaterThan(
      annealingHours("tack_fuse")
    );
  });
});

describe("compatibilityStrictness", () => {
  it("full fuse is strictest", () => {
    expect(compatibilityStrictness("full_fuse")).toBeGreaterThan(
      compatibilityStrictness("slump")
    );
  });
});

describe("skillLevel", () => {
  it("drape needs most skill", () => {
    expect(skillLevel("drape")).toBeGreaterThan(skillLevel("tack_fuse"));
  });
});

describe("costPerFiring", () => {
  it("full fuse is most expensive", () => {
    expect(costPerFiring("full_fuse")).toBeGreaterThan(
      costPerFiring("tack_fuse")
    );
  });
});

describe("fuseTypes", () => {
  it("returns 5 types", () => {
    expect(fuseTypes()).toHaveLength(5);
  });
});
