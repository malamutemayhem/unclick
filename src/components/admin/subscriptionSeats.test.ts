import { describe, it, expect, vi } from "vitest";
import {
  bridgeCommand,
  isSubscriptionSeat,
  makeSubscriptionHandle,
  newSubscriptionSeat,
  pollBridgeJob,
  toBridgeMessages,
} from "./subscriptionSeats";

describe("isSubscriptionSeat", () => {
  it("is true only for the subscription lane (stored api seats have no lane)", () => {
    expect(isSubscriptionSeat({ lane: "subscription" })).toBe(true);
    expect(isSubscriptionSeat({ lane: "api" })).toBe(false);
    expect(isSubscriptionSeat({})).toBe(false);
  });
});

describe("makeSubscriptionHandle / newSubscriptionSeat", () => {
  it("uses the runtime default handle and dedupes with a numeric suffix", () => {
    expect(makeSubscriptionHandle("claude-code", [])).toBe("claude-sub");
    expect(makeSubscriptionHandle("claude-code", ["claude-sub"])).toBe("claude-sub-2");
    expect(
      makeSubscriptionHandle("codex-cli", ["gpt-sub", "gpt-sub-2"]),
    ).toBe("gpt-sub-3");
  });

  it("creates a called-in subscription seat with server-safe handle", () => {
    const seat = newSubscriptionSeat("codex-cli", []);
    expect(seat.lane).toBe("subscription");
    expect(seat.runtime).toBe("codex-cli");
    expect(seat.slug).toBe("subscription");
    expect(seat.active).toBe(true);
    expect(seat.handle).toMatch(/^[a-z0-9][a-z0-9_-]{0,39}$/);
  });
});

describe("bridgeCommand", () => {
  it("prints the npx one-liner for the seat", () => {
    expect(bridgeCommand("claude-code", "claude-sub")).toBe(
      "npx @unclick/mcp-server seat-bridge --runtime claude-code --handle claude-sub",
    );
  });
});

describe("toBridgeMessages", () => {
  it("keeps prior turns with attribution and appends the new human turn", () => {
    const out = toBridgeMessages(
      [
        { role: "user", text: "earlier question" },
        { role: "assistant", text: "earlier answer", author: "GLM seat" },
        { role: "assistant", text: "   " },
      ],
      "new question",
    );
    expect(out).toEqual([
      { role: "user", content: "earlier question" },
      { role: "assistant", content: "earlier answer", author: "GLM seat" },
      { role: "user", content: "new question" },
    ]);
  });

  it("caps to the newest turns", () => {
    const prior = Array.from({ length: 50 }, (_, i) => ({
      role: "user" as const,
      text: `turn ${i}`,
    }));
    const out = toBridgeMessages(prior, "newest", 10);
    expect(out).toHaveLength(10);
    expect(out[out.length - 1]).toEqual({ role: "user", content: "newest" });
    expect(out[0]).toEqual({ role: "user", content: "turn 41" });
  });
});

describe("pollBridgeJob", () => {
  const headers = { Authorization: "Bearer token" };
  const instantSleep = async () => {};

  function jsonResponse(body: unknown): Response {
    return new Response(JSON.stringify(body), { status: 200 });
  }

  it("resolves with the content when the job completes", async () => {
    let calls = 0;
    const fetchFn = vi.fn(async (_url: string | URL | Request) => {
      calls += 1;
      return calls < 3
        ? jsonResponse({ status: "pending" })
        : jsonResponse({ status: "done", result_content: "the reply" });
    });
    const outcome = await pollBridgeJob({
      jobId: "j1",
      headers,
      fetchFn: fetchFn as unknown as typeof fetch,
      sleep: instantSleep,
    });
    expect(outcome).toEqual({ status: "done", content: "the reply" });
    expect(String(fetchFn.mock.calls[0][0])).toContain("action=status&job_id=j1");
  });

  it("surfaces a job error", async () => {
    const fetchFn = vi.fn(async () =>
      jsonResponse({ status: "error", error: "claude is not installed" }),
    );
    const outcome = await pollBridgeJob({
      jobId: "j2",
      headers,
      fetchFn: fetchFn as unknown as typeof fetch,
      sleep: instantSleep,
    });
    expect(outcome.status).toBe("error");
    expect(outcome.error).toContain("not installed");
  });

  it("times out honestly when nothing answers", async () => {
    let now = 0;
    const nowSpy = vi.spyOn(Date, "now").mockImplementation(() => now);
    try {
      const fetchFn = vi.fn(async () => jsonResponse({ status: "pending" }));
      const outcome = await pollBridgeJob({
        jobId: "j3",
        headers,
        fetchFn: fetchFn as unknown as typeof fetch,
        sleep: async () => {
          now += 10_000;
        },
        timeoutMs: 60_000,
      });
      expect(outcome.status).toBe("timeout");
      expect(outcome.error).toContain("seat-bridge");
    } finally {
      nowSpy.mockRestore();
    }
  });
});
