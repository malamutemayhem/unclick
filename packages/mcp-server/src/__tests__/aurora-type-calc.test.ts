import { describe, it, expect } from "vitest";
import {
  brightnessKilorayleigh, altitudeKm, durationMinutes,
  dynamicMotion, photographicAppeal, visibleToNakedEye,
  requiresStrongStorm, dominantColor, frequencyPerYear, auroraTypes,
} from "../aurora-type-calc.js";

describe("brightnessKilorayleigh", () => {
  it("corona is brightest", () => {
    expect(brightnessKilorayleigh("corona")).toBeGreaterThan(
      brightnessKilorayleigh("diffuse")
    );
  });
});

describe("altitudeKm", () => {
  it("diffuse occurs at highest altitude", () => {
    expect(altitudeKm("diffuse")).toBeGreaterThan(
      altitudeKm("corona")
    );
  });
});

describe("durationMinutes", () => {
  it("diffuse lasts longest", () => {
    expect(durationMinutes("diffuse")).toBeGreaterThan(
      durationMinutes("corona")
    );
  });
});

describe("dynamicMotion", () => {
  it("corona has most dynamic motion", () => {
    expect(dynamicMotion("corona")).toBeGreaterThan(
      dynamicMotion("diffuse")
    );
  });
});

describe("photographicAppeal", () => {
  it("corona is most photogenic", () => {
    expect(photographicAppeal("corona")).toBeGreaterThan(
      photographicAppeal("diffuse")
    );
  });
});

describe("visibleToNakedEye", () => {
  it("corona is visible", () => {
    expect(visibleToNakedEye("corona")).toBe(true);
  });
  it("diffuse is not visible", () => {
    expect(visibleToNakedEye("diffuse")).toBe(false);
  });
});

describe("requiresStrongStorm", () => {
  it("corona requires strong storm", () => {
    expect(requiresStrongStorm("corona")).toBe(true);
  });
  it("diffuse does not", () => {
    expect(requiresStrongStorm("diffuse")).toBe(false);
  });
});

describe("dominantColor", () => {
  it("discrete arc is green", () => {
    expect(dominantColor("discrete_arc")).toBe("green");
  });
});

describe("frequencyPerYear", () => {
  it("diffuse is most frequent", () => {
    expect(frequencyPerYear("diffuse")).toBeGreaterThan(
      frequencyPerYear("corona")
    );
  });
});

describe("auroraTypes", () => {
  it("returns 5 types", () => {
    expect(auroraTypes()).toHaveLength(5);
  });
});
