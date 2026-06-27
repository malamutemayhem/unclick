export type SpoonGougeType = "tight_curl_hook" | "shallow_sweep_wide" | "deep_bowl_scoop" | "left_hand_curve" | "straight_gouge_flat";

export function hollowDepth(t: SpoonGougeType): number {
  const m: Record<SpoonGougeType, number> = {
    tight_curl_hook: 10, shallow_sweep_wide: 5, deep_bowl_scoop: 9, left_hand_curve: 7, straight_gouge_flat: 3,
  };
  return m[t];
}

export function cutWidth(t: SpoonGougeType): number {
  const m: Record<SpoonGougeType, number> = {
    tight_curl_hook: 4, shallow_sweep_wide: 10, deep_bowl_scoop: 7, left_hand_curve: 6, straight_gouge_flat: 8,
  };
  return m[t];
}

export function controlFeel(t: SpoonGougeType): number {
  const m: Record<SpoonGougeType, number> = {
    tight_curl_hook: 6, shallow_sweep_wide: 8, deep_bowl_scoop: 7, left_hand_curve: 7, straight_gouge_flat: 9,
  };
  return m[t];
}

export function sharpenEase(t: SpoonGougeType): number {
  const m: Record<SpoonGougeType, number> = {
    tight_curl_hook: 3, shallow_sweep_wide: 8, deep_bowl_scoop: 5, left_hand_curve: 4, straight_gouge_flat: 10,
  };
  return m[t];
}

export function gougeCost(t: SpoonGougeType): number {
  const m: Record<SpoonGougeType, number> = {
    tight_curl_hook: 2, shallow_sweep_wide: 2, deep_bowl_scoop: 2, left_hand_curve: 2, straight_gouge_flat: 1,
  };
  return m[t];
}

export function hooked(t: SpoonGougeType): boolean {
  const m: Record<SpoonGougeType, boolean> = {
    tight_curl_hook: true, shallow_sweep_wide: false, deep_bowl_scoop: true, left_hand_curve: true, straight_gouge_flat: false,
  };
  return m[t];
}

export function leftHand(t: SpoonGougeType): boolean {
  const m: Record<SpoonGougeType, boolean> = {
    tight_curl_hook: false, shallow_sweep_wide: false, deep_bowl_scoop: false, left_hand_curve: true, straight_gouge_flat: false,
  };
  return m[t];
}

export function edgeProfile(t: SpoonGougeType): string {
  const m: Record<SpoonGougeType, string> = {
    tight_curl_hook: "tight_hook_curl",
    shallow_sweep_wide: "wide_shallow_sweep",
    deep_bowl_scoop: "deep_u_channel",
    left_hand_curve: "left_curve_hook",
    straight_gouge_flat: "flat_straight_edge",
  };
  return m[t];
}

export function bestUse(t: SpoonGougeType): string {
  const m: Record<SpoonGougeType, string> = {
    tight_curl_hook: "deep_spoon_bowl",
    shallow_sweep_wide: "wide_platter_hollow",
    deep_bowl_scoop: "kuksa_cup_carve",
    left_hand_curve: "left_side_hollow",
    straight_gouge_flat: "flat_surface_shape",
  };
  return m[t];
}

export function spoonGouges(): SpoonGougeType[] {
  return ["tight_curl_hook", "shallow_sweep_wide", "deep_bowl_scoop", "left_hand_curve", "straight_gouge_flat"];
}
