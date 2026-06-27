import { describe, it, expect } from "vitest";
import { CoordinateConvert } from "../coordinate-convert.js";

describe("CoordinateConvert", () => {
  it("converts degrees to radians", () => {
    expect(CoordinateConvert.degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(CoordinateConvert.degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });

  it("converts radians to degrees", () => {
    expect(CoordinateConvert.radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it("converts latitude to DMS", () => {
    const dms = CoordinateConvert.latToDMS(40.7128);
    expect(dms).toContain("40");
    expect(dms).toContain("N");
  });

  it("converts longitude to DMS", () => {
    const dms = CoordinateConvert.lngToDMS(-74.006);
    expect(dms).toContain("74");
    expect(dms).toContain("W");
  });

  it("converts DMS to decimal", () => {
    const dec = CoordinateConvert.dmsToDecimal(40, 42, 46.08, "N");
    expect(dec).toBeCloseTo(40.7128, 2);
  });

  it("calculates haversine distance", () => {
    const nyc = { lat: 40.7128, lng: -74.006 };
    const london = { lat: 51.5074, lng: -0.1278 };
    const dist = CoordinateConvert.haversineDistance(nyc, london);
    expect(dist).toBeGreaterThan(5500);
    expect(dist).toBeLessThan(5700);
  });

  it("returns 0 distance for same point", () => {
    const p = { lat: 0, lng: 0 };
    expect(CoordinateConvert.haversineDistance(p, p)).toBe(0);
  });

  it("calculates bearing", () => {
    const bearing = CoordinateConvert.bearing(
      { lat: 0, lng: 0 },
      { lat: 0, lng: 1 },
    );
    expect(bearing).toBeCloseTo(90, 0);
  });

  it("calculates midpoint", () => {
    const mid = CoordinateConvert.midpoint(
      { lat: 0, lng: 0 },
      { lat: 0, lng: 10 },
    );
    expect(mid.lat).toBeCloseTo(0, 1);
    expect(mid.lng).toBeCloseTo(5, 1);
  });

  it("validates coordinates", () => {
    expect(CoordinateConvert.isValidLatLng(40, -74)).toBe(true);
    expect(CoordinateConvert.isValidLatLng(91, 0)).toBe(false);
    expect(CoordinateConvert.isValidLatLng(0, 181)).toBe(false);
  });

  it("gets compass direction", () => {
    expect(CoordinateConvert.compassDirection(0)).toBe("N");
    expect(CoordinateConvert.compassDirection(90)).toBe("E");
    expect(CoordinateConvert.compassDirection(180)).toBe("S");
    expect(CoordinateConvert.compassDirection(270)).toBe("W");
  });

  it("formats coordinates", () => {
    expect(CoordinateConvert.format({ lat: 40.7128, lng: -74.006 })).toContain("40.712800");
  });
});
