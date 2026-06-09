import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function crossVec(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function norm(a: Vec3): number {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

/**
 * 3D convex hull using an incremental algorithm.
 *
 * Returns triangular faces (as vertex index triples), hull vertices, and
 * face count.
 */
export async function convexHull3D(args: Record<string, unknown>) {
  const raw = args.points;
  if (!Array.isArray(raw) || raw.length < 4) {
    throw new Error("points must be an array of at least 4 [x, y, z] triples.");
  }
  if (raw.length > 10000) {
    throw new Error("Maximum 10000 points supported.");
  }

  const pts: Vec3[] = raw.map((p, i) => {
    if (!Array.isArray(p) || p.length < 3) {
      throw new Error(`Point at index ${i} must be [x, y, z].`);
    }
    const x = Number(p[0]);
    const y = Number(p[1]);
    const z = Number(p[2]);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      throw new Error(`Point at index ${i} has non-finite coordinates.`);
    }
    return { x, y, z };
  });

  // Find initial tetrahedron
  // Pick 4 non-coplanar points
  let i0 = 0;
  let i1 = -1;
  for (let i = 1; i < pts.length; i++) {
    if (norm(sub(pts[i], pts[i0])) > 1e-10) {
      i1 = i;
      break;
    }
  }
  if (i1 < 0) throw new Error("All points are coincident.");

  let i2 = -1;
  for (let i = i1 + 1; i < pts.length; i++) {
    const cr = crossVec(sub(pts[i1], pts[i0]), sub(pts[i], pts[i0]));
    if (norm(cr) > 1e-10) {
      i2 = i;
      break;
    }
  }
  if (i2 < 0) throw new Error("All points are collinear.");

  const normalInit = crossVec(sub(pts[i1], pts[i0]), sub(pts[i2], pts[i0]));
  let i3 = -1;
  for (let i = 0; i < pts.length; i++) {
    if (i === i0 || i === i1 || i === i2) continue;
    if (Math.abs(dot(normalInit, sub(pts[i], pts[i0]))) > 1e-10) {
      i3 = i;
      break;
    }
  }
  if (i3 < 0) throw new Error("All points are coplanar.");

  // Faces stored as [a, b, c] with outward-facing normal via right-hand rule
  type Face = [number, number, number];

  // Orient initial tetrahedron so normals point outward
  let faces: Face[] = [
    [i0, i1, i2],
    [i0, i2, i3],
    [i0, i3, i1],
    [i1, i3, i2],
  ];

  // Ensure outward orientation: centroid of tetrahedron
  const cx = (pts[i0].x + pts[i1].x + pts[i2].x + pts[i3].x) / 4;
  const cy = (pts[i0].y + pts[i1].y + pts[i2].y + pts[i3].y) / 4;
  const cz = (pts[i0].z + pts[i1].z + pts[i2].z + pts[i3].z) / 4;
  const centroid: Vec3 = { x: cx, y: cy, z: cz };

  function faceNormal(f: Face): Vec3 {
    return crossVec(sub(pts[f[1]], pts[f[0]]), sub(pts[f[2]], pts[f[0]]));
  }

  // Flip faces that point inward
  for (let fi = 0; fi < faces.length; fi++) {
    const fn = faceNormal(faces[fi]);
    const mid: Vec3 = {
      x: (pts[faces[fi][0]].x + pts[faces[fi][1]].x + pts[faces[fi][2]].x) / 3,
      y: (pts[faces[fi][0]].y + pts[faces[fi][1]].y + pts[faces[fi][2]].y) / 3,
      z: (pts[faces[fi][0]].z + pts[faces[fi][1]].z + pts[faces[fi][2]].z) / 3,
    };
    if (dot(fn, sub(mid, centroid)) < 0) {
      const tmp = faces[fi][1];
      faces[fi][1] = faces[fi][2];
      faces[fi][2] = tmp;
    }
  }

  // Incremental insertion
  const usedInit = new Set([i0, i1, i2, i3]);
  for (let pi = 0; pi < pts.length; pi++) {
    if (usedInit.has(pi)) continue;
    const p = pts[pi];

    // Find visible faces
    const visible: boolean[] = [];
    let anyVisible = false;
    for (const f of faces) {
      const fn = faceNormal(f);
      const v = dot(fn, sub(p, pts[f[0]])) > 1e-10;
      visible.push(v);
      if (v) anyVisible = true;
    }
    if (!anyVisible) continue;

    // Find horizon edges
    const horizon: [number, number][] = [];
    for (let fi = 0; fi < faces.length; fi++) {
      if (!visible[fi]) continue;
      const f = faces[fi];
      for (let ei = 0; ei < 3; ei++) {
        const a = f[ei];
        const b = f[(ei + 1) % 3];
        // Check if the adjacent face sharing edge (b, a) is not visible
        let adjacent = false;
        for (let fj = 0; fj < faces.length; fj++) {
          if (fj === fi || visible[fj]) continue;
          const g = faces[fj];
          for (let ej = 0; ej < 3; ej++) {
            if (g[ej] === b && g[(ej + 1) % 3] === a) {
              adjacent = true;
              break;
            }
          }
          if (adjacent) break;
        }
        if (adjacent) {
          horizon.push([a, b]);
        }
      }
    }

    // Remove visible faces
    const newFaces: Face[] = [];
    for (let fi = 0; fi < faces.length; fi++) {
      if (!visible[fi]) newFaces.push(faces[fi]);
    }

    // Add new faces from horizon edges to new point
    for (const [a, b] of horizon) {
      newFaces.push([a, b, pi]);
    }

    faces = newFaces;
  }

  // Collect unique hull vertex indices
  const hullVertexSet = new Set<number>();
  for (const f of faces) {
    hullVertexSet.add(f[0]);
    hullVertexSet.add(f[1]);
    hullVertexSet.add(f[2]);
  }
  const hullIndices = Array.from(hullVertexSet).sort((a, b) => a - b);
  const hullVertices = hullIndices.map((i) => [pts[i].x, pts[i].y, pts[i].z]);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Each face is a triangle given as three vertex indices",
      "Use the 2D convexhull tool for planar point sets",
    ],
  };

  return stampMeta(
    {
      faces: faces.map((f) => [f[0], f[1], f[2]]),
      face_count: faces.length,
      hull_vertices: hullVertices,
      hull_vertex_count: hullVertices.length,
      input_size: pts.length,
    },
    meta,
  );
}
