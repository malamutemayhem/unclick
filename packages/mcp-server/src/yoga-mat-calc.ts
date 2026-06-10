export type YogaMat = "pvc_standard" | "tpe_eco" | "natural_rubber" | "cork_surface" | "travel_thin";

export function cushionThickness(y: YogaMat): number {
  const m: Record<YogaMat, number> = {
    pvc_standard: 7, tpe_eco: 6, natural_rubber: 8, cork_surface: 5, travel_thin: 2,
  };
  return m[y];
}

export function gripWet(y: YogaMat): number {
  const m: Record<YogaMat, number> = {
    pvc_standard: 4, tpe_eco: 6, natural_rubber: 9, cork_surface: 10, travel_thin: 5,
  };
  return m[y];
}

export function ecoRating(y: YogaMat): number {
  const m: Record<YogaMat, number> = {
    pvc_standard: 2, tpe_eco: 7, natural_rubber: 9, cork_surface: 10, travel_thin: 5,
  };
  return m[y];
}

export function weightScore(y: YogaMat): number {
  const m: Record<YogaMat, number> = {
    pvc_standard: 5, tpe_eco: 7, natural_rubber: 3, cork_surface: 4, travel_thin: 10,
  };
  return m[y];
}

export function matCost(y: YogaMat): number {
  const m: Record<YogaMat, number> = {
    pvc_standard: 2, tpe_eco: 4, natural_rubber: 7, cork_surface: 8, travel_thin: 5,
  };
  return m[y];
}

export function latexFree(y: YogaMat): boolean {
  const m: Record<YogaMat, boolean> = {
    pvc_standard: true, tpe_eco: true, natural_rubber: false, cork_surface: true, travel_thin: true,
  };
  return m[y];
}

export function closedCell(y: YogaMat): boolean {
  const m: Record<YogaMat, boolean> = {
    pvc_standard: true, tpe_eco: true, natural_rubber: false, cork_surface: true, travel_thin: true,
  };
  return m[y];
}

export function surfaceMaterial(y: YogaMat): string {
  const m: Record<YogaMat, string> = {
    pvc_standard: "polyvinyl_chloride_textured", tpe_eco: "thermoplastic_elastomer_foam",
    natural_rubber: "tree_tapped_natural_latex", cork_surface: "harvested_cork_rubber_base",
    travel_thin: "microfiber_suede_thin_rubber",
  };
  return m[y];
}

export function bestPractice(y: YogaMat): string {
  const m: Record<YogaMat, string> = {
    pvc_standard: "general_studio_beginner", tpe_eco: "eco_conscious_daily",
    natural_rubber: "hot_yoga_power_flow", cork_surface: "bikram_hot_sweat_grip",
    travel_thin: "travel_fold_pack_light",
  };
  return m[y];
}

export function yogaMats(): YogaMat[] {
  return ["pvc_standard", "tpe_eco", "natural_rubber", "cork_surface", "travel_thin"];
}
