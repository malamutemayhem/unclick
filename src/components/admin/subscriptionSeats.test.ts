import { readFileSync } from "node:fs";
import { describe, it, expect, vi } from "vitest";
import {
  BRIDGE_PACKAGE_VERSION,
  SUBSCRIPTION_RUNTIMES,
  bridgeCommand,
  buildEnqueueBody,
  detectBridgeOs,
  fullBridgeCommand,
  isSubscriptionSeat,
  makeSubscriptionHandle,
  newSubscriptionSeat,
  openTerminalHint,
  pollBridgeJob,
  toBridgeMessages,
} from "./subscriptionSeats";
import { BRIDGE_RUNTIME_SPECS } from "../../../packages/mcp-server/src/seat-bridge-runtimes";

describe("registry consistency", () => {
  it("mirrors the canonical runtime registry exactly (id, label, tier, handle)", () => {
    expect(
      SUBSCRIPTION_RUNTIMES.map((o) => ({
        id: o.runtime,
        label: o.label,
        tier: o.tier,
        defaultHandle: o.defaultHandle,
        cliName: o.cliName,
      })),
    ).toEqual(
      BRIDGE_RUNTIME_SPECS.map((s) => ({
        id: s.id,
        label: s.label,
        tier: s.tier,
        defaultHandle: s.defaultHandle,
        cliName: s.cliName,
      })),
    );
  });
});

describe("buildEnqueueBody", () => {
  it("carries handle, runtime, tool mode, thread, messages, and capped images", () => {
    const body = buildEnqueueBody({
      seatHandle: "claude-sub",
      runtime: "claude-code",
      threadId: "t1",
      messages: [{ role: "user", content: "hi" }],
      toolMode: "build",
      images: Array.from({ length: 5 }, (_, i) => ({
        name: `${i}.png`,
        data_url: "data:image/png;base64,QUJD",
      })),
    });
    expect(body.seat_handle).toBe("claude-sub");
    expect(body.tool_mode).toBe("build");
    expect(body.thread_id).toBe("t1");
    expect((body.images as unknown[]).length).toBe(3);
  });

  it("omits thread and images when absent", () => {
    const body = buildEnqueueBody({
      seatHandle: "gemini-sub",
      runtime: "gemini-cli",
      threadId: null,
      messages: [{ role: "user", content: "hi" }],
      toolMode: "read",
    });
    expect(body.thread_id).toBeUndefined();
    expect(body.images).toBeUndefined();
  });
});

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
  it("prints the npx one-liner for the seat, pinned to the exact package version", () => {
    expect(bridgeCommand("claude-code", "claude-sub")).toBe(
      `npx @unclick/mcp-server@${BRIDGE_PACKAGE_VERSION} seat-bridge --runtime claude-code --handle claude-sub`,
    );
  });

  it("pins the version that is actually in the repo (unpinned npx resolved a stale registry version with no seat-bridge)", () => {
    const pkg = JSON.parse(
      readFileSync("packages/mcp-server/package.json", "utf8"),
    ) as { version: string };
    expect(BRIDGE_PACKAGE_VERSION).toBe(pkg.version);
  });
});

describe("detectBridgeOs", () => {
  it("maps user agents to the wizard OS, defaulting to linux", () => {
    expect(
      detectBridgeOs("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"),
    ).toBe("windows");
    expect(
      detectBridgeOs("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"),
    ).toBe("mac");
    expect(detectBridgeOs("Mozilla/5.0 (X11; Linux x86_64)")).toBe("linux");
    expect(detectBridgeOs("")).toBe("linux");
  });
});

describe("fullBridgeCommand", () => {
  it("prefixes the key inline per shell: PowerShell env on windows, env var on mac/linux", () => {
    expect(
      fullBridgeCommand({
        runtime: "claude-code",
        handle: "claude-sub",
        apiKey: "uk_test123",
        os: "windows",
      }),
    ).toBe(
      `$env:UNCLICK_API_KEY="uk_test123"; npx @unclick/mcp-server@${BRIDGE_PACKAGE_VERSION} seat-bridge --runtime claude-code --handle claude-sub`,
    );
    expect(
      fullBridgeCommand({
        runtime: "codex-cli",
        handle: "gpt-sub",
        apiKey: "uk_test123",
        os: "mac",
      }),
    ).toBe(
      `UNCLICK_API_KEY="uk_test123" npx @unclick/mcp-server@${BRIDGE_PACKAGE_VERSION} seat-bridge --runtime codex-cli --handle gpt-sub`,
    );
  });

  it("falls back to an obvious placeholder when no key is stored", () => {
    const line = fullBridgeCommand({
      runtime: "claude-code",
      handle: "claude-sub",
      apiKey: null,
      os: "linux",
    });
    expect(line).toContain("PASTE-YOUR-UNCLICK-KEY-HERE");
    expect(
      fullBridgeCommand({
        runtime: "claude-code",
        handle: "claude-sub",
        apiKey: "   ",
        os: "linux",
      }),
    ).toContain("PASTE-YOUR-UNCLICK-KEY-HERE");
  });
});

describe("openTerminalHint", () => {
  it("gives a per-OS plain-English hint", () => {
    expect(openTerminalHint("windows")).toContain("powershell");
    expect(openTerminalHint("mac")).toContain("Cmd + Space");
    expect(openTerminalHint("linux")).toContain("terminal");
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
