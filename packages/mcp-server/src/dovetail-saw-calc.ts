export type DovetailSawType = "western_push_stroke" | "japanese_pull_dozuki" | "gents_brass_back" | "carcass_rip_deep" | "frame_adjustable_blade";

export function cutPrecision(t: DovetailSawType): number {
  const m: Record<DovetailSawType, number> = {
    western_push_stroke: 8, japanese_pull_dozuki: 10, gents_brass_back: 9, carcass_rip_deep: 6, frame_adjustable_blade: 7,
  };
  return m[t];
}

export function cutSpeed(t: DovetailSawType): number {
  const m: Record<DovetailSawType, number> = {
    western_push_stroke: 7, japanese_pull_dozuki: 8, gents_brass_back: 5, carcass_rip_deep: 10, frame_adjustable_blade: 6,
  };
  return m[t];
}

export function bladeControl(t: DovetailSawType): number {
  const m: Record<DovetailSawType, number> = {
    western_push_stroke: 8, japanese_pull_dozuki: 9, gents_brass_back: 10, carcass_rip_deep: 7, frame_adjustable_blade: 7,
  };
  return m[t];
}

export function kerfWidth(t: DovetailSawType): number {
  const m: Record<DovetailSawType, number> = {
    western_push_stroke: 6, japanese_pull_dozuki: 10, gents_brass_back: 8, carcass_rip_deep: 4, frame_adjustable_blade: 7,
  };
  return m[t];
}

export function sawCost(t: DovetailSawType): number {
  const m: Record<DovetailSawType, number> = {
    western_push_stroke: 2, japanese_pull_dozuki: 2, gents_brass_back: 3, carcass_rip_deep: 2, frame_adjustable_blade: 1,
  };
  return m[t];
}

export function hasBackbone(t: DovetailSawType): boolean {
  const m: Record<DovetailSawType, boolean> = {
    western_push_stroke: true, japanese_pull_dozuki: true, gents_brass_back: true, carcass_rip_deep: true, frame_adjustable_blade: false,
  };
  return m[t];
}

export function pullStroke(t: DovetailSawType): boolean {
  const m: Record<DovetailSawType, boolean> = {
    western_push_stroke: false, japanese_pull_dozuki: true, gents_brass_back: false, carcass_rip_deep: false, frame_adjustable_blade: false,
  };
  return m[t];
}

export function toothPattern(t: DovetailSawType): string {
  const m: Record<DovetailSawType, string> = {
    western_push_stroke: "rip_crosscut_hybrid",
    japanese_pull_dozuki: "impulse_hardened_fine",
    gents_brass_back: "fine_rip_15_tpi",
    carcass_rip_deep: "aggressive_rip_10_tpi",
    frame_adjustable_blade: "replaceable_scroll_blade",
  };
  return m[t];
}

export function bestJoint(t: DovetailSawType): string {
  const m: Record<DovetailSawType, string> = {
    western_push_stroke: "through_dovetail_wide",
    japanese_pull_dozuki: "half_blind_dovetail",
    gents_brass_back: "small_box_dovetail",
    carcass_rip_deep: "tenon_cheek_rip",
    frame_adjustable_blade: "curved_fretwork_cut",
  };
  return m[t];
}

export function dovetailSaws(): DovetailSawType[] {
  return ["western_push_stroke", "japanese_pull_dozuki", "gents_brass_back", "carcass_rip_deep", "frame_adjustable_blade"];
}
