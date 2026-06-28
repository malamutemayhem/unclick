import { describe, it, expect } from "vitest";
import { extractApiKey, validateChatRequest } from "./chat";

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
