import { describe, expect, it } from "vitest";

describe("/api/mcp production import", () => {
  it("loads the MCP handler with all production workspace dependencies built", async () => {
    const mod = await import("./mcp");

    expect(typeof mod.default).toBe("function");
  });
});
