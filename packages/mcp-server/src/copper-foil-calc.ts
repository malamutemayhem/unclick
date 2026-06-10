export type CopperFoilType = "standard_back_copper" | "black_back_dark" | "silver_back_mirror" | "wave_edge_decorative" | "wide_foil_heavy";

export function solderAdhere(t: CopperFoilType): number {
  const m: Record<CopperFoilType, number> = {
    standard_back_copper: 9, black_back_dark: 8, silver_back_mirror: 8, wave_edge_decorative: 7, wide_foil_heavy: 10,
  };
  return m[t];
}

export function wrapEase(t: CopperFoilType): number {
  const m: Record<CopperFoilType, number> = {
    standard_back_copper: 9, black_back_dark: 8, silver_back_mirror: 8, wave_edge_decorative: 5, wide_foil_heavy: 6,
  };
  return m[t];
}

export function visualBlend(t: CopperFoilType): number {
  const m: Record<CopperFoilType, number> = {
    standard_back_copper: 6, black_back_dark: 10, silver_back_mirror: 9, wave_edge_decorative: 8, wide_foil_heavy: 5,
  };
  return m[t];
}

export function edgeCoverage(t: CopperFoilType): number {
  const m: Record<CopperFoilType, number> = {
    standard_back_copper: 7, black_back_dark: 7, silver_back_mirror: 7, wave_edge_decorative: 8, wide_foil_heavy: 10,
  };
  return m[t];
}

export function foilCost(t: CopperFoilType): number {
  const m: Record<CopperFoilType, number> = {
    standard_back_copper: 1, black_back_dark: 2, silver_back_mirror: 2, wave_edge_decorative: 3, wide_foil_heavy: 2,
  };
  return m[t];
}

export function colorBack(t: CopperFoilType): boolean {
  const m: Record<CopperFoilType, boolean> = {
    standard_back_copper: false, black_back_dark: true, silver_back_mirror: true, wave_edge_decorative: false, wide_foil_heavy: false,
  };
  return m[t];
}

export function decorativeEdge(t: CopperFoilType): boolean {
  const m: Record<CopperFoilType, boolean> = {
    standard_back_copper: false, black_back_dark: false, silver_back_mirror: false, wave_edge_decorative: true, wide_foil_heavy: false,
  };
  return m[t];
}

export function adhesiveType(t: CopperFoilType): string {
  const m: Record<CopperFoilType, string> = {
    standard_back_copper: "clear_pressure_sensitive",
    black_back_dark: "black_tinted_adhesive",
    silver_back_mirror: "silver_reflective_layer",
    wave_edge_decorative: "clear_scallop_cut",
    wide_foil_heavy: "clear_extra_tack",
  };
  return m[t];
}

export function bestProject(t: CopperFoilType): string {
  const m: Record<CopperFoilType, string> = {
    standard_back_copper: "general_tiffany_piece",
    black_back_dark: "dark_glass_cathedral",
    silver_back_mirror: "mirror_glass_accent",
    wave_edge_decorative: "decorative_edge_box",
    wide_foil_heavy: "three_d_lamp_heavy",
  };
  return m[t];
}

export function copperFoils(): CopperFoilType[] {
  return ["standard_back_copper", "black_back_dark", "silver_back_mirror", "wave_edge_decorative", "wide_foil_heavy"];
}
