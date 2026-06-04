/**
 * lane-04: row-level scope, credential-aware gating, and Boardroom visibility.
 *
 * Pure predicate tests always run. The LocalBackend tests prove end-to-end
 * enforcement and the scope-bleed guarantee (a private fact never surfaces to
 * another agent), plus that the flag-off path is a true no-op.
 *
 * Run with: tsx --test src/memory/__tests__/scopes.test.ts
 */

import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  deriveCredentialScopeFromSourceRef,
  isFactInScope,
  normalizeVisibility,
  resolveScopeContext,
  scopeFieldsForWrite,
  scopesEnabled,
  type MemoryScopeContext,
} from "../scopes.js";

// ---- Pure predicate (no I/O, always runs) ----

function reader(over: Partial<MemoryScopeContext> = {}): MemoryScopeContext {
  return { agentId: null, boardroomId: null, authorizedCredentialScopes: [], ...over };
}

describe("isFactInScope", () => {
  test("user-global and legacy/blank rows are visible to everyone", () => {
    assert.equal(isFactInScope({ visibility: "user-global" }, reader()), true);
    assert.equal(isFactInScope({ visibility: null }, reader()), true);
    assert.equal(isFactInScope({ visibility: "" }, reader()), true);
    assert.equal(isFactInScope({}, reader()), true);
  });

  test("private is visible only to the owning agent", () => {
    const fact = { visibility: "private", source_agent_id: "agent-a" };
    assert.equal(isFactInScope(fact, reader({ agentId: "agent-a" })), true);
    assert.equal(isFactInScope(fact, reader({ agentId: "agent-b" })), false);
    // Unknown reader identity must default-deny.
    assert.equal(isFactInScope(fact, reader()), false);
    // Private fact with no owner is unreachable (no one owns it).
    assert.equal(isFactInScope({ visibility: "private" }, reader({ agentId: "agent-a" })), false);
  });

  test("shared is visible only within the same Boardroom", () => {
    const fact = { visibility: "shared", boardroom_id: "room-1" };
    assert.equal(isFactInScope(fact, reader({ boardroomId: "room-1" })), true);
    assert.equal(isFactInScope(fact, reader({ boardroomId: "room-2" })), false);
    assert.equal(isFactInScope(fact, reader()), false);
  });

  test("credential-gated facts require an authorized scope", () => {
    const fact = { visibility: "user-global", credential_scope: "stripe" };
    assert.equal(isFactInScope(fact, reader({ authorizedCredentialScopes: ["stripe"] })), true);
    assert.equal(isFactInScope(fact, reader({ authorizedCredentialScopes: ["gmail"] })), false);
    assert.equal(isFactInScope(fact, reader()), false);
  });

  test("quarantined facts are never visible, even to the owner", () => {
    const fact = {
      visibility: "private",
      source_agent_id: "agent-a",
      quarantined_at: "2026-06-04T00:00:00.000Z",
    };
    assert.equal(isFactInScope(fact, reader({ agentId: "agent-a" })), false);
  });

  test("an unrecognized visibility token default-denies", () => {
    assert.equal(isFactInScope({ visibility: "public" }, reader({ agentId: "agent-a" })), false);
  });
});

describe("normalizeVisibility", () => {
  test("coerces known tiers and rejects everything else", () => {
    assert.equal(normalizeVisibility(" PRIVATE "), "private");
    assert.equal(normalizeVisibility("Shared"), "shared");
    assert.equal(normalizeVisibility("user-global"), "user-global");
    assert.equal(normalizeVisibility(""), null);
    assert.equal(normalizeVisibility(null), null);
    assert.equal(normalizeVisibility(undefined), null);
    assert.equal(normalizeVisibility("public"), null);
  });
});

describe("deriveCredentialScopeFromSourceRef", () => {
  test("extracts a connector platform slug only from connector-shaped refs", () => {
    assert.equal(deriveCredentialScopeFromSourceRef("tool_call:stripe_charges:ch_1"), "stripe");
    assert.equal(deriveCredentialScopeFromSourceRef("tool:gmail_send"), "gmail");
    assert.equal(deriveCredentialScopeFromSourceRef("connector:shopify"), "shopify");
    assert.equal(deriveCredentialScopeFromSourceRef("CONNECTOR:Stripe"), "stripe");
    assert.equal(deriveCredentialScopeFromSourceRef("https://example.com/x"), null);
    assert.equal(deriveCredentialScopeFromSourceRef("msg_abc123"), null);
    assert.equal(deriveCredentialScopeFromSourceRef("pr:1290"), null);
    assert.equal(deriveCredentialScopeFromSourceRef(null), null);
    assert.equal(deriveCredentialScopeFromSourceRef("   "), null);
  });
});

describe("scope env helpers", () => {
  const KEYS = [
    "MEMORY_SCOPES_ENABLED",
    "UNCLICK_AGENT_ID",
    "UNCLICK_BOARDROOM_ID",
    "UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES",
  ] as const;
  let saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    saved = {};
    for (const k of KEYS) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
  });
  afterEach(() => {
    for (const k of KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });

  test("scopesEnabled honors 1/true and is off by default", () => {
    assert.equal(scopesEnabled(), false);
    process.env.MEMORY_SCOPES_ENABLED = "1";
    assert.equal(scopesEnabled(), true);
    process.env.MEMORY_SCOPES_ENABLED = "true";
    assert.equal(scopesEnabled(), true);
    process.env.MEMORY_SCOPES_ENABLED = "false";
    assert.equal(scopesEnabled(), false);
  });

  test("resolveScopeContext parses agent, boardroom, and credential scopes", () => {
    process.env.UNCLICK_AGENT_ID = "agent-a";
    process.env.UNCLICK_BOARDROOM_ID = "room-1";
    process.env.UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES = "stripe, gmail  slack";
    const ctx = resolveScopeContext();
    assert.equal(ctx.agentId, "agent-a");
    assert.equal(ctx.boardroomId, "room-1");
    assert.deepEqual(ctx.authorizedCredentialScopes, ["stripe", "gmail", "slack"]);
  });

  test("scopeFieldsForWrite returns inert nulls (and no source_agent_id) when disabled", () => {
    const ctx = reader({ agentId: "agent-a" });
    assert.deepEqual(scopeFieldsForWrite({ visibility: "private" }, ctx, false), {
      visibility: null,
      boardroom_id: null,
      credential_scope: null,
    });
  });

  test("scopeFieldsForWrite pins the private owner to the writer and defaults the shared Boardroom", () => {
    const ctx = reader({ agentId: "agent-a", boardroomId: "room-1" });
    // Private: owner pinned to the writing agent; a caller-supplied source_agent_id is ignored.
    assert.deepEqual(
      scopeFieldsForWrite({ visibility: "private", source_agent_id: "agent-evil" }, ctx, true),
      {
        visibility: "private",
        boardroom_id: null,
        credential_scope: null,
        source_agent_id: "agent-a",
      }
    );
    // Shared: Boardroom defaulted; no source_agent_id emitted (lane-03 owns it elsewhere).
    assert.deepEqual(scopeFieldsForWrite({ visibility: "shared" }, ctx, true), {
      visibility: "shared",
      boardroom_id: "room-1",
      credential_scope: null,
    });
  });

  test("scopeFieldsForWrite auto-tags credential_scope from a connector source_ref", () => {
    const ctx = reader({ agentId: "agent-a" });
    assert.equal(
      scopeFieldsForWrite({ source_ref: "tool_call:stripe_charges:ch_1" }, ctx, true).credential_scope,
      "stripe"
    );
    // An explicit credential_scope wins over derivation.
    assert.equal(
      scopeFieldsForWrite({ credential_scope: "manual", source_ref: "tool_call:stripe_charges" }, ctx, true)
        .credential_scope,
      "manual"
    );
    // A non-connector ref does not tag.
    assert.equal(
      scopeFieldsForWrite({ source_ref: "https://example.com/x" }, ctx, true).credential_scope,
      null
    );
  });
});

// ---- LocalBackend end-to-end enforcement ----

describe("LocalBackend scope enforcement", () => {
  const KEYS = [
    "MEMORY_SCOPES_ENABLED",
    "UNCLICK_AGENT_ID",
    "UNCLICK_BOARDROOM_ID",
    "UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES",
    "MEMORY_LOCAL_DATA_DIR",
  ] as const;
  let saved: Record<string, string | undefined> = {};
  let tempDir = "";

  beforeEach(() => {
    saved = {};
    for (const k of KEYS) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-scopes-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });
  afterEach(() => {
    for (const k of KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  function actAs(agentId?: string, boardroomId?: string, scopes?: string): void {
    if (agentId === undefined) delete process.env.UNCLICK_AGENT_ID;
    else process.env.UNCLICK_AGENT_ID = agentId;
    if (boardroomId === undefined) delete process.env.UNCLICK_BOARDROOM_ID;
    else process.env.UNCLICK_BOARDROOM_ID = boardroomId;
    if (scopes === undefined) delete process.env.UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES;
    else process.env.UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES = scopes;
  }

  function ids(results: unknown): string[] {
    return (results as Array<{ id: string }>).map((r) => r.id);
  }

  test("scope-bleed: a private fact never surfaces to another agent", async () => {
    process.env.MEMORY_SCOPES_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a");
    const priv = await backend.addFact({
      fact: "Agent A private salary target alpha detail",
      category: "private",
      confidence: 1,
      visibility: "private",
    });

    // Owner sees their own private fact.
    actAs("agent-a");
    assert.ok(ids(await backend.searchMemory("salary target alpha", 10)).includes(priv.id));

    // A different agent never sees it (the scope-bleed guarantee).
    actAs("agent-b");
    assert.equal(ids(await backend.searchMemory("salary target alpha", 10)).includes(priv.id), false);
    assert.equal(ids(await backend.searchFacts("salary target alpha")).includes(priv.id), false);

    // An unidentified reader also cannot see it (default-deny).
    actAs(undefined);
    assert.equal(ids(await backend.searchMemory("salary target alpha", 10)).includes(priv.id), false);
  });

  test("shared facts are visible only within the same Boardroom", async () => {
    process.env.MEMORY_SCOPES_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a", "room-1");
    const shared = await backend.addFact({
      fact: "Boardroom one shared decision beta detail",
      category: "shared",
      confidence: 1,
      visibility: "shared",
    });

    // Any agent inside room-1 may recall it.
    actAs("agent-z", "room-1");
    assert.ok(ids(await backend.searchMemory("shared decision beta", 10)).includes(shared.id));

    // An agent in a different Boardroom may not.
    actAs("agent-z", "room-2");
    assert.equal(ids(await backend.searchMemory("shared decision beta", 10)).includes(shared.id), false);
  });

  test("user-global facts are visible to any agent when scopes are on", async () => {
    process.env.MEMORY_SCOPES_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a");
    const global = await backend.addFact({
      fact: "Shared roadmap gamma is user global detail",
      category: "general",
      confidence: 1,
      visibility: "user-global",
    });

    actAs("agent-b");
    assert.ok(ids(await backend.searchMemory("roadmap gamma user global", 10)).includes(global.id));
  });

  test("flag off: scope inputs are ignored and nothing is filtered", async () => {
    // MEMORY_SCOPES_ENABLED unset (off).
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a");
    const fact = await backend.addFact({
      fact: "Flag off roadmap delta detail stays visible",
      category: "general",
      confidence: 1,
      visibility: "private",
    });

    // A different agent still sees it: flag off means no enforcement, and the
    // scope columns are not even stamped.
    actAs("agent-b");
    assert.ok(ids(await backend.searchMemory("roadmap delta detail", 10)).includes(fact.id));

    const rows = JSON.parse(
      fs.readFileSync(path.join(tempDir, "extracted_facts.json"), "utf8")
    ) as Array<{ id: string; visibility?: string | null; source_agent_id?: string | null }>;
    const stored = rows.find((r) => r.id === fact.id);
    assert.equal(stored?.visibility ?? null, null);
    assert.equal(stored?.source_agent_id ?? null, null);
  });

  test("startup context excludes another agent's private facts", async () => {
    process.env.MEMORY_SCOPES_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a");
    await backend.addFact({
      fact: "Agent A private startup-only fact epsilon",
      category: "private",
      confidence: 1,
      visibility: "private",
    });
    await backend.addFact({
      fact: "Everyone can see this global startup fact zeta",
      category: "general",
      confidence: 1,
      visibility: "user-global",
    });

    actAs("agent-b");
    const context = (await backend.getStartupContext(3)) as { active_facts: Array<{ fact: string }> };
    const factTexts = context.active_facts.map((f) => f.fact);
    assert.equal(factTexts.some((f) => f.includes("epsilon")), false);
    assert.equal(factTexts.some((f) => f.includes("zeta")), true);
  });

  test("quarantineCredentialMemory hides facts bound to a revoked credential", async () => {
    process.env.MEMORY_SCOPES_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a", undefined, "stripe,gmail");
    const stripeFact = await backend.addFact({
      fact: "Stripe payout schedule theta detail",
      category: "finance",
      confidence: 1,
      credential_scope: "stripe",
    });
    const gmailFact = await backend.addFact({
      fact: "Gmail thread iota detail unrelated",
      category: "email",
      confidence: 1,
      credential_scope: "gmail",
    });

    // Both visible while their credentials are authorized.
    assert.ok(ids(await backend.searchMemory("payout schedule theta", 10)).includes(stripeFact.id));
    assert.ok(ids(await backend.searchMemory("thread iota detail", 10)).includes(gmailFact.id));

    // Revoke stripe: quarantine its derived memory.
    const res = await backend.quarantineCredentialMemory("stripe");
    assert.equal(res.quarantined, 1);

    // The stripe fact is now hidden even though stripe is still authorized.
    assert.equal(ids(await backend.searchMemory("payout schedule theta", 10)).includes(stripeFact.id), false);
    // The gmail fact is untouched.
    assert.ok(ids(await backend.searchMemory("thread iota detail", 10)).includes(gmailFact.id));
  });

  test("quarantineCredentialMemory is a no-op when scopes are disabled", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    actAs("agent-a", undefined, "stripe");
    const fact = await backend.addFact({
      fact: "Disabled flag credential fact kappa",
      category: "finance",
      confidence: 1,
      credential_scope: "stripe",
    });

    const res = await backend.quarantineCredentialMemory("stripe");
    assert.equal(res.quarantined, 0);
    // Nothing is quarantined and nothing is filtered when the flag is off.
    assert.ok(ids(await backend.searchMemory("credential fact kappa", 10)).includes(fact.id));
  });
});
