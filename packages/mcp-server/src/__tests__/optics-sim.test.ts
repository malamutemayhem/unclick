import { describe, it, expect } from "vitest";
import {
  snellsLaw, criticalAngle, thinLensImage, mirrorImage,
  lensmakerEquation, fresnelReflectance, brewsterAngle,
  wavelengthToRGB, diffractionMaxima, opticalPower,
  combinedFocalLength,
} from "../optics-sim.js";

describe("snellsLaw", () => {
  it("refracts light entering glass", () => {
    const theta = snellsLaw(1.0, 1.5, Math.PI / 6);
    expect(theta).not.toBeNull();
    expect(theta!).toBeLessThan(Math.PI / 6);
  });

  it("returns null for total internal reflection", () => {
    const theta = snellsLaw(1.5, 1.0, Math.PI / 3);
    expect(theta).toBeNull();
  });

  it("no bending at normal incidence", () => {
    const theta = snellsLaw(1.0, 1.5, 0);
    expect(theta).toBeCloseTo(0);
  });
});

describe("criticalAngle", () => {
  it("exists for glass-to-air", () => {
    const angle = criticalAngle(1.5, 1.0);
    expect(angle).not.toBeNull();
    expect(angle!).toBeGreaterThan(0);
    expect(angle!).toBeLessThan(Math.PI / 2);
  });

  it("returns null for air-to-glass", () => {
    expect(criticalAngle(1.0, 1.5)).toBeNull();
  });
});

describe("thinLensImage", () => {
  it("real image beyond focal point", () => {
    const img = thinLensImage(30, 10);
    expect(img.position).toBeCloseTo(15);
    expect(img.real).toBe(true);
    expect(img.inverted).toBe(true);
  });

  it("virtual image inside focal point", () => {
    const img = thinLensImage(5, 10);
    expect(img.position).toBeLessThan(0);
    expect(img.real).toBe(false);
  });

  it("object at 2f gives image at 2f", () => {
    const img = thinLensImage(20, 10);
    expect(img.position).toBeCloseTo(20);
    expect(img.magnification).toBeCloseTo(1);
  });
});

describe("mirrorImage", () => {
  it("concave mirror creates real image", () => {
    const img = mirrorImage(30, 10);
    expect(img.real).toBe(true);
  });
});

describe("lensmakerEquation", () => {
  it("computes focal length", () => {
    const f = lensmakerEquation(1.5, 0.1, -0.1);
    expect(f).toBeGreaterThan(0);
  });
});

describe("fresnelReflectance", () => {
  it("low reflectance at normal incidence", () => {
    const r = fresnelReflectance(1.0, 1.5, 0);
    expect(r).toBeLessThan(0.1);
  });

  it("total reflection at critical angle", () => {
    const crit = criticalAngle(1.5, 1.0);
    if (crit) {
      const r = fresnelReflectance(1.5, 1.0, crit + 0.01);
      expect(r).toBeCloseTo(1, 0);
    }
  });
});

describe("brewsterAngle", () => {
  it("computes Brewster angle", () => {
    const angle = brewsterAngle(1.0, 1.5);
    expect(angle).toBeGreaterThan(0);
    expect(angle).toBeLessThan(Math.PI / 2);
  });
});

describe("wavelengthToRGB", () => {
  it("red for 650nm", () => {
    const color = wavelengthToRGB(650);
    expect(color.r).toBeGreaterThan(200);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
  });

  it("blue for 450nm", () => {
    const color = wavelengthToRGB(450);
    expect(color.b).toBeGreaterThan(200);
  });

  it("green for 530nm", () => {
    const color = wavelengthToRGB(530);
    expect(color.g).toBeGreaterThan(200);
  });
});

describe("diffractionMaxima", () => {
  it("includes zeroth order", () => {
    const angles = diffractionMaxima(1e-6, 500e-9, 2);
    expect(angles).toContainEqual(expect.closeTo(0, 5));
  });

  it("symmetric around zero", () => {
    const angles = diffractionMaxima(1e-6, 500e-9, 1);
    expect(angles.length).toBeGreaterThanOrEqual(3);
  });
});

describe("opticalPower", () => {
  it("converts focal length to diopters", () => {
    expect(opticalPower(0.5)).toBe(2);
    expect(opticalPower(0.25)).toBe(4);
  });
});

describe("combinedFocalLength", () => {
  it("combines thin lenses in contact", () => {
    const f = combinedFocalLength(10, 20);
    expect(f).toBeCloseTo(1 / (1 / 10 + 1 / 20));
  });
});
