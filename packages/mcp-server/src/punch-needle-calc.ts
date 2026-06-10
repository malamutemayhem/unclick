export type PunchNeedleType = "adjustable_depth_standard" | "mini_fine_detail" | "oxford_rug_large" | "russian_hook_loop" | "ultrapunch_three_strand";

export function loopHeight(t: PunchNeedleType): number {
  const m: Record<PunchNeedleType, number> = {
    adjustable_depth_standard: 8, mini_fine_detail: 4, oxford_rug_large: 10, russian_hook_loop: 7, ultrapunch_three_strand: 6,
  };
  return m[t];
}

export function detailLevel(t: PunchNeedleType): number {
  const m: Record<PunchNeedleType, number> = {
    adjustable_depth_standard: 7, mini_fine_detail: 10, oxford_rug_large: 3, russian_hook_loop: 6, ultrapunch_three_strand: 8,
  };
  return m[t];
}

export function speedOutput(t: PunchNeedleType): number {
  const m: Record<PunchNeedleType, number> = {
    adjustable_depth_standard: 8, mini_fine_detail: 5, oxford_rug_large: 9, russian_hook_loop: 7, ultrapunch_three_strand: 10,
  };
  return m[t];
}

export function easeOfUse(t: PunchNeedleType): number {
  const m: Record<PunchNeedleType, number> = {
    adjustable_depth_standard: 8, mini_fine_detail: 5, oxford_rug_large: 7, russian_hook_loop: 6, ultrapunch_three_strand: 9,
  };
  return m[t];
}

export function needleCost(t: PunchNeedleType): number {
  const m: Record<PunchNeedleType, number> = {
    adjustable_depth_standard: 2, mini_fine_detail: 2, oxford_rug_large: 3, russian_hook_loop: 1, ultrapunch_three_strand: 2,
  };
  return m[t];
}

export function adjustableDepth(t: PunchNeedleType): boolean {
  const m: Record<PunchNeedleType, boolean> = {
    adjustable_depth_standard: true, mini_fine_detail: false, oxford_rug_large: true, russian_hook_loop: false, ultrapunch_three_strand: true,
  };
  return m[t];
}

export function forRugMaking(t: PunchNeedleType): boolean {
  const m: Record<PunchNeedleType, boolean> = {
    adjustable_depth_standard: false, mini_fine_detail: false, oxford_rug_large: true, russian_hook_loop: false, ultrapunch_three_strand: false,
  };
  return m[t];
}

export function needleGauge(t: PunchNeedleType): string {
  const m: Record<PunchNeedleType, string> = {
    adjustable_depth_standard: "medium_gauge_multi",
    mini_fine_detail: "fine_gauge_single",
    oxford_rug_large: "heavy_gauge_wide",
    russian_hook_loop: "hook_tip_curved",
    ultrapunch_three_strand: "triple_needle_cluster",
  };
  return m[t];
}

export function bestProject(t: PunchNeedleType): string {
  const m: Record<PunchNeedleType, string> = {
    adjustable_depth_standard: "wall_hanging_mixed",
    mini_fine_detail: "miniature_portrait",
    oxford_rug_large: "floor_rug_heavy",
    russian_hook_loop: "flat_embroidery_fill",
    ultrapunch_three_strand: "pillow_cover_fast",
  };
  return m[t];
}

export function punchNeedles(): PunchNeedleType[] {
  return ["adjustable_depth_standard", "mini_fine_detail", "oxford_rug_large", "russian_hook_loop", "ultrapunch_three_strand"];
}
