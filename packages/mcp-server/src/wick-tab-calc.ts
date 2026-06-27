export type WickTabType = "standard_round_crimp" | "safety_sustainer_base" | "wick_bar_center" | "self_centering_clip" | "double_wick_plate";

export function holdStrength(t: WickTabType): number {
  const m: Record<WickTabType, number> = {
    standard_round_crimp: 7, safety_sustainer_base: 9, wick_bar_center: 8, self_centering_clip: 8, double_wick_plate: 10,
  };
  return m[t];
}

export function centerAlign(t: WickTabType): number {
  const m: Record<WickTabType, number> = {
    standard_round_crimp: 5, safety_sustainer_base: 7, wick_bar_center: 10, self_centering_clip: 10, double_wick_plate: 6,
  };
  return m[t];
}

export function safetyFlame(t: WickTabType): number {
  const m: Record<WickTabType, number> = {
    standard_round_crimp: 5, safety_sustainer_base: 10, wick_bar_center: 7, self_centering_clip: 8, double_wick_plate: 6,
  };
  return m[t];
}

export function easeOfUse(t: WickTabType): number {
  const m: Record<WickTabType, number> = {
    standard_round_crimp: 8, safety_sustainer_base: 9, wick_bar_center: 7, self_centering_clip: 10, double_wick_plate: 5,
  };
  return m[t];
}

export function tabCost(t: WickTabType): number {
  const m: Record<WickTabType, number> = {
    standard_round_crimp: 1, safety_sustainer_base: 2, wick_bar_center: 2, self_centering_clip: 3, double_wick_plate: 3,
  };
  return m[t];
}

export function hasFlameOut(t: WickTabType): boolean {
  const m: Record<WickTabType, boolean> = {
    standard_round_crimp: false, safety_sustainer_base: true, wick_bar_center: false, self_centering_clip: false, double_wick_plate: false,
  };
  return m[t];
}

export function multiWick(t: WickTabType): boolean {
  const m: Record<WickTabType, boolean> = {
    standard_round_crimp: false, safety_sustainer_base: false, wick_bar_center: false, self_centering_clip: false, double_wick_plate: true,
  };
  return m[t];
}

export function tabShape(t: WickTabType): string {
  const m: Record<WickTabType, string> = {
    standard_round_crimp: "flat_round_disc",
    safety_sustainer_base: "necked_collar_disc",
    wick_bar_center: "cross_bar_bridge",
    self_centering_clip: "spring_clip_arm",
    double_wick_plate: "elongated_dual_hole",
  };
  return m[t];
}

export function bestCandle(t: WickTabType): string {
  const m: Record<WickTabType, string> = {
    standard_round_crimp: "tealight_votive_small",
    safety_sustainer_base: "container_jar_safe",
    wick_bar_center: "pillar_freestand_center",
    self_centering_clip: "container_any_easy",
    double_wick_plate: "large_vessel_dual",
  };
  return m[t];
}

export function wickTabs(): WickTabType[] {
  return ["standard_round_crimp", "safety_sustainer_base", "wick_bar_center", "self_centering_clip", "double_wick_plate"];
}
