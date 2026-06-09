import { describe, it, expect } from "vitest";
import { VoxelGrid, heightmapToVoxels } from "../voxel-engine.js";

describe("VoxelGrid", () => {
  it("creates grid with correct dimensions", () => {
    const g = new VoxelGrid(10, 20, 30);
    expect(g.sizeX).toBe(10);
    expect(g.sizeY).toBe(20);
    expect(g.sizeZ).toBe(30);
  });

  it("sets and gets voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.set(5, 5, 5, 1);
    const v = g.get(5, 5, 5);
    expect(v).not.toBeNull();
    expect(v!.type).toBe(1);
  });

  it("returns null for empty cells", () => {
    const g = new VoxelGrid(10, 10, 10);
    expect(g.get(0, 0, 0)).toBeNull();
  });

  it("ignores out-of-bounds set", () => {
    const g = new VoxelGrid(5, 5, 5);
    g.set(10, 10, 10, 1);
    expect(g.count()).toBe(0);
  });

  it("removes voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.set(1, 1, 1, 1);
    expect(g.remove(1, 1, 1)).toBe(true);
    expect(g.isEmpty(1, 1, 1)).toBe(true);
  });

  it("setting type 0 removes voxel", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.set(1, 1, 1, 1);
    g.set(1, 1, 1, 0);
    expect(g.isEmpty(1, 1, 1)).toBe(true);
  });

  it("counts voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.set(0, 0, 0, 1);
    g.set(1, 1, 1, 2);
    g.set(2, 2, 2, 3);
    expect(g.count()).toBe(3);
  });

  it("clears all voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.set(0, 0, 0, 1);
    g.set(1, 1, 1, 1);
    g.clear();
    expect(g.count()).toBe(0);
  });

  it("fills a box", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.fillBox(0, 0, 0, 2, 2, 2, 1);
    expect(g.count()).toBe(27);
  });

  it("fills a sphere", () => {
    const g = new VoxelGrid(20, 20, 20);
    g.fillSphere(10, 10, 10, 3, 1);
    expect(g.count()).toBeGreaterThan(50);
    expect(g.count()).toBeLessThan(200);
  });

  it("gets neighbors", () => {
    const g = new VoxelGrid(10, 10, 10);
    const n = g.getNeighbors(5, 5, 5);
    expect(n.length).toBe(6);
  });

  it("corner has fewer neighbors", () => {
    const g = new VoxelGrid(10, 10, 10);
    const n = g.getNeighbors(0, 0, 0);
    expect(n.length).toBe(3);
  });

  it("detects exposed voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.fillBox(3, 3, 3, 5, 5, 5, 1);
    expect(g.isExposed(4, 4, 4)).toBe(false);
    expect(g.isExposed(3, 3, 3)).toBe(true);
  });

  it("counts exposed voxels", () => {
    const g = new VoxelGrid(10, 10, 10);
    g.fillBox(0, 0, 0, 2, 2, 2, 1);
    const exposed = g.countExposed();
    expect(exposed).toBeLessThan(27);
    expect(exposed).toBeGreaterThan(0);
  });

  it("gets slice", () => {
    const g = new VoxelGrid(5, 5, 5);
    g.set(2, 2, 2, 1);
    const slice = g.getSlice("z", 2);
    expect(slice.length).toBe(5);
    expect(slice[0].length).toBe(5);
    expect(slice[2][2]).not.toBeNull();
  });

  it("converts slice to string", () => {
    const g = new VoxelGrid(3, 3, 3);
    g.set(1, 1, 1, 1);
    const slice = g.getSlice("z", 1);
    const str = g.sliceToString(slice);
    expect(str).toContain("#");
    expect(str).toContain(".");
  });

  it("stores metadata", () => {
    const g = new VoxelGrid(5, 5, 5);
    g.set(0, 0, 0, 1, { material: "stone" });
    const v = g.get(0, 0, 0);
    expect(v!.metadata).toEqual({ material: "stone" });
  });

  it("gets all voxels", () => {
    const g = new VoxelGrid(5, 5, 5);
    g.set(0, 0, 0, 1);
    g.set(1, 1, 1, 2);
    const all = g.getAllVoxels();
    expect(all.length).toBe(2);
  });

  it("checks bounds", () => {
    const g = new VoxelGrid(5, 5, 5);
    expect(g.inBounds(0, 0, 0)).toBe(true);
    expect(g.inBounds(4, 4, 4)).toBe(true);
    expect(g.inBounds(5, 0, 0)).toBe(false);
    expect(g.inBounds(-1, 0, 0)).toBe(false);
  });
});

describe("heightmapToVoxels", () => {
  it("creates voxels from heightmap", () => {
    const hm = [[1, 2], [0, 3]];
    const g = heightmapToVoxels(hm);
    expect(g.count()).toBeGreaterThan(0);
    expect(g.get(1, 2, 0)).not.toBeNull();
    expect(g.get(0, 0, 1)).not.toBeNull();
  });
});
