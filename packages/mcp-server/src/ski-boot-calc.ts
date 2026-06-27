export type SkiBootType = "beginner_soft_flex" | "all_mountain_medium" | "race_stiff" | "touring_walk" | "park_freestyle";

export function flexIndex(t: SkiBootType): number {
  const m: Record<SkiBootType, number> = {
    beginner_soft_flex: 2, all_mountain_medium: 5, race_stiff: 10, touring_walk: 6, park_freestyle: 4,
  };
  return m[t];
}

export function powerTransfer(t: SkiBootType): number {
  const m: Record<SkiBootType, number> = {
    beginner_soft_flex: 3, all_mountain_medium: 7, race_stiff: 10, touring_walk: 6, park_freestyle: 5,
  };
  return m[t];
}

export function comfortFit(t: SkiBootType): number {
  const m: Record<SkiBootType, number> = {
    beginner_soft_flex: 10, all_mountain_medium: 7, race_stiff: 3, touring_walk: 8, park_freestyle: 8,
  };
  return m[t];
}

export function walkability(t: SkiBootType): number {
  const m: Record<SkiBootType, number> = {
    beginner_soft_flex: 6, all_mountain_medium: 5, race_stiff: 1, touring_walk: 10, park_freestyle: 7,
  };
  return m[t];
}

export function bootCost(t: SkiBootType): number {
  const m: Record<SkiBootType, number> = {
    beginner_soft_flex: 3, all_mountain_medium: 6, race_stiff: 10, touring_walk: 9, park_freestyle: 5,
  };
  return m[t];
}

export function heatMoldable(t: SkiBootType): boolean {
  const m: Record<SkiBootType, boolean> = {
    beginner_soft_flex: false, all_mountain_medium: true, race_stiff: true, touring_walk: true, park_freestyle: false,
  };
  return m[t];
}

export function walkMode(t: SkiBootType): boolean {
  const m: Record<SkiBootType, boolean> = {
    beginner_soft_flex: false, all_mountain_medium: false, race_stiff: false, touring_walk: true, park_freestyle: false,
  };
  return m[t];
}

export function shellMaterial(t: SkiBootType): string {
  const m: Record<SkiBootType, string> = {
    beginner_soft_flex: "polyurethane_soft_shell", all_mountain_medium: "polyurethane_medium_shell",
    race_stiff: "polyether_race_shell", touring_walk: "grilamid_lightweight",
    park_freestyle: "polyurethane_impact_absorb",
  };
  return m[t];
}

export function bestSkier(t: SkiBootType): string {
  const m: Record<SkiBootType, string> = {
    beginner_soft_flex: "first_timer_learning", all_mountain_medium: "intermediate_varied_terrain",
    race_stiff: "competitive_carving_gates", touring_walk: "backcountry_uphill_skin",
    park_freestyle: "terrain_park_jumps_rails",
  };
  return m[t];
}

export function skiBoots(): SkiBootType[] {
  return ["beginner_soft_flex", "all_mountain_medium", "race_stiff", "touring_walk", "park_freestyle"];
}
