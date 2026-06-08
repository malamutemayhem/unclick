import { describe, it, expect } from "vitest";
import { GreatCircle } from "../great-circle.js";

describe("GreatCircle", () => {
  const london = { lat: 51.5074, lon: -0.1278 };
  const paris = { lat: 48.8566, lon: 2.3522 };
  const newYork = { lat: 40.7128, lon: -74.0060 };
  const tokyo = { lat: 35.6762, lon: 139.6503 };

  it("calculates distance between cities", () => {
    const dist = GreatCircle.haversineDistance(london, paris);
    expect(dist).toBeCloseTo(343, -1);
  });

  it("distance to self is zero", () => {
    expect(GreatCircle.haversineDistance(london, london)).toBeCloseTo(0);
  });

  it("calculates bearing", () => {
    const bearing = GreatCircle.bearing(london, paris);
    expect(bearing).toBeGreaterThan(100);
    expect(bearing).toBeLessThan(160);
  });

  it("calculates midpoint", () => {
    const mid = GreatCircle.midpoint(london, paris);
    expect(mid.lat).toBeCloseTo(50.2, 0);
  });

  it("calculates destination point", () => {
    const dest = GreatCircle.destination(london, 90, 100);
    expect(dest.lon).toBeGreaterThan(london.lon);
  });

  it("generates intermediate points", () => {
    const points = GreatCircle.intermediatePoints(london, paris, 5);
    expect(points.length).toBe(6);
    expect(points[0].lat).toBeCloseTo(london.lat, 0);
    expect(points[5].lat).toBeCloseTo(paris.lat, 0);
  });

  it("calculates total distance of route", () => {
    const dist = GreatCircle.totalDistance([london, paris, newYork]);
    expect(dist).toBeGreaterThan(5000);
  });

  it("checks point within radius", () => {
    expect(GreatCircle.isWithinRadius(london, paris, 400)).toBe(true);
    expect(GreatCircle.isWithinRadius(london, paris, 100)).toBe(false);
  });

  it("calculates bounding box", () => {
    const box = GreatCircle.boundingBox(london, 100);
    expect(box.minLat).toBeLessThan(london.lat);
    expect(box.maxLat).toBeGreaterThan(london.lat);
    expect(box.minLon).toBeLessThan(london.lon);
    expect(box.maxLon).toBeGreaterThan(london.lon);
  });

  it("long distance calculation", () => {
    const dist = GreatCircle.haversineDistance(london, tokyo);
    expect(dist).toBeGreaterThan(9000);
    expect(dist).toBeLessThan(10000);
  });
});
