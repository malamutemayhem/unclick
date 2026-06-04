/**
 * Memory scopes: row-level visibility tiers, Boardroom visibility, and
 * credential-aware gating for UnClick Memory (lane-04).
 *
 * This module is the single source of truth for "can this reader see this
 * fact". It is a thin, dependency-free policy layer that both backends
 * (supabase.ts and local.ts) compose on top of the existing api_key_hash
 * tenant scoping. It never widens tenant isolation; it only narrows what a
 * given agent / Boardroom may recall within a tenant.
 *
 * Tiers:
 *   - user-global : visible to every agent under the tenant (the legacy
 *                   default; rows with NULL/blank visibility are treated as
 *                   user-global so nothing is hidden before the flag flips).
 *   - private     : visible only to the source agent (source_agent_id, the
 *                   canonical agent-identity column declared by lane-03).
 *   - shared      : visible only to agents inside the fact's Boardroom
 *                   (boardroom_id).
 *
 * Credential gating: a fact derived from a connector credential carries a
 * credential_scope. It only surfaces to a reader explicitly authorized for
 * that scope. A quarantined fact (credential revoked) never surfaces.
 *
 * Default-deny: restrictive tiers (private/shared) and credential-gated facts
 * are denied when the reader's identity is unknown, and any unrecognized
 * visibility token is denied. Ambiguity never leaks data.
 *
 * Flag: every behaviour here is gated by MEMORY_SCOPES_ENABLED (default off).
 * When the flag is off, callers skip scope writes and scope filtering entirely,
 * so behaviour is byte-identical to today and carries no schema dependency.
 */

export const MEMORY_VISIBILITY_VALUES = ["private", "shared", "user-global"] as const;
export type MemoryVisibility = (typeof MEMORY_VISIBILITY_VALUES)[number];

/** Scope columns as stored on a fact row (all nullable; NULL = legacy). */
export interface MemoryFactScopeFields {
  visibility?: string | null;
  source_agent_id?: string | null;
  source_ref?: string | null;
  boardroom_id?: string | null;
  credential_scope?: string | null;
  quarantined_at?: string | null;
}

/** The reader identity a recall is evaluated against. */
export interface MemoryScopeContext {
  /** The agent performing the recall, or null when unidentified. */
  agentId: string | null;
  /** The Boardroom the reader is acting within, or null. */
  boardroomId: string | null;
  /** Credential scopes the reader is authorized to see. */
  authorizedCredentialScopes: string[];
}

/** Scope columns to persist on a write. */
export interface MemoryScopeWriteFields {
  visibility: MemoryVisibility | null;
  boardroom_id: string | null;
  credential_scope: string | null;
  /**
   * Only set for private facts, pinned to the writing agent. Omitted for every
   * other fact so lane-03's provenance source_agent_id is never clobbered.
   */
  source_agent_id?: string | null;
}

type EnvLike = Record<string, string | undefined>;

function flagOn(raw: string | undefined): boolean {
  const v = raw ?? "";
  return v === "1" || v.toLowerCase() === "true";
}

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function parseScopeList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** True when the scope behaviour is enabled. Default off. */
export function scopesEnabled(env: EnvLike = process.env): boolean {
  return flagOn(env.MEMORY_SCOPES_ENABLED);
}

/**
 * Coerce an arbitrary visibility token to a known tier, or null when unset.
 * An unrecognized non-empty token also returns null (caller treats it as the
 * user-global default on write, and read-side default-deny rejects it).
 */
export function normalizeVisibility(raw: string | null | undefined): MemoryVisibility | null {
  if (raw == null) return null;
  const v = raw.trim().toLowerCase();
  if (v === "") return null;
  return (MEMORY_VISIBILITY_VALUES as readonly string[]).includes(v)
    ? (v as MemoryVisibility)
    : null;
}

/**
 * Resolve the reader's scope context from the environment. The backends are
 * env-driven (see db.ts), so agent / Boardroom identity is read the same way.
 * When these are unset, restrictive tiers default-deny and only user-global
 * facts surface, which equals today's single-agent behaviour.
 */
export function resolveScopeContext(env: EnvLike = process.env): MemoryScopeContext {
  return {
    agentId: nonEmpty(env.UNCLICK_AGENT_ID),
    boardroomId: nonEmpty(env.UNCLICK_BOARDROOM_ID),
    authorizedCredentialScopes: parseScopeList(env.UNCLICK_AUTHORIZED_CREDENTIAL_SCOPES),
  };
}

/**
 * The core predicate: may this reader recall this fact?
 *
 * Order: quarantine -> credential gate -> visibility tier. Every restrictive
 * branch default-denies when the reader's identity is missing.
 */
export function isFactInScope(fact: MemoryFactScopeFields, ctx: MemoryScopeContext): boolean {
  // A quarantined fact (its backing credential was revoked) never surfaces.
  if (nonEmpty(fact.quarantined_at)) return false;

  // Credential gating: only surface to a reader authorized for the scope.
  const credentialScope = nonEmpty(fact.credential_scope);
  if (credentialScope !== null && !ctx.authorizedCredentialScopes.includes(credentialScope)) {
    return false;
  }

  const visibility = (fact.visibility ?? "").trim().toLowerCase();

  // Unset / legacy rows are user-global: visible to every agent under the tenant.
  if (visibility === "" || visibility === "user-global") return true;

  if (visibility === "private") {
    const source = nonEmpty(fact.source_agent_id);
    return ctx.agentId !== null && source !== null && source === ctx.agentId;
  }

  if (visibility === "shared") {
    const room = nonEmpty(fact.boardroom_id);
    return ctx.boardroomId !== null && room !== null && room === ctx.boardroomId;
  }

  // Unknown visibility token: default-deny.
  return false;
}

/**
 * Compute the scope columns to persist for a write. When scopes are disabled
 * this returns all-null so callers can keep the write byte-identical to today
 * (and skip referencing the new columns entirely). When enabled, private facts
 * default their owner to the writing agent and shared facts default their
 * Boardroom to the writer's Boardroom.
 */
// A source_ref that explicitly names a connector, e.g. "tool_call:stripe_charges",
// "tool:gmail_send", "connector:shopify". We extract the leading platform token.
const CONNECTOR_REF_PATTERN = /^(?:tool_call|tool|connector):([a-z0-9]+)(?:[_:].*)?$/i;

/**
 * Best-effort derive a credential scope (the connector platform_slug) from a
 * Worker 3 provenance source_ref. Conservative: only fires when the ref
 * explicitly names a connector, returning the leading platform token; null
 * otherwise (so a url / message id / pr / commit ref is never mis-tagged). This
 * is the sub-task 2 auto-tag path that consumes lane-03's source_ref.
 */
export function deriveCredentialScopeFromSourceRef(sourceRef: string | null | undefined): string | null {
  const ref = nonEmpty(sourceRef);
  if (ref === null) return null;
  const match = CONNECTOR_REF_PATTERN.exec(ref);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Compute the scope columns to persist for a write. When scopes are disabled
 * this returns inert nulls (and never source_agent_id) so callers keep the
 * write byte-identical to today. When enabled: shared facts default their
 * Boardroom to the writer; credential_scope is taken explicitly or auto-tagged
 * from source_ref; and a private fact's owner is pinned to the writing agent
 * (never a caller-supplied value, which would allow write-time impersonation).
 * source_agent_id is emitted ONLY for private facts, so lane-03's provenance
 * value on every other fact is left untouched.
 */
export function scopeFieldsForWrite(
  input: MemoryFactScopeFields,
  ctx: MemoryScopeContext,
  enabled: boolean,
): MemoryScopeWriteFields {
  if (!enabled) {
    return { visibility: null, boardroom_id: null, credential_scope: null };
  }

  const visibility = normalizeVisibility(input.visibility);
  const credential_scope =
    nonEmpty(input.credential_scope) ?? deriveCredentialScopeFromSourceRef(input.source_ref);
  let boardroom_id = nonEmpty(input.boardroom_id);
  if (visibility === "shared" && boardroom_id === null) {
    boardroom_id = ctx.boardroomId;
  }

  const fields: MemoryScopeWriteFields = { visibility, boardroom_id, credential_scope };
  if (visibility === "private") {
    fields.source_agent_id = ctx.agentId;
  }
  return fields;
}
