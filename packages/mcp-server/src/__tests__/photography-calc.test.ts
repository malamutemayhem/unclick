import { describe, it, expect } from "vitest";
import {
  exposureValue, evFromIso, equivalentExposure, depthOfField,
  hyperfocalDistance, fieldOfView, cropFactor, equivalentFocalLength,
  sunriseGoldenHour, sunsetGoldenHour, flashGuideNumber, flashRange,
  megapixelsFromResolution, printSize, fileSize, ndFilterStops,
  shutterWithND, ruleOfThirds, aspectRatio, COMMON_SENSORS,
} from "../photography-calc.js";

describe("exposureValue", () => {
  it("f/1.4 at 1s = EV 1", () => {
    expect(exposureValue(1.4, 1)).toBeCloseTo(1, 0);
  });

  it("f/8 at 1/250 = EV ~14", () => {
    expect(exposureValue(8, 1 / 250)).toBeCloseTo(14, 0);
  });
});

describe("evFromIso", () => {
  it("ISO 200 adds 1 stop", () => {
    const ev100 = exposureValue(8, 1 / 125);
    const ev200 = evFromIso(8, 1 / 125, 200);
    expect(ev200 - ev100).toBeCloseTo(1, 0);
  });
});

describe("equivalentExposure", () => {
  it("opening aperture shortens shutter", () => {
    const shutter = equivalentExposure(8, 1 / 125, 100, 4, 100);
    expect(shutter).toBeLessThan(1 / 125);
  });
});

describe("depthOfField", () => {
  it("wider aperture = shallower DOF", () => {
    const wide = depthOfField(50, 1.4, 3000);
    const narrow = depthOfField(50, 8, 3000);
    expect(wide.total).toBeLessThan(narrow.total);
  });
});

describe("hyperfocalDistance", () => {
  it("50mm at f/8", () => {
    const h = hyperfocalDistance(50, 8);
    expect(h).toBeGreaterThan(10000);
  });
});

describe("fieldOfView", () => {
  it("50mm on full frame ~ 40 degrees", () => {
    const fov = fieldOfView(50, 36);
    expect(fov).toBeCloseTo(40, -1);
  });
});

describe("cropFactor", () => {
  it("full frame = 1.0", () => {
    const diag = Math.sqrt(36 ** 2 + 24 ** 2);
    expect(cropFactor(diag)).toBeCloseTo(1, 0);
  });
});

describe("equivalentFocalLength", () => {
  it("50mm on 1.5x crop = 75mm", () => {
    expect(equivalentFocalLength(50, 1.5)).toBe(75);
  });
});

describe("golden hours", () => {
  it("sunrise golden hour", () => {
    const gh = sunriseGoldenHour(6);
    expect(gh.start).toBe(6);
    expect(gh.end).toBe(7);
  });

  it("sunset golden hour", () => {
    const gh = sunsetGoldenHour(19);
    expect(gh.start).toBe(18);
    expect(gh.end).toBe(19);
  });
});

describe("flash", () => {
  it("guide number scales with ISO", () => {
    expect(flashGuideNumber(36, 400)).toBeGreaterThan(flashGuideNumber(36, 100));
  });

  it("flash range", () => {
    expect(flashRange(36, 4)).toBe(9);
  });
});

describe("megapixelsFromResolution", () => {
  it("6000x4000 = 24MP", () => {
    expect(megapixelsFromResolution(6000, 4000)).toBe(24);
  });
});

describe("printSize", () => {
  it("positive dimensions", () => {
    const ps = printSize(24, 300);
    expect(ps.widthInch).toBeGreaterThan(10);
  });
});

describe("fileSize", () => {
  it("24MP RAW uncompressed", () => {
    expect(fileSize(24, 16)).toBeCloseTo(137, -1);
  });
});

describe("ndFilterStops", () => {
  it("ND8 = 3 stops", () => {
    expect(ndFilterStops(8)).toBe(3);
  });
});

describe("shutterWithND", () => {
  it("1/250 + 10 stops = ~4s", () => {
    const s = shutterWithND(1 / 250, 10);
    expect(s).toBeCloseTo(4.1, 0);
  });
});

describe("ruleOfThirds", () => {
  it("divides into thirds", () => {
    const r = ruleOfThirds(6000, 4000);
    expect(r.x).toEqual([2000, 4000]);
    expect(r.y).toEqual([1333, 2667]);
  });
});

describe("aspectRatio", () => {
  it("6000x4000 = 3:2", () => {
    expect(aspectRatio(6000, 4000)).toBe("3:2");
  });
});

describe("COMMON_SENSORS", () => {
  it("has full frame", () => {
    expect(COMMON_SENSORS.full_frame.width).toBe(36);
  });
});
