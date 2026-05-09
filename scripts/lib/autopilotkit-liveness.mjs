const DEFAULT_ACTIVE_MS = 15 * 60 * 1000;
const DEFAULT_WARM_MS = 60 * 60 * 1000;
const DEFAULT_DORMANT_MS = 24 * 60 * 60 * 1000;
const DEFAULT_COORDINATOR_FALLBACK_MS = 2 * 60 * 60 * 1000;

const SENSITIVE_KEY_RE = /(api[_-]?key|secret|token|password|credential|authorization|cookie)/i;
const SENSITIVE_TEXT_RE =
  /(authorization:\s*bearer\s+\S+|uc_[a-f0-9]{16,}|sk-[a-z0-9_-]{12,}|gh[pousr]_[a-z0-9_]{20,})/i;

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

export function sanitizeAdvisoryText(value, max = 500) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (SENSITIVE_TEXT_RE.test(text)) return "[redacted-sensitive-text]";
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function safeString(key, value, max = 160) {
  if (SENSITIVE_KEY_RE.test(key)) return "[redacted-sensitive-field]";
  return sanitizeAdvisoryText(value, max);
}

export function parseMs(value) {
  const parsed = Date.parse(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function ageMs(nowMs, value) {
  const parsed = parseMs(value);
  return parsed === null ? null : Math.max(0, nowMs - parsed);
}

function minutes(value) {
  return value === null ? null : Math.round(value / 60000);
}

export function normalizeLivenessThresholds(input = {}) {
  return {
    activeMs: input.activeMs ?? DEFAULT_ACTIVE_MS,
    warmMs: input.warmMs ?? DEFAULT_WARM_MS,
    dormantMs: input.dormantMs ?? DEFAULT_DORMANT_MS,
    coordinatorFallbackMs: input.coordinatorFallbackMs ?? DEFAULT_COORDINATOR_FALLBACK_MS,
  };
}

export function inferAutoPilotKitLane(profile = {}) {
  const haystack = normalize([
    profile.agent_id,
    profile.display_name,
    profile.user_agent_hint,
    profile.current_status,
    profile.emoji,
  ].filter(Boolean).join(" "));

  if (/\b(master|coordinator|orchestrator)\b/.test(haystack)) return "coordinator";
  if (/\b(review|reviewer|cowork-seat)\b/.test(haystack)) return "reviewer";
  if (/\b(builder|forge|worker2|coding)\b/.test(haystack)) return "builder";
  if (/\b(test|testpass|qc|quality)\b/.test(haystack)) return "tester";
  if (/\b(safety|gatekeeper)\b/.test(haystack)) return "safety-checker";
  if (/\b(loop|continuous improvement|improver)\b/.test(haystack)) return "improver";
  if (/\b(navigator|planner|planning)\b/.test(haystack)) return "planner";
  if (/\b(relay|watcher|tether|heartbeat)\b/.test(haystack)) return "watcher";
  if (/\b(courier|messenger)\b/.test(haystack)) return "messenger";
  if (/\b(publish|publisher|queuepush)\b/.test(haystack)) return "publisher";
  if (/\b(job|jobs manager|scopepack)\b/.test(haystack)) return "jobs-manager";
  return "unknown";
}

export function classifySeatFreshness(age, thresholds) {
  if (age === null) return "unknown";
  if (age <= thresholds.activeMs) return "active";
  if (age <= thresholds.warmMs) return "warm";
  if (age <= thresholds.dormantMs) return "stale";
  return "dormant";
}

function statusReasons(profile = {}, nowMs, thresholds) {
  const reasons = [];
  const seenAge = ageMs(nowMs, profile.last_seen_at);
  const statusAge = ageMs(nowMs, profile.current_status_updated_at);
  const nextCheckinAt = parseMs(profile.next_checkin_at);
  const nextCheckinAge = ageMs(nowMs, profile.next_checkin_at);

  if (seenAge === null) reasons.push("missing_last_seen");
  if (profile.next_checkin_at && nextCheckinAge !== null && nextCheckinAt !== null && nextCheckinAt < nowMs) {
    reasons.push("missed_next_checkin");
  }
  if (statusAge !== null && statusAge > thresholds.warmMs && !profile.current_status) {
    reasons.push("no_recent_status");
  }
  if (/deferred deep review|awaiting independent reviewer|actual diff pass deferred/i.test(String(profile.current_status ?? ""))) {
    reasons.push("deferred_review_or_ack_only");
  }

  return reasons;
}

export function normalizeSeatLiveness(profile = {}, options = {}) {
  const nowMs = options.nowMs;
  if (!Number.isFinite(nowMs)) throw new Error("nowMs required");

  const thresholds = normalizeLivenessThresholds(options.thresholds);
  const lane = inferAutoPilotKitLane(profile);
  const lastSeenAge = ageMs(nowMs, profile.last_seen_at);
  const freshness = classifySeatFreshness(lastSeenAge, thresholds);
  const reasons = statusReasons(profile, nowMs, thresholds);
  if (lane === "coordinator" && (lastSeenAge === null || lastSeenAge > thresholds.coordinatorFallbackMs)) {
    reasons.push("coordinator_fallback_needed");
  }

  return {
    agent_id: safeString("agent_id", profile.agent_id),
    display_name: safeString("display_name", profile.display_name),
    lane,
    freshness,
    last_seen_at: profile.last_seen_at || null,
    last_seen_age_minutes: minutes(lastSeenAge),
    current_status_updated_at: profile.current_status_updated_at || null,
    next_checkin_at: profile.next_checkin_at || null,
    reasons,
  };
}

export function extractMissedAckSignals(messages = []) {
  return safeList(messages)
    .filter((message) => {
      const text = `${message.text ?? ""} ${safeList(message.tags).join(" ")}`;
      return /missed ack|auto-reroute|wakepass/i.test(text);
    })
    .map((message) => ({
      message_id: safeString("message_id", message.id, 160),
      created_at: message.created_at || message.createdAt || "",
      recipients: safeList(message.recipients).map((recipient) => safeString("recipient", recipient, 80)),
      excerpt: sanitizeAdvisoryText(message.text, 400),
    }));
}

export function buildAdvisoryRerouteActions({ workers = [], missedAckReroutes = [] } = {}) {
  const actions = [];
  const coordinatorDormant = workers.some(
    (worker) => worker.lane === "coordinator" && worker.reasons.includes("coordinator_fallback_needed"),
  );
  const deferredReviewSeats = workers.filter((worker) => worker.reasons.includes("deferred_review_or_ack_only"));

  if (coordinatorDormant) {
    actions.push({
      action: "activate_second_tier_coordinator",
      reason: "coordinator_fallback_needed",
      target_lane: "coordinator",
      advisory: true,
    });
  }
  for (const reroute of missedAckReroutes) {
    actions.push({
      action: "reroute_missed_ack_to_live_worker",
      reason: "missed_ack_reroute_detected",
      proof_message_id: reroute.message_id,
      target_lane: "reviewer",
      advisory: true,
    });
  }
  if (deferredReviewSeats.length > 0) {
    actions.push({
      action: "separate_ack_from_diff_review",
      reason: "deferred_review_or_ack_only",
      affected_agent_ids: deferredReviewSeats.map((worker) => worker.agent_id),
      target_lane: "reviewer",
      advisory: true,
    });
  }

  return actions;
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

export function buildAutoPilotKitAdapterExamples(result) {
  const reviewActions = result.actions.filter(
    (action) => action.target_lane === "reviewer" || action.reason === "deferred_review_or_ack_only",
  );
  const queueActions = result.actions.filter((action) => action.target_lane === "coordinator");
  const staleWorkers = result.workers.filter((worker) => ["stale", "dormant", "unknown"].includes(worker.freshness));

  return {
    review_coordinator: {
      execute: false,
      target_lane: "reviewer",
      reason_codes: unique(reviewActions.map((action) => action.reason)),
      recommendations: reviewActions,
    },
    jobs_manager: {
      execute: false,
      target_lane: "jobs-manager",
      reason_codes: unique([
        ...queueActions.map((action) => action.reason),
        ...staleWorkers.flatMap((worker) => worker.reasons),
      ]),
      stale_agent_ids: staleWorkers.map((worker) => worker.agent_id),
      recommendations: queueActions,
    },
  };
}

export function evaluateAutoPilotKitLiveness(input = {}) {
  const now = input.now || new Date().toISOString();
  const nowMs = parseMs(now);
  if (nowMs === null) {
    throw new Error(`Invalid now timestamp: ${now}`);
  }

  const thresholds = normalizeLivenessThresholds(input);
  const workers = safeList(input.profiles).map((profile) => normalizeSeatLiveness(profile, { nowMs, thresholds }));
  const counts = workers.reduce((acc, worker) => {
    acc[worker.freshness] = (acc[worker.freshness] ?? 0) + 1;
    return acc;
  }, { active: 0, warm: 0, stale: 0, dormant: 0, unknown: 0 });
  const missedAckReroutes = extractMissedAckSignals(input.messages);
  const actions = buildAdvisoryRerouteActions({ workers, missedAckReroutes });

  const result = {
    generated_at: now,
    thresholds_minutes: {
      active: minutes(thresholds.activeMs),
      warm: minutes(thresholds.warmMs),
      dormant: minutes(thresholds.dormantMs),
      coordinator_fallback: minutes(thresholds.coordinatorFallbackMs),
    },
    counts,
    workers,
    missed_ack_reroutes: missedAckReroutes,
    actions,
    safe_mode: {
      read_only: true,
      no_secret_access: true,
      no_merge_or_claim: true,
    },
  };

  return {
    ...result,
    adapter_examples: buildAutoPilotKitAdapterExamples(result),
  };
}
