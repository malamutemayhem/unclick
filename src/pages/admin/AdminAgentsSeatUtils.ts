export interface FishbowlProfile {
  agent_id: string;
  emoji: string | null;
  display_name: string | null;
  user_agent_hint: string | null;
  created_at: string;
  last_seen_at: string | null;
  current_status: string | null;
  current_status_updated_at: string | null;
  next_checkin_at: string | null;
}

export type SeatRoutingPolicy = "auto" | "prefer" | "avoid" | "blocked";

export interface AISeat {
  id: string;
  name: string;
  emoji: string;
  provider: string;
  device: string;
  status: "Ready" | "Standby" | "Needs login";
  state: string;
  load: number;
  assigned: string;
  issue: string;
  isVirtual?: boolean;
  routingPolicy?: SeatRoutingPolicy;
  computeTier?: import("./seats/computeTypes").ComputeTier;
}

export type SeatPerformanceStatus = "strong" | "watch" | "stale" | "blocked";

export interface SeatPerformanceScore {
  id: string;
  label: string;
  score: number;
  status: SeatPerformanceStatus;
  reasons: string[];
  lastCheckInAt: string | null;
  source: "matched-seat" | "live-profile" | "manual-seat";
}

export type SeatClientKind = "codex" | "claude" | "github-action" | "windsurf" | "unknown";
export type SeatFreshnessKind = "live" | "warm" | "stale" | "cold" | "unknown";
export type SeatReliabilityKind = "strong" | "watch" | "risk";
export type SeatRoutingHint = "build" | "review" | "observe" | "avoid";

export interface SeatCapabilityNote {
  id: string;
  label: string;
  source: "matched-seat" | "live-profile" | "manual-seat";
  client: SeatClientKind;
  freshness: SeatFreshnessKind;
  reliability: SeatReliabilityKind;
  routingHint: SeatRoutingHint;
  notes: string[];
}

export const AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY = "unclick_ai_seat_load_overrides_v1";
export const AI_SEAT_LEGACY_STORAGE_KEY = "unclick_ai_seat_manual_slots_v1";

interface SeatStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface SeatOverrideRecord {
  name?: string;
  emoji?: string;
  provider?: string;
  device?: string;
  load?: number;
  assigned?: string;
  routingPolicy?: SeatRoutingPolicy;
}

function browserStorage(): SeatStorage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function normalizeSeatLoadOverride(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

export function normalizeSeatRoutingPolicy(value: unknown): SeatRoutingPolicy {
  if (value === "prefer" || value === "avoid" || value === "blocked") return value;
  return "auto";
}

function readSeatOverrideRecord(storage: SeatStorage | null, key: string): Record<string, SeatOverrideRecord> {
  if (!storage) return {};
  try {
    const parsed = JSON.parse(storage.getItem(key) ?? "{}") as Record<string, SeatOverrideRecord>;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function loadSeatOverridesFromStorage(
  baseSeats: AISeat[],
  storage: SeatStorage | null = browserStorage(),
): AISeat[] {
  const overrides = {
    ...readSeatOverrideRecord(storage, AI_SEAT_LEGACY_STORAGE_KEY),
    ...readSeatOverrideRecord(storage, AI_SEAT_LOAD_OVERRIDE_STORAGE_KEY),
  };
  return baseSeats.map((seat) => {
    const override = overrides[seat.id] ?? {};
    const wasOldDefaultEmoji = (!seat.isVirtual && override.emoji === "🤖") || (seat.isVirtual && override.emoji === "🧪");
    return {
      ...seat,
      ...override,
      load: normalizeSeatLoadOverride(override.load, seat.load),
      emoji: wasOldDefaultEmoji ? seat.emoji : override.emoji ?? seat.emoji,
      routingPolicy: normalizeSeatRoutingPolicy(override.routingPolicy ?? seat.routingPolicy),
    };
  });
}

export function buildSeatOverrideStoragePayload(seats: AISeat[]): Record<string, SeatOverrideRecord> {
  return Object.fromEntries(
    seats.map((seat) => [
      seat.id,
      {
        name: seat.name,
        emoji: seat.emoji,
        provider: seat.provider,
        device: seat.device,
        load: normalizeSeatLoadOverride(seat.load),
        assigned: seat.assigned,
        routingPolicy: normalizeSeatRoutingPolicy(seat.routingPolicy),
      },
    ]),
  );
}

export function latestProfileCheckInAt(profile: FishbowlProfile): string | null {
  const candidates = [profile.last_seen_at, profile.current_status_updated_at]
    .filter((value): value is string => Boolean(value))
    .map((value) => ({ value, ms: Date.parse(value) }))
    .filter((candidate) => Number.isFinite(candidate.ms))
    .sort((a, b) => b.ms - a.ms);
  return candidates[0]?.value ?? null;
}

export function profileMatchesSeat(profile: FishbowlProfile, seat: AISeat): boolean {
  const haystack = `${profile.agent_id} ${profile.display_name ?? ""} ${profile.user_agent_hint ?? ""}`.toLowerCase();
  const needles = [seat.id, seat.name, seat.provider, seat.device]
    .map((value) => value.toLowerCase().trim())
    .filter((value) => value.length > 2 && !["unknown ai", "unknown device", "manual slot"].includes(value));
  return needles.some((needle) => haystack.includes(needle));
}

export function mapProfilesToSeats(seats: AISeat[], profiles: FishbowlProfile[]): Map<string, FishbowlProfile> {
  const seatProfiles = new Map<string, FishbowlProfile>();
  const usedProfiles = new Set<string>();

  for (const seat of seats) {
    const exactMatch = profiles.find((profile) => !usedProfiles.has(profile.agent_id) && profileMatchesSeat(profile, seat));
    if (!exactMatch) continue;
    seatProfiles.set(seat.id, exactMatch);
    usedProfiles.add(exactMatch.agent_id);
  }

  for (const seat of seats) {
    if (seat.isVirtual || seatProfiles.has(seat.id)) continue;
    const fallbackMatch = profiles.find((profile) => !usedProfiles.has(profile.agent_id));
    if (!fallbackMatch) continue;
    seatProfiles.set(seat.id, fallbackMatch);
    usedProfiles.add(fallbackMatch.agent_id);
  }

  return seatProfiles;
}

export function unmatchedRecentProfiles(
  profiles: FishbowlProfile[],
  matchedProfiles: Iterable<FishbowlProfile>,
  nowMs = Date.now(),
  windowMs = 24 * 60 * 60 * 1000,
): FishbowlProfile[] {
  const matchedIds = new Set(Array.from(matchedProfiles).map((profile) => profile.agent_id));
  return profiles.filter((profile) => {
    if (matchedIds.has(profile.agent_id)) return false;
    const checkedInAt = latestProfileCheckInAt(profile);
    if (!checkedInAt) return false;
    const checkedInMs = Date.parse(checkedInAt);
    return Number.isFinite(checkedInMs) && nowMs - checkedInMs <= windowMs;
  });
}

export function rankSeatsForRouting(
  seats: AISeat[],
  profiles: FishbowlProfile[] = [],
  nowMs = Date.now(),
): AISeat[] {
  const profileMap = mapProfilesToSeats(seats, profiles);
  return seats
    .filter((seat) => normalizeSeatRoutingPolicy(seat.routingPolicy) !== "blocked")
    .slice()
    .sort((left, right) => {
      const leftPolicy = normalizeSeatRoutingPolicy(left.routingPolicy);
      const rightPolicy = normalizeSeatRoutingPolicy(right.routingPolicy);
      const policyScore = (policy: SeatRoutingPolicy) => (policy === "prefer" ? 40 : policy === "avoid" ? -40 : 0);
      const liveScore = (seat: AISeat) => {
        const profile = profileMap.get(seat.id);
        const checkedInAt = profile ? latestProfileCheckInAt(profile) : null;
        const checkedInMs = checkedInAt ? Date.parse(checkedInAt) : NaN;
        return Number.isFinite(checkedInMs) && nowMs - checkedInMs < 30 * 60 * 1000 ? 25 : 0;
      };
      const capacityScore = (seat: AISeat) => 100 - normalizeSeatLoadOverride(seat.load, 100);
      const leftScore = policyScore(leftPolicy) + liveScore(left) + capacityScore(left) - (left.isVirtual ? 25 : 0);
      const rightScore = policyScore(rightPolicy) + liveScore(right) + capacityScore(right) - (right.isVirtual ? 25 : 0);
      return rightScore - leftScore || left.name.localeCompare(right.name);
    });
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function freshnessPenalty(checkedInAt: string | null, nowMs: number): { penalty: number; reason: string } {
  if (!checkedInAt) return { penalty: 45, reason: "no live check-in" };
  const checkedInMs = Date.parse(checkedInAt);
  if (!Number.isFinite(checkedInMs)) return { penalty: 45, reason: "invalid check-in time" };
  const ageMs = Math.max(0, nowMs - checkedInMs);
  if (ageMs <= 15 * 60 * 1000) return { penalty: 0, reason: "live" };
  if (ageMs <= 30 * 60 * 1000) return { penalty: 10, reason: "warming up" };
  if (ageMs <= 4 * 60 * 60 * 1000) return { penalty: 25, reason: "quiet" };
  if (ageMs <= 24 * 60 * 60 * 1000) return { penalty: 45, reason: "stale" };
  return { penalty: 65, reason: "cold" };
}

function missedCheckInPenalty(profile: FishbowlProfile | null, nowMs: number): { penalty: number; reason: string | null } {
  if (!profile?.next_checkin_at) return { penalty: 0, reason: null };
  const nextMs = Date.parse(profile.next_checkin_at);
  if (!Number.isFinite(nextMs) || nowMs <= nextMs) return { penalty: 0, reason: null };
  return { penalty: 25, reason: "missed check-in" };
}

function scoreSeatPerformance({
  id,
  label,
  seat = null,
  profile = null,
  nowMs,
  source,
}: {
  id: string;
  label: string;
  seat?: AISeat | null;
  profile?: FishbowlProfile | null;
  nowMs: number;
  source: SeatPerformanceScore["source"];
}): SeatPerformanceScore {
  const reasons: string[] = [];
  const checkedInAt = profile ? latestProfileCheckInAt(profile) : null;
  const freshness = freshnessPenalty(checkedInAt, nowMs);
  if (freshness.reason !== "live") reasons.push(freshness.reason);

  const missed = missedCheckInPenalty(profile, nowMs);
  if (missed.reason) reasons.push(missed.reason);

  const routingPolicy = seat ? normalizeSeatRoutingPolicy(seat.routingPolicy) : "auto";
  const routingPenalty = routingPolicy === "blocked" ? 35 : routingPolicy === "avoid" ? 10 : 0;
  if (routingPolicy === "blocked") reasons.push("blocked for routing");
  if (routingPolicy === "avoid") reasons.push("avoid for routing");

  const load = seat ? normalizeSeatLoadOverride(seat.load, 0) : 25;
  const loadPenalty = load >= 90 ? 15 : load >= 75 ? 8 : 0;
  if (loadPenalty) reasons.push("high load");

  const issuePenalty = seat?.issue ? 20 : 0;
  if (seat?.issue) reasons.push(seat.issue);
  if (profile && !profile.current_status) reasons.push("no current status");

  const preferBonus = routingPolicy === "prefer" ? 5 : 0;
  const score = clampScore(100 - freshness.penalty - missed.penalty - routingPenalty - loadPenalty - issuePenalty + preferBonus);
  const status: SeatPerformanceStatus =
    score >= 80 ? "strong" : score >= 60 ? "watch" : score >= 35 ? "stale" : "blocked";

  return {
    id,
    label,
    score,
    status,
    reasons: reasons.length > 0 ? reasons : ["healthy"],
    lastCheckInAt: checkedInAt,
    source,
  };
}

export function buildSeatPerformanceScores(
  seats: AISeat[],
  profiles: FishbowlProfile[] = [],
  nowMs = Date.now(),
): SeatPerformanceScore[] {
  const seatProfiles = mapProfilesToSeats(seats, profiles);
  const matchedProfiles = seatProfiles.values();
  const scores = seats.map((seat) =>
    scoreSeatPerformance({
      id: seat.id,
      label: seat.name,
      seat,
      profile: seatProfiles.get(seat.id) ?? null,
      nowMs,
      source: seatProfiles.has(seat.id) ? "matched-seat" : "manual-seat",
    }),
  );

  for (const profile of unmatchedRecentProfiles(profiles, matchedProfiles, nowMs)) {
    scores.push(
      scoreSeatPerformance({
        id: profile.agent_id,
        label: profile.display_name?.trim() || profile.agent_id,
        profile,
        nowMs,
        source: "live-profile",
      }),
    );
  }

  return scores.sort((left, right) => right.score - left.score || left.label.localeCompare(right.label));
}

function detectSeatClientKind(input: string | null | undefined): SeatClientKind {
  const lower = (input ?? "").toLowerCase();
  if (lower.includes("codex")) return "codex";
  if (lower.includes("claude")) return "claude";
  if (lower.includes("github-action") || lower.includes("github action") || lower.includes("queuepush")) {
    return "github-action";
  }
  if (lower.includes("windsurf") || lower.includes("cascade")) return "windsurf";
  return "unknown";
}

function classifyFreshness(checkInAt: string | null, nowMs: number): SeatFreshnessKind {
  if (!checkInAt) return "unknown";
  const checkInMs = Date.parse(checkInAt);
  if (!Number.isFinite(checkInMs)) return "unknown";
  const ageMs = Math.max(0, nowMs - checkInMs);
  if (ageMs <= 15 * 60 * 1000) return "live";
  if (ageMs <= 60 * 60 * 1000) return "warm";
  if (ageMs <= 6 * 60 * 60 * 1000) return "stale";
  return "cold";
}

function statusSignal(status: string | null | undefined): "pass" | "blocker" | null {
  if (!status) return null;
  const lower = status.toLowerCase();
  if (/\b(blocker|hold|stuck|error)\b/.test(lower)) return "blocker";
  if (/\b(pass|done|green)\b/.test(lower)) return "pass";
  return null;
}

function reliabilityFromSignals({
  scoreStatus,
  freshness,
  signal,
}: {
  scoreStatus: SeatPerformanceStatus;
  freshness: SeatFreshnessKind;
  signal: "pass" | "blocker" | null;
}): SeatReliabilityKind {
  if (signal === "blocker" || scoreStatus === "blocked" || freshness === "cold") return "risk";
  if (scoreStatus === "strong" && (freshness === "live" || freshness === "warm")) return "strong";
  return "watch";
}

function routingHintFromSignals({
  seat,
  client,
  reliability,
  signal,
}: {
  seat: AISeat | null;
  client: SeatClientKind;
  reliability: SeatReliabilityKind;
  signal: "pass" | "blocker" | null;
}): SeatRoutingHint {
  const policy = seat ? normalizeSeatRoutingPolicy(seat.routingPolicy) : "auto";
  if (policy === "blocked" || signal === "blocker") return "avoid";
  if (client === "github-action") return "observe";
  if (seat?.isVirtual || client === "windsurf") return "review";
  if (reliability === "strong" && !seat?.isVirtual) return "build";
  if (client === "claude") return "review";
  return "observe";
}

function buildCapabilityNotes({
  seat,
  profile,
  freshness,
  signal,
}: {
  seat: AISeat | null;
  profile: FishbowlProfile | null;
  freshness: SeatFreshnessKind;
  signal: "pass" | "blocker" | null;
}): string[] {
  const notes: string[] = [];
  if (seat?.isVirtual) notes.push("virtual fallback seat");
  if (!profile) notes.push("no live profile");
  if (freshness === "stale" || freshness === "cold" || freshness === "unknown") {
    notes.push(`check-in ${freshness}`);
  }
  const policy = seat ? normalizeSeatRoutingPolicy(seat.routingPolicy) : "auto";
  if (policy === "blocked") notes.push("blocked for routing");
  if (policy === "avoid") notes.push("avoid for routing");
  if (signal === "blocker") notes.push("status reports blocker");
  if (signal === "pass") notes.push("status reports pass");
  if (!seat?.isVirtual && seat && normalizeSeatLoadOverride(seat.load, 0) >= 85) notes.push("high load");
  return notes.length > 0 ? notes : ["healthy"];
}

export function buildSeatCapabilityNotes(
  seats: AISeat[],
  profiles: FishbowlProfile[] = [],
  nowMs = Date.now(),
): SeatCapabilityNote[] {
  const seatProfiles = mapProfilesToSeats(seats, profiles);
  const matchedProfiles = seatProfiles.values();
  const notes: SeatCapabilityNote[] = seats.map((seat) => {
    const profile = seatProfiles.get(seat.id) ?? null;
    const checkedInAt = profile ? latestProfileCheckInAt(profile) : null;
    const freshness = classifyFreshness(checkedInAt, nowMs);
    const signal = statusSignal(profile?.current_status);
    const client = detectSeatClientKind(
      [profile?.user_agent_hint, profile?.display_name, seat.provider, seat.device].filter(Boolean).join(" "),
    );
    const score = scoreSeatPerformance({
      id: seat.id,
      label: seat.name,
      seat,
      profile,
      nowMs,
      source: seatProfiles.has(seat.id) ? "matched-seat" : "manual-seat",
    });
    const reliability = reliabilityFromSignals({ scoreStatus: score.status, freshness, signal });
    return {
      id: seat.id,
      label: seat.name,
      source: seatProfiles.has(seat.id) ? "matched-seat" : "manual-seat",
      client,
      freshness,
      reliability,
      routingHint: routingHintFromSignals({ seat, client, reliability, signal }),
      notes: buildCapabilityNotes({ seat, profile, freshness, signal }),
    };
  });

  for (const profile of unmatchedRecentProfiles(profiles, matchedProfiles, nowMs)) {
    const checkedInAt = latestProfileCheckInAt(profile);
    const freshness = classifyFreshness(checkedInAt, nowMs);
    const signal = statusSignal(profile.current_status);
    const client = detectSeatClientKind([profile.user_agent_hint, profile.display_name, profile.agent_id].join(" "));
    const reliability = reliabilityFromSignals({
      scoreStatus: freshness === "live" || freshness === "warm" ? "watch" : "stale",
      freshness,
      signal,
    });
    notes.push({
      id: profile.agent_id,
      label: profile.display_name?.trim() || profile.agent_id,
      source: "live-profile",
      client,
      freshness,
      reliability,
      routingHint: routingHintFromSignals({ seat: null, client, reliability, signal }),
      notes: buildCapabilityNotes({ seat: null, profile, freshness, signal }),
    });
  }

  return notes.sort((left, right) => left.label.localeCompare(right.label));
}
