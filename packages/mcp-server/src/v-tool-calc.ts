export type VToolType = "degree_60_standard" | "degree_45_narrow" | "degree_90_wide" | "micro_detail_fine" | "parting_deep_cut";

export function lineWidth(t: VToolType): number {
  const m: Record<VToolType, number> = {
    degree_60_standard: 7, degree_45_narrow: 5, degree_90_wide: 9, micro_detail_fine: 3, parting_deep_cut: 6,
  };
  return m[t];
}

export function lineDepth(t: VToolType): number {
  const m: Record<VToolType, number> = {
    degree_60_standard: 7, degree_45_narrow: 8, degree_90_wide: 5, micro_detail_fine: 4, parting_deep_cut: 10,
  };
  return m[t];
}

export function controlFine(t: VToolType): number {
  const m: Record<VToolType, number> = {
    degree_60_standard: 8, degree_45_narrow: 9, degree_90_wide: 6, micro_detail_fine: 10, parting_deep_cut: 5,
  };
  return m[t];
}

export function versatility(t: VToolType): number {
  const m: Record<VToolType, number> = {
    degree_60_standard: 10, degree_45_narrow: 7, degree_90_wide: 6, micro_detail_fine: 5, parting_deep_cut: 8,
  };
  return m[t];
}

export function toolCost(t: VToolType): number {
  const m: Record<VToolType, number> = {
    degree_60_standard: 3, degree_45_narrow: 3, degree_90_wide: 3, micro_detail_fine: 4, parting_deep_cut: 3,
  };
  return m[t];
}

export function forLettering(t: VToolType): boolean {
  const m: Record<VToolType, boolean> = {
    degree_60_standard: true, degree_45_narrow: true, degree_90_wide: false, micro_detail_fine: true, parting_deep_cut: false,
  };
  return m[t];
}

export function forOutline(t: VToolType): boolean {
  const m: Record<VToolType, boolean> = {
    degree_60_standard: true, degree_45_narrow: true, degree_90_wide: true, micro_detail_fine: false, parting_deep_cut: true,
  };
  return m[t];
}

export function angleProfile(t: VToolType): string {
  const m: Record<VToolType, string> = {
    degree_60_standard: "sixty_degree_vee",
    degree_45_narrow: "forty_five_degree_vee",
    degree_90_wide: "ninety_degree_vee",
    micro_detail_fine: "micro_vee_point",
    parting_deep_cut: "deep_parting_vee",
  };
  return m[t];
}

export function bestUse(t: VToolType): string {
  const m: Record<VToolType, string> = {
    degree_60_standard: "general_outline_letter",
    degree_45_narrow: "fine_detail_line",
    degree_90_wide: "wide_decorative_groove",
    micro_detail_fine: "miniature_detail_work",
    parting_deep_cut: "deep_separation_cut",
  };
  return m[t];
}

export function vTools(): VToolType[] {
  return ["degree_60_standard", "degree_45_narrow", "degree_90_wide", "micro_detail_fine", "parting_deep_cut"];
}
