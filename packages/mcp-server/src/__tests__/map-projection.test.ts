import { describe, it, expect } from "vitest";
import { MapProjection } from "../map-projection.js";

describe("MapProjection", () => {
  it("mercator projects and inverts", () => {
    const coord = { lat: 45, lon: 90 };
    const projected = MapProjection.mercator(coord);
    const back = MapProjection.inverseMercator(projected);
    expect(back.lat).toBeCloseTo(coord.lat, 1);
    expect(back.lon).toBeCloseTo(coord.lon, 1);
  });

  it("equirectangular projects and inverts", () => {
    const coord = { lat: 30, lon: -60 };
    const projected = MapProjection.equirectangular(coord);
    const back = MapProjection.inverseEquirectangular(projected);
    expect(back.lat).toBeCloseTo(coord.lat, 5);
    expect(back.lon).toBeCloseTo(coord.lon, 5);
  });

  it("mercator equator maps to y=0", () => {
    const result = MapProjection.mercator({ lat: 0, lon: 0 });
    expect(result.y).toBeCloseTo(0);
    expect(result.x).toBeCloseTo(0);
  });

  it("sinusoidal projection works", () => {
    const result = MapProjection.sinusoidal({ lat: 0, lon: 90 });
    expect(result.x).toBeCloseTo(Math.PI / 2, 3);
    expect(result.y).toBeCloseTo(0, 3);
  });

  it("mollweide projection works", () => {
    const result = MapProjection.mollweide({ lat: 0, lon: 0 });
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(0);
  });

  it("stereographic projection works", () => {
    const result = MapProjection.stereographic({ lat: 0, lon: 0 });
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(0);
  });

  it("web mercator projection works", () => {
    const result = MapProjection.webMercator({ lat: 0, lon: 0 }, 256, 0);
    expect(result.x).toBeCloseTo(128, 0);
    expect(result.y).toBeCloseTo(128, 0);
  });

  it("web mercator zoom increases scale", () => {
    const z0 = MapProjection.webMercator({ lat: 45, lon: 90 }, 256, 0);
    const z1 = MapProjection.webMercator({ lat: 45, lon: 90 }, 256, 1);
    expect(z1.x).toBeCloseTo(z0.x * 2, 0);
  });

  it("lists available projections", () => {
    const projs = MapProjection.availableProjections();
    expect(projs).toContain("mercator");
    expect(projs).toContain("mollweide");
    expect(projs.length).toBe(6);
  });
});
