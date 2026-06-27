export type ShiboriToolType = "pole_arashi_wrap" | "clamp_itajime_fold" | "stitch_ori_nui" | "bind_kumo_scrunch" | "cap_boshi_cover";

export function patternDetail(t: ShiboriToolType): number {
  const m: Record<ShiboriToolType, number> = {
    pole_arashi_wrap: 8, clamp_itajime_fold: 9, stitch_ori_nui: 10, bind_kumo_scrunch: 5, cap_boshi_cover: 6,
  };
  return m[t];
}

export function repeatConsist(t: ShiboriToolType): number {
  const m: Record<ShiboriToolType, number> = {
    pole_arashi_wrap: 7, clamp_itajime_fold: 10, stitch_ori_nui: 6, bind_kumo_scrunch: 4, cap_boshi_cover: 8,
  };
  return m[t];
}

export function easeOfUse(t: ShiboriToolType): number {
  const m: Record<ShiboriToolType, number> = {
    pole_arashi_wrap: 7, clamp_itajime_fold: 8, stitch_ori_nui: 4, bind_kumo_scrunch: 10, cap_boshi_cover: 9,
  };
  return m[t];
}

export function fabricRange(t: ShiboriToolType): number {
  const m: Record<ShiboriToolType, number> = {
    pole_arashi_wrap: 7, clamp_itajime_fold: 8, stitch_ori_nui: 9, bind_kumo_scrunch: 10, cap_boshi_cover: 6,
  };
  return m[t];
}

export function toolCost(t: ShiboriToolType): number {
  const m: Record<ShiboriToolType, number> = {
    pole_arashi_wrap: 3, clamp_itajime_fold: 4, stitch_ori_nui: 1, bind_kumo_scrunch: 1, cap_boshi_cover: 2,
  };
  return m[t];
}

export function needsClamp(t: ShiboriToolType): boolean {
  const m: Record<ShiboriToolType, boolean> = {
    pole_arashi_wrap: false, clamp_itajime_fold: true, stitch_ori_nui: false, bind_kumo_scrunch: false, cap_boshi_cover: false,
  };
  return m[t];
}

export function needsStitch(t: ShiboriToolType): boolean {
  const m: Record<ShiboriToolType, boolean> = {
    pole_arashi_wrap: false, clamp_itajime_fold: false, stitch_ori_nui: true, bind_kumo_scrunch: false, cap_boshi_cover: false,
  };
  return m[t];
}

export function toolType(t: ShiboriToolType): string {
  const m: Record<ShiboriToolType, string> = {
    pole_arashi_wrap: "pvc_pipe_wrap",
    clamp_itajime_fold: "wood_block_clamp",
    stitch_ori_nui: "needle_thread_stitch",
    bind_kumo_scrunch: "rubber_band_tie",
    cap_boshi_cover: "plastic_cap_cover",
  };
  return m[t];
}

export function bestPattern(t: ShiboriToolType): string {
  const m: Record<ShiboriToolType, string> = {
    pole_arashi_wrap: "diagonal_rain_stripe",
    clamp_itajime_fold: "geometric_fold_shape",
    stitch_ori_nui: "organic_line_curve",
    bind_kumo_scrunch: "spider_web_circle",
    cap_boshi_cover: "round_cap_reserve",
  };
  return m[t];
}

export function shiboriTools(): ShiboriToolType[] {
  return ["pole_arashi_wrap", "clamp_itajime_fold", "stitch_ori_nui", "bind_kumo_scrunch", "cap_boshi_cover"];
}
