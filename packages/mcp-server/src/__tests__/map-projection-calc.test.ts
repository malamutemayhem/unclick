import { describe, it, expect } from "vitest";
import {
  areaDistortion, shapeDistortion, directionAccuracy,
  distanceAccuracy, conformal, equalArea,
  bestUse, polarSuitability, popularityRating, mapProjections,
} from "../map-projection-calc.js";

describe("areaDistortion", () => {
  it("mercator distorts area most", () => {
    expect(areaDistortion("mercator")).toBeGreaterThan(
      areaDistortion("mollweide")
    );
  });
});

describe("shapeDistortion", () => {
  it("mollweide distorts shape most", () => {
    expect(shapeDistortion("mollweide")).toBeGreaterThan(
      shapeDistortion("mercator")
    );
  });
});

describe("directionAccuracy", () => {
  it("mercator has best direction accuracy", () => {
    expect(directionAccuracy("mercator")).toBeGreaterThan(
      directionAccuracy("mollweide")
    );
  });
});

describe("distanceAccuracy", () => {
  it("azimuthal has best distance accuracy", () => {
    expect(distanceAccuracy("azimuthal")).toBeGreaterThan(
      distanceAccuracy("mercator")
    );
  });
});

describe("conformal", () => {
  it("mercator is conformal", () => {
    expect(conformal("mercator")).toBe(true);
  });
  it("robinson is not conformal", () => {
    expect(conformal("robinson")).toBe(false);
  });
});

describe("equalArea", () => {
  it("mollweide is equal area", () => {
    expect(equalArea("mollweide")).toBe(true);
  });
  it("mercator is not equal area", () => {
    expect(equalArea("mercator")).toBe(false);
  });
});

describe("bestUse", () => {
  it("mercator best for navigation", () => {
    expect(bestUse("mercator")).toBe("navigation");
  });
});

describe("polarSuitability", () => {
  it("stereographic best for polar regions", () => {
    expect(polarSuitability("stereographic")).toBeGreaterThan(
      polarSuitability("mercator")
    );
  });
});

describe("popularityRating", () => {
  it("mercator is most popular", () => {
    expect(popularityRating("mercator")).toBeGreaterThan(
      popularityRating("azimuthal")
    );
  });
});

describe("mapProjections", () => {
  it("returns 5 projections", () => {
    expect(mapProjections()).toHaveLength(5);
  });
});
