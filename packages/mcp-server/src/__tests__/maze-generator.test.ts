import { describe, it, expect } from "vitest";
import { MazeGenerator } from "../maze-generator.js";

describe("MazeGenerator", () => {
  it("generates a DFS maze", () => {
    const gen = new MazeGenerator(5, 5);
    const maze = gen.generateDFS();
    expect(maze.length).toBe(5);
    expect(maze[0].length).toBe(5);
  });

  it("generates a Kruskal maze", () => {
    const gen = new MazeGenerator(5, 5, 123);
    const maze = gen.generateKruskal();
    expect(maze.length).toBe(5);
    expect(maze[0].length).toBe(5);
  });

  it("DFS maze has all cells visited (connected)", () => {
    const gen = new MazeGenerator(4, 4);
    const maze = gen.generateDFS();
    let openWalls = 0;
    for (const row of maze) {
      for (const cell of row) {
        if (!cell.walls.north) openWalls++;
        if (!cell.walls.south) openWalls++;
        if (!cell.walls.east) openWalls++;
        if (!cell.walls.west) openWalls++;
      }
    }
    expect(openWalls).toBeGreaterThan(0);
  });

  it("produces deterministic output with same seed", () => {
    const gen1 = new MazeGenerator(4, 4, 42);
    const gen2 = new MazeGenerator(4, 4, 42);
    const maze1 = gen1.generateDFS();
    const maze2 = gen2.generateDFS();
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        expect(maze1[y][x].walls).toEqual(maze2[y][x].walls);
      }
    }
  });

  it("renders ASCII representation", () => {
    const gen = new MazeGenerator(3, 3);
    const maze = gen.generateDFS();
    const ascii = gen.toAscii(maze);
    expect(ascii).toContain("+");
    expect(ascii.split("\n").length).toBe(7); // 3*2 + 1
  });

  it("reports dimensions", () => {
    const gen = new MazeGenerator(10, 8);
    expect(gen.dimensions()).toEqual({ width: 10, height: 8 });
  });

  it("different seeds produce different mazes", () => {
    const gen1 = new MazeGenerator(5, 5, 1);
    const gen2 = new MazeGenerator(5, 5, 999);
    const m1 = gen1.generateDFS();
    const m2 = gen2.generateDFS();
    let differences = 0;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (JSON.stringify(m1[y][x].walls) !== JSON.stringify(m2[y][x].walls)) {
          differences++;
        }
      }
    }
    expect(differences).toBeGreaterThan(0);
  });

  it("generates 1x1 maze", () => {
    const gen = new MazeGenerator(1, 1);
    const maze = gen.generateDFS();
    expect(maze.length).toBe(1);
    expect(maze[0].length).toBe(1);
  });
});
