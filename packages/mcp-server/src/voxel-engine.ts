export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Voxel {
  type: number;
  metadata?: Record<string, unknown>;
}

export class VoxelGrid {
  readonly sizeX: number;
  readonly sizeY: number;
  readonly sizeZ: number;
  private data: Map<string, Voxel> = new Map();

  constructor(sizeX: number, sizeY: number, sizeZ: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
  }

  private key(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  inBounds(x: number, y: number, z: number): boolean {
    return x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY && z >= 0 && z < this.sizeZ;
  }

  set(x: number, y: number, z: number, type: number, metadata?: Record<string, unknown>): void {
    if (!this.inBounds(x, y, z)) return;
    if (type === 0) {
      this.data.delete(this.key(x, y, z));
    } else {
      this.data.set(this.key(x, y, z), { type, metadata });
    }
  }

  get(x: number, y: number, z: number): Voxel | null {
    return this.data.get(this.key(x, y, z)) ?? null;
  }

  remove(x: number, y: number, z: number): boolean {
    return this.data.delete(this.key(x, y, z));
  }

  isEmpty(x: number, y: number, z: number): boolean {
    return !this.data.has(this.key(x, y, z));
  }

  count(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }

  fillBox(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, type: number): void {
    for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          this.set(x, y, z, type);
        }
      }
    }
  }

  fillSphere(cx: number, cy: number, cz: number, radius: number, type: number): void {
    const r2 = radius * radius;
    for (let z = Math.floor(cz - radius); z <= Math.ceil(cz + radius); z++) {
      for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y++) {
        for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x++) {
          if ((x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2 <= r2) {
            this.set(x, y, z, type);
          }
        }
      }
    }
  }

  getNeighbors(x: number, y: number, z: number): Vec3[] {
    const dirs: Vec3[] = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 },
    ];
    return dirs
      .map(d => ({ x: x + d.x, y: y + d.y, z: z + d.z }))
      .filter(p => this.inBounds(p.x, p.y, p.z));
  }

  isExposed(x: number, y: number, z: number): boolean {
    if (this.isEmpty(x, y, z)) return false;
    const neighbors = this.getNeighbors(x, y, z);
    return neighbors.length < 6 || neighbors.some(n => this.isEmpty(n.x, n.y, n.z));
  }

  countExposed(): number {
    let count = 0;
    for (const [key] of this.data) {
      const [x, y, z] = key.split(",").map(Number);
      if (this.isExposed(x, y, z)) count++;
    }
    return count;
  }

  getSlice(axis: "x" | "y" | "z", index: number): (Voxel | null)[][] {
    let w: number, h: number;
    if (axis === "x") { w = this.sizeY; h = this.sizeZ; }
    else if (axis === "y") { w = this.sizeX; h = this.sizeZ; }
    else { w = this.sizeX; h = this.sizeY; }

    const slice: (Voxel | null)[][] = [];
    for (let v = 0; v < h; v++) {
      const row: (Voxel | null)[] = [];
      for (let u = 0; u < w; u++) {
        if (axis === "x") row.push(this.get(index, u, v));
        else if (axis === "y") row.push(this.get(u, index, v));
        else row.push(this.get(u, v, index));
      }
      slice.push(row);
    }
    return slice;
  }

  sliceToString(slice: (Voxel | null)[][]): string {
    return slice.map(row =>
      row.map(v => v ? "#" : ".").join("")
    ).join("\n");
  }

  getAllVoxels(): { pos: Vec3; voxel: Voxel }[] {
    const result: { pos: Vec3; voxel: Voxel }[] = [];
    for (const [key, voxel] of this.data) {
      const [x, y, z] = key.split(",").map(Number);
      result.push({ pos: { x, y, z }, voxel });
    }
    return result;
  }
}

export function heightmapToVoxels(heightmap: number[][], type = 1): VoxelGrid {
  const depth = heightmap.length;
  const width = heightmap[0]?.length ?? 0;
  const maxH = Math.max(...heightmap.flat());
  const grid = new VoxelGrid(width, maxH + 1, depth);

  for (let z = 0; z < depth; z++) {
    for (let x = 0; x < width; x++) {
      const h = heightmap[z][x];
      for (let y = 0; y <= h; y++) {
        grid.set(x, y, z, type);
      }
    }
  }

  return grid;
}
