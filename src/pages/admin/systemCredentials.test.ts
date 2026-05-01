import { describe, expect, it } from "vitest";
import { buildSystemCredentialRows, type SystemCredentialSource } from "./systemCredentials";

const NOW = new Date("2026-05-01T08:00:00Z").getTime();

function cred(overrides: Partial<SystemCredentialSource>): SystemCredentialSource {
  return {
    id:              "cred-1",
    platform:        "github",
    label:           "TESTPASS_TOKEN byrneck",
    is_valid:        true,
    last_tested_at:  "2026-05-01T07:00:00Z",
    last_used_at:    null,
    last_rotated_at: "2026-04-15T00:00:00Z",
    expires_at:      null,
    created_at:      "2026-04-01T00:00:00Z",
    ...overrides,
  };
}

describe("buildSystemCredentialRows", () => {
  it("infers TestPass/GitHub usage and owner without exposing values", () => {
    const rows = buildSystemCredentialRows([cred({})], NOW);
    expect(rows[0]).toMatchObject({
      displayName:   "github / TESTPASS_TOKEN byrneck",
      ownerHint:     "byrneck",
      status:        "healthy",
      rotationRisk:  "low",
    });
    expect(rows[0].usedBy).toContain("TestPass PR checks");
    expect(rows[0].usedBy).toContain("GitHub workflows");
    expect(rows[0].safeNote).toContain("metadata only");
  });

  it("marks scheduled cron keys as medium risk when never tested", () => {
    const rows = buildSystemCredentialRows([
      cred({
        id:             "cron",
        platform:       "unclick",
        label:          "TESTPASS_CRON_SECRET creativelead scheduled",
        last_tested_at: null,
      }),
    ], NOW);
    expect(rows[0].usedBy).toContain("TestPass PR checks");
    expect(rows[0].usedBy).toContain("scheduled smoke receipts");
    expect(rows[0].ownerHint).toBe("creativelead");
    expect(rows[0].status).toBe("untested");
    expect(rows[0].rotationRisk).toBe("medium");
  });

  it("sorts failing or old-rotation credentials before healthy ones", () => {
    const rows = buildSystemCredentialRows([
      cred({ id: "good", label: "OpenRouter", platform: "openrouter" }),
      cred({
        id:              "old",
        label:           "Supabase production",
        platform:        "supabase",
        last_rotated_at: "2025-12-01T00:00:00Z",
      }),
      cred({
        id:       "bad",
        label:    "PostHog analytics",
        platform: "posthog",
        is_valid: false,
      }),
    ], NOW);

    expect(rows.map((row) => row.id)).toEqual(["bad", "old", "good"]);
    expect(rows[0].status).toBe("failing");
    expect(rows[1].rotationRisk).toBe("high");
  });
});
