import { describe, it, expect } from "vitest";
import {
  enlargementFactor, filmArea, paperDimensions, developerAmount,
  stopBathAmount, fixerAmount, developmentTime, pushPullAdjustment,
  agitationInterval, exposureTime, fStopPrinting, testStripExposures,
  safelightDistance, washTime, dryingTime, chemicalCost, filmFormats,
} from "../darkroom-calc.js";

describe("enlargementFactor", () => {
  it("positive factor", () => {
    expect(enlargementFactor(36, 254)).toBeGreaterThan(1);
  });
});

describe("filmArea", () => {
  it("35mm = 36x24", () => {
    expect(filmArea("35mm")).toEqual({ widthMm: 36, heightMm: 24 });
  });
});

describe("paperDimensions", () => {
  it("8x10 dimensions", () => {
    expect(paperDimensions("8x10").widthMm).toBe(203);
  });
});

describe("developerAmount", () => {
  it("scales with rolls", () => {
    expect(developerAmount(3)).toBe(900);
  });
});

describe("stopBathAmount", () => {
  it("same as developer", () => {
    expect(stopBathAmount(3)).toBe(developerAmount(3));
  });
});

describe("fixerAmount", () => {
  it("positive ml", () => {
    expect(fixerAmount(2)).toBeGreaterThan(0);
  });
});

describe("developmentTime", () => {
  it("longer for faster film", () => {
    expect(developmentTime(400, "D76")).toBeGreaterThan(developmentTime(100, "D76"));
  });
});

describe("pushPullAdjustment", () => {
  it("20% per stop", () => {
    expect(pushPullAdjustment(1)).toBe(20);
  });
});

describe("agitationInterval", () => {
  it("0 for continuous", () => {
    expect(agitationInterval("continuous")).toBe(0);
  });

  it("60 for intermittent", () => {
    expect(agitationInterval("intermittent")).toBe(60);
  });
});

describe("exposureTime", () => {
  it("doubles with 2x filter", () => {
    expect(exposureTime(10, 2)).toBe(20);
  });
});

describe("fStopPrinting", () => {
  it("doubles per stop", () => {
    expect(fStopPrinting(10, 1)).toBe(20);
  });
});

describe("testStripExposures", () => {
  it("ascending exposures", () => {
    const strips = testStripExposures(5, 5);
    expect(strips).toHaveLength(5);
    for (let i = 1; i < strips.length; i++) {
      expect(strips[i]).toBeGreaterThan(strips[i - 1]);
    }
  });
});

describe("safelightDistance", () => {
  it("farther for brighter", () => {
    expect(safelightDistance(25)).toBeGreaterThan(safelightDistance(7));
  });
});

describe("washTime", () => {
  it("fiber takes longer", () => {
    expect(washTime("fiber")).toBeGreaterThan(washTime("RC"));
  });
});

describe("dryingTime", () => {
  it("fiber takes longer", () => {
    expect(dryingTime("fiber")).toBeGreaterThan(dryingTime("RC"));
  });
});

describe("chemicalCost", () => {
  it("positive cost", () => {
    expect(chemicalCost(5, 20, 15)).toBeGreaterThan(0);
  });
});

describe("filmFormats", () => {
  it("returns 4 formats", () => {
    expect(filmFormats()).toHaveLength(4);
    expect(filmFormats()).toContain("35mm");
  });
});
