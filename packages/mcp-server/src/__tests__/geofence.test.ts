import { describe, it, expect } from "vitest";
import {
  haversineDistance, isInsideCircle, isInsidePolygon, isInsideBBox,
  polygonBBox, circleBBox, polygonArea, polygonCentroid,
  distanceToPolygonEdge, bearing, destinationPoint,
  filterInsideCircle, filterInsidePolygon, polygonPerimeter,
} from "../geofence.js";

const SYDNEY = { lat: -33.8688, lng: 151.2093 };
const MELBOURNE = { lat: -37.8136, lng: 144.9631 };
const LONDON = { lat: 51.5074, lng: -0.1278 };

const SQUARE: { vertices: { lat: number; lng: number }[] } = {
  vertices: [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 1 },
    { lat: 1, lng: 1 },
    { lat: 1, lng: 0 },
  ],
};

describe("haversineDistance", () => {
  it("zero for same point", () => {
    expect(haversineDistance(SYDNEY, SYDNEY)).toBeCloseTo(0);
  });

  it("Sydney to Melbourne ~714km", () => {
    const d = haversineDistance(SYDNEY, MELBOURNE);
    expect(d).toBeGreaterThan(700);
    expect(d).toBeLessThan(730);
  });
});

describe("isInsideCircle", () => {
  it("point inside", () => {
    expect(isInsideCircle(SYDNEY, { center: SYDNEY, radiusKm: 10 })).toBe(true);
  });

  it("point outside", () => {
    expect(isInsideCircle(MELBOURNE, { center: SYDNEY, radiusKm: 100 })).toBe(false);
  });
});

describe("isInsidePolygon", () => {
  it("point inside square", () => {
    expect(isInsidePolygon({ lat: 0.5, lng: 0.5 }, SQUARE)).toBe(true);
  });

  it("point outside square", () => {
    expect(isInsidePolygon({ lat: 2, lng: 2 }, SQUARE)).toBe(false);
  });
});

describe("isInsideBBox", () => {
  it("inside", () => {
    expect(isInsideBBox({ lat: 0.5, lng: 0.5 }, { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 })).toBe(true);
  });

  it("outside", () => {
    expect(isInsideBBox({ lat: 2, lng: 2 }, { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 })).toBe(false);
  });
});

describe("polygonBBox", () => {
  it("computes bounding box", () => {
    const bb = polygonBBox(SQUARE);
    expect(bb.minLat).toBe(0);
    expect(bb.maxLat).toBe(1);
  });
});

describe("circleBBox", () => {
  it("computes bounding box for circle", () => {
    const bb = circleBBox({ center: { lat: 0, lng: 0 }, radiusKm: 100 });
    expect(bb.minLat).toBeLessThan(0);
    expect(bb.maxLat).toBeGreaterThan(0);
  });
});

describe("polygonArea", () => {
  it("positive for valid polygon", () => {
    expect(polygonArea(SQUARE)).toBeGreaterThan(0);
  });
});

describe("polygonCentroid", () => {
  it("center of square", () => {
    const c = polygonCentroid(SQUARE);
    expect(c.lat).toBeCloseTo(0.5);
    expect(c.lng).toBeCloseTo(0.5);
  });
});

describe("distanceToPolygonEdge", () => {
  it("returns distance to nearest edge", () => {
    const d = distanceToPolygonEdge({ lat: 0.5, lng: 0.5 }, SQUARE);
    expect(d).toBeGreaterThan(0);
  });
});

describe("bearing", () => {
  it("north is ~0 or ~360", () => {
    const b = bearing({ lat: 0, lng: 0 }, { lat: 1, lng: 0 });
    expect(b).toBeLessThan(1);
  });

  it("east is ~90", () => {
    const b = bearing({ lat: 0, lng: 0 }, { lat: 0, lng: 1 });
    expect(b).toBeCloseTo(90, 0);
  });
});

describe("destinationPoint", () => {
  it("returns a point at the given distance", () => {
    const dest = destinationPoint({ lat: 0, lng: 0 }, 0, 111.19);
    expect(dest.lat).toBeCloseTo(1, 0);
  });
});

describe("filterInsideCircle", () => {
  it("filters points", () => {
    const circle = { center: SYDNEY, radiusKm: 100 };
    const filtered = filterInsideCircle([SYDNEY, MELBOURNE, LONDON], circle);
    expect(filtered.length).toBe(1);
  });
});

describe("filterInsidePolygon", () => {
  it("filters points in polygon", () => {
    const points = [{ lat: 0.5, lng: 0.5 }, { lat: 5, lng: 5 }];
    const filtered = filterInsidePolygon(points, SQUARE);
    expect(filtered.length).toBe(1);
  });
});

describe("polygonPerimeter", () => {
  it("positive perimeter", () => {
    expect(polygonPerimeter(SQUARE)).toBeGreaterThan(0);
  });
});
