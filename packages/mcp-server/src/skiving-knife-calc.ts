export type SkivingKnifeType = "french_paring_round" | "safety_skiver_guard" | "japanese_takobiki_thin" | "bell_skiver_machine" | "utility_replaceable_blade";

export function thinningControl(t: SkivingKnifeType): number {
  const m: Record<SkivingKnifeType, number> = {
    french_paring_round: 10, safety_skiver_guard: 7, japanese_takobiki_thin: 9, bell_skiver_machine: 8, utility_replaceable_blade: 6,
  };
  return m[t];
}

export function consistency(t: SkivingKnifeType): number {
  const m: Record<SkivingKnifeType, number> = {
    french_paring_round: 8, safety_skiver_guard: 7, japanese_takobiki_thin: 8, bell_skiver_machine: 10, utility_replaceable_blade: 6,
  };
  return m[t];
}

export function learningCurve(t: SkivingKnifeType): number {
  const m: Record<SkivingKnifeType, number> = {
    french_paring_round: 3, safety_skiver_guard: 9, japanese_takobiki_thin: 4, bell_skiver_machine: 7, utility_replaceable_blade: 10,
  };
  return m[t];
}

export function bladeSharpness(t: SkivingKnifeType): number {
  const m: Record<SkivingKnifeType, number> = {
    french_paring_round: 9, safety_skiver_guard: 7, japanese_takobiki_thin: 10, bell_skiver_machine: 8, utility_replaceable_blade: 8,
  };
  return m[t];
}

export function knifeCost(t: SkivingKnifeType): number {
  const m: Record<SkivingKnifeType, number> = {
    french_paring_round: 3, safety_skiver_guard: 2, japanese_takobiki_thin: 3, bell_skiver_machine: 4, utility_replaceable_blade: 1,
  };
  return m[t];
}

export function hasGuard(t: SkivingKnifeType): boolean {
  const m: Record<SkivingKnifeType, boolean> = {
    french_paring_round: false, safety_skiver_guard: true, japanese_takobiki_thin: false, bell_skiver_machine: true, utility_replaceable_blade: false,
  };
  return m[t];
}

export function motorized(t: SkivingKnifeType): boolean {
  const m: Record<SkivingKnifeType, boolean> = {
    french_paring_round: false, safety_skiver_guard: false, japanese_takobiki_thin: false, bell_skiver_machine: true, utility_replaceable_blade: false,
  };
  return m[t];
}

export function bladeShape(t: SkivingKnifeType): string {
  const m: Record<SkivingKnifeType, string> = {
    french_paring_round: "round_bevel_edge",
    safety_skiver_guard: "angled_guard_blade",
    japanese_takobiki_thin: "single_bevel_flat",
    bell_skiver_machine: "circular_rotary_disc",
    utility_replaceable_blade: "snap_off_segment",
  };
  return m[t];
}

export function bestUse(t: SkivingKnifeType): string {
  const m: Record<SkivingKnifeType, string> = {
    french_paring_round: "edge_fold_thinning",
    safety_skiver_guard: "beginner_leather_thin",
    japanese_takobiki_thin: "lining_split_precise",
    bell_skiver_machine: "production_strap_split",
    utility_replaceable_blade: "quick_rough_skive",
  };
  return m[t];
}

export function skivingKnives(): SkivingKnifeType[] {
  return ["french_paring_round", "safety_skiver_guard", "japanese_takobiki_thin", "bell_skiver_machine", "utility_replaceable_blade"];
}
