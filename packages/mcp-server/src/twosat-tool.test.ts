import { describe, it, expect } from "vitest";
import { twoSat } from "./twosat-tool.js";

describe("twoSat", () => {
  it("solves a satisfiable instance", async () => {
    const r = (await twoSat({
      num_vars: 2,
      clauses: [[1, 2], [-1, 2]],
    })) as any;
    expect(r.satisfiable).toBe(true);
    expect(r.assignment).toHaveLength(2);
    expect(r.assignment[1]).toBe(true);
  });

  it("detects unsatisfiable instance", async () => {
    const r = (await twoSat({
      num_vars: 1,
      clauses: [[1, 1], [-1, -1]],
    })) as any;
    expect(r.satisfiable).toBe(false);
    expect(r.assignment).toBeNull();
  });

  it("handles empty clauses", async () => {
    const r = (await twoSat({
      num_vars: 3,
      clauses: [],
    })) as any;
    expect(r.satisfiable).toBe(true);
  });

  it("solves a larger instance", async () => {
    const r = (await twoSat({
      num_vars: 3,
      clauses: [[1, 2], [-1, 3], [-2, -3], [1, -2]],
    })) as any;
    expect(r.satisfiable).toBe(true);
  });

  it("stamps meta", async () => {
    const r = (await twoSat({
      num_vars: 1,
      clauses: [[1, -1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
