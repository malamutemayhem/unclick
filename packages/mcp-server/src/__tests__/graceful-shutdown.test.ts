import { describe, it, expect, vi } from "vitest";
import { ShutdownManager } from "../graceful-shutdown.js";

describe("ShutdownManager", () => {
  it("runs handlers in reverse order", async () => {
    const order: string[] = [];
    const mgr = new ShutdownManager();
    mgr.register("first", () => { order.push("first"); });
    mgr.register("second", () => { order.push("second"); });
    await mgr.shutdown();
    expect(order).toEqual(["second", "first"]);
  });

  it("reports success and failures", async () => {
    const mgr = new ShutdownManager();
    mgr.register("good", () => {});
    mgr.register("bad", () => { throw new Error("cleanup failed"); });
    const result = await mgr.shutdown();
    expect(result.success).toContain("good");
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0].name).toBe("bad");
  });

  it("handles async handlers", async () => {
    let cleaned = false;
    const mgr = new ShutdownManager();
    mgr.register("async", async () => {
      await new Promise((r) => setTimeout(r, 10));
      cleaned = true;
    });
    await mgr.shutdown();
    expect(cleaned).toBe(true);
  });

  it("is idempotent", async () => {
    const fn = vi.fn();
    const mgr = new ShutdownManager();
    mgr.register("once", fn);
    await mgr.shutdown();
    await mgr.shutdown();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("tracks isShuttingDown", async () => {
    const mgr = new ShutdownManager();
    expect(mgr.isShuttingDown).toBe(false);
    await mgr.shutdown();
    expect(mgr.isShuttingDown).toBe(true);
  });

  it("tracks handler count", () => {
    const mgr = new ShutdownManager();
    mgr.register("a", () => {});
    mgr.register("b", () => {});
    expect(mgr.handlerCount).toBe(2);
  });
});
