import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getToolStats, reliableFetch, resetToolTelemetry } from "./reliable-fetch.js";

function response(status: number, headers: Record<string, string> = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `status-${status}`,
    headers: { get: (name: string) => headers[name.toLowerCase()] ?? null },
    json: async () => ({}),
    text: async () => "",
  } as unknown as Response;
}

describe("reliableFetch", () => {
  beforeEach(() => {
    resetToolTelemetry();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a successful response and records latency telemetry", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => response(200)));
    const res = await reliableFetch("https://api.example.com/ok", { tool: "demo" });
    expect(res.status).toBe(200);
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.calls).toBe(1);
    expect(stats?.ok).toBe(1);
    expect(stats?.latency_ms.count).toBe(1);
    expect(stats?.breaker.state).toBe("closed");
  });

  it("retries transient 503s for GETs and succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response(503))
      .mockResolvedValueOnce(response(200));
    vi.stubGlobal("fetch", fetchMock);
    const res = await reliableFetch("https://api.example.com/flaky", {
      tool: "demo",
      baseDelayMs: 1,
    });
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.retries).toBe(1);
    expect(stats?.consecutive_failures).toBe(0);
  });

  it("honors Retry-After seconds on 429 and returns the final 429 for connector wording", async () => {
    const fetchMock = vi.fn(async () => response(429, { "retry-after": "0" }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await reliableFetch("https://api.example.com/limited", {
      tool: "demo",
      retries: 2,
      baseDelayMs: 1,
    });
    expect(res.status).toBe(429);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.rate_limited).toBeGreaterThanOrEqual(1);
    // Rate limiting proves the upstream is alive; it never trips the breaker.
    expect(stats?.breaker.state).toBe("closed");
  });

  it("never retries non-idempotent requests", async () => {
    const fetchMock = vi.fn(async () => response(503));
    vi.stubGlobal("fetch", fetchMock);
    const res = await reliableFetch("https://api.example.com/write", {
      tool: "demo",
      init: { method: "POST" },
      baseDelayMs: 1,
    });
    expect(res.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries POSTs when explicitly marked idempotent", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response(502))
      .mockResolvedValueOnce(response(200));
    vi.stubGlobal("fetch", fetchMock);
    const res = await reliableFetch("https://api.example.com/safe-write", {
      tool: "demo",
      init: { method: "POST" },
      idempotent: true,
      baseDelayMs: 1,
    });
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws the connector-standard timeout wording after exhausting retries", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        const err = new Error("aborted");
        err.name = "AbortError";
        throw err;
      })
    );
    await expect(
      reliableFetch("https://api.example.com/slow", {
        tool: "demo",
        service: "Demo",
        timeoutMs: 50,
        baseDelayMs: 1,
      })
    ).rejects.toThrow(/Demo request timed out after 50ms\./);
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.timeouts).toBe(1);
    expect(stats?.consecutive_failures).toBe(1);
  });

  it("throws the connector-standard network wording", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("socket hang up");
      })
    );
    await expect(
      reliableFetch("https://api.example.com/down", {
        tool: "demo",
        service: "Demo",
        retries: 0,
      })
    ).rejects.toThrow(/Demo network error: socket hang up/);
  });

  it("opens the circuit after consecutive failures and fails fast with a cooldown message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("connection refused");
      })
    );
    for (let i = 0; i < 5; i++) {
      await expect(
        reliableFetch("https://api.example.com/dead", {
          tool: "demo",
          service: "Demo",
          retries: 0,
        })
      ).rejects.toThrow(/network error/);
    }
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.breaker.state).toBe("open");
    expect(stats?.consecutive_failures).toBe(5);

    await expect(
      reliableFetch("https://api.example.com/dead", { tool: "demo", service: "Demo" })
    ).rejects.toThrow(/temporarily unavailable \(circuit open after 5 consecutive failures\)/);
  });

  it("recovers: a successful response closes the breaker and resets the failure streak", async () => {
    const failing = vi.fn(async () => {
      throw new Error("connection refused");
    });
    vi.stubGlobal("fetch", failing);
    for (let i = 0; i < 4; i++) {
      await expect(
        reliableFetch("https://api.example.com/wobbly", { tool: "demo", retries: 0 })
      ).rejects.toThrow();
    }
    vi.stubGlobal("fetch", vi.fn(async () => response(200)));
    const res = await reliableFetch("https://api.example.com/wobbly", { tool: "demo" });
    expect(res.status).toBe(200);
    const stats = getToolStats().find((row) => row.tool === "demo");
    expect(stats?.consecutive_failures).toBe(0);
    expect(stats?.breaker.state).toBe("closed");
  });
});
