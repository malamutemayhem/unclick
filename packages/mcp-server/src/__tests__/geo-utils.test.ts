import { describe, it, expect } from "vitest";
import { haversine, bearing, midpoint, boundingBox, isInBoundingBox, toGeoJSON } from "../geo-utils.js";

describe("geo-utils", () => {
  const sydney = { lat: -33.8688, lng: 151.2093 };
  const melbourne = { lat: -37.8136, lng: 144.9631 };
  const london = { lat: 51.5074, lng: -0.1278 };

  describe("haversine", () => {
    it("calculates distance between Sydney and Melbourne", () => {
      const dist = haversine(sydney, melbourne);
      expect(dist).toBeGreaterThan(700);
      expect(dist).toBeLessThan(900);
    });
    it("zero for same point", () => {
      expect(haversine(sydney, sydney)).toBeCloseTo(0);
    });
  });
  describe("bearing", () => {
    it("returns bearing between points", () => {
      const b = bearing(sydney, melbourne);
      expect(b).toBeGreaterThan(200);
      expect(b).toBeLessThan(260);
    });
  });
  describe("midpoint", () => {
    it("returns point between two points", () => {
      const mid = midpoint(sydney, melbourne);
      expect(mid.lat).toBeGreaterThan(melbourne.lat);
      expect(mid.lat).toBeLessThan(sydney.lat);
    });
  });
  describe("boundingBox", () => {
    it("creates box around point", () => {
      const box = boundingBox(sydney, 10);
      expect(box.ne.lat).toBeGreaterThan(sydney.lat);
      expect(box.sw.lat).toBeLessThan(sydney.lat);
    });
  });
  describe("isInBoundingBox", () => {
    it("point inside", () => {
      expect(isInBoundingBox({ lat: 0, lng: 0 }, { lat: 1, lng: 1 }, { lat: -1, lng: -1 })).toBe(true);
    });
    it("point outside", () => {
      expect(isInBoundingBox({ lat: 5, lng: 5 }, { lat: 1, lng: 1 }, { lat: -1, lng: -1 })).toBe(false);
    });
  });
  describe("toGeoJSON", () => {
    it("creates LineString", () => {
      const geo = toGeoJSON([sydney, melbourne]);
      expect(geo.type).toBe("LineString");
      expect(geo.coordinates).toHaveLength(2);
    });
  });
});
