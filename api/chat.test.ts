import { describe, it, expect } from "vitest";
import {
  extractApiKey,
  extractConnectorKeyHeader,
  safeInternalOrigin,
  validateChatRequest,
} from "./chat";

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
    }
  });
});
