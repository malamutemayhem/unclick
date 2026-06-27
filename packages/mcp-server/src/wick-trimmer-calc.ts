export type WickTrimmerType = "scissor_angled_classic" | "wick_dipper_snuff" | "bell_snuffer_dome" | "auto_trim_spring" | "wick_hook_adjust";

export function cutPrecision(t: WickTrimmerType): number {
  const m: Record<WickTrimmerType, number> = {
    scissor_angled_classic: 9, wick_dipper_snuff: 3, bell_snuffer_dome: 2, auto_trim_spring: 10, wick_hook_adjust: 6,
  };
  return m[t];
}

export function debrisCatch(t: WickTrimmerType): number {
  const m: Record<WickTrimmerType, number> = {
    scissor_angled_classic: 8, wick_dipper_snuff: 4, bell_snuffer_dome: 3, auto_trim_spring: 10, wick_hook_adjust: 5,
  };
  return m[t];
}

export function easeOfUse(t: WickTrimmerType): number {
  const m: Record<WickTrimmerType, number> = {
    scissor_angled_classic: 8, wick_dipper_snuff: 10, bell_snuffer_dome: 9, auto_trim_spring: 7, wick_hook_adjust: 6,
  };
  return m[t];
}

export function jarAccess(t: WickTrimmerType): number {
  const m: Record<WickTrimmerType, number> = {
    scissor_angled_classic: 9, wick_dipper_snuff: 10, bell_snuffer_dome: 7, auto_trim_spring: 8, wick_hook_adjust: 10,
  };
  return m[t];
}

export function trimmerCost(t: WickTrimmerType): number {
  const m: Record<WickTrimmerType, number> = {
    scissor_angled_classic: 1, wick_dipper_snuff: 1, bell_snuffer_dome: 2, auto_trim_spring: 2, wick_hook_adjust: 1,
  };
  return m[t];
}

export function trims(t: WickTrimmerType): boolean {
  const m: Record<WickTrimmerType, boolean> = {
    scissor_angled_classic: true, wick_dipper_snuff: false, bell_snuffer_dome: false, auto_trim_spring: true, wick_hook_adjust: false,
  };
  return m[t];
}

export function extinguishes(t: WickTrimmerType): boolean {
  const m: Record<WickTrimmerType, boolean> = {
    scissor_angled_classic: false, wick_dipper_snuff: true, bell_snuffer_dome: true, auto_trim_spring: false, wick_hook_adjust: false,
  };
  return m[t];
}

export function toolStyle(t: WickTrimmerType): string {
  const m: Record<WickTrimmerType, string> = {
    scissor_angled_classic: "angled_blade_tray",
    wick_dipper_snuff: "bent_rod_dip_coat",
    bell_snuffer_dome: "bell_cup_smother",
    auto_trim_spring: "spring_loaded_clip",
    wick_hook_adjust: "hook_bend_adjust",
  };
  return m[t];
}

export function bestCandle(t: WickTrimmerType): string {
  const m: Record<WickTrimmerType, string> = {
    scissor_angled_classic: "jar_candle_trim",
    wick_dipper_snuff: "smokeless_extinguish",
    bell_snuffer_dome: "taper_candle_snuff",
    auto_trim_spring: "production_batch_trim",
    wick_hook_adjust: "deep_jar_wick_center",
  };
  return m[t];
}

export function wickTrimmers(): WickTrimmerType[] {
  return ["scissor_angled_classic", "wick_dipper_snuff", "bell_snuffer_dome", "auto_trim_spring", "wick_hook_adjust"];
}
