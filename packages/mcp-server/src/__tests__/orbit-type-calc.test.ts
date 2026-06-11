import { describe, it, expect } from "vitest";
import {
  altitude, coverage, latency, stationKeeping,
  otCost, polar, forComm, period,
  bestUse, orbitTypes,
} from "../orbit-type-calc.js";

describe("altitude", () => {
  it("geo highest altitude", () => {
    expect(altitude("geo_geostationary")).toBeGreaterThan(altitude("leo_circular_low"));
  });
});

describe("coverage", () => {
  it("geo best coverage", () => {
    expect(coverage("geo_geostationary")).toBeGreaterThan(coverage("leo_circular_low"));
  });
});

describe("latency", () => {
  it("leo lowest latency", () => {
    expect(latency("leo_circular_low")).toBeGreaterThan(latency("geo_geostationary"));
  });
});

describe("stationKeeping", () => {
  it("heo highest station keeping", () => {
    expect(stationKeeping("heo_molniya_elliptic")).toBeGreaterThan(stationKeeping("leo_circular_low"));
  });
});

describe("otCost", () => {
  it("geo most expensive", () => {
    expect(otCost("geo_geostationary")).toBeGreaterThan(otCost("leo_circular_low"));
  });
});

describe("polar", () => {
  it("sso is polar", () => {
    expect(polar("sso_sun_synchronous")).toBe(true);
  });
  it("leo not polar", () => {
    expect(polar("leo_circular_low")).toBe(false);
  });
});

describe("forComm", () => {
  it("geo for comm", () => {
    expect(forComm("geo_geostationary")).toBe(true);
  });
  it("sso not for comm", () => {
    expect(forComm("sso_sun_synchronous")).toBe(false);
  });
});

describe("period", () => {
  it("geo uses 24 hr equatorial fixed", () => {
    expect(period("geo_geostationary")).toBe("24_hr_equatorial_fixed");
  });
});

describe("bestUse", () => {
  it("sso best for earth observation", () => {
    expect(bestUse("sso_sun_synchronous")).toBe("earth_observation_imaging");
  });
});

describe("orbitTypes", () => {
  it("returns 5 types", () => {
    expect(orbitTypes()).toHaveLength(5);
  });
});
