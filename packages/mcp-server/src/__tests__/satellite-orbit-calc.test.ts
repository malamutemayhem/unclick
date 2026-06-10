import { describe, it, expect } from "vitest";
import {
  altitudeKm, orbitalPeriodMinutes, signalLatencyMs,
  coverageArea, launchCost, geostationary,
  sunSynchronous, primaryUse, exampleConstellation, orbitTypes,
} from "../satellite-orbit-calc.js";

describe("altitudeKm", () => {
  it("heo is highest", () => {
    expect(altitudeKm("heo")).toBeGreaterThan(
      altitudeKm("leo")
    );
  });
});

describe("orbitalPeriodMinutes", () => {
  it("heo has longest period", () => {
    expect(orbitalPeriodMinutes("heo")).toBeGreaterThan(
      orbitalPeriodMinutes("leo")
    );
  });
});

describe("signalLatencyMs", () => {
  it("leo has lowest latency", () => {
    expect(signalLatencyMs("geo")).toBeGreaterThan(
      signalLatencyMs("leo")
    );
  });
});

describe("coverageArea", () => {
  it("geo has most coverage", () => {
    expect(coverageArea("geo")).toBeGreaterThan(
      coverageArea("leo")
    );
  });
});

describe("launchCost", () => {
  it("heo costs most", () => {
    expect(launchCost("heo")).toBeGreaterThan(
      launchCost("leo")
    );
  });
});

describe("geostationary", () => {
  it("geo is geostationary", () => {
    expect(geostationary("geo")).toBe(true);
  });
  it("leo is not", () => {
    expect(geostationary("leo")).toBe(false);
  });
});

describe("sunSynchronous", () => {
  it("sso is sun synchronous", () => {
    expect(sunSynchronous("sso")).toBe(true);
  });
  it("geo is not", () => {
    expect(sunSynchronous("geo")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("meo for navigation", () => {
    expect(primaryUse("meo")).toBe("navigation");
  });
});

describe("exampleConstellation", () => {
  it("leo example is starlink", () => {
    expect(exampleConstellation("leo")).toBe("starlink");
  });
});

describe("orbitTypes", () => {
  it("returns 5 types", () => {
    expect(orbitTypes()).toHaveLength(5);
  });
});
