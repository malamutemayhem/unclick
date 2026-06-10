import { describe, it, expect } from "vitest";
import {
  globalAdoption, accuracy, tectonicAwareness,
  gpsNative, legacyUsage, isGeocentric,
  isCurrentStandard, coverageRegion, ellipsoid, datumTypes,
} from "../datum-type-calc.js";

describe("globalAdoption", () => {
  it("wgs84 most adopted globally", () => {
    expect(globalAdoption("wgs84")).toBeGreaterThan(
      globalAdoption("gda2020")
    );
  });
});

describe("accuracy", () => {
  it("gda2020 most accurate", () => {
    expect(accuracy("gda2020")).toBeGreaterThan(
      accuracy("nad27")
    );
  });
});

describe("tectonicAwareness", () => {
  it("gda2020 most tectonic aware", () => {
    expect(tectonicAwareness("gda2020")).toBeGreaterThan(
      tectonicAwareness("nad27")
    );
  });
});

describe("gpsNative", () => {
  it("wgs84 most gps native", () => {
    expect(gpsNative("wgs84")).toBeGreaterThan(
      gpsNative("nad27")
    );
  });
});

describe("legacyUsage", () => {
  it("nad27 most legacy", () => {
    expect(legacyUsage("nad27")).toBeGreaterThan(
      legacyUsage("gda2020")
    );
  });
});

describe("isGeocentric", () => {
  it("wgs84 is geocentric", () => {
    expect(isGeocentric("wgs84")).toBe(true);
  });
  it("nad27 is not", () => {
    expect(isGeocentric("nad27")).toBe(false);
  });
});

describe("isCurrentStandard", () => {
  it("etrs89 is current standard", () => {
    expect(isCurrentStandard("etrs89")).toBe(true);
  });
  it("nad27 is not", () => {
    expect(isCurrentStandard("nad27")).toBe(false);
  });
});

describe("coverageRegion", () => {
  it("wgs84 covers worldwide", () => {
    expect(coverageRegion("wgs84")).toBe("worldwide");
  });
});

describe("ellipsoid", () => {
  it("nad27 uses clarke 1866", () => {
    expect(ellipsoid("nad27")).toBe("clarke_1866");
  });
});

describe("datumTypes", () => {
  it("returns 5 types", () => {
    expect(datumTypes()).toHaveLength(5);
  });
});
