export type ClosetRodType = "chrome_round_standard" | "oval_steel_heavy_duty" | "double_hang_two_tier" | "pull_down_ceiling_reach" | "tension_no_drill_fit";

export function loadCapacity(t: ClosetRodType): number {
  const m: Record<ClosetRodType, number> = {
    chrome_round_standard: 6, oval_steel_heavy_duty: 10, double_hang_two_tier: 5, pull_down_ceiling_reach: 4, tension_no_drill_fit: 3,
  };
  return m[t];
}

export function hangingSpace(t: ClosetRodType): number {
  const m: Record<ClosetRodType, number> = {
    chrome_round_standard: 6, oval_steel_heavy_duty: 7, double_hang_two_tier: 10, pull_down_ceiling_reach: 5, tension_no_drill_fit: 6,
  };
  return m[t];
}

export function installEase(t: ClosetRodType): number {
  const m: Record<ClosetRodType, number> = {
    chrome_round_standard: 7, oval_steel_heavy_duty: 5, double_hang_two_tier: 4, pull_down_ceiling_reach: 3, tension_no_drill_fit: 10,
  };
  return m[t];
}

export function accessibility(t: ClosetRodType): number {
  const m: Record<ClosetRodType, number> = {
    chrome_round_standard: 7, oval_steel_heavy_duty: 7, double_hang_two_tier: 6, pull_down_ceiling_reach: 10, tension_no_drill_fit: 7,
  };
  return m[t];
}

export function rodCost(t: ClosetRodType): number {
  const m: Record<ClosetRodType, number> = {
    chrome_round_standard: 2, oval_steel_heavy_duty: 4, double_hang_two_tier: 5, pull_down_ceiling_reach: 7, tension_no_drill_fit: 3,
  };
  return m[t];
}

export function noDrilling(t: ClosetRodType): boolean {
  const m: Record<ClosetRodType, boolean> = {
    chrome_round_standard: false, oval_steel_heavy_duty: false, double_hang_two_tier: false, pull_down_ceiling_reach: false, tension_no_drill_fit: true,
  };
  return m[t];
}

export function adaFriendly(t: ClosetRodType): boolean {
  const m: Record<ClosetRodType, boolean> = {
    chrome_round_standard: false, oval_steel_heavy_duty: false, double_hang_two_tier: false, pull_down_ceiling_reach: true, tension_no_drill_fit: false,
  };
  return m[t];
}

export function rodProfile(t: ClosetRodType): string {
  const m: Record<ClosetRodType, string> = {
    chrome_round_standard: "round_chrome_plated",
    oval_steel_heavy_duty: "oval_powder_coat_steel",
    double_hang_two_tier: "dual_round_bracket_tier",
    pull_down_ceiling_reach: "hydraulic_pull_arm",
    tension_no_drill_fit: "spring_loaded_tube",
  };
  return m[t];
}

export function bestCloset(t: ClosetRodType): string {
  const m: Record<ClosetRodType, string> = {
    chrome_round_standard: "standard_reach_in",
    oval_steel_heavy_duty: "heavy_coat_suit_closet",
    double_hang_two_tier: "shirt_blouse_maximize",
    pull_down_ceiling_reach: "high_ceiling_ada",
    tension_no_drill_fit: "rental_temporary_no_holes",
  };
  return m[t];
}

export function closetRods(): ClosetRodType[] {
  return ["chrome_round_standard", "oval_steel_heavy_duty", "double_hang_two_tier", "pull_down_ceiling_reach", "tension_no_drill_fit"];
}
