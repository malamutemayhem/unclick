import { describe, it, expect } from "vitest";
import { ToolRegistry } from "../tool-registry.js";

function makeTestTool(name: string, handler?: (p: Record<string, unknown>) => unknown) {
  return {
    name,
    description: `Test tool ${name}`,
    parameters: {
      input: { type: "string" as const, required: true, description: "The input" },
      count: { type: "number" as const, required: false, default: 1 },
    },
    handler: handler ?? ((p: Record<string, unknown>) => `result: ${p.input}`),
  };
}

describe("ToolRegistry", () => {
  it("register and get", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    expect(reg.get("echo")?.name).toBe("echo");
    expect(reg.has("echo")).toBe(true);
    expect(reg.size).toBe(1);
  });

  it("rejects duplicate registration", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    expect(() => reg.register(makeTestTool("echo"))).toThrow("already registered");
  });

  it("unregister removes tool", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    expect(reg.unregister("echo")).toBe(true);
    expect(reg.has("echo")).toBe(false);
    expect(reg.unregister("echo")).toBe(false);
  });

  it("list and names", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("a"));
    reg.register(makeTestTool("b"));
    expect(reg.names()).toEqual(["a", "b"]);
    expect(reg.list().length).toBe(2);
  });

  it("search by name or description", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("weather"));
    reg.register(makeTestTool("calculator"));
    expect(reg.search("weather").length).toBe(1);
    expect(reg.search("test tool").length).toBe(2);
  });

  it("call executes handler", async () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    const result = await reg.call("echo", { input: "hello" });
    expect(result.result).toBe("result: hello");
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("call applies defaults", async () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("test", (p) => p.count));
    const result = await reg.call("test", { input: "x" });
    expect(result.result).toBe(1);
  });

  it("call catches errors", async () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("fail", () => { throw new Error("boom"); }));
    const result = await reg.call("fail", { input: "x" });
    expect(result.error).toBe("boom");
  });

  it("call throws for unknown tool", async () => {
    const reg = new ToolRegistry();
    await expect(reg.call("nope")).rejects.toThrow("Unknown tool");
  });

  it("call throws for missing required param", async () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    await expect(reg.call("echo", {})).rejects.toThrow("Missing required");
  });

  it("toSchema returns schemas", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("echo"));
    const schemas = reg.toSchema();
    expect(schemas[0]).toHaveProperty("name", "echo");
    expect(schemas[0]).toHaveProperty("parameters");
  });

  it("clear removes all", () => {
    const reg = new ToolRegistry();
    reg.register(makeTestTool("a"));
    reg.register(makeTestTool("b"));
    reg.clear();
    expect(reg.size).toBe(0);
  });
});
