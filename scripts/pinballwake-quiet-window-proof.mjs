const DEFAULT_QUIET_WINDOW = { startHourUtc: 22, endHourUtc: 7 };

const RECEIPT_TYPE_PASS = "quiet_window_proof_pass";
const RECEIPT_TYPE_HOLD = "quiet_window_proof_hold";
const RECEIPT_TYPE_BLOCKER = "quiet_window_proof_blocker";

const NOT_CLEAN_TOKENS = new Set([
  "manual",
  "manual_chat",
  "operator_chat",
  "user_chat",
  "human_chat",
  "workflow_dispatch",
]);

const REQUIRED_RUNGS = [
  {
    id: "heartbeat_tick",
    aliases: ["heartbeat_tick", "scheduled_tick", "scheduled_heartbeat_tick", "tick"],
  },
  {
    id: "buildbait_crumb",
    aliases: ["buildbait_crumb", "buildbait", "crumb", "job_crumb"],
  },
  {
    id: "claim_or_lease",
    aliases: ["claim_or_lease", "claim", "claimed", "lease", "lease_claimed"],
  },
  {
    id: "execution_packet",
    aliases: ["execution_packet", "execution", "execute_packet"],
  },
  {
    id: "build_attempt_or_commonsensepass_blocker",
    aliases: [
      "build_attempt_or_commonsensepass_blocker",
      "build_attempt_or_commonsense_blocker",
      "build_attempt",
      "build_result",
      "commonsensepass_blocker",
      "explicit_commonsensepass_blocker",
      "commonsense_blocker",
    ],
  },
  {
    id: "proof_packet",
    aliases: ["proof_packet", "proof", "proof_submitted"],
  },
  {
    id: "terminal_receipt",
    aliases: ["terminal_receipt", "terminal", "terminal_state", "done", "blocked", "hold"],
  },
];

const BLOCKER_RUNGS = new Set([
  "build_attempt_or_commonsensepass_blocker",
  "proof_packet",
  "terminal_receipt",
]);

function token(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function eventTokens(event = {}) {
  const values = typeof event === "string"
    ? [event]
    : [
        event.rung,
        event.kind,
        event.type,
        event.name,
        event.event,
        event.action,
        event.status,
        event.result,
        event.reason,
        event.receipt_kind,
        event.source,
        event.source_type,
        event.trigger_source,
        event.authorId,
        event.author_id,
        event.author_agent_id,
      ];
  return new Set(values.map(token).filter(Boolean));
}

function eventTimeMs(event = {}) {
  if (typeof event === "string") return null;
  const raw = event.at ?? event.time ?? event.timestamp ?? event.created_at ?? event.createdAt;
  const ms = Date.parse(String(raw ?? ""));
  return Number.isFinite(ms) ? ms : null;
}

function isInsideWindow(event, startMs, endMs) {
  const ms = eventTimeMs(event);
  if (!Number.isFinite(ms)) return true;
  if (Number.isFinite(startMs) && ms < startMs) return false;
  if (Number.isFinite(endMs) && ms > endMs) return false;
  return true;
}

function hasNotCleanToken(tokens) {
  return [...tokens].some((value) =>
    NOT_CLEAN_TOKENS.has(value) ||
    value.startsWith("human_") ||
    value.startsWith("human_chris") ||
    value.includes("manual") ||
    value.includes("operator_chat") ||
    value.includes("human_chat") ||
    value.includes("user_chat")
  );
}

function hasRung(events, aliases) {
  const wanted = new Set(aliases.map(token));
  return events.some((event) => {
    const tokens = eventTokens(event);
    return [...wanted].some((alias) => tokens.has(alias));
  });
}

function result({ verdict, reasonCode, reason = reasonCode, firstMissingRung = null, evidence, nextAction }) {
  return {
    ok: verdict === "PASS",
    verdict,
    receipt_type: verdict === "PASS"
      ? RECEIPT_TYPE_PASS
      : verdict === "BLOCKER"
        ? RECEIPT_TYPE_BLOCKER
        : RECEIPT_TYPE_HOLD,
    reason,
    reason_code: reasonCode,
    hold_reason: verdict === "HOLD" ? reasonCode : undefined,
    blocker_reason: verdict === "BLOCKER" ? reasonCode : undefined,
    first_missing_rung: firstMissingRung,
    evidence,
    next_action: nextAction,
    proof_required: REQUIRED_RUNGS.map((rung) => rung.id),
  };
}

export function isInQuietWindow(date, window = DEFAULT_QUIET_WINDOW) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("isInQuietWindow requires a valid Date");
  }
  const hour = date.getUTCHours();
  const start = Number(window.startHourUtc);
  const end = Number(window.endHourUtc);
  if (start === end) return true;
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

export function evaluateQuietWindowProof(input = {}) {
  const events = Array.isArray(input.events) ? input.events : [];
  const windowStart = input.window_start ?? input.windowStart ?? input.window?.start ?? input.window?.window_start ?? "";
  const windowEnd = input.window_end ?? input.windowEnd ?? input.window?.end ?? input.window?.window_end ?? "";
  const windowStartMs = Date.parse(String(windowStart));
  const windowEndMs = Date.parse(String(windowEnd));
  const triggerSource = token(input.trigger_source ?? input.triggerSource ?? input.source ?? "");
  const observedRungs = REQUIRED_RUNGS
    .filter((rung) => hasRung(events, rung.aliases))
    .map((rung) => rung.id);
  const evidence = {
    window_start: windowStart || null,
    window_end: windowEnd || null,
    trigger_source: triggerSource || null,
    job_id: input.job_id ?? input.jobId ?? null,
    claim_id: input.claim_id ?? input.claimId ?? null,
    run_id: input.run_id ?? input.runId ?? input.heartbeatRunId ?? null,
    observed_rungs: observedRungs,
  };

  if (!windowStart || !Number.isFinite(windowStartMs)) {
    return result({
      verdict: "HOLD",
      reasonCode: "quiet_window_missing_start",
      firstMissingRung: "window_start",
      evidence,
      nextAction: "record_window_start",
    });
  }

  if (!windowEnd || !Number.isFinite(windowEndMs)) {
    return result({
      verdict: "HOLD",
      reasonCode: "quiet_window_missing_end",
      firstMissingRung: "window_end",
      evidence,
      nextAction: "record_window_end",
    });
  }

  if (hasNotCleanToken(new Set([triggerSource]))) {
    return result({
      verdict: "HOLD",
      reasonCode: "not_clean_autonomy_proof",
      firstMissingRung: "scheduled_trigger",
      evidence,
      nextAction: "wait_for_scheduled_unclick_heartbeat_window",
    });
  }

  const notCleanEvent = events.find((event) =>
    isInsideWindow(event, windowStartMs, windowEndMs) && hasNotCleanToken(eventTokens(event))
  );
  if (notCleanEvent) {
    return result({
      verdict: "HOLD",
      reasonCode: "not_clean_autonomy_proof",
      firstMissingRung: "no_human_operator_chat_trigger",
      evidence,
      nextAction: "restart_window_after_human_or_operator_activity",
    });
  }

  for (const rung of REQUIRED_RUNGS) {
    if (observedRungs.includes(rung.id)) continue;
    const verdict = BLOCKER_RUNGS.has(rung.id) ? "BLOCKER" : "HOLD";
    return result({
      verdict,
      reasonCode: `quiet_window_missing_${rung.id}`,
      firstMissingRung: rung.id,
      evidence,
      nextAction: `record_${rung.id}`,
    });
  }

  return result({
    verdict: "PASS",
    reasonCode: "quiet_window_autonomy_proof_complete",
    evidence,
    nextAction: "submit_terminal_proof_receipt",
  });
}

export async function proveQuietWindow({
  heartbeatRunId,
  runTime,
  targetTodoId,
  room,
  window = DEFAULT_QUIET_WINDOW,
  since,
  triggerSource = "schedule",
  events = [],
} = {}) {
  if (!heartbeatRunId) throw new TypeError("proveQuietWindow requires heartbeatRunId");
  if (!(runTime instanceof Date) || Number.isNaN(runTime.getTime())) {
    throw new TypeError("proveQuietWindow requires runTime: Date");
  }
  if (!targetTodoId) throw new TypeError("proveQuietWindow requires targetTodoId");
  if (!room || typeof room.listCrumbs !== "function") {
    throw new TypeError("proveQuietWindow requires a buildbait room with listCrumbs");
  }

  const quiet = isInQuietWindow(runTime, window);
  const windowStart = since instanceof Date ? since : runTime;
  const baseEvents = [
    { rung: "heartbeat_tick", at: runTime.toISOString(), trigger_source: triggerSource },
    ...events,
  ];

  if (!quiet) {
    return result({
      verdict: "HOLD",
      reasonCode: "outside_quiet_window",
      firstMissingRung: "quiet_window",
      evidence: {
        window_start: windowStart.toISOString(),
        window_end: runTime.toISOString(),
        trigger_source: token(triggerSource),
        job_id: targetTodoId,
        claim_id: null,
        run_id: heartbeatRunId,
        observed_rungs: ["heartbeat_tick"],
      },
      nextAction: "rerun_during_quiet_window",
    });
  }

  const crumbs = await room.listCrumbs({ todoId: targetTodoId });
  const crumbEvents = (crumbs ?? []).map((crumb) => ({
    rung: "buildbait_crumb",
    at: crumb.createdAt,
    authorId: crumb.authorId,
    comment_id: crumb.commentId,
    step: crumb.step,
  }));

  return evaluateQuietWindowProof({
    window_start: windowStart.toISOString(),
    window_end: runTime.toISOString(),
    trigger_source: triggerSource,
    job_id: targetTodoId,
    run_id: heartbeatRunId,
    events: [...baseEvents, ...crumbEvents],
  });
}

export const __testing__ = {
  BLOCKER_RUNGS,
  DEFAULT_QUIET_WINDOW,
  NOT_CLEAN_TOKENS,
  RECEIPT_TYPE_BLOCKER,
  RECEIPT_TYPE_HOLD,
  RECEIPT_TYPE_PASS,
  REQUIRED_RUNGS,
};
