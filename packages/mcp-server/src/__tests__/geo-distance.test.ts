import { describe, it, expect } from "vitest";
import { haversine, bearing, midpoint, isWithinRadius } from "../geo-distance.js";

describe("geo-distance", () => {
  it("calculates distance between cities", () => {
    const dist = haversine(40.7128, -74.0060, 51.5074, -0.1278);
    expect(dist).toBeGreaterThan(5500);
    expect(dist).toBeLessThan(5700);
  });

  it("same point returns 0", () => {
    expect(haversine(0, 0, 0, 0)).toBe(0);
  });

  it("supports miles", () => {
    const km = haversine(0, 0, 1, 0, "km");
    const mi = haversine(0, 0, 1, 0, "mi");
    expect(km).toBeGreaterThan(mi);
  });

  it("bearing between points", () => {
    const b = bearing(0, 0, 0, 1);
    expect(b).toBeCloseTo(90, 0);
  });

  it("midpoint between two points", () => {
    const mid = midpoint(0, 0, 0, 2);
    expect(mid.lat).toBeCloseTo(0, 5);
    expect(mid.lon).toBeCloseTo(1, 5);
  });

  it("isWithinRadius checks correctly", () => {
    expect(isWithinRadius(40.71, -74.01, 40.72, -74.00, 5)).toBe(true);
    expect(isWithinRadius(40.71, -74.01, 51.51, -0.13, 5)).toBe(false);
  });
});
