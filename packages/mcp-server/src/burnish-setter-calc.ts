export type BurnishSetterType = "straight_rod_push" | "curved_hook_pull" | "rub_over_flat" | "ball_end_round" | "knife_edge_thin";

export function burnishForce(t: BurnishSetterType): number {
  const m: Record<BurnishSetterType, number> = {
    straight_rod_push: 8, curved_hook_pull: 6, rub_over_flat: 9, ball_end_round: 7, knife_edge_thin: 5,
  };
  return m[t];
}

export function finishQuality(t: BurnishSetterType): number {
  const m: Record<BurnishSetterType, number> = {
    straight_rod_push: 7, curved_hook_pull: 6, rub_over_flat: 10, ball_end_round: 9, knife_edge_thin: 8,
  };
  return m[t];
}

export function reachAbility(t: BurnishSetterType): number {
  const m: Record<BurnishSetterType, number> = {
    straight_rod_push: 6, curved_hook_pull: 10, rub_over_flat: 5, ball_end_round: 7, knife_edge_thin: 9,
  };
  return m[t];
}

export function controlEase(t: BurnishSetterType): number {
  const m: Record<BurnishSetterType, number> = {
    straight_rod_push: 8, curved_hook_pull: 6, rub_over_flat: 9, ball_end_round: 7, knife_edge_thin: 5,
  };
  return m[t];
}

export function setterCost(t: BurnishSetterType): number {
  const m: Record<BurnishSetterType, number> = {
    straight_rod_push: 1, curved_hook_pull: 2, rub_over_flat: 2, ball_end_round: 2, knife_edge_thin: 1,
  };
  return m[t];
}

export function polishedTip(t: BurnishSetterType): boolean {
  const m: Record<BurnishSetterType, boolean> = {
    straight_rod_push: true, curved_hook_pull: false, rub_over_flat: true, ball_end_round: true, knife_edge_thin: false,
  };
  return m[t];
}

export function forBezel(t: BurnishSetterType): boolean {
  const m: Record<BurnishSetterType, boolean> = {
    straight_rod_push: true, curved_hook_pull: false, rub_over_flat: true, ball_end_round: false, knife_edge_thin: false,
  };
  return m[t];
}

export function tipMaterial(t: BurnishSetterType): string {
  const m: Record<BurnishSetterType, string> = {
    straight_rod_push: "hardened_steel_polished",
    curved_hook_pull: "spring_steel_bent",
    rub_over_flat: "agate_stone_smooth",
    ball_end_round: "carbide_ball_mirror",
    knife_edge_thin: "tool_steel_ground",
  };
  return m[t];
}

export function bestUse(t: BurnishSetterType): string {
  const m: Record<BurnishSetterType, string> = {
    straight_rod_push: "bezel_push_over",
    curved_hook_pull: "undercut_pull_set",
    rub_over_flat: "smooth_bezel_finish",
    ball_end_round: "tube_setting_close",
    knife_edge_thin: "tight_space_reach",
  };
  return m[t];
}

export function burnishSetters(): BurnishSetterType[] {
  return ["straight_rod_push", "curved_hook_pull", "rub_over_flat", "ball_end_round", "knife_edge_thin"];
}
