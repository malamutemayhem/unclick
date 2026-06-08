import { describe, it, expect } from "vitest";
import { crontabExplain } from "./crontab-tool.js";

describe("crontab-tool", () => {
  it("explains a cron expression", async () => {
    const r = await crontabExplain({ expression: "0 9 * * 1-5" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.breakdown).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("resolves named shortcuts", async () => {
    const r = await crontabExplain({ expression: "@daily" }) as Record<string, unknown>;
    expect(r.expression).toBe("0 0 * * *");
    expect(r.valid).toBe(true);
  });

  it("rejects invalid field count", async () => {
    const r = await crontabExplain({ expression: "0 0" }) as Record<string, unknown>;
    expect(r.error).toMatch(/fields/i);
  });

  it("rejects missing expression", async () => {
    const r = await crontabExplain({}) as Record<string, unknown>;
    expect(r.error).toMatch(/expression/i);
  });
});
