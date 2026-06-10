export type FlatGraverType = "standard_flat_wide" | "narrow_flat_detail" | "beveled_flat_angle" | "carbide_flat_hard" | "scorper_round_bottom";

export function metalRemoval(t: FlatGraverType): number {
  const m: Record<FlatGraverType, number> = {
    standard_flat_wide: 9, narrow_flat_detail: 5, beveled_flat_angle: 7, carbide_flat_hard: 10, scorper_round_bottom: 8,
  };
  return m[t];
}

export function surfaceFinish(t: FlatGraverType): number {
  const m: Record<FlatGraverType, number> = {
    standard_flat_wide: 8, narrow_flat_detail: 7, beveled_flat_angle: 9, carbide_flat_hard: 6, scorper_round_bottom: 5,
  };
  return m[t];
}

export function lineWidth(t: FlatGraverType): number {
  const m: Record<FlatGraverType, number> = {
    standard_flat_wide: 9, narrow_flat_detail: 4, beveled_flat_angle: 7, carbide_flat_hard: 8, scorper_round_bottom: 6,
  };
  return m[t];
}

export function edgeRetention(t: FlatGraverType): number {
  const m: Record<FlatGraverType, number> = {
    standard_flat_wide: 6, narrow_flat_detail: 5, beveled_flat_angle: 7, carbide_flat_hard: 10, scorper_round_bottom: 7,
  };
  return m[t];
}

export function graverCost(t: FlatGraverType): number {
  const m: Record<FlatGraverType, number> = {
    standard_flat_wide: 1, narrow_flat_detail: 1, beveled_flat_angle: 2, carbide_flat_hard: 3, scorper_round_bottom: 2,
  };
  return m[t];
}

export function forBackground(t: FlatGraverType): boolean {
  const m: Record<FlatGraverType, boolean> = {
    standard_flat_wide: true, narrow_flat_detail: false, beveled_flat_angle: false, carbide_flat_hard: true, scorper_round_bottom: true,
  };
  return m[t];
}

export function carbideTip(t: FlatGraverType): boolean {
  const m: Record<FlatGraverType, boolean> = {
    standard_flat_wide: false, narrow_flat_detail: false, beveled_flat_angle: false, carbide_flat_hard: true, scorper_round_bottom: false,
  };
  return m[t];
}

export function bladeProfile(t: FlatGraverType): string {
  const m: Record<FlatGraverType, string> = {
    standard_flat_wide: "rectangular_cross_section",
    narrow_flat_detail: "thin_rectangular_profile",
    beveled_flat_angle: "angled_face_bevel",
    carbide_flat_hard: "solid_carbide_blank",
    scorper_round_bottom: "half_round_scoop",
  };
  return m[t];
}

export function bestUse(t: FlatGraverType): string {
  const m: Record<FlatGraverType, string> = {
    standard_flat_wide: "background_clear_cut",
    narrow_flat_detail: "fine_detail_line",
    beveled_flat_angle: "bright_cut_bevel",
    carbide_flat_hard: "hardened_metal_engrave",
    scorper_round_bottom: "round_channel_scoop",
  };
  return m[t];
}

export function flatGravers(): FlatGraverType[] {
  return ["standard_flat_wide", "narrow_flat_detail", "beveled_flat_angle", "carbide_flat_hard", "scorper_round_bottom"];
}
