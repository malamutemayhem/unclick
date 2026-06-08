import { describe, it, expect } from "vitest";
import { gameOfLifeStep } from "./gameoflife-tool.js";

describe("gameoflife-tool", () => {
  it("gameOfLifeStep runs simulation from grid string", async () => {
    const r = await gameOfLifeStep({ grid: "...\n.#.\n...", steps: 1 }) as Record<string, unknown>;
    expect(r.grid).toBeDefined();
    expect(typeof r.grid).toBe("string");
    expect(r.alive_cells).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("gameOfLifeStep generates random grid when no input", async () => {
    const r = await gameOfLifeStep({ width: 5, height: 5, steps: 2 }) as Record<string, unknown>;
    expect(r.grid).toBeDefined();
    expect(r.width).toBe(5);
    expect(r.height).toBe(5);
    expect(r.steps_run).toBe(2);
  });
});
