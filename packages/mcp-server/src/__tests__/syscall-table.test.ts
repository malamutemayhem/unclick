import { describe, it, expect } from "vitest";
import { SyscallTable, createDefaultTable, createContext } from "../syscall-table.js";

describe("SyscallTable", () => {
  it("registers and invokes syscall", () => {
    const table = new SyscallTable();
    table.register({
      name: "add",
      num: 10,
      handler: (args) => (args[0] as number) + (args[1] as number),
    });
    const ctx = createContext(1);
    const result = table.invoke(10, [3, 4], ctx);
    expect(result.ok).toBe(true);
    expect(result.result).toBe(7);
  });

  it("returns error for unknown syscall", () => {
    const table = new SyscallTable();
    const ctx = createContext(1);
    const result = table.invoke(999, [], ctx);
    expect(result.ok).toBe(false);
  });

  it("checks permissions", () => {
    const table = new SyscallTable();
    table.register({
      name: "secure",
      num: 1,
      handler: () => "secret",
      requiredPermission: "admin",
    });
    const noPerms = createContext(1, 0, []);
    expect(table.invoke(1, [], noPerms).ok).toBe(false);

    const admin = createContext(1, 0, ["admin"]);
    expect(table.invoke(1, [], admin).ok).toBe(true);
  });

  it("invokeByName works", () => {
    const table = new SyscallTable();
    table.register({ name: "echo", num: 5, handler: (args) => args[0] });
    const ctx = createContext(1);
    const result = table.invokeByName("echo", ["hello"], ctx);
    expect(result.ok).toBe(true);
    expect(result.result).toBe("hello");
  });

  it("invokeByName returns error for unknown", () => {
    const table = new SyscallTable();
    const ctx = createContext(1);
    expect(table.invokeByName("missing", [], ctx).ok).toBe(false);
  });

  it("unregister removes syscall", () => {
    const table = new SyscallTable();
    table.register({ name: "temp", num: 99, handler: () => null });
    expect(table.unregister(99)).toBe(true);
    expect(table.get(99)).toBeUndefined();
    expect(table.unregister(99)).toBe(false);
  });

  it("list returns sorted syscalls", () => {
    const table = new SyscallTable();
    table.register({ name: "b", num: 2, handler: () => {} });
    table.register({ name: "a", num: 1, handler: () => {} });
    const list = table.list();
    expect(list[0].num).toBe(1);
    expect(list[1].num).toBe(2);
  });

  it("count tracks registered syscalls", () => {
    const table = new SyscallTable();
    expect(table.count).toBe(0);
    table.register({ name: "x", num: 1, handler: () => {} });
    expect(table.count).toBe(1);
  });

  it("getByName retrieves definition", () => {
    const table = new SyscallTable();
    table.register({ name: "test", num: 42, handler: () => {} });
    const def = table.getByName("test");
    expect(def).toBeDefined();
    expect(def!.num).toBe(42);
  });

  it("logs calls", () => {
    const table = new SyscallTable();
    table.register({ name: "x", num: 1, handler: () => "done" });
    const ctx = createContext(5);
    table.invoke(1, [], ctx);
    const log = table.getLog();
    expect(log).toHaveLength(1);
    expect(log[0].pid).toBe(5);
    table.clearLog();
    expect(table.getLog()).toHaveLength(0);
  });

  it("handles handler errors", () => {
    const table = new SyscallTable();
    table.register({
      name: "bad",
      num: 1,
      handler: () => { throw new Error("boom"); },
    });
    const ctx = createContext(1);
    const result = table.invoke(1, [], ctx);
    expect(result.ok).toBe(false);
    expect(result.result).toBe("boom");
  });
});

describe("createDefaultTable", () => {
  it("has read, write, getpid, getuid, exit", () => {
    const table = createDefaultTable();
    expect(table.getByName("read")).toBeDefined();
    expect(table.getByName("write")).toBeDefined();
    expect(table.getByName("getpid")).toBeDefined();
    expect(table.getByName("getuid")).toBeDefined();
    expect(table.getByName("exit")).toBeDefined();
  });

  it("read/write with permissions", () => {
    const table = createDefaultTable();
    const ctx = createContext(1, 0, ["read", "write"]);
    table.invokeByName("write", ["key", "val"], ctx);
    const result = table.invokeByName("read", ["key"], ctx);
    expect(result.ok).toBe(true);
    expect(result.result).toBe("val");
  });

  it("read denied without permission", () => {
    const table = createDefaultTable();
    const ctx = createContext(1);
    expect(table.invokeByName("read", ["key"], ctx).ok).toBe(false);
  });

  it("getpid returns process id", () => {
    const table = createDefaultTable();
    const ctx = createContext(42);
    expect(table.invokeByName("getpid", [], ctx).result).toBe(42);
  });
});

describe("createContext", () => {
  it("creates context with defaults", () => {
    const ctx = createContext(1);
    expect(ctx.pid).toBe(1);
    expect(ctx.uid).toBe(0);
    expect(ctx.permissions.size).toBe(0);
  });

  it("creates context with permissions", () => {
    const ctx = createContext(1, 100, ["read", "write"]);
    expect(ctx.uid).toBe(100);
    expect(ctx.permissions.has("read")).toBe(true);
  });
});
