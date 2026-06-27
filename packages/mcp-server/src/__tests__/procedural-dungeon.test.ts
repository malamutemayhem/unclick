import { describe, it, expect } from "vitest";
import {
  generate, gridToString, findSpawnPoint, findExitPoint,
} from "../procedural-dungeon.js";

describe("generate", () => {
  it("creates grid with correct dimensions", () => {
    const d = generate({ width: 40, height: 30, seed: 1 });
    expect(d.grid).toHaveLength(30);
    expect(d.grid[0]).toHaveLength(40);
  });

  it("places rooms", () => {
    const d = generate({ width: 50, height: 50, seed: 42 });
    expect(d.rooms.length).toBeGreaterThan(0);
  });

  it("creates corridors between rooms", () => {
    const d = generate({ width: 50, height: 50, seed: 42 });
    if (d.rooms.length > 1) {
      expect(d.corridors.length).toBe(d.rooms.length - 1);
    }
  });

  it("is deterministic with same seed", () => {
    const a = generate({ width: 40, height: 30, seed: 99 });
    const b = generate({ width: 40, height: 30, seed: 99 });
    expect(a.grid).toEqual(b.grid);
    expect(a.rooms).toEqual(b.rooms);
  });

  it("differs with different seeds", () => {
    const a = generate({ width: 40, height: 30, seed: 1 });
    const b = generate({ width: 40, height: 30, seed: 2 });
    expect(a.grid).not.toEqual(b.grid);
  });

  it("respects maxRooms", () => {
    const d = generate({ width: 80, height: 80, maxRooms: 3, seed: 10 });
    expect(d.rooms.length).toBeLessThanOrEqual(3);
  });

  it("rooms are within grid bounds", () => {
    const d = generate({ width: 50, height: 50, seed: 7 });
    for (const room of d.rooms) {
      expect(room.x).toBeGreaterThanOrEqual(0);
      expect(room.y).toBeGreaterThanOrEqual(0);
      expect(room.x + room.width).toBeLessThanOrEqual(50);
      expect(room.y + room.height).toBeLessThanOrEqual(50);
    }
  });

  it("room areas are carved as open space", () => {
    const d = generate({ width: 50, height: 50, seed: 42 });
    for (const room of d.rooms) {
      for (let y = room.y; y < room.y + room.height; y++) {
        for (let x = room.x; x < room.x + room.width; x++) {
          expect(d.grid[y][x]).toBe(0);
        }
      }
    }
  });
});

describe("gridToString", () => {
  it("converts grid to string representation", () => {
    const grid = [[1, 0, 1], [0, 0, 0], [1, 0, 1]];
    const s = gridToString(grid);
    expect(s).toBe("#.#\n...\n#.#");
  });
});

describe("findSpawnPoint", () => {
  it("returns center of first room", () => {
    const d = generate({ width: 50, height: 50, seed: 42 });
    const spawn = findSpawnPoint(d);
    const room = d.rooms[0];
    expect(spawn.x).toBe(Math.floor(room.x + room.width / 2));
    expect(spawn.y).toBe(Math.floor(room.y + room.height / 2));
  });
});

describe("findExitPoint", () => {
  it("returns center of last room", () => {
    const d = generate({ width: 50, height: 50, seed: 42 });
    const exit = findExitPoint(d);
    const room = d.rooms[d.rooms.length - 1];
    expect(exit.x).toBe(Math.floor(room.x + room.width / 2));
    expect(exit.y).toBe(Math.floor(room.y + room.height / 2));
  });
});
