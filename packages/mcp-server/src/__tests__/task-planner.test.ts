import { describe, it, expect } from "vitest";
import { TaskPlanner } from "../task-planner.js";

describe("TaskPlanner", () => {
  it("creates root task", () => {
    const planner = new TaskPlanner("Build feature");
    expect(planner.getTree().description).toBe("Build feature");
    expect(planner.getTree().status).toBe("pending");
  });

  it("adds subtasks", () => {
    const planner = new TaskPlanner("Main");
    const rootId = planner.getTree().id;
    const subId = planner.addSubtask(rootId, "Sub 1");
    expect(planner.getNode(subId)?.description).toBe("Sub 1");
    expect(planner.getTree().subtasks.length).toBe(1);
  });

  it("complete marks done", () => {
    const planner = new TaskPlanner("Task");
    const id = planner.getTree().id;
    planner.complete(id, "success");
    expect(planner.getNode(id)?.status).toBe("done");
    expect(planner.getNode(id)?.result).toBe("success");
  });

  it("fail marks failed", () => {
    const planner = new TaskPlanner("Task");
    planner.fail(planner.getTree().id, "broken");
    expect(planner.getTree().status).toBe("failed");
    expect(planner.getTree().error).toBe("broken");
  });

  it("skip marks skipped", () => {
    const planner = new TaskPlanner("Task");
    planner.skip(planner.getTree().id);
    expect(planner.getTree().status).toBe("skipped");
  });

  it("start marks running", () => {
    const planner = new TaskPlanner("Task");
    planner.start(planner.getTree().id);
    expect(planner.getTree().status).toBe("running");
  });

  it("nextPending finds next leaf task", () => {
    const planner = new TaskPlanner("Main");
    const rootId = planner.getTree().id;
    const s1 = planner.addSubtask(rootId, "Step 1");
    planner.addSubtask(rootId, "Step 2");
    expect(planner.nextPending()?.id).toBe(s1);
    planner.complete(s1);
    expect(planner.nextPending()?.description).toBe("Step 2");
  });

  it("progress reports counts", () => {
    const planner = new TaskPlanner("Main");
    const rootId = planner.getTree().id;
    const s1 = planner.addSubtask(rootId, "A");
    planner.addSubtask(rootId, "B");
    planner.complete(s1);
    const p = planner.progress();
    expect(p.total).toBe(3);
    expect(p.done).toBe(1);
    expect(p.pending).toBe(2);
  });

  it("isComplete when all done", () => {
    const planner = new TaskPlanner("Main");
    const rootId = planner.getTree().id;
    planner.complete(rootId);
    expect(planner.isComplete()).toBe(true);
  });

  it("flatten returns all nodes", () => {
    const planner = new TaskPlanner("Root");
    const rootId = planner.getTree().id;
    planner.addSubtask(rootId, "A");
    planner.addSubtask(rootId, "B");
    expect(planner.flatten().length).toBe(3);
  });

  it("throws on invalid parent", () => {
    const planner = new TaskPlanner("Root");
    expect(() => planner.addSubtask("nope", "X")).toThrow("Parent not found");
  });
});
