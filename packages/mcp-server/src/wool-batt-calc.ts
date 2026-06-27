export type WoolBattType = "needle_felt_sheet" | "wet_felt_merino" | "quilt_batt_poly" | "insulation_batt_thick" | "art_batt_textured";

export function feltDensity(t: WoolBattType): number {
  const m: Record<WoolBattType, number> = {
    needle_felt_sheet: 9, wet_felt_merino: 8, quilt_batt_poly: 5, insulation_batt_thick: 3, art_batt_textured: 6,
  };
  return m[t];
}

export function drapeSoft(t: WoolBattType): number {
  const m: Record<WoolBattType, number> = {
    needle_felt_sheet: 4, wet_felt_merino: 8, quilt_batt_poly: 9, insulation_batt_thick: 3, art_batt_textured: 6,
  };
  return m[t];
}

export function textureInterest(t: WoolBattType): number {
  const m: Record<WoolBattType, number> = {
    needle_felt_sheet: 5, wet_felt_merino: 6, quilt_batt_poly: 3, insulation_batt_thick: 2, art_batt_textured: 10,
  };
  return m[t];
}

export function warmthValue(t: WoolBattType): number {
  const m: Record<WoolBattType, number> = {
    needle_felt_sheet: 6, wet_felt_merino: 8, quilt_batt_poly: 7, insulation_batt_thick: 10, art_batt_textured: 5,
  };
  return m[t];
}

export function battCost(t: WoolBattType): number {
  const m: Record<WoolBattType, number> = {
    needle_felt_sheet: 2, wet_felt_merino: 4, quilt_batt_poly: 1, insulation_batt_thick: 2, art_batt_textured: 5,
  };
  return m[t];
}

export function pureWool(t: WoolBattType): boolean {
  const m: Record<WoolBattType, boolean> = {
    needle_felt_sheet: true, wet_felt_merino: true, quilt_batt_poly: false, insulation_batt_thick: true, art_batt_textured: false,
  };
  return m[t];
}

export function preFelted(t: WoolBattType): boolean {
  const m: Record<WoolBattType, boolean> = {
    needle_felt_sheet: true, wet_felt_merino: false, quilt_batt_poly: false, insulation_batt_thick: false, art_batt_textured: false,
  };
  return m[t];
}

export function fiberContent(t: WoolBattType): string {
  const m: Record<WoolBattType, string> = {
    needle_felt_sheet: "wool_prefelt_dense",
    wet_felt_merino: "merino_carded_soft",
    quilt_batt_poly: "polyester_bonded_sheet",
    insulation_batt_thick: "wool_carded_loft",
    art_batt_textured: "mixed_fiber_novelty",
  };
  return m[t];
}

export function bestProject(t: WoolBattType): string {
  const m: Record<WoolBattType, string> = {
    needle_felt_sheet: "flat_needle_felt_base",
    wet_felt_merino: "wet_felt_garment",
    quilt_batt_poly: "quilt_fill_layer",
    insulation_batt_thick: "thermal_wall_fill",
    art_batt_textured: "art_yarn_spin",
  };
  return m[t];
}

export function woolBatts(): WoolBattType[] {
  return ["needle_felt_sheet", "wet_felt_merino", "quilt_batt_poly", "insulation_batt_thick", "art_batt_textured"];
}
