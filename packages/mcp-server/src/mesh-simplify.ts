export interface Vertex {
  x: number;
  y: number;
  z: number;
}

export interface Face {
  a: number;
  b: number;
  c: number;
}

export class MeshSimplifier {
  private vertices: Vertex[];
  private faces: Face[];

  constructor(vertices: Vertex[], faces: Face[]) {
    this.vertices = vertices.map((v) => ({ ...v }));
    this.faces = faces.map((f) => ({ ...f }));
  }

  edgeLength(v1: number, v2: number): number {
    const a = this.vertices[v1];
    const b = this.vertices[v2];
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
  }

  faceNormal(face: Face): Vertex {
    const a = this.vertices[face.a];
    const b = this.vertices[face.b];
    const c = this.vertices[face.c];
    const u = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const v = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const nx = u.y * v.z - u.z * v.y;
    const ny = u.z * v.x - u.x * v.z;
    const nz = u.x * v.y - u.y * v.x;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (len < 1e-10) return { x: 0, y: 0, z: 0 };
    return { x: nx / len, y: ny / len, z: nz / len };
  }

  faceArea(face: Face): number {
    const a = this.vertices[face.a];
    const b = this.vertices[face.b];
    const c = this.vertices[face.c];
    const u = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const v = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const cx = u.y * v.z - u.z * v.y;
    const cy = u.z * v.x - u.x * v.z;
    const cz = u.x * v.y - u.y * v.x;
    return Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
  }

  totalArea(): number {
    return this.faces.reduce((sum, f) => sum + this.faceArea(f), 0);
  }

  edges(): Array<[number, number]> {
    const edgeSet = new Set<string>();
    const result: Array<[number, number]> = [];
    for (const f of this.faces) {
      const pairs: Array<[number, number]> = [[f.a, f.b], [f.b, f.c], [f.c, f.a]];
      for (const [a, b] of pairs) {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          result.push([Math.min(a, b), Math.max(a, b)]);
        }
      }
    }
    return result;
  }

  simplifyByThreshold(minEdgeLength: number): { vertices: Vertex[]; faces: Face[] } {
    const verts = this.vertices.map((v) => ({ ...v }));
    let currentFaces = this.faces.map((f) => ({ ...f }));
    const merged = new Map<number, number>();

    const resolve = (idx: number): number => {
      while (merged.has(idx)) idx = merged.get(idx)!;
      return idx;
    };

    const allEdges = this.edges();
    const shortEdges = allEdges
      .filter(([a, b]) => this.edgeLength(a, b) < minEdgeLength)
      .sort((e1, e2) => this.edgeLength(e1[0], e1[1]) - this.edgeLength(e2[0], e2[1]));

    for (const [a, b] of shortEdges) {
      const ra = resolve(a);
      const rb = resolve(b);
      if (ra === rb) continue;

      verts[ra] = {
        x: (verts[ra].x + verts[rb].x) / 2,
        y: (verts[ra].y + verts[rb].y) / 2,
        z: (verts[ra].z + verts[rb].z) / 2,
      };
      merged.set(rb, ra);
    }

    currentFaces = currentFaces
      .map((f) => ({ a: resolve(f.a), b: resolve(f.b), c: resolve(f.c) }))
      .filter((f) => f.a !== f.b && f.b !== f.c && f.c !== f.a);

    return { vertices: verts, faces: currentFaces };
  }

  vertexCount(): number {
    return this.vertices.length;
  }

  faceCount(): number {
    return this.faces.length;
  }

  edgeCount(): number {
    return this.edges().length;
  }

  eulerCharacteristic(): number {
    return this.vertexCount() - this.edgeCount() + this.faceCount();
  }

  boundingBox(): { min: Vertex; max: Vertex } {
    const min = { x: Infinity, y: Infinity, z: Infinity };
    const max = { x: -Infinity, y: -Infinity, z: -Infinity };
    for (const v of this.vertices) {
      min.x = Math.min(min.x, v.x);
      min.y = Math.min(min.y, v.y);
      min.z = Math.min(min.z, v.z);
      max.x = Math.max(max.x, v.x);
      max.y = Math.max(max.y, v.y);
      max.z = Math.max(max.z, v.z);
    }
    return { min, max };
  }
}
