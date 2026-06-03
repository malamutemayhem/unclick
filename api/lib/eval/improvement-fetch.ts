// Pure mapping from raw Supabase rows -> live-adapter inputs.
//
// The endpoint (api/eval-truth-rate.ts) does the IO: it queries
// mc_fishbowl_todos + mc_fishbowl_comments and hands the rows here. Keeping the
// row->input mapping pure makes the whole connector unit-testable without a DB.

import type { LiveAdapterInput, BoardroomComment } from "./live-adapter.js";
import type { XPassReceiptSlice, CompletionPolicyCode } from "../score-trace.js";

/** Raw mc_fishbowl_todos row (only the columns we read). */
export interface RawTodoRow {
  id: string;
  status: string | null;
  created_by_agent_id: string | null;
  assigned_to_agent_id: string | null;
  completed_at: string | null;
  updated_at: string | null;
  lease_expires_at?: string | null;
  last_real_action_at?: string | null;
  reopened?: boolean | null;
  rolled_back?: boolean | null;
  user_corrected?: boolean | null;
  /** Optional sidecar fields some rows carry from reconcile/handoff jobs. */
  xpass_receipt?: XPassReceiptSlice | null;
  current_head_sha?: string | null;
  completion_code?: CompletionPolicyCode | null;
}

/** Raw mc_fishbowl_comments row (only the columns we read). */
export interface RawCommentRow {
  target_id: string | null;
  author_agent_id: string | null;
  text: string | null;
  /** Some deployments tag a comment as counted PASS proof; else we infer it. */
  is_pass_proof?: boolean | null;
}

// Mirror of fishbowl-completion-policy's proofPositivePattern, used to infer a
// PASS-proof comment when the row does not carry an explicit flag.
const PROOF_POSITIVE =
  /\b(pr\s*#?\d+|pull request\s*#?\d+|commit\s+[a-f0-9]{7,40}|sha\s+[a-f0-9]{7,40}|tests?\s+passed|build\s+passed|checks?\s+(?:passed|green)|ci\s+(?:passed|green)|playwright|screenshot|deployed|deployment|no[_\s-]?code[_\s-]?needed|proof:\s*\S+|receipt\s+[0-9a-f-]{8,})\b/i;

const PROOF_NEGATIVE = /\b(blocker|blocked|missing\s+proof|false\s+green|reopened)\b/i;

function inferPassProof(row: RawCommentRow): boolean {
  if (typeof row.is_pass_proof === "boolean") return row.is_pass_proof;
  const text = row.text ?? "";
  return PROOF_POSITIVE.test(text) && !PROOF_NEGATIVE.test(text);
}

/** Group raw comment rows by their target todo id. */
export function groupCommentsByTodo(
  comments: RawCommentRow[],
): Map<string, BoardroomComment[]> {
  const byTodo = new Map<string, BoardroomComment[]>();
  for (const c of comments) {
    const id = c.target_id;
    if (!id) continue;
    const list = byTodo.get(id) ?? [];
    list.push({
      author_agent_id: c.author_agent_id ?? null,
      text: c.text ?? null,
      is_pass_proof: inferPassProof(c),
    });
    byTodo.set(id, list);
  }
  return byTodo;
}

/** Map one todo row + its comments into a live-adapter input. */
export function rowToAdapterInput(
  row: RawTodoRow,
  commentsByTodo: Map<string, BoardroomComment[]>,
  nowMs: number,
): LiveAdapterInput & { jobId: string } {
  return {
    jobId: row.id,
    nowMs,
    job: {
      id: row.id,
      status: row.status ?? "open",
      created_by_agent_id: row.created_by_agent_id,
      assigned_to_agent_id: row.assigned_to_agent_id,
      completed_at: row.completed_at,
      lease_expires_at: row.lease_expires_at ?? null,
      last_real_action_at: row.last_real_action_at ?? row.updated_at ?? null,
      reopened: row.reopened ?? false,
      rolled_back: row.rolled_back ?? false,
      user_corrected: row.user_corrected ?? false,
    },
    comments: commentsByTodo.get(row.id) ?? [],
    xpassReceipt: row.xpass_receipt ?? null,
    currentHeadSha: row.current_head_sha ?? null,
    completionCode: row.completion_code ?? null,
  };
}

/** Map a full batch of rows. */
export function rowsToAdapterInputs(
  todos: RawTodoRow[],
  comments: RawCommentRow[],
  nowMs: number,
): Array<LiveAdapterInput & { jobId: string }> {
  const byTodo = groupCommentsByTodo(comments);
  return todos.map((row) => rowToAdapterInput(row, byTodo, nowMs));
}
