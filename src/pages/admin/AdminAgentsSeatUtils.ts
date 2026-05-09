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
