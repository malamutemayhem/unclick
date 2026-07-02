import { afterEach, describe, it, expect, vi } from "vitest";
import {
  buildCouncilTraceBlock,
  extractApiKey,
  extractConnectorKeyHeader,
  resolveThreadPersistenceLane,
  safeInternalOrigin,
  validateChatRequest,
} from "./chat";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("extractApiKey", () => {
  it("accepts a Bearer uc_/agt_ key", () => {
    expect(extractApiKey("Bearer uc_abc123")).toBe("uc_abc123");
    expect(extractApiKey("Bearer agt_xyz")).toBe("agt_xyz");
  });

  it("rejects missing, empty, or non-UnClick keys", () => {
    expect(extractApiKey(undefined)).toBeNull();
    expect(extractApiKey("")).toBeNull();
    expect(extractApiKey("Bearer sk-openai-key")).toBeNull();
    expect(extractApiKey("Basic dXNlcjpwYXNz")).toBeNull();
  });
});

describe("extractConnectorKeyHeader", () => {
  it("accepts a bare uc_/agt_ key (no Bearer prefix)", () => {
    expect(extractConnectorKeyHeader("uc_abc123")).toBe("uc_abc123");
    expect(extractConnectorKeyHeader("agt_xyz")).toBe("agt_xyz");
    expect(extractConnectorKeyHeader("  uc_padded  ")).toBe("uc_padded");
  });

  it("takes the first value when the header arrives as an array", () => {
    expect(extractConnectorKeyHeader(["uc_first", "uc_second"])).toBe("uc_first");
  });

  it("rejects missing, empty, or non-UnClick values", () => {
    expect(extractConnectorKeyHeader(undefined)).toBeNull();
    expect(extractConnectorKeyHeader("")).toBeNull();
    expect(extractConnectorKeyHeader("Bearer uc_abc")).toBeNull(); // bare key only, no prefix
    expect(extractConnectorKeyHeader("sk-openai-key")).toBeNull();
  });
});

describe("safeInternalOrigin", () => {
  it("allows production hosts", () => {
    expect(safeInternalOrigin("unclick.world")).toBe("https://unclick.world");
    expect(safeInternalOrigin("www.unclick.world")).toBe("https://www.unclick.world");
  });

  it("allows only the exact Vercel deployment host from VERCEL_URL", () => {
    expect(
      safeInternalOrigin(
        "unclick-git-abc123-chris.vercel.app",
        "unclick-git-abc123-chris.vercel.app",
      ),
    ).toBe("https://unclick-git-abc123-chris.vercel.app");
    expect(
      safeInternalOrigin(
        "unclick-git-abc123-chris.vercel.app",
        "https://unclick-git-abc123-chris.vercel.app/dashboard",
      ),
    ).toBe(
      "https://unclick-git-abc123-chris.vercel.app",
    );
  });

  it("preserves the original host casing/port in the returned origin", () => {
    // Allowlist check is case-insensitive, but the fetch target keeps the raw host.
    expect(safeInternalOrigin("UnClick.world")).toBe("https://UnClick.world");
  });

  it("rejects unknown or forged hosts (connectors disabled, not redirected)", () => {
    expect(safeInternalOrigin("evil.example.com")).toBe("");
    expect(safeInternalOrigin("unclick.world.evil.com")).toBe("");
    expect(safeInternalOrigin("unclick-git-abc123-attacker.vercel.app")).toBe("");
    expect(safeInternalOrigin("notvercel.app.evil.com")).toBe("");
    expect(safeInternalOrigin("unclick.world/path")).toBe("");
    expect(safeInternalOrigin(undefined)).toBe("");
    expect(safeInternalOrigin("")).toBe("");
  });
});

describe("validateChatRequest", () => {
  const base = {
    slug: "openrouter",
    model: "openai/gpt-4o-mini",
    messages: [{ id: "1", role: "user", parts: [{ type: "text", text: "hi" }] }],
  };

  it("accepts a valid api-lane request (lane defaults to api)", () => {
    const r = validateChatRequest(base);
    expect("error" in r).toBe(false);
    if (!("error" in r)) {
      expect(r.slug).toBe("openrouter");
      expect(r.model).toBe("openai/gpt-4o-mini");
    }
  });

  it("rejects non-api lanes with a pointer to the right path", () => {
    expect(validateChatRequest({ ...base, lane: "local" })).toHaveProperty("error");
    expect(validateChatRequest({ ...base, lane: "subscription" })).toHaveProperty("error");
  });

  it("requires slug, model, and a non-empty messages array", () => {
    expect(validateChatRequest({ ...base, slug: "" })).toHaveProperty("error");
    expect(validateChatRequest({ ...base, model: "" })).toHaveProperty("error");
    expect(validateChatRequest({ ...base, messages: [] })).toHaveProperty("error");
    expect(validateChatRequest({ ...base, messages: "nope" })).toHaveProperty("error");
    expect(validateChatRequest(null)).toHaveProperty("error");
  });

  it("carries optional system and thread_id through", () => {
    const r = validateChatRequest({ ...base, system: "be brief", thread_id: "t1" });
    expect("error" in r).toBe(false);
    if (!("error" in r)) {
      expect(r.system).toBe("be brief");
      expect(r.thread_id).toBe("t1");
      expect(r.tool_mode).toBe("read");
    }
  });

  it("carries explicit Build mode through", () => {
    const r = validateChatRequest({ ...base, tool_mode: "build" });
    expect("error" in r).toBe(false);
    if (!("error" in r)) {
      expect(r.tool_mode).toBe("build");
    }
  });

  it("sanitizes optional council seat roster", () => {
    const r = validateChatRequest({
      ...base,
      council_seats: [
        { slug: "openrouter", model: "openai/gpt-4o-mini", label: "GPT", handle: "GPT" },
        { slug: "", model: "missing", label: "bad", handle: "bad" },
      ],
    });
    expect("error" in r).toBe(false);
    if (!("error" in r)) {
      expect(r.council_seats).toEqual([
        { slug: "openrouter", model: "openai/gpt-4o-mini", label: "GPT", handle: "GPT" },
      ]);
    }
  });

  it("builds a transparent council trace without exposing hidden reasoning", () => {
    const trace = buildCouncilTraceBlock([
      {
        label: "Claude",
        handle: "Claude",
        slug: "anthropic",
        model: "claude-haiku",
        status: "answered",
        text: "Prioritise the permission check and cite the failing endpoint.",
      },
      {
        label: "GPT",
        handle: "GPT",
        slug: "openrouter",
        model: "openai/gpt-4o-mini",
        status: "answered",
        text: "Add a user-visible trace so humans can see the council work.",
      },
    ]);

    expect(trace).toContain("Council fan-out evidence");
    expect(trace).toContain("Claude (@Claude)");
    expect(trace).toContain("GPT (@GPT)");
    expect(trace).toContain("one short line per contributing seat");
    expect(trace.toLowerCase()).not.toContain("chain of thought");
  });
});

describe("resolveThreadPersistenceLane", () => {
  const supabaseUrl = "https://supabase.test";
  const serviceKey = "service-key";

  function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  function mockThreadFetch(opts: {
    ownerLane?: string | null;
    ownerStatus?: number;
    memberRows?: Array<{ id: string }>;
    memberStatus?: number;
  }) {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/chat_threads?")) {
        if (opts.ownerStatus && opts.ownerStatus >= 400) return jsonResponse({ error: "owner failed" }, opts.ownerStatus);
        return jsonResponse(
          opts.ownerLane ? [{ id: "thread-1", api_key_hash: opts.ownerLane }] : [],
        );
      }
      if (url.includes("/chat_room_members?")) {
        if (opts.memberStatus && opts.memberStatus >= 400) {
          return jsonResponse({ error: "member failed" }, opts.memberStatus);
        }
        return jsonResponse(opts.memberRows ?? []);
      }
      return jsonResponse({ error: "unexpected url" }, 404);
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  it("returns the owner lane when the caller owns the thread", async () => {
    const fetchMock = mockThreadFetch({ ownerLane: "lane_owner" });

    await expect(
      resolveThreadPersistenceLane(supabaseUrl, serviceKey, "thread-1", "lane_owner"),
    ).resolves.toBe("lane_owner");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns the owner lane when the caller is an active room member", async () => {
    const fetchMock = mockThreadFetch({
      ownerLane: "lane_owner",
      memberRows: [{ id: "member-1" }],
    });

    await expect(
      resolveThreadPersistenceLane(supabaseUrl, serviceKey, "thread-1", "lane_member"),
    ).resolves.toBe("lane_owner");

    const memberUrl = String(fetchMock.mock.calls[1]?.[0] ?? "");
    expect(memberUrl).toContain("/chat_room_members?");
    expect(memberUrl).toContain("member_lane_hash=eq.lane_member");
    expect(memberUrl).toContain("status=eq.active");
  });

  it("fails closed when the caller is neither owner nor active member", async () => {
    mockThreadFetch({ ownerLane: "lane_owner", memberRows: [] });

    await expect(
      resolveThreadPersistenceLane(supabaseUrl, serviceKey, "thread-1", "lane_stranger"),
    ).resolves.toBeNull();
  });

  it("fails closed when the thread is missing", async () => {
    const fetchMock = mockThreadFetch({ ownerLane: null });

    await expect(
      resolveThreadPersistenceLane(supabaseUrl, serviceKey, "thread-1", "lane_member"),
    ).resolves.toBeNull();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("fails closed when a membership lookup errors", async () => {
    mockThreadFetch({ ownerLane: "lane_owner", memberStatus: 500 });

    await expect(
      resolveThreadPersistenceLane(supabaseUrl, serviceKey, "thread-1", "lane_member"),
    ).resolves.toBeNull();
  });
});
