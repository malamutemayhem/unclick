import { describe, it, expect } from "vitest";
import {
  globalCoverage, positionAccuracy, distortionLevel,
  complexityScore, gpsCompatibility, isProjected,
  threeD, primaryUse, unitType, coordinateSystems,
} from "../coordinate-system-calc.js";

describe("globalCoverage", () => {
  it("geographic full global coverage", () => {
    expect(globalCoverage("geographic")).toBeGreaterThan(
      globalCoverage("local")
    );
  });
});

describe("positionAccuracy", () => {
  it("local most accurate position", () => {
    expect(positionAccuracy("local")).toBeGreaterThan(
      positionAccuracy("geographic")
    );
  });
});

describe("distortionLevel", () => {
  it("geographic most distortion", () => {
    expect(distortionLevel("geographic")).toBeGreaterThan(
      distortionLevel("local")
    );
  });
});

describe("complexityScore", () => {
  it("ecef most complex", () => {
    expect(complexityScore("ecef")).toBeGreaterThan(
      complexityScore("local")
    );
  });
});

describe("gpsCompatibility", () => {
  it("geographic best gps compatibility", () => {
    expect(gpsCompatibility("geographic")).toBeGreaterThan(
      gpsCompatibility("local")
    );
  });
});

describe("isProjected", () => {
  it("utm is projected", () => {
    expect(isProjected("utm")).toBe(true);
  });
  it("geographic is not", () => {
    expect(isProjected("geographic")).toBe(false);
  });
});

describe("threeD", () => {
  it("ecef is 3d", () => {
    expect(threeD("ecef")).toBe(true);
  });
  it("utm is not", () => {
    expect(threeD("utm")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("utm for military topographic", () => {
    expect(primaryUse("utm")).toBe("military_topographic");
  });
});

describe("unitType", () => {
  it("geographic uses degrees", () => {
    expect(unitType("geographic")).toBe("degrees_lat_lon");
  });
});

describe("coordinateSystems", () => {
  it("returns 5 systems", () => {
    expect(coordinateSystems()).toHaveLength(5);
  });
});
