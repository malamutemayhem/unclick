export type SurfacePlateType = "granite_black_pro" | "cast_iron_ribbed" | "ceramic_white_lab" | "steel_lapped_shop" | "granite_pink_economy";

export function flatness(t: SurfacePlateType): number {
  const m: Record<SurfacePlateType, number> = {
    granite_black_pro: 10, cast_iron_ribbed: 7, ceramic_white_lab: 9, steel_lapped_shop: 6, granite_pink_economy: 8,
  };
  return m[t];
}

export function wearResist(t: SurfacePlateType): number {
  const m: Record<SurfacePlateType, number> = {
    granite_black_pro: 10, cast_iron_ribbed: 6, ceramic_white_lab: 9, steel_lapped_shop: 5, granite_pink_economy: 8,
  };
  return m[t];
}

export function stability(t: SurfacePlateType): number {
  const m: Record<SurfacePlateType, number> = {
    granite_black_pro: 10, cast_iron_ribbed: 7, ceramic_white_lab: 8, steel_lapped_shop: 6, granite_pink_economy: 9,
  };
  return m[t];
}

export function portability(t: SurfacePlateType): number {
  const m: Record<SurfacePlateType, number> = {
    granite_black_pro: 2, cast_iron_ribbed: 3, ceramic_white_lab: 4, steel_lapped_shop: 5, granite_pink_economy: 3,
  };
  return m[t];
}

export function plateCost(t: SurfacePlateType): number {
  const m: Record<SurfacePlateType, number> = {
    granite_black_pro: 3, cast_iron_ribbed: 2, ceramic_white_lab: 3, steel_lapped_shop: 1, granite_pink_economy: 2,
  };
  return m[t];
}

export function nonMagnetic(t: SurfacePlateType): boolean {
  const m: Record<SurfacePlateType, boolean> = {
    granite_black_pro: true, cast_iron_ribbed: false, ceramic_white_lab: true, steel_lapped_shop: false, granite_pink_economy: true,
  };
  return m[t];
}

export function burrsafe(t: SurfacePlateType): boolean {
  const m: Record<SurfacePlateType, boolean> = {
    granite_black_pro: true, cast_iron_ribbed: false, ceramic_white_lab: true, steel_lapped_shop: false, granite_pink_economy: true,
  };
  return m[t];
}

export function plateGrade(t: SurfacePlateType): string {
  const m: Record<SurfacePlateType, string> = {
    granite_black_pro: "grade_a_lab",
    cast_iron_ribbed: "grade_b_shop",
    ceramic_white_lab: "grade_aa_lab",
    steel_lapped_shop: "workshop_grade",
    granite_pink_economy: "grade_b_economy",
  };
  return m[t];
}

export function bestUse(t: SurfacePlateType): string {
  const m: Record<SurfacePlateType, string> = {
    granite_black_pro: "precision_layout_inspect",
    cast_iron_ribbed: "shop_layout_mark",
    ceramic_white_lab: "ultra_flat_metrology",
    steel_lapped_shop: "quick_reference_flat",
    granite_pink_economy: "hobby_shop_layout",
  };
  return m[t];
}

export function surfacePlates(): SurfacePlateType[] {
  return ["granite_black_pro", "cast_iron_ribbed", "ceramic_white_lab", "steel_lapped_shop", "granite_pink_economy"];
}
