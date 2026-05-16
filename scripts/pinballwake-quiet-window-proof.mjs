// scripts/pinballwake-quiet-window-proof.mjs
//
// Quiet-window autonomy proof.
//
// Given a heartbeat run id (or current time), asserts that:
//   1. The run happened during the configured quiet window (default: 22:00–07:00 UTC),
//   2. An autonomous step actually landed (at least one BuildBait crumb was posted
//      to a target todo by an AI seat, no operator typing involved),
//   3. A proof receipt is emitted in the canonical receipt shape.
//
// The proof receipt mirrors the receipt shape that already exists on main per
// `pinballwake-continuous-improvement-room.mjs` (receipt_type, emitted_at,
// evidence, next_action, proof_required, xpass_advisory). It's intended to be
// posted back to UnClick as a Boardroom message or a todo comment by whatever
// caller runs this proof (typically the autonomous runner).
//
// This module exports pure functions so it's testable without hitting UnClick.

const DEFAULT_QUIET_WINDOW = { startHourUtc: 22, endHourUtc: 7 }; // wraps midnight

const RECEIPT_TYPE_PASS = "quiet_window_proof_pass";
const RECEIPT_TYPE_HOLD = "quiet_window_proof_hold";

const PROOF_REQUIRED_FIELDS = ["heartbeat_run_id", "crumb_comment_id", "crumb_todo_id"];

export function isInQuietWindow(date, window = DEFAULT_QUIET_WINDOW) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("isInQuietWindow requires a valid Date");
  }
  const h = date.getUTCHours();
  const { startHourUtc, endHourUtc } = window;
  if (startHourUtc === endHourUtc) return true; // 24h quiet
  if (startHourUtc < endHourUtc) {
    return h >= startHourUtc && h < endHourUtc;
  }
  // wraps midnight (e.g. 22..7)
  return h >= startHourUtc || h < endHourUtc;
}

export function isAiSeatId(seatId) {
  if (typeof seatId !== "string" || seatId.length === 0) return false;
  if (seatId.startsWith("human-")) return false;
  // Known AI seat name prefixes from the fleet.
  return /^(claude-|chatgpt-|codex-|pinballwake-|cascade-|cowork-|unclick-|buildbait-)/i.test(seatId);
}

export function pickAutonomousCrumb({ crumbs, since }) {
  if (!Array.isArray(crumbs)) return null;
  for (const c of crumbs) {
    if (!c?.createdAt || !c?.authorId) continue;
    const createdAt = new Date(c.createdAt);
    if (Number.isNaN(createdAt.getTime())) continue;
    if (since instanceof Date && createdAt < since) continue;
    if (!isAiSeatId(c.authorId)) continue;
    return c;
  }
  return null;
}

export function buildHoldReceipt({ reason, heartbeatRunId, evidence = {} }) {
  return {
    receipt_type: RECEIPT_TYPE_HOLD,
    emitted_at: new Date().toISOString(),
    evidence: { heartbeat_run_id: heartbeatRunId ?? null, ...evidence },
    next_action: "rerun_during_quiet_window",
    proof_required: PROOF_REQUIRED_FIELDS,
    xpass_advisory: false,
    hold_reason: reason,
  };
}

export function buildPassReceipt({ heartbeatRunId, crumb, evidence = {} }) {
  return {
    receipt_type: RECEIPT_TYPE_PASS,
    emitted_at: new Date().toISOString(),
    evidence: {
      heartbeat_run_id: heartbeatRunId,
      crumb_comment_id: crumb?.commentId ?? null,
      crumb_todo_id: crumb?.todoId ?? null,
      crumb_step: crumb?.step ?? null,
      crumb_author_id: crumb?.authorId ?? null,
      crumb_created_at: crumb?.createdAt ?? null,
      ...evidence,
    },
    next_action: "advance_buildbait_ladder",
    proof_required: PROOF_REQUIRED_FIELDS,
    xpass_advisory: true,
  };
}

/**
 * proveQuietWindow runs the full check.
 *
 * @param {object} args
 * @param {string} args.heartbeatRunId
 * @param {Date}   args.runTime
 * @param {string} args.targetTodoId
 * @param {object} args.room              - buildbait-room instance (createBuildbaitRoom result)
 * @param {object} [args.window]          - quiet window override
 * @param {Date}   [args.since]           - only count crumbs created at-or-after this time
 * @returns {Promise<object>} receipt
 */
export async function proveQuietWindow({
  heartbeatRunId,
  runTime,
  targetTodoId,
  room,
  window = DEFAULT_QUIET_WINDOW,
  since,
}) {
  if (!heartbeatRunId) {
    throw new TypeError("proveQuietWindow requires heartbeatRunId");
  }
  if (!(runTime instanceof Date)) {
    throw new TypeError("proveQuietWindow requires runTime: Date");
  }
  if (!targetTodoId) {
    throw new TypeError("proveQuietWindow requires targetTodoId");
  }
  if (!room || typeof room.listCrumbs !== "function") {
    throw new TypeError("proveQuietWindow requires a buildbait-room with listCrumbs");
  }

  if (!isInQuietWindow(runTime, window)) {
    return buildHoldReceipt({
      reason: "outside_quiet_window",
      heartbeatRunId,
      evidence: {
        run_time: runTime.toISOString(),
        quiet_window_start_utc: window.startHourUtc,
        quiet_window_end_utc: window.endHourUtc,
      },
    });
  }

  let crumbs;
  try {
    crumbs = await room.listCrumbs({ todoId: targetTodoId });
  } catch (err) {
    return buildHoldReceipt({
      reason: "room_listCrumbs_failed",
      heartbeatRunId,
      evidence: { error_message: String(err?.message ?? err) },
    });
  }

  const autonomous = pickAutonomousCrumb({ crumbs, since });
  if (!autonomous) {
    return buildHoldReceipt({
      reason: "no_autonomous_crumb_in_window",
      heartbeatRunId,
      evidence: {
        run_time: runTime.toISOString(),
        target_todo_id: targetTodoId,
        since: since instanceof Date ? since.toISOString() : null,
        crumb_count: crumbs.length,
      },
    });
  }

  return buildPassReceipt({
    heartbeatRunId,
    crumb: { ...autonomous, todoId: targetTodoId },
  });
}

export const __testing__ = {
  DEFAULT_QUIET_WINDOW,
  RECEIPT_TYPE_PASS,
  RECEIPT_TYPE_HOLD,
  PROOF_REQUIRED_FIELDS,
};
