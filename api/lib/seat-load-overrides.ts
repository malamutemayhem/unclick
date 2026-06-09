import { classifySeatTier, type ComputeTier } from "../../src/lib/seats/compute-tiers.js";

export type SeatProfileKind = "physical" | "virtual" | "pc_tether";
export type SeatWorkKind = "brain" | "review" | "fallback";
export type SeatRoutingPolicy = "auto" | "prefer" | "avoid" | "blocked";

export interface SeatLoadPolicyInput {
  id: string;
  label?: string | null;
  profileKind?: SeatProfileKind | null;
  isVirtual?: boolean | null;
  isPcTether?: boolean | null;
  userAgentHint?: string | null;
  lastSeenAt?: string | null;
  currentStatusUpdatedAt?: string | null;
  nextCheckInAt?: string | null;
  manualLoadOverride?: unknown;
  loadOverride?: unknown;
  computedLoad?: unknown;
  routingPolicy?: unknown;
  performanceStatus?: string | null;
  computeTier?: ComputeTier | null;
  provider?: string | null;
  device?: string | null;
}

export interface BuildSeatLoadRoutingPlanInput {
  seats: SeatLoadPolicyInput[];
  now?: Date | string | number;
  staleAfterMs?: number;
  workKind?: SeatWorkKind;
  allowVirtualFallback?: boolean;
  preferredTier?: ComputeTier | null;
}

export interface SeatLoadRoutingWeight {
  id: string;
  label: string;
  profile_kind: SeatProfileKind;
  tier: ComputeTier;
  eligible: boolean;
  weight: number;
  raw_weight: number;
  load_value: number | null;
  load_source: "manual_override" | "computed_load" | "default_even_split" | "virtual_fallback";
  latest_check_in_at: string | null;
  reasons: string[];
}

export interface SeatLoadRoutingPlan {
  work_kind: SeatWorkKind;
  generated_at: string;
  allow_virtual_fallback: boolean;
  total_weight: number;
  eligible_count: number;
  physical_eligible_count: number;
  weights: SeatLoadRoutingWeight[];
}

export const DEFAULT_SEAT_STALE_AFTER_MS = 30 * 60 * 1000;

function normalizeRoutingPolicy(value: unknown): SeatRoutingPolicy {
  if (value === "prefer" || value === "avoid" || value === "blocked") return value;
  return "auto";
}

function normalizeNow(input: Date | string | number | undefined): Date {
  if (input instanceof Date) return input;
  if (typeof input === "string" || typeof input === "number") {
    const date = new Date(input);
    if (Number.isFinite(date.getTime())) return date;
  }
  return new Date();
}

function clampPercent(value: unknown): number | null {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function latestCheckInAt(seat: SeatLoadPolicyInput): string | null {
  const candidates = [seat.lastSeenAt, seat.currentStatusUpdatedAt, seat.nextCheckInAt]
    .filter((value): value is string => Boolean(value))
    .map((value) => ({ value, time: Date.parse(value) }))
    .filter((candidate) => Number.isFinite(candidate.time))
    .sort((left, right) => right.time - left.time);

  return candidates[0]?.value ?? null;
}

function inferProfileKind(seat: SeatLoadPolicyInput): SeatProfileKind {
  if (seat.profileKind === "virtual" || seat.isVirtual) return "virtual";
  if (seat.profileKind === "pc_tether" || seat.isPcTether) return "pc_tether";

  const hint = String(seat.userAgentHint ?? "").toLowerCase();
  if (
    hint.includes("admin-ui") ||
    hint.includes("pc-tether") ||
    hint.includes("windows-tether") ||
    hint.includes("local-tether")
  ) {
    return "pc_tether";
  }

  return "physical";
}

function isFresh(checkInAt: string | null, nowMs: number, staleAfterMs: number): boolean {
  if (!checkInAt) return false;
  const checkInMs = Date.parse(checkInAt);
  return Number.isFinite(checkInMs) && Math.max(0, nowMs - checkInMs) <= staleAfterMs;
}

function rawWeightForSeat(seat: SeatLoadPolicyInput, profileKind: SeatProfileKind): Pick<
  SeatLoadRoutingWeight,
  "raw_weight" | "load_value" | "load_source"
> {
  const manual = clampPercent(seat.manualLoadOverride ?? seat.loadOverride);
  if (manual !== null) {
    return {
      raw_weight: manual,
      load_value: manual,
      load_source: "manual_override",
    };
  }

  const computedLoad = clampPercent(seat.computedLoad);
  if (computedLoad !== null) {
    return {
      raw_weight: 100 - computedLoad,
      load_value: computedLoad,
      load_source: "computed_load",
    };
  }

  return {
    raw_weight: profileKind === "virtual" ? 1 : 1,
    load_value: null,
    load_source: profileKind === "virtual" ? "virtual_fallback" : "default_even_split",
  };
}

function applyRoutingPolicy(rawWeight: number, policy: SeatRoutingPolicy): number {
  if (policy === "prefer") return rawWeight * 1.25;
  if (policy === "avoid") return rawWeight * 0.5;
  return rawWeight;
}

function applyTierBias(rawWeight: number, seatTier: ComputeTier, preferredTier: ComputeTier | null | undefined): number {
  if (!preferredTier) return rawWeight;
  return seatTier === preferredTier ? rawWeight * 1.5 : rawWeight * 0.75;
}

function normalizeIntegerWeights(rows: SeatLoadRoutingWeight[]): number[] {
  if (rows.length === 0) return [];

  const rawTotal = rows.reduce((total, row) => total + row.raw_weight, 0);
  const effectiveRows =
    rawTotal > 0
      ? rows
      : rows.map((row) => ({
          ...row,
          raw_weight: 1,
        }));
  const effectiveTotal = effectiveRows.reduce((total, row) => total + row.raw_weight, 0);
  const exact = effectiveRows.map((row) => (row.raw_weight / effectiveTotal) * 100);
  const base = exact.map((value) => Math.floor(value));
  let remainder = 100 - base.reduce((total, value) => total + value, 0);
  const order = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((left, right) => right.fraction - left.fraction || left.index - right.index);

  for (const item of order) {
    if (remainder <= 0) break;
    base[item.index] += 1;
    remainder -= 1;
  }

  return base;
}

export function buildSeatLoadRoutingPlan(input: BuildSeatLoadRoutingPlanInput): SeatLoadRoutingPlan {
  const now = normalizeNow(input.now);
  const nowMs = now.getTime();
  const staleAfterMs = input.staleAfterMs ?? DEFAULT_SEAT_STALE_AFTER_MS;
  const workKind = input.workKind ?? "brain";
  const allowVirtualFallback = input.allowVirtualFallback === true;

  const preferredTier = input.preferredTier ?? null;

  const firstPass = input.seats.map((seat): SeatLoadRoutingWeight => {
    const profileKind = inferProfileKind(seat);
    const tier = classifySeatTier({
      computeTier: seat.computeTier,
      provider: seat.provider,
      device: seat.device,
      userAgentHint: seat.userAgentHint,
    });
    const policy = normalizeRoutingPolicy(seat.routingPolicy);
    const latest = latestCheckInAt(seat);
    const fresh = isFresh(latest, nowMs, staleAfterMs);
    const reasons: string[] = [];
    let eligible = true;

    if (policy === "blocked") {
      eligible = false;
      reasons.push("blocked_policy");
    }

    if (String(seat.performanceStatus ?? "").toLowerCase() === "blocked") {
      eligible = false;
      reasons.push("performance_blocked");
    }

    if (profileKind === "pc_tether" && workKind === "brain") {
      eligible = false;
      reasons.push("pc_tether_excluded");
    }

    if (profileKind === "physical" || profileKind === "pc_tether") {
      if (!latest) {
        eligible = false;
        reasons.push("no_check_in");
      } else if (!fresh) {
        eligible = false;
        reasons.push("stale_check_in");
      } else {
        reasons.push("fresh_check_in");
      }
    }

    const raw = rawWeightForSeat(seat, profileKind);
    const policyWeighted = eligible ? applyRoutingPolicy(raw.raw_weight, policy) : 0;
    const weightedRaw = eligible ? applyTierBias(policyWeighted, tier, preferredTier) : 0;
    if (raw.load_source === "manual_override") reasons.push("manual_override");
    if (raw.load_source === "computed_load") reasons.push("computed_load");
    if (raw.load_source === "default_even_split") reasons.push("default_even_split");
    if (policy === "prefer") reasons.push("prefer_policy");
    if (policy === "avoid") reasons.push("avoid_policy");
    if (preferredTier && tier === preferredTier) reasons.push("preferred_tier");
    if (preferredTier && tier !== preferredTier) reasons.push("non_preferred_tier");

    return {
      id: seat.id,
      label: String(seat.label ?? seat.id),
      profile_kind: profileKind,
      tier,
      eligible,
      weight: 0,
      raw_weight: weightedRaw,
      load_value: raw.load_value,
      load_source: raw.load_source,
      latest_check_in_at: latest,
      reasons,
    };
  });

  const physicalEligibleCount = firstPass.filter((row) => row.profile_kind === "physical" && row.eligible).length;
  const withVirtualPolicy = firstPass.map((row): SeatLoadRoutingWeight => {
    if (row.profile_kind !== "virtual") return row;

    const virtualEligible = allowVirtualFallback || workKind !== "brain" || physicalEligibleCount === 0;
    if (virtualEligible) {
      return {
        ...row,
        eligible: true,
        raw_weight: row.raw_weight > 0 ? row.raw_weight : 1,
        reasons: [
          ...row.reasons,
          physicalEligibleCount === 0 ? "virtual_fallback_no_physical_capacity" : "virtual_fallback_enabled",
        ],
      };
    }

    return {
      ...row,
      eligible: false,
      raw_weight: 0,
      reasons: [...row.reasons, "virtual_fallback_reserved"],
    };
  });

  const eligibleRows = withVirtualPolicy.filter((row) => row.eligible);
  const normalized = normalizeIntegerWeights(eligibleRows);
  const normalizedById = new Map(eligibleRows.map((row, index) => [row.id, normalized[index] ?? 0]));
  const weights = withVirtualPolicy.map((row) => ({
    ...row,
    weight: row.eligible ? normalizedById.get(row.id) ?? 0 : 0,
  }));

  return {
    work_kind: workKind,
    generated_at: now.toISOString(),
    allow_virtual_fallback: allowVirtualFallback,
    total_weight: weights.reduce((total, row) => total + row.weight, 0),
    eligible_count: weights.filter((row) => row.eligible).length,
    physical_eligible_count: physicalEligibleCount,
    weights,
  };
}
