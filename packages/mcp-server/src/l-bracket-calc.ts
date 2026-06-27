export type LBracketType = "universal_arca_swiss" | "camera_specific_custom" | "modular_two_piece" | "quick_release_lever" | "wooden_grip_comfort";

export function switchSpeed(t: LBracketType): number {
  const m: Record<LBracketType, number> = {
    universal_arca_swiss: 8, camera_specific_custom: 9, modular_two_piece: 7, quick_release_lever: 10, wooden_grip_comfort: 7,
  };
  return m[t];
}

export function cameraFit(t: LBracketType): number {
  const m: Record<LBracketType, number> = {
    universal_arca_swiss: 6, camera_specific_custom: 10, modular_two_piece: 7, quick_release_lever: 6, wooden_grip_comfort: 9,
  };
  return m[t];
}

export function buildQuality(t: LBracketType): number {
  const m: Record<LBracketType, number> = {
    universal_arca_swiss: 8, camera_specific_custom: 10, modular_two_piece: 7, quick_release_lever: 8, wooden_grip_comfort: 7,
  };
  return m[t];
}

export function gripComfort(t: LBracketType): number {
  const m: Record<LBracketType, number> = {
    universal_arca_swiss: 5, camera_specific_custom: 7, modular_two_piece: 6, quick_release_lever: 5, wooden_grip_comfort: 10,
  };
  return m[t];
}

export function bracketCost(t: LBracketType): number {
  const m: Record<LBracketType, number> = {
    universal_arca_swiss: 2, camera_specific_custom: 3, modular_two_piece: 2, quick_release_lever: 2, wooden_grip_comfort: 3,
  };
  return m[t];
}

export function arcaCompatible(t: LBracketType): boolean {
  const m: Record<LBracketType, boolean> = {
    universal_arca_swiss: true, camera_specific_custom: true, modular_two_piece: true, quick_release_lever: true, wooden_grip_comfort: true,
  };
  return m[t];
}

export function portAccess(t: LBracketType): boolean {
  const m: Record<LBracketType, boolean> = {
    universal_arca_swiss: false, camera_specific_custom: true, modular_two_piece: true, quick_release_lever: false, wooden_grip_comfort: true,
  };
  return m[t];
}

export function bodyMaterial(t: LBracketType): string {
  const m: Record<LBracketType, string> = {
    universal_arca_swiss: "aluminum_cnc_anodized",
    camera_specific_custom: "aluminum_precision_milled",
    modular_two_piece: "aluminum_hex_bolt_join",
    quick_release_lever: "aluminum_lever_clamp",
    wooden_grip_comfort: "walnut_aluminum_hybrid",
  };
  return m[t];
}

export function bestShooter(t: LBracketType): string {
  const m: Record<LBracketType, string> = {
    universal_arca_swiss: "multi_camera_budget",
    camera_specific_custom: "dedicated_body_pro",
    modular_two_piece: "travel_removable_base",
    quick_release_lever: "studio_frequent_switch",
    wooden_grip_comfort: "street_daily_carry",
  };
  return m[t];
}

export function lBrackets(): LBracketType[] {
  return ["universal_arca_swiss", "camera_specific_custom", "modular_two_piece", "quick_release_lever", "wooden_grip_comfort"];
}
