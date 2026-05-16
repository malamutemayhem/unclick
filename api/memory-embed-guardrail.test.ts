import { describe, expect, it } from "vitest";
import { decideMemoryEmbedProviderCall } from "./memory/embed";

describe("memory embed spend guardrail", () => {
  it("blocks the OpenAI embedding provider path by default", () => {
    expect(decideMemoryEmbedProviderCall(false)).toMatchObject({
      allowed: false,
      path_id: "memory.api.openai.embed-endpoint",
      provider: "OpenAI",
      model: "text-embedding-3-small",
      cost_tier: "paid",
      reason: "paid_or_unknown_blocked",
      allow_paid_flag: "ADMIN_EMBED_SECRET",
    });
  });

  it("allows the provider path only after the existing admin embed gate passes", () => {
    expect(decideMemoryEmbedProviderCall(true)).toMatchObject({
      allowed: true,
      path_id: "memory.api.openai.embed-endpoint",
      provider: "OpenAI",
      model: "text-embedding-3-small",
      cost_tier: "paid",
      reason: "explicit_paid_allowed",
      allow_paid_flag: "ADMIN_EMBED_SECRET",
    });
  });
});
