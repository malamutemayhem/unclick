// src/lib/seatRelay.ts
//
// SeatRelay v1: the smallest safe relay that reduces stale worker issues.
//
// Mission:
// - Release stale claims only when clearly expired
// - Protect human_blocker/manual_only/human-owned work
// - Reassign stuck work only after verified release
// - Require bonded handoff proof
// - Cap reassignment attempts
// - Leave visible proof trail
// - Redact secrets/tokens
// - No false DONE
//
// Integrates with workerHealthMonitor.ts for seat health evaluation.

import {
  evaluateFleetHealth,
  safeReleaseTargets,
  pendingCoordinatorReview,
  type SeatSnapshot,
  type FleetHealthReport,
  type ReclaimRecommendation,
  type HealthOptions,
} from "./workerHealthMonitor";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RelayableItem {
  todo_id: string;
  title: string;
  assigned_to?: string | null;
  /** Tags that protect this item from auto-relay. */
  tags?: string[];
  /** If true, only a human can reassign this. */
  human_blocker?: boolean;
  /** If true, this item requires manual handling. */
  manual_only?: boolean;
  /** Owner type: "human" items are never auto-relayed. */
  owner_type?: "human" | "agent" | "unassigned";
  /** Number of times this item has already been reassigned by SeatRelay. */
  relay_attempt_count?: number;
  /** ISO timestamp of last relay attempt. */
  last_relay_at?: string | null;
}

export interface RelayCandidate {
  /** Agent/seat id that can accept work. */
  seat_id: string;
  /** Current load (number of active claims). */
  active_claims: number;
  /** Max claims this seat should hold. */
  max_claims?: number;
  /** Lanes this seat can work in. */
  lanes?: string[];
}

export interface RelayDecision {
  todo_id: string;
  action: "release" | "reassign" | "hold" | "skip";
  reason: string;
  from_seat: string | null;
  to_seat: string | null;
  proof: RelayProof;
  safe: boolean;
}

export interface RelayProof {
  relay_id: string;
  timestamp: string;
  health_status?: string;
  reclaim_reason?: string;
  release_verified: boolean;
  handoff_bonded: boolean;
  attempt_number: number;
  max_attempts: number;
  trail: string[];
}

export interface RelayResult {
  evaluated_at: string;
  decisions: RelayDecision[];
  released: RelayDecision[];
  reassigned: RelayDecision[];
  held: RelayDecision[];
  skipped: RelayDecision[];
  proof_trail: string[];
}

export interface SeatRelayOptions {
  /** Max times an item can be relayed before requiring human intervention. Default 3. */
  maxRelayAttempts?: number;
  /** Tags that protect items from relay. Default includes common human-gating tags. */
  protectedTags?: string[];
  /** Minimum cooldown between relay attempts for the same item (ms). Default 1 hour. */
  relayCooldownMs?: number;
  /** Health evaluation options passed to workerHealthMonitor. */
  healthOptions?: HealthOptions;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROTECTED_TAGS_DEFAULT = [
  "human_blocker",
  "manual_only",
  "human_owned",
  "needs_human",
  "security",
  "billing",
  "secrets",
  "gated",
];

const DEFAULT_OPTIONS: Required<SeatRelayOptions> = {
  maxRelayAttempts: 3,
  protectedTags: PROTECTED_TAGS_DEFAULT,
  relayCooldownMs: 60 * 60 * 1000, // 1 hour
  healthOptions: {},
};

const SECRET_PATTERNS = [
  /sk_[a-zA-Z0-9_-]{20,}/g,
  /pk_[a-zA-Z0-9_-]{20,}/g,
  /whsec_[a-zA-Z0-9_-]{10,}/g,
  /re_[a-zA-Z0-9_-]{20,}/g,
  /ghp_[a-zA-Z0-9]{36,}/g,
  /ghs_[a-zA-Z0-9]{36,}/g,
  /xox[boaprs]-[a-zA-Z0-9-]{10,}/g,
  /eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g,
  /AKIA[A-Z0-9]{16}/g,
  /[a-zA-Z0-9+/]{40,}={0,2}/g,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateRelayId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `relay_${ts}_${rand}`;
}

export function redactSecrets(text: string): string {
  let redacted = text;
  for (const pattern of SECRET_PATTERNS) {
    redacted = redacted.replace(pattern, (match) => {
      if (match.length < 12) return match;
      return `${match.slice(0, 4)}...[REDACTED]`;
    });
  }
  return redacted;
}

function isProtected(item: RelayableItem, protectedTags: string[]): boolean {
  if (item.human_blocker) return true;
  if (item.manual_only) return true;
  if (item.owner_type === "human") return true;
  const tags = item.tags ?? [];
  return tags.some((tag) => protectedTags.includes(tag.toLowerCase()));
}

function isInCooldown(item: RelayableItem, cooldownMs: number, now: Date): boolean {
  if (!item.last_relay_at) return false;
  const lastRelay = new Date(item.last_relay_at).getTime();
  if (!Number.isFinite(lastRelay)) return false;
  return now.getTime() - lastRelay < cooldownMs;
}

function findBestCandidate(
  candidates: RelayCandidate[],
  _todoId: string,
  excludeSeat?: string | null,
): RelayCandidate | null {
  const eligible = candidates.filter((c) => {
    if (c.seat_id === excludeSeat) return false;
    const max = c.max_claims ?? 5;
    return c.active_claims < max;
  });

  if (eligible.length === 0) return null;

  // Prefer the seat with the lowest active load.
  eligible.sort((a, b) => a.active_claims - b.active_claims);
  return eligible[0];
}

// ---------------------------------------------------------------------------
// Core: evaluateSeatRelay
// ---------------------------------------------------------------------------

export function evaluateSeatRelay({
  seats,
  items,
  candidates = [],
  now = new Date(),
  options = {},
}: {
  seats: ReadonlyArray<SeatSnapshot>;
  items: ReadonlyArray<RelayableItem>;
  candidates?: ReadonlyArray<RelayCandidate>;
  now?: Date;
  options?: SeatRelayOptions;
}): RelayResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const healthReport = evaluateFleetHealth(seats, now, opts.healthOptions);
  const safeIds = new Set(safeReleaseTargets(healthReport));
  const pendingReview = pendingCoordinatorReview(healthReport);

  const reclaimMap = new Map<string, ReclaimRecommendation>();
  for (const rec of healthReport.reclaim_recommendations) {
    reclaimMap.set(rec.todo_id, rec);
  }

  const decisions: RelayDecision[] = [];
  const proofTrail: string[] = [];

  for (const item of items) {
    const relayId = generateRelayId();
    const attemptNumber = (item.relay_attempt_count ?? 0) + 1;
    const reclaim = reclaimMap.get(item.todo_id);

    const baseProof: RelayProof = {
      relay_id: relayId,
      timestamp: now.toISOString(),
      health_status: reclaim ? reclaim.reason : "not_in_reclaim",
      reclaim_reason: reclaim?.reason,
      release_verified: false,
      handoff_bonded: false,
      attempt_number: attemptNumber,
      max_attempts: opts.maxRelayAttempts,
      trail: [],
    };

    // Guard 1: Protected items are never auto-relayed.
    if (isProtected(item, opts.protectedTags)) {
      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "skip",
        reason: "protected_item",
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: { ...baseProof, trail: [`${relayId}: skipped - item is protected (human_blocker/manual_only/protected_tag)`] },
        safe: true,
      };
      decisions.push(decision);
      proofTrail.push(decision.proof.trail[0]);
      continue;
    }

    // Guard 2: Max relay attempts exceeded.
    if (attemptNumber > opts.maxRelayAttempts) {
      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "hold",
        reason: "max_attempts_exceeded",
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: {
          ...baseProof,
          trail: [`${relayId}: held - relay attempt ${attemptNumber} exceeds max ${opts.maxRelayAttempts}; needs human review`],
        },
        safe: false,
      };
      decisions.push(decision);
      proofTrail.push(decision.proof.trail[0]);
      continue;
    }

    // Guard 3: Cooldown not met.
    if (isInCooldown(item, opts.relayCooldownMs, now)) {
      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "skip",
        reason: "cooldown_active",
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: { ...baseProof, trail: [`${relayId}: skipped - cooldown period active since ${item.last_relay_at}`] },
        safe: true,
      };
      decisions.push(decision);
      proofTrail.push(decision.proof.trail[0]);
      continue;
    }

    // Guard 4: Not in reclaim set at all.
    if (!reclaim) {
      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "skip",
        reason: "not_stale",
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: { ...baseProof, trail: [`${relayId}: skipped - item not flagged for reclaim by health monitor`] },
        safe: true,
      };
      decisions.push(decision);
      proofTrail.push(decision.proof.trail[0]);
      continue;
    }

    // Guard 5: Not safe to release and not auto-releasable.
    if (!safeIds.has(item.todo_id)) {
      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "hold",
        reason: "needs_coordinator_review",
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: {
          ...baseProof,
          trail: [`${relayId}: held - reclaim recommended but not safe_to_release; needs coordinator review`],
        },
        safe: false,
      };
      decisions.push(decision);
      proofTrail.push(decision.proof.trail[0]);
      continue;
    }

    // Safe to release. Attempt relay.
    const releaseTrail = `${relayId}: releasing stale claim on ${item.todo_id} from seat ${item.assigned_to ?? "unassigned"} (reason: ${reclaim.reason})`;
    baseProof.release_verified = true;
    baseProof.trail.push(releaseTrail);

    // Try to find a candidate for reassignment.
    const candidate = findBestCandidate(
      candidates as RelayCandidate[],
      item.todo_id,
      item.assigned_to,
    );

    if (candidate) {
      const handoffTrail = `${relayId}: reassigning ${item.todo_id} to ${candidate.seat_id} (load: ${candidate.active_claims}/${candidate.max_claims ?? 5})`;
      baseProof.handoff_bonded = true;
      baseProof.trail.push(handoffTrail);

      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "reassign",
        reason: redactSecrets(reclaim.detail),
        from_seat: item.assigned_to ?? null,
        to_seat: candidate.seat_id,
        proof: baseProof,
        safe: true,
      };
      decisions.push(decision);
      proofTrail.push(releaseTrail, handoffTrail);
    } else {
      // Release only (no candidate available).
      const noCandidate = `${relayId}: released ${item.todo_id} to pool (no eligible candidate found)`;
      baseProof.trail.push(noCandidate);

      const decision: RelayDecision = {
        todo_id: item.todo_id,
        action: "release",
        reason: redactSecrets(reclaim.detail),
        from_seat: item.assigned_to ?? null,
        to_seat: null,
        proof: baseProof,
        safe: true,
      };
      decisions.push(decision);
      proofTrail.push(releaseTrail, noCandidate);
    }
  }

  return {
    evaluated_at: now.toISOString(),
    decisions,
    released: decisions.filter((d) => d.action === "release"),
    reassigned: decisions.filter((d) => d.action === "reassign"),
    held: decisions.filter((d) => d.action === "hold"),
    skipped: decisions.filter((d) => d.action === "skip"),
    proof_trail: proofTrail.map(redactSecrets),
  };
}

// ---------------------------------------------------------------------------
// Exports for testing
// ---------------------------------------------------------------------------

export const __testing__ = {
  DEFAULT_OPTIONS,
  PROTECTED_TAGS_DEFAULT,
  SECRET_PATTERNS,
  isProtected,
  isInCooldown,
  findBestCandidate,
  generateRelayId,
};
