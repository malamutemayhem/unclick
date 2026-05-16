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
