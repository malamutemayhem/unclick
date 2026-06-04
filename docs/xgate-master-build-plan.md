# XGate Master Build Plan

UnClick's pre-execution guardrail family. This is the single source of truth for
a 10-builder parallel build. Every builder reads this whole file, then executes
only their assigned Part. The shared contract in Section 4 is FROZEN: code to it
exactly so the parts compose without rework.

Status: build plan. Derived from two deep-research reports (XGate_1_2,
XGate_2_2) plus a direct audit of the UnClick codebase.

---

## 1. What UnClick is (context for every builder)

UnClick is an "AI agent operating system": one npm install gives any MCP client
(Claude, GPT, Gemini, etc.) access to 450+ callable endpoints across 60+
integrations PLUS persistent cross-session memory. It is a harness around
frontier models it does not train. Repo layout that matters here:

- `api/` and `api/lib/` - Vercel serverless functions + pure helper libs (ESM).
- `packages/mcp-server/` - the published MCP server and tool wiring.
- `src/pages/admin/` - the React admin UI.
- `supabase/migrations/` - Postgres migrations (service-role-only tables).

UnClick already has a verification family, **XPass** (testpass, uxpass, flowpass,
securitypass, seopass, legalpass, compliancepass, geopass, copypass,
commonsensepass, sloppass), that runs AFTER work and emits a SHA-bound proof
receipt (`xpass_receipt_v1`). XPass answers "did this happen correctly?"

## 2. The gap XGate fills

UnClick guards strongly post-hoc (XPass) but has NO pre-execution interception.
The canonical failures this prevents (all real incidents): an agent force-pushed
to main during an unattended run; an agent wiped a production database during an
explicit freeze (Replit, July 2025); agents commit `.env` files; agents run
`DROP TABLE` / `rm -rf`. These are "Layer 2 (Guardrails)" failures: prompts can
be ignored, but a gate that fires BEFORE the action cannot be.

**XGate is the mirror of XPass.** XPass proves what happened (after); XGate
decides what is allowed to happen (before).

    XGate (may it happen?) -> action -> XPass (did it happen correctly?)

## 3. Architecture and non-negotiable principles

From the research, these are load-bearing. Violating them produces a guard that
is bypassed or disabled:

1. **Deterministic, allowlist-first, parsed - never regex blocklists.** Cursor's
   command denylist was bypassed four ways (Base64, subshell, script-file,
   multi-quote) and deprecated. Parse to structure (argv via a bash tokenizer,
   SQL via a SQL parser); enumerate what is allowed; deny-by-default the rest.
2. **Fail closed.** Unparseable or unknown input escalates ("ask") or denies,
   never silently allows.
3. **The MCP tool router is the portable enforcement point - for UnClick's own
   tools only.** A gate there travels across every client and all 60+
   integrations. It CANNOT see shell the client runs through its own Bash tool;
   that must be delegated to client hooks (Claude Code PreToolUse) or
   OS/container sandboxing. State this boundary plainly; never imply full
   coverage.
4. **Approval fatigue is real (93% of prompts get approved blindly).** Keep safe
   work frictionless so the rare irreversible prompt still gets read. Never make
   safety depend solely on a human clicking approve.
5. **Environment + autonomy axes.** dev permissive, prod strict; interactive can
   prompt, unattended (2 AM cron) must hard-deny destructive by default rather
   than block-and-wait.
6. **Prefer server-side platform controls where they exist** (GitHub branch
   protection, read-only DB roles, IAM). XGate is defense-in-depth on top.
7. **Lethal trifecta / taint.** Once a session ingests untrusted content, any
   exfiltration-capable action (outbound HTTP, send, PR create) escalates or
   denies for the rest of that turn.
8. **Every decision writes one immutable control-ledger entry** with the rule ID
   that fired, so a denial is a reviewable address. Secrets redacted before
   storage.

Three enforcement layers (know which one you are building):
- **Layer A - XGate policy gate in the MCP/tool path (UnClick OWNS).** Parts 1-8.
- **Layer B - delegated client hooks (UnClick GENERATES configs).** Part 9.
- **Layer C - delegated OS/container + platform controls (UnClick RECOMMENDS).**
  Documented in Part 10, not reimplemented.

## 4. FROZEN shared contract (Part 1 owns; all parts code to this)

All gates are pure functions of a context. Builder 1 ships this file exactly;
builders 2-8 import it and implement a `Gate`. Do not change these signatures.

File: `api/lib/xgate/types.ts`

```ts
export type ActionClass =
  | "filesystem" | "git" | "sql" | "secret" | "ship"
  | "spend" | "scope" | "shell" | "network" | "send";

export type Environment = "dev" | "staging" | "prod";
export type AutonomyLevel = "interactive" | "unattended";
export type GateVerdict = "allow" | "deny" | "ask" | "rewrite";

export interface ActionDescriptor {
  class: ActionClass;
  /** Raw command / SQL / payload the agent wants to run. */
  raw: string;
  /** The tool name requesting it (UnClick tool id or client tool). */
  tool: string;
  /** Optional gate-specific parsed form (argv[], SQL AST, diff, ...). */
  parsed?: unknown;
  /** Target environment if the action names one. */
  targetEnv?: Environment;
  /** Estimated USD cost, for SpendGate. */
  estimatedSpendUsd?: number;
  /** Files the action would touch, if known (for ScopeGate). */
  targetFiles?: string[];
}

export interface GateContext {
  action: ActionDescriptor;
  environment: Environment;
  autonomyLevel: AutonomyLevel;
  /** ScopePack owned files, if a scope is active. */
  ownedFiles?: string[];
  /** True if the session has ingested untrusted content this turn. */
  tainted?: boolean;
  /** Epoch ms, injected so gates stay pure. */
  now: number;
}

export interface GateResult {
  gate: string;        // e.g. "SecretGate"
  verdict: GateVerdict;
  ruleId: string;      // e.g. "secret.aws_access_key" - the address of a rule
  reason: string;      // human-readable
  rewritten?: string;  // present only when verdict === "rewrite"
  evidence: string[];  // parsed argv, matched signature, etc. (redacted)
}

/** A gate is a pure function. It must never throw; on doubt return "ask". */
export type Gate = (ctx: GateContext) => GateResult;

/** Verdict precedence when combining gates: deny > ask > rewrite > allow. */
export const VERDICT_PRECEDENCE: Record<GateVerdict, number> = {
  deny: 3, ask: 2, rewrite: 1, allow: 0,
};
```

Also in Part 1, `api/lib/xgate/policy-engine.ts`:

```ts
import { Gate, GateContext, GateResult, GateVerdict, VERDICT_PRECEDENCE } from "./types.js";

export interface PolicyDecision {
  verdict: GateVerdict;
  results: GateResult[];     // every gate's result
  deciding: GateResult;      // the most-restrictive one that set the verdict
}

/** Run all gates, combine fail-closed (most restrictive wins). Pure. */
export function evaluateGates(gates: Gate[], ctx: GateContext): PolicyDecision { /* Builder 1 */ }
```

And `api/lib/xgate/ledger.ts` (pure builder; persistence is Part 8/9):

```ts
export interface ControlLedgerEntry {
  ts: string; agent_id: string | null; session_id: string | null;
  client: string | null; model: string | null;
  action_class: string; tool: string; target: string; environment: string;
  verdict: string; rule_id: string; reason: string;
  authority: "auto" | "human" | "token" | "kill_switch";
  proof_ref?: string | null;     // xpass_receipt_v1 / commit SHA
  reversal?: string | null;
}
export function buildLedgerEntry(/* ... */): ControlLedgerEntry { /* Builder 1 */ }
export function redactSecrets(text: string): string { /* Builder 1 */ }
```

## 5. The 10 parts (file ownership = no-stomp boundaries)

Each builder creates ONLY the files listed under their part. Only Part 9 edits
pre-existing files. Everyone else is purely additive.

| Part | Owner builds | Touches existing files? |
|---|---|---|
| 1 | `api/lib/xgate/types.ts`, `policy-engine.ts`, `ledger.ts` (+ tests) | No |
| 2 | `api/lib/xgate/gates/secret-gate.ts` (+ test) | No |
| 3 | `api/lib/xgate/gates/data-gate.ts` (+ test) | No |
| 4 | `api/lib/xgate/gates/git-gate.ts` (+ test) | No |
| 5 | `api/lib/xgate/gates/command-gate.ts` (+ test) | No |
| 6 | `api/lib/xgate/gates/ship-gate.ts` (+ test) | No |
| 7 | `api/lib/xgate/gates/scope-gate.ts`, `spend-gate.ts` (+ tests) | No |
| 8 | `api/lib/xgate/kill-switch.ts`, `autonomy.ts` (+ tests), migration | No (new migration file) |
| 9 | `api/xgate-check.ts` endpoint, `api/lib/xgate/registry.ts`, client-hook config generator | YES (tool path, vercel.json) |
| 10 | `src/pages/admin/AdminXGate.tsx`, eval fixtures, `docs/xgate-*.md` | YES (App.tsx, AdminShell nav) |

## 6. Conventions every builder MUST follow (from the codebase)

- **ESM imports use `.js` extensions** in `api/lib` (e.g. `import { Gate } from "../types.js"`). The build (`tsc`) and the `test:api-lib-esm-extension` guard enforce this. A `.ts` extension FAILS CI.
- **No em dashes or en dashes** anywhere (code, comments, docs). Use a hyphen or restructure. There is a naming-audit and style rule; CI-adjacent checks flag them.
- **Pure functions; gates never throw.** On any doubt or parse failure, return `verdict: "ask"`. IO (DB, network) lives only in the Part 9 endpoint, never in a gate.
- **Tests co-located as `*.test.ts`** next to the file. They run under the ROOT vitest (`api/**` is included). Prove your part with: `npx vitest run api/lib/xgate/...`.
- **Allowlist + parse, not regex blocklist.** Parse to argv/SQL/structure; deny-by-default.
- **Determinism in tests:** inject `now` and any randomness; no wall-clock, no network.
- **Migrations** (Part 8): new file `supabase/migrations/<timestamp>_xgate.sql`; enable RLS; `revoke all from anon, authenticated; grant all to service_role`; additive only; no drops.
- **Verify before claiming done:** run your vitest, run `npm run test:api-lib-esm-extension` (Part 9 also `npm run build`), and grep your files for em dashes. Commit to branch `claude/xgate-part-<N>-<slug>`, open a DRAFT PR, do not merge.

## 7. Definition of done (per part)

1. Files created exactly under your ownership; nothing outside it.
2. Your vitest passes; no `.ts` import extensions; no em/en dashes.
3. Gates return only `allow|deny|ask|rewrite`, never throw, code to the frozen
   contract unchanged.
4. Draft PR opened against the integration branch; PR body states what is proven
   vs delegated (especially the client-shell boundary for Parts 5 and 9).

## 8. Hard limits to keep stating (do not oversell)

- An MCP server cannot guard shell the client runs outside MCP. Parts 5 and 9
  must say this plainly; client-shell coverage is delegated to client hooks /
  sandboxes, and many MCP clients have no hook system (those users get
  UnClick-tool coverage only).
- Egress allowlists are not exfiltration defense (approved-domain exfiltration
  is real). Taint-gating (principle 7) is the structural defense.
- Every probabilistic classifier misses; XGate's value is constraining blast
  radius and producing a reconstructable ledger, not making the agent
  trustworthy. Prefer server-side platform controls as the backstop.
