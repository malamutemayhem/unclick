import { describe, it, expect } from "vitest";
import {
  gradeMultiplier, marketValue, playingTime, grooveLength,
  trackingForce, antiSkate, stylusLife, cleaningInterval,
  innerSleeve, storageTemp, warpThreshold, pressWeight,
  recordSizes,
} from "../vinyl-record.js";

describe("gradeMultiplier", () => {
  it("M is 1.0", () => {
    expect(gradeMultiplier("M")).toBe(1);
  });

  it("P is lowest", () => {
    expect(gradeMultiplier("P")).toBeLessThan(gradeMultiplier("G"));
  });
});

describe("marketValue", () => {
  it("less for lower grade", () => {
    expect(marketValue(100, "VG")).toBeLessThan(marketValue(100, "NM"));
  });
});

describe("playingTime", () => {
  it("LP is 22 min per side", () => {
    expect(playingTime(12, 33)).toBe(22);
  });

  it("7\" 45 is 5 min", () => {
    expect(playingTime(7, 45)).toBe(5);
  });
});

describe("grooveLength", () => {
  it("positive meters", () => {
    expect(grooveLength(12, 33, 20)).toBeGreaterThan(0);
  });
});

describe("trackingForce", () => {
  it("MC is lighter", () => {
    expect(trackingForce("mc").min).toBeLessThan(trackingForce("mm").min);
  });
});

describe("antiSkate", () => {
  it("equals tracking force", () => {
    expect(antiSkate(2.0)).toBe(2.0);
  });
});

describe("stylusLife", () => {
  it("100% when new", () => {
    expect(stylusLife(0)).toBe(100);
  });

  it("decreases with use", () => {
    expect(stylusLife(500)).toBeLessThan(100);
  });
});

describe("cleaningInterval", () => {
  it("weekly for heavy use", () => {
    expect(cleaningInterval(15)).toBe(1);
  });
});

describe("innerSleeve", () => {
  it("MoFi for valuable", () => {
    expect(innerSleeve(200)).toContain("MoFi");
  });
});

describe("storageTemp", () => {
  it("range", () => {
    expect(storageTemp().maxC).toBeGreaterThan(storageTemp().minC);
  });
});

describe("warpThreshold", () => {
  it("3mm", () => {
    expect(warpThreshold()).toBe(3);
  });
});

describe("pressWeight", () => {
  it("heavyweight for 180g", () => {
    expect(pressWeight(180)).toBe("heavyweight");
  });
});

describe("recordSizes", () => {
  it("returns 3 sizes", () => {
    expect(recordSizes()).toHaveLength(3);
  });
});
