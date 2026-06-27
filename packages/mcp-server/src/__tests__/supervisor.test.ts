import { describe, it, expect } from "vitest";
import { Supervisor } from "../supervisor.js";

describe("Supervisor", () => {
  it("register and get agent", () => {
    const sup = new Supervisor();
    sup.register({ name: "search", description: "Search agent", capabilities: ["web"], handler: () => "found" });
    expect(sup.getAgent("search")?.name).toBe("search");
    expect(sup.agentCount).toBe(1);
  });

  it("unregister removes agent", () => {
    const sup = new Supervisor();
    sup.register({ name: "a", description: "", capabilities: [], handler: () => {} });
    expect(sup.unregister("a")).toBe(true);
    expect(sup.agentCount).toBe(0);
  });

  it("findAgent by capability", () => {
    const sup = new Supervisor();
    sup.register({ name: "search", description: "", capabilities: ["web", "search"], handler: () => {} });
    sup.register({ name: "calc", description: "", capabilities: ["math"], handler: () => {} });
    expect(sup.findAgent("math")?.name).toBe("calc");
    expect(sup.findAgent("unknown")).toBeUndefined();
  });

  it("findAgents returns all matching", () => {
    const sup = new Supervisor();
    sup.register({ name: "a", description: "", capabilities: ["x"], handler: () => {} });
    sup.register({ name: "b", description: "", capabilities: ["x", "y"], handler: () => {} });
    expect(sup.findAgents("x").length).toBe(2);
  });

  it("delegate executes handler", async () => {
    const sup = new Supervisor();
    sup.register({ name: "echo", description: "", capabilities: [], handler: (task) => `done: ${task}` });
    const result = await sup.delegate("echo", "test task");
    expect(result.result).toBe("done: test task");
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("delegate catches errors", async () => {
    const sup = new Supervisor();
    sup.register({ name: "fail", description: "", capabilities: [], handler: () => { throw new Error("boom"); } });
    const result = await sup.delegate("fail", "task");
    expect(result.error).toBe("boom");
  });

  it("delegate throws for unknown agent", async () => {
    const sup = new Supervisor();
    await expect(sup.delegate("nope", "task")).rejects.toThrow("Unknown agent");
  });

  it("delegateByCapability routes correctly", async () => {
    const sup = new Supervisor();
    sup.register({ name: "math", description: "", capabilities: ["calc"], handler: () => 42 });
    const result = await sup.delegateByCapability("calc", "2+2");
    expect(result.result).toBe(42);
  });

  it("tracks delegation log", async () => {
    const sup = new Supervisor();
    sup.register({ name: "a", description: "", capabilities: [], handler: () => "ok" });
    await sup.delegate("a", "t1");
    await sup.delegate("a", "t2");
    expect(sup.getLog().length).toBe(2);
  });

  it("allCapabilities returns unique list", () => {
    const sup = new Supervisor();
    sup.register({ name: "a", description: "", capabilities: ["x", "y"], handler: () => {} });
    sup.register({ name: "b", description: "", capabilities: ["y", "z"], handler: () => {} });
    expect(sup.allCapabilities()).toEqual(["x", "y", "z"]);
  });

  it("clear resets everything", () => {
    const sup = new Supervisor();
    sup.register({ name: "a", description: "", capabilities: [], handler: () => {} });
    sup.clear();
    expect(sup.agentCount).toBe(0);
  });
});
