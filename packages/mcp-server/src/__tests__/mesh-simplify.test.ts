import { describe, it, expect } from "vitest";
import { MeshSimplifier } from "../mesh-simplify.js";

describe("MeshSimplifier", () => {
  const vertices = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
  ];
  const faces = [
    { a: 0, b: 1, c: 2 },
    { a: 1, b: 3, c: 2 },
  ];

  it("counts vertices and faces", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.vertexCount()).toBe(4);
    expect(mesh.faceCount()).toBe(2);
  });

  it("calculates edge length", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.edgeLength(0, 1)).toBeCloseTo(1);
    expect(mesh.edgeLength(0, 3)).toBeCloseTo(Math.SQRT2);
  });

  it("computes face normal", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    const n = mesh.faceNormal(faces[0]);
    expect(Math.abs(n.z)).toBeCloseTo(1);
  });

  it("computes face area", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.faceArea(faces[0])).toBeCloseTo(0.5);
  });

  it("computes total area", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.totalArea()).toBeCloseTo(1);
  });

  it("extracts unique edges", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    const edges = mesh.edges();
    expect(edges).toHaveLength(5);
  });

  it("counts edges", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.edgeCount()).toBe(5);
  });

  it("computes Euler characteristic", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    expect(mesh.eulerCharacteristic()).toBe(1);
  });

  it("computes bounding box", () => {
    const mesh = new MeshSimplifier(vertices, faces);
    const bb = mesh.boundingBox();
    expect(bb.min).toEqual({ x: 0, y: 0, z: 0 });
    expect(bb.max).toEqual({ x: 1, y: 1, z: 0 });
  });

  it("simplifies by merging short edges", () => {
    const closeVerts = [
      { x: 0, y: 0, z: 0 },
      { x: 0.01, y: 0, z: 0 },
      { x: 0.5, y: 1, z: 0 },
    ];
    const closeFaces = [{ a: 0, b: 1, c: 2 }];
    const mesh = new MeshSimplifier(closeVerts, closeFaces);
    const simplified = mesh.simplifyByThreshold(0.05);
    expect(simplified.faces.length).toBeLessThanOrEqual(closeFaces.length);
  });
});
