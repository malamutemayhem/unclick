// Live adapter: turn a real Boardroom (Fishbowl) job into a RunTrace that
// scoreTrace() can grade. This is the bridge from "synthetic fixtures" to
// "score what actually happened", and it is the piece that closes the
// continuous-improvement loop (docs/path-a-eval-harness-spec.md).
//
// It reads the SAME real surfaces the rest of UnClick already produces:
//   - the Boardroom todo (status, owner, creator, lease, completed_at)
//   - the job's comments (to find a separate verifier who posted PASS proof)
//   - the xpass aggregated receipt for the job's target, if any
//   - the recorded completion-policy code, if any
// It never trusts an agent's own "done"; the disposition and proof come from
// observed state, not self-report.
//
// Pure and deterministic: pass `nowMs` in. No DB, no network, no clock.

import type { RunTrace, RunDisposition, XPassReceiptSlice, CompletionPolicyCode } from "../score-trace.js";

/** Minimal slice of a Boardroom todo row the adapter needs. */
export interface BoardroomJob {
  id: string;
  status: "open" | "in_progress" | "done" | "dropped" | string;
  created_by_agent_id?: string | null;
  assigned_to_agent_id?: string | null;
  completed_at?: string | null;
  /** Lease expiry for the current owner, if leased. */
  lease_expires_at?: string | null;
  /** Last time the owner did real work, used to detect stale ownership. */
  last_real_action_at?: string | null;
  /** True if this job was closed and later reopened (a false-green tell). */
  reopened?: boolean;
  /** True if the change linked to this job was rolled back. */
  rolled_back?: boolean;
  /** True if a human corrected the outcome after it was reported done. */
  user_corrected?: boolean;
}

/** A comment on the job; we use it to find an independent PASS verifier. */
export interface BoardroomComment {
  author_agent_id?: string | null;
  text?: string | null;
  /** Marks a comment that the completion policy counted as PASS proof. */
  is_pass_proof?: boolean;
}

export interface LiveAdapterInput {
  job: BoardroomJob;
  comments?: BoardroomComment[];
  /** The xpass aggregated receipt for the job target, if one was produced. */
  xpassReceipt?: XPassReceiptSlice | null;
  /** Current PR/target head SHA, so the receipt's head binding can be checked. */
  currentHeadSha?: string | null;
  /** The completion-policy code recorded when the job was closed, if any. */
  completionCode?: CompletionPolicyCode | null;
  /** Now, in epoch ms. Required so this stays pure. */
  nowMs: number;
  /** How long with no real action before an owned job counts as stale. */
  staleAfterMs?: number;
}

const DEFAULT_STALE_AFTER_MS = 24 * 60 * 60 * 1000; // 24h, matches the heartbeat norm

function toMs(value: string | null | undefined): number | null {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : t;
}

/** Decide the observed disposition from real job state, not self-report. */
export function deriveDisposition(input: LiveAdapterInput): RunDisposition {
  const { job, nowMs } = input;

  if (job.reopened) return "reopened";
  if (job.status === "done") return "closed";
  if (job.status === "dropped") return "abandoned";

  // open or in_progress: is the owner stale?
  const staleAfter = input.staleAfterMs ?? DEFAULT_STALE_AFTER_MS;
  const leaseExpired = (() => {
    const exp = toMs(job.lease_expires_at);
    return exp !== null && exp < nowMs;
  })();
  const ownerIdle = (() => {
    const last = toMs(job.last_real_action_at);
    return last !== null && nowMs - last > staleAfter;
  })();
  const owned = !!job.assigned_to_agent_id;

  if (owned && (leaseExpired || ownerIdle)) return "stale";
  return "open";
}

/** Find an independent verifier: a PASS-proof comment by someone other than the closer/creator. */
function findVerifier(input: LiveAdapterInput, closerAgentId: string | null): string | null {
  const creator = input.job.created_by_agent_id ?? null;
  for (const c of input.comments ?? []) {
    if (!c.is_pass_proof) continue;
    const author = c.author_agent_id ?? null;
    if (!author) continue;
    if (author !== closerAgentId && author !== creator) return author;
  }
  return null;
}

/** Convert a real Boardroom job into the RunTrace scoreTrace() expects. */
export function jobToRunTrace(input: LiveAdapterInput): RunTrace {
  const disposition = deriveDisposition(input);
  // The closer is the assignee if present, else the creator.
  const closerAgentId =
    input.job.assigned_to_agent_id ?? input.job.created_by_agent_id ?? null;
  const verifierAgentId = findVerifier(input, closerAgentId);

  return {
    disposition,
    closerAgentId,
    verifierAgentId,
    xpassReceipt: input.xpassReceipt ?? null,
    currentHeadSha: input.currentHeadSha ?? null,
    completionCode: input.completionCode ?? null,
    userCorrected: input.job.user_corrected === true,
    rolledBack: input.job.rolled_back === true,
  };
}
