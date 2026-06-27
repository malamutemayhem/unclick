import { describe, it, expect } from "vitest";
import { GanttChart } from "../gantt-chart.js";

describe("GanttChart", () => {
  function buildChart(): GanttChart {
    const chart = new GanttChart();
    chart.addTask({ id: "design", name: "Design", start: 0, duration: 5, dependencies: [], progress: 1, assignee: "Alice" });
    chart.addTask({ id: "dev", name: "Development", start: 5, duration: 10, dependencies: ["design"], progress: 0.5, assignee: "Bob" });
    chart.addTask({ id: "test", name: "Testing", start: 15, duration: 5, dependencies: ["dev"], progress: 0, assignee: "Alice" });
    return chart;
  }

  it("adds and counts tasks", () => {
    const chart = buildChart();
    expect(chart.taskCount()).toBe(3);
  });

  it("calculates project duration", () => {
    const chart = buildChart();
    expect(chart.projectStart()).toBe(0);
    expect(chart.projectEnd()).toBe(20);
    expect(chart.projectDuration()).toBe(20);
  });

  it("calculates task end time", () => {
    const chart = buildChart();
    expect(chart.endTime("design")).toBe(5);
    expect(chart.endTime("dev")).toBe(15);
  });

  it("calculates overall progress weighted by duration", () => {
    const chart = buildChart();
    const progress = chart.overallProgress();
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(1);
  });

  it("finds critical path", () => {
    const chart = buildChart();
    const path = chart.criticalPath();
    expect(path).toContain("design");
    expect(path).toContain("dev");
    expect(path).toContain("test");
  });

  it("validates dependencies", () => {
    const chart = new GanttChart();
    chart.addTask({ id: "a", name: "A", start: 0, duration: 5, dependencies: ["missing"], progress: 0 });
    expect(chart.validate().length).toBe(1);
  });

  it("filters tasks by assignee", () => {
    const chart = buildChart();
    expect(chart.tasksByAssignee("Alice").length).toBe(2);
    expect(chart.tasksByAssignee("Bob").length).toBe(1);
  });

  it("finds delayed tasks", () => {
    const chart = buildChart();
    const delayed = chart.delayedTasks(17);
    expect(delayed.length).toBeGreaterThanOrEqual(1);
  });

  it("removes tasks", () => {
    const chart = buildChart();
    expect(chart.removeTask("test")).toBe(true);
    expect(chart.taskCount()).toBe(2);
  });

  it("gets task by id", () => {
    const chart = buildChart();
    expect(chart.getTask("dev")!.name).toBe("Development");
  });
});
