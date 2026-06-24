import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { compactStartupContextForStrictClients } from "../handlers.js";

// The full imperative string /admin/you stores under preference/ai_style. It is
// long enough (>130 chars) that the old generic business_context compaction cut
// it mid-sentence, dropping the format and emoji rules.
const DIRECTIVE =
  "Operator AI style, always honor unless overridden in-session: keep replies " +
  "brief and to the point; use simple, plain English, and use analogies to " +
  "explain; lead with visuals such as tables, steps, and examples; use " +
  "expressive emoji.";

const aiStyleRow = () => ({
  category: "preference",
  key: "ai_style",
  priority: 99,
  value: {
    // directive is stored first so it leads the JSON form (see memory-admin.ts).
    directive: DIRECTIVE,
    response_length: "brief",
    complexity: "simple",
    analogies: "on",
    format: "visual",
    emoji_level: "expressive",
    custom_instructions: "",
    updated_at: "2026-06-24T00:00:00.000Z",
    privacy: "style-only",
  },
});

const startupContext = (business: unknown[]) => ({
  business_context: business,
  active_facts: [],
  knowledge_library_index: [],
  recent_sessions: [],
});

type CompactOut = {
  profile_card: { style_directive?: string };
  business_context: Array<{ category?: unknown; key?: unknown; value: unknown }>;
};

describe("AI Style in load_memory startup context", () => {
  test("surfaces the full directive as a dedicated profile-card line (lite mode)", () => {
    const out = compactStartupContextForStrictClients(startupContext([aiStyleRow()])) as CompactOut;
    // Whole directive, not cut mid-sentence at ~130 chars.
    assert.equal(out.profile_card.style_directive, DIRECTIVE);
    assert.ok(out.profile_card.style_directive?.includes("expressive emoji"));
    assert.ok(!out.profile_card.style_directive?.includes("[truncated"));
  });

  test("keeps the directive readable in the business_context row (not cut at 130)", () => {
    const out = compactStartupContextForStrictClients(startupContext([aiStyleRow()])) as CompactOut;
    const styleRow = out.business_context.find((r) => r.category === "preference" && r.key === "ai_style");
    assert.ok(styleRow, "ai_style row should be present");
    assert.ok(JSON.stringify(styleRow!.value).includes("expressive emoji"));
  });

  test("still surfaces the directive when ai_style is not the first row", () => {
    const out = compactStartupContextForStrictClients(
      startupContext([
        { category: "identity", key: "role", priority: 50, value: { text: "founder" } },
        { category: "workflow", key: "stack", priority: 40, value: { text: "vite + supabase" } },
        aiStyleRow(),
      ]),
    ) as CompactOut;
    assert.equal(out.profile_card.style_directive, DIRECTIVE);
  });

  test("omits style_directive when no ai_style row exists", () => {
    const out = compactStartupContextForStrictClients(
      startupContext([{ category: "identity", key: "role", priority: 50, value: { text: "founder" } }]),
    ) as CompactOut;
    assert.equal(out.profile_card.style_directive, undefined);
  });

  test("ignores a malformed ai_style row with no directive", () => {
    const out = compactStartupContextForStrictClients(
      startupContext([{ category: "preference", key: "ai_style", priority: 99, value: { response_length: "brief" } }]),
    ) as CompactOut;
    assert.equal(out.profile_card.style_directive, undefined);
  });
});
