import { describe, it, expect } from "vitest";
import {
  createTileMap, addLayer, setTile, getTile, fillRect,
  floodFill, worldToTile, tileToWorld, getVisibleTiles, findTiles,
} from "../tile-map.js";

describe("TileMap", () => {
  it("creates map with dimensions", () => {
    const map = createTileMap(10, 8, 32);
    expect(map.width).toBe(10);
    expect(map.height).toBe(8);
    expect(map.tileSize).toBe(32);
  });

  it("adds layers", () => {
    const map = createTileMap(5, 5, 16);
    const layer = addLayer(map, "ground");
    expect(layer.name).toBe("ground");
    expect(map.layers).toHaveLength(1);
  });

  it("sets and gets tiles", () => {
    const map = createTileMap(5, 5, 16);
    const layer = addLayer(map, "ground");
    setTile(layer, 2, 3, 5);
    expect(getTile(layer, 2, 3)).toBe(5);
  });

  it("returns -1 for out of bounds", () => {
    const map = createTileMap(5, 5, 16);
    const layer = addLayer(map, "ground");
    expect(getTile(layer, -1, 0)).toBe(-1);
    expect(getTile(layer, 10, 0)).toBe(-1);
  });

  it("fills rectangle", () => {
    const map = createTileMap(10, 10, 16);
    const layer = addLayer(map, "ground");
    fillRect(layer, 2, 2, 3, 3, 7);
    expect(getTile(layer, 2, 2)).toBe(7);
    expect(getTile(layer, 4, 4)).toBe(7);
    expect(getTile(layer, 1, 1)).toBe(0);
  });

  it("flood fills connected region", () => {
    const map = createTileMap(5, 5, 16);
    const layer = addLayer(map, "ground");
    fillRect(layer, 0, 0, 5, 5, 1);
    setTile(layer, 2, 0, 0);
    const count = floodFill(layer, 0, 0, 2);
    expect(count).toBeGreaterThan(0);
    expect(getTile(layer, 0, 0)).toBe(2);
  });
});

describe("coordinate conversion", () => {
  it("converts world to tile", () => {
    const map = createTileMap(10, 10, 32);
    expect(worldToTile(map, 50, 70)).toEqual({ x: 1, y: 2 });
  });

  it("converts tile to world", () => {
    const map = createTileMap(10, 10, 32);
    expect(tileToWorld(map, 3, 2)).toEqual({ x: 96, y: 64 });
  });
});

describe("getVisibleTiles", () => {
  it("returns tiles in view", () => {
    const map = createTileMap(100, 100, 16);
    const tiles = getVisibleTiles(map, 0, 0, 48, 32);
    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.every((t) => t.x < 100 && t.y < 100)).toBe(true);
  });
});

describe("findTiles", () => {
  it("finds all tiles of given type", () => {
    const map = createTileMap(5, 5, 16);
    const layer = addLayer(map, "ground");
    setTile(layer, 1, 1, 3);
    setTile(layer, 3, 4, 3);
    const found = findTiles(layer, 3);
    expect(found).toHaveLength(2);
  });
});
