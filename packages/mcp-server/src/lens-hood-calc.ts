export type LensHoodType = "tulip_petal_wide" | "cylindrical_round_tele" | "collapsible_rubber_flex" | "square_matte_box" | "built_in_retractable";

export function flareReduction(t: LensHoodType): number {
  const m: Record<LensHoodType, number> = {
    tulip_petal_wide: 7, cylindrical_round_tele: 9, collapsible_rubber_flex: 5, square_matte_box: 10, built_in_retractable: 6,
  };
  return m[t];
}

export function physicalProtect(t: LensHoodType): number {
  const m: Record<LensHoodType, number> = {
    tulip_petal_wide: 7, cylindrical_round_tele: 8, collapsible_rubber_flex: 6, square_matte_box: 9, built_in_retractable: 5,
  };
  return m[t];
}

export function compactStorage(t: LensHoodType): number {
  const m: Record<LensHoodType, number> = {
    tulip_petal_wide: 5, cylindrical_round_tele: 4, collapsible_rubber_flex: 10, square_matte_box: 2, built_in_retractable: 10,
  };
  return m[t];
}

export function compatibility(t: LensHoodType): number {
  const m: Record<LensHoodType, number> = {
    tulip_petal_wide: 6, cylindrical_round_tele: 6, collapsible_rubber_flex: 9, square_matte_box: 4, built_in_retractable: 3,
  };
  return m[t];
}

export function hoodCost(t: LensHoodType): number {
  const m: Record<LensHoodType, number> = {
    tulip_petal_wide: 2, cylindrical_round_tele: 2, collapsible_rubber_flex: 2, square_matte_box: 8, built_in_retractable: 0,
  };
  return m[t];
}

export function reverseMountable(t: LensHoodType): boolean {
  const m: Record<LensHoodType, boolean> = {
    tulip_petal_wide: true, cylindrical_round_tele: true, collapsible_rubber_flex: false, square_matte_box: false, built_in_retractable: false,
  };
  return m[t];
}

export function filterFriendly(t: LensHoodType): boolean {
  const m: Record<LensHoodType, boolean> = {
    tulip_petal_wide: true, cylindrical_round_tele: true, collapsible_rubber_flex: true, square_matte_box: true, built_in_retractable: false,
  };
  return m[t];
}

export function hoodMaterial(t: LensHoodType): string {
  const m: Record<LensHoodType, string> = {
    tulip_petal_wide: "hard_plastic_bayonet",
    cylindrical_round_tele: "hard_plastic_screw_on",
    collapsible_rubber_flex: "silicone_rubber_fold",
    square_matte_box: "aluminum_bellows_rail",
    built_in_retractable: "integrated_barrel_slide",
  };
  return m[t];
}

export function bestLens(t: LensHoodType): string {
  const m: Record<LensHoodType, string> = {
    tulip_petal_wide: "wide_angle_14_35mm",
    cylindrical_round_tele: "telephoto_70_200mm",
    collapsible_rubber_flex: "travel_universal_fit",
    square_matte_box: "cinema_pro_video",
    built_in_retractable: "compact_prime_pancake",
  };
  return m[t];
}

export function lensHoods(): LensHoodType[] {
  return ["tulip_petal_wide", "cylindrical_round_tele", "collapsible_rubber_flex", "square_matte_box", "built_in_retractable"];
}
