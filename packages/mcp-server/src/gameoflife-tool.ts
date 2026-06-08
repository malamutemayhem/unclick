import { stampMeta } from "./connector-meta.js";

export async function gameOfLifeStep(args: Record<string, unknown>) {
  const width = Math.min(Number(args.width) || 10, 50);
  const height = Math.min(Number(args.height) || 10, 50);
  const steps = Math.min(Number(args.steps) || 1, 20);

  let grid: boolean[][] = [];
  if (typeof args.grid === "string") {
    grid = String(args.grid).split("\n").map(row => [...row].map(c => c === "1" || c === "#"));
  } else {
    for (let y = 0; y < height; y++) {
      grid.push(Array.from({ length: width }, () => Math.random() < 0.3));
    }
  }

  const h = grid.length;
  const w = grid[0]?.length || width;

  function step(g: boolean[][]): boolean[][] {
    return g.map((row, y) =>
      row.map((cell, x) => {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w && g[ny][nx]) n++;
          }
        }
        return cell ? (n === 2 || n === 3) : n === 3;
      }),
    );
  }

  let current = grid;
  for (let i = 0; i < steps; i++) current = step(current);

  const display = current.map(row => row.map(c => c ? "#" : ".").join("")).join("\n");
  const alive = current.flat().filter(Boolean).length;

  return stampMeta(
    { grid: display, width: w, height: h, steps_run: steps, alive_cells: alive },
    { source: "local-simulation", fetched_at: new Date().toISOString(), next_steps: ["Pass the grid output back as input to continue the simulation.", "Use '#' for alive and '.' for dead cells in the grid string."] },
  );
}
