export type TravisherType = "round_sole_chair" | "flat_sole_panel" | "adjustable_mouth_set" | "open_throat_deep" | "mini_palm_small";

export function scoopDepth(t: TravisherType): number {
  const m: Record<TravisherType, number> = {
    round_sole_chair: 9, flat_sole_panel: 5, adjustable_mouth_set: 7, open_throat_deep: 10, mini_palm_small: 6,
  };
  return m[t];
}

export function surfaceSmooth(t: TravisherType): number {
  const m: Record<TravisherType, number> = {
    round_sole_chair: 8, flat_sole_panel: 9, adjustable_mouth_set: 7, open_throat_deep: 6, mini_palm_small: 8,
  };
  return m[t];
}

export function controlGrip(t: TravisherType): number {
  const m: Record<TravisherType, number> = {
    round_sole_chair: 7, flat_sole_panel: 8, adjustable_mouth_set: 8, open_throat_deep: 6, mini_palm_small: 10,
  };
  return m[t];
}

export function adjustability(t: TravisherType): number {
  const m: Record<TravisherType, number> = {
    round_sole_chair: 5, flat_sole_panel: 5, adjustable_mouth_set: 10, open_throat_deep: 6, mini_palm_small: 4,
  };
  return m[t];
}

export function travisherCost(t: TravisherType): number {
  const m: Record<TravisherType, number> = {
    round_sole_chair: 3, flat_sole_panel: 3, adjustable_mouth_set: 3, open_throat_deep: 3, mini_palm_small: 2,
  };
  return m[t];
}

export function roundSole(t: TravisherType): boolean {
  const m: Record<TravisherType, boolean> = {
    round_sole_chair: true, flat_sole_panel: false, adjustable_mouth_set: false, open_throat_deep: true, mini_palm_small: true,
  };
  return m[t];
}

export function palmGrip(t: TravisherType): boolean {
  const m: Record<TravisherType, boolean> = {
    round_sole_chair: false, flat_sole_panel: false, adjustable_mouth_set: false, open_throat_deep: false, mini_palm_small: true,
  };
  return m[t];
}

export function bladeStyle(t: TravisherType): string {
  const m: Record<TravisherType, string> = {
    round_sole_chair: "curved_a2_steel",
    flat_sole_panel: "flat_a2_steel",
    adjustable_mouth_set: "adjustable_o1_steel",
    open_throat_deep: "deep_curved_steel",
    mini_palm_small: "small_curved_blade",
  };
  return m[t];
}

export function bestUse(t: TravisherType): string {
  const m: Record<TravisherType, string> = {
    round_sole_chair: "chair_seat_scoop",
    flat_sole_panel: "flat_panel_smooth",
    adjustable_mouth_set: "variable_depth_hollow",
    open_throat_deep: "deep_bowl_finish",
    mini_palm_small: "small_detail_scoop",
  };
  return m[t];
}

export function travishers(): TravisherType[] {
  return ["round_sole_chair", "flat_sole_panel", "adjustable_mouth_set", "open_throat_deep", "mini_palm_small"];
}
