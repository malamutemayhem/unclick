import { describe, it, expect } from "vitest";
import { GeodesicCalc } from "../geodesic-calc.js";

describe("GeodesicCalc", () => {
  it("haversine computes distance between cities", () => {
    const d = GeodesicCalc.haversine(51.5074, -0.1278, 48.8566, 2.3522);
    expect(d).toBeGreaterThan(340000);
    expect(d).toBeLessThan(350000);
  });

  it("haversine returns 0 for same point", () => {
    expect(GeodesicCalc.haversine(0, 0, 0, 0)).toBe(0);
  });

  it("bearing from equator going east is 90", () => {
    const b = GeodesicCalc.bearing(0, 0, 0, 1);
    expect(b).toBeCloseTo(90, 0);
  });

  it("bearing north is 0", () => {
    const b = GeodesicCalc.bearing(0, 0, 1, 0);
    expect(b).toBeCloseTo(0, 0);
  });

  it("destination returns correct position", () => {
    const dest = GeodesicCalc.destination(0, 0, 0, 111195);
    expect(dest.lat).toBeCloseTo(1, 0);
    expect(dest.lon).toBeCloseTo(0, 0);
  });

  it("midpoint between symmetric points", () => {
    const mid = GeodesicCalc.midpoint(10, 0, -10, 0);
    expect(mid.lat).toBeCloseTo(0, 0);
    expect(mid.lon).toBeCloseTo(0, 0);
  });

  it("pathLength sums segment distances", () => {
    const coords = [
      { lat: 0, lon: 0 },
      { lat: 1, lon: 0 },
      { lat: 1, lon: 1 },
    ];
    const len = GeodesicCalc.pathLength(coords);
    expect(len).toBeGreaterThan(200000);
  });

  it("boundingBox produces symmetric bounds", () => {
    const bb = GeodesicCalc.boundingBox(0, 0, 100000);
    expect(bb.maxLat).toBeGreaterThan(0);
    expect(bb.minLat).toBeLessThan(0);
    expect(bb.maxLon).toBeGreaterThan(0);
    expect(bb.minLon).toBeLessThan(0);
  });

  it("polygonArea returns positive for triangle", () => {
    const tri = [
      { lat: 0, lon: 0 },
      { lat: 1, lon: 0 },
      { lat: 0, lon: 1 },
    ];
    const area = GeodesicCalc.polygonArea(tri);
    expect(area).toBeGreaterThan(0);
  });
});
