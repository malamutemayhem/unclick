import { describe, it, expect } from "vitest";
import { KanbanMetrics } from "../kanban-metrics.js";

describe("KanbanMetrics", () => {
  function createBoard(): KanbanMetrics {
    const km = new KanbanMetrics();
    km.addItem({ id: "1", column: "todo", enteredAt: 1000 });
    km.addItem({ id: "2", column: "doing", enteredAt: 2000 });
    km.addItem({ id: "3", column: "doing", enteredAt: 3000 });
    km.addItem({ id: "4", column: "done", enteredAt: 1000, completedAt: 5000 });
    km.addItem({ id: "5", column: "done", enteredAt: 2000, completedAt: 8000 });
    km.setWipLimit("doing", 2);
    return km;
  }

  it("columnCounts counts active items per column", () => {
    const km = createBoard();
    const counts = km.columnCounts();
    expect(counts.get("todo")).toBe(1);
    expect(counts.get("doing")).toBe(2);
    expect(counts.has("done")).toBe(false);
  });

  it("columnMetrics provides per-column stats", () => {
    const km = createBoard();
    const metrics = km.columnMetrics();
    expect(metrics.length).toBe(3);
    const doing = metrics.find((m) => m.column === "doing")!;
    expect(doing.count).toBe(2);
    expect(doing.wipLimit).toBe(2);
    expect(doing.overLimit).toBe(false);
  });

  it("detects WIP violations", () => {
    const km = createBoard();
    km.addItem({ id: "6", column: "doing", enteredAt: 4000 });
    const violations = km.wipViolations();
    expect(violations.length).toBe(1);
    expect(violations[0].column).toBe("doing");
    expect(violations[0].count).toBe(3);
  });

  it("leadTime calculates average lead time", () => {
    const km = createBoard();
    const lt = km.leadTime();
    expect(lt).toBeGreaterThan(0);
  });

  it("throughput counts completed items", () => {
    const km = createBoard();
    const tp = km.throughput(Infinity);
    expect(tp).toBe(2);
  });

  it("activeItems returns incomplete items", () => {
    const km = createBoard();
    expect(km.activeItems().length).toBe(3);
  });

  it("itemCount returns total items", () => {
    const km = createBoard();
    expect(km.itemCount()).toBe(5);
  });

  it("cumulativeFlow counts per column", () => {
    const km = createBoard();
    const flow = km.cumulativeFlow(["todo", "doing", "done"]);
    expect(flow.get("todo")).toBe(1);
    expect(flow.get("doing")).toBe(2);
    expect(flow.get("done")).toBe(2);
  });
});
