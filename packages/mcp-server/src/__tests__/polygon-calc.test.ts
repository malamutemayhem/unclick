import { describe, it, expect } from "vitest";
import { PolygonCalc } from "../polygon-calc.js";

describe("PolygonCalc", () => {
  const square = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];

  it("area calculates using shoelace formula", () => {
    expect(PolygonCalc.area(square)).toBe(1);
  });

  it("area returns 0 for fewer than 3 vertices", () => {
    expect(PolygonCalc.area([{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBe(0);
  });

  it("perimeter calculates total edge length", () => {
    expect(PolygonCalc.perimeter(square)).toBe(4);
  });

  it("centroid finds center point", () => {
    const c = PolygonCalc.centroid(square);
    expect(c.x).toBe(0.5);
    expect(c.y).toBe(0.5);
  });

  it("isConvex detects convex polygon", () => {
    expect(PolygonCalc.isConvex(square)).toBe(true);
  });

  it("isConvex detects concave polygon", () => {
    const concave = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0.5 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];
    expect(PolygonCalc.isConvex(concave)).toBe(false);
  });

  it("containsPoint detects interior point", () => {
    expect(PolygonCalc.containsPoint(square, { x: 0.5, y: 0.5 })).toBe(true);
  });

  it("containsPoint detects exterior point", () => {
    expect(PolygonCalc.containsPoint(square, { x: 2, y: 2 })).toBe(false);
  });

  it("regularPolygon generates correct number of vertices", () => {
    const hex = PolygonCalc.regularPolygon(6, 1);
    expect(hex.length).toBe(6);
  });

  it("regularArea calculates area from side count and length", () => {
    const area = PolygonCalc.regularArea(4, 1);
    expect(area).toBe(1);
  });

  it("regularPerimeter calculates perimeter", () => {
    expect(PolygonCalc.regularPerimeter(4, 2)).toBe(8);
  });

  it("interiorAngle calculates correct angle", () => {
    expect(PolygonCalc.interiorAngle(4)).toBe(90);
    expect(PolygonCalc.interiorAngle(6)).toBe(120);
  });

  it("diagonals counts diagonals", () => {
    expect(PolygonCalc.diagonals(4)).toBe(2);
    expect(PolygonCalc.diagonals(5)).toBe(5);
    expect(PolygonCalc.diagonals(6)).toBe(9);
  });
});
