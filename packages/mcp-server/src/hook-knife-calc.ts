export type HookKnifeType = "right_hand_single" | "left_hand_single" | "double_edge_both" | "tight_radius_small" | "open_curve_large";

export function hollowReach(t: HookKnifeType): number {
  const m: Record<HookKnifeType, number> = {
    right_hand_single: 7, left_hand_single: 7, double_edge_both: 8, tight_radius_small: 10, open_curve_large: 5,
  };
  return m[t];
}

export function cutSmooth(t: HookKnifeType): number {
  const m: Record<HookKnifeType, number> = {
    right_hand_single: 8, left_hand_single: 8, double_edge_both: 7, tight_radius_small: 6, open_curve_large: 9,
  };
  return m[t];
}

export function versatility(t: HookKnifeType): number {
  const m: Record<HookKnifeType, number> = {
    right_hand_single: 6, left_hand_single: 6, double_edge_both: 10, tight_radius_small: 5, open_curve_large: 7,
  };
  return m[t];
}

export function sharpenEase(t: HookKnifeType): number {
  const m: Record<HookKnifeType, number> = {
    right_hand_single: 8, left_hand_single: 8, double_edge_both: 5, tight_radius_small: 4, open_curve_large: 9,
  };
  return m[t];
}

export function knifeCost(t: HookKnifeType): number {
  const m: Record<HookKnifeType, number> = {
    right_hand_single: 2, left_hand_single: 2, double_edge_both: 3, tight_radius_small: 2, open_curve_large: 2,
  };
  return m[t];
}

export function doubleEdge(t: HookKnifeType): boolean {
  const m: Record<HookKnifeType, boolean> = {
    right_hand_single: false, left_hand_single: false, double_edge_both: true, tight_radius_small: false, open_curve_large: false,
  };
  return m[t];
}

export function leftHand(t: HookKnifeType): boolean {
  const m: Record<HookKnifeType, boolean> = {
    right_hand_single: false, left_hand_single: true, double_edge_both: true, tight_radius_small: false, open_curve_large: false,
  };
  return m[t];
}

export function curveRadius(t: HookKnifeType): string {
  const m: Record<HookKnifeType, string> = {
    right_hand_single: "medium_right_curve",
    left_hand_single: "medium_left_curve",
    double_edge_both: "medium_both_curve",
    tight_radius_small: "tight_small_curve",
    open_curve_large: "open_large_sweep",
  };
  return m[t];
}

export function bestUse(t: HookKnifeType): string {
  const m: Record<HookKnifeType, string> = {
    right_hand_single: "right_bowl_carve",
    left_hand_single: "left_bowl_carve",
    double_edge_both: "ambidextrous_hollow",
    tight_radius_small: "small_cup_hollow",
    open_curve_large: "shallow_dish_carve",
  };
  return m[t];
}

export function hookKnives(): HookKnifeType[] {
  return ["right_hand_single", "left_hand_single", "double_edge_both", "tight_radius_small", "open_curve_large"];
}
