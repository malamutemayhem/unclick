import { describe, expect, it } from "vitest";
import { decideBackfillEmbeddingProviderCall } from "../scripts/backfill-embeddings";

describe("backfill embedding spend guardrail", () => {
  it("keeps dry-run direct OpenAI backfill blocked by default", () => {
    const decision = decideBackfillEmbeddingProviderCall({
      dry_run: true,
      admin_embed_secret_configured: false,
      direct_paid_enabled: false,
    });

    expect(decision).toMatchObject({
      allowed: false,
      path_id: "memory.script.openai.backfill",
      provider: "OpenAI",
      model: "text-embedding-3-small",
      cost_tier: "paid",
      default_allowed: false,
      reason: "paid_or_unknown_blocked",
      allow_paid_flag: "DRY_RUN=0 with explicit operator launch",
    });
  });

  it("does not allow the direct OpenAI path when backfill delegates to the API endpoint", () => {
    const decision = decideBackfillEmbeddingProviderCall({
      dry_run: false,
      admin_embed_secret_configured: true,
      direct_paid_enabled: true,
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toBe("paid_or_unknown_blocked");
  });

  it("blocks direct OpenAI by default even when not in dry-run mode", () => {
    const decision = decideBackfillEmbeddingProviderCall({
      dry_run: false,
      admin_embed_secret_configured: false,
      direct_paid_enabled: false,
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toBe("paid_or_unknown_blocked");
  });

  it("allows direct OpenAI only for explicit paid operator launch without API endpoint", () => {
    const decision = decideBackfillEmbeddingProviderCall({
      dry_run: false,
      admin_embed_secret_configured: false,
      direct_paid_enabled: true,
    });

    expect(decision).toMatchObject({
      allowed: true,
      path_id: "memory.script.openai.backfill",
      reason: "explicit_paid_allowed",
    });
  });
});
