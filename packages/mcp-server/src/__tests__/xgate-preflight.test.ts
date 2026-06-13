import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { xgatePreflight, isXGateEnforceEnabled } from "../xgate-preflight.js";

describe("xgate preflight hook (mcp package)", () => {
  const realFetch = globalThis.fetch;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    delete process.env.UNCLICK_XGATE_ENFORCE;
    delete process.env.CRON_SECRET;
    fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ proceed: false, gate: "DataGate", ruleId: "sql.ddl_drop" }), {
        status: 200,
      }),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it("is off by default and does not call the API", async () => {
    expect(isXGateEnforceEnabled()).toBe(false);
    const out = await xgatePreflight("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(out).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does nothing when enabled but no CRON_SECRET is set", async () => {
    process.env.UNCLICK_XGATE_ENFORCE = "1";
    const out = await xgatePreflight("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(out).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the API block decision when enabled with a secret", async () => {
    process.env.UNCLICK_XGATE_ENFORCE = "1";
    process.env.CRON_SECRET = "secret";
    const out = await xgatePreflight("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(out?.proceed).toBe(false);
    expect(out?.gate).toBe("DataGate");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("fails open (returns null) when the API errors", async () => {
    process.env.UNCLICK_XGATE_ENFORCE = "1";
    process.env.CRON_SECRET = "secret";
    fetchMock.mockImplementation(() => Promise.reject(new Error("network down")));
    const out = await xgatePreflight("neon.execute_sql", { sql: "DROP TABLE users" });
    expect(out).toBeNull();
  });

  it("never throws on a malformed response", async () => {
    process.env.UNCLICK_XGATE_ENFORCE = "1";
    process.env.CRON_SECRET = "secret";
    fetchMock.mockImplementation(async () => new Response("not json", { status: 200 }));
    await expect(xgatePreflight("x", {})).resolves.toBeNull();
  });
});
