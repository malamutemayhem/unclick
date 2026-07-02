import { describe, it, expect } from "vitest";
import { convexHull3D } from "./convexhull3d-tool.js";

describe("convexHull3D", () => {
  it("computes hull of a tetrahedron (4 points, 4 faces)", async () => {
    const r = (await convexHull3D({
      points: [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    })) as any;
    expect(r.face_count).toBe(4);
    expect(r.hull_vertex_count).toBe(4);
  });

  it("computes hull of a cube (8 points, 12 triangular faces)", async () => {
    const r = (await convexHull3D({
      points: [
        [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
      ],
    })) as any;
    // A cube has 6 quad faces = 12 triangles
    expect(r.face_count).toBe(12);
    expect(r.hull_vertex_count).toBe(8);
  });

  it("ignores interior points", async () => {
    const r = (await convexHull3D({
      points: [
        [0, 0, 0], [2, 0, 0], [0, 2, 0], [0, 0, 2],
        [0.5, 0.5, 0.5], // interior
      ],
    })) as any;
    expect(r.hull_vertex_count).toBe(4);
    expect(r.input_size).toBe(5);
  });

  it("rejects fewer than 4 points", async () => {
    await expect(
      convexHull3D({ points: [[0, 0, 0], [1, 0, 0], [0, 1, 0]] }),
    ).rejects.toThrow("at least 4");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await convexHull3D({
      points: [
        [0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1],
      ],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
