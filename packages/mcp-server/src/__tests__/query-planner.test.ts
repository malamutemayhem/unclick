import { describe, it, expect } from "vitest";
import { QueryPlanner } from "../query-planner.js";

describe("QueryPlanner", () => {
  it("plans full table scan", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "users", rowCount: 1000, avgRowSize: 100, indexes: [] });
    const plan = planner.planScan("users");
    expect(plan.type).toBe("scan");
    expect(plan.scanType).toBe("full");
    expect(plan.estimatedRows).toBe(1000);
  });

  it("plans index scan when filter is indexed", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "users", rowCount: 10000, avgRowSize: 100, indexes: ["email"] });
    const plan = planner.planScan("users", { column: "email", indexed: true });
    expect(plan.scanType).toBe("index");
    expect(plan.estimatedCost).toBeLessThan(10000);
  });

  it("plans filter on non-indexed column", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "users", rowCount: 1000, avgRowSize: 100, indexes: [] });
    const plan = planner.planScan("users", { column: "name", indexed: false });
    expect(plan.type).toBe("filter");
    expect(plan.children.length).toBe(1);
  });

  it("plans nested-loop join for small tables", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "a", rowCount: 50, avgRowSize: 50, indexes: [] });
    planner.registerTable({ name: "b", rowCount: 50, avgRowSize: 50, indexes: [] });
    const left = planner.planScan("a");
    const right = planner.planScan("b");
    const join = planner.planJoin(left, right);
    expect(join.joinType).toBe("nested-loop");
  });

  it("plans merge join for large tables", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "orders", rowCount: 10000, avgRowSize: 100, indexes: [] });
    planner.registerTable({ name: "items", rowCount: 50000, avgRowSize: 50, indexes: [] });
    const left = planner.planScan("orders");
    const right = planner.planScan("items");
    const join = planner.planJoin(left, right);
    expect(join.joinType).toBe("merge");
  });

  it("plans sort", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "t", rowCount: 100, avgRowSize: 50, indexes: [] });
    const scan = planner.planScan("t");
    const sorted = planner.planSort(scan, "name");
    expect(sorted.type).toBe("sort");
    expect(sorted.estimatedCost).toBeGreaterThan(scan.estimatedCost);
  });

  it("plans limit", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "t", rowCount: 1000, avgRowSize: 50, indexes: [] });
    const scan = planner.planScan("t");
    const limited = planner.planLimit(scan, 10);
    expect(limited.estimatedRows).toBe(10);
  });

  it("plans projection", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "t", rowCount: 100, avgRowSize: 50, indexes: [] });
    const scan = planner.planScan("t");
    const projected = planner.planProject(scan, ["id", "name"]);
    expect(projected.type).toBe("project");
  });

  it("explains plan as string", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "users", rowCount: 100, avgRowSize: 50, indexes: [] });
    const plan = planner.planScan("users");
    const explanation = planner.explain(plan);
    expect(explanation).toContain("scan");
    expect(explanation).toContain("users");
  });

  it("chooses best join strategy", () => {
    const planner = new QueryPlanner();
    planner.registerTable({ name: "a", rowCount: 50, avgRowSize: 50, indexes: [] });
    planner.registerTable({ name: "b", rowCount: 50, avgRowSize: 50, indexes: [] });
    const left = planner.planScan("a");
    const right = planner.planScan("b");
    const best = planner.chooseBestJoin(left, right);
    expect(best.type).toBe("join");
  });
});
