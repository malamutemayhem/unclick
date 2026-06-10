export type LinoBlockType = "grey_traditional_firm" | "soft_cut_easy" | "mounted_wood_back" | "clear_carve_see" | "battleship_grey_pro";

export function carvingEase(t: LinoBlockType): number {
  const m: Record<LinoBlockType, number> = {
    grey_traditional_firm: 5, soft_cut_easy: 10, mounted_wood_back: 6, clear_carve_see: 9, battleship_grey_pro: 4,
  };
  return m[t];
}

export function detailHold(t: LinoBlockType): number {
  const m: Record<LinoBlockType, number> = {
    grey_traditional_firm: 9, soft_cut_easy: 5, mounted_wood_back: 8, clear_carve_see: 6, battleship_grey_pro: 10,
  };
  return m[t];
}

export function printEditions(t: LinoBlockType): number {
  const m: Record<LinoBlockType, number> = {
    grey_traditional_firm: 9, soft_cut_easy: 4, mounted_wood_back: 8, clear_carve_see: 5, battleship_grey_pro: 10,
  };
  return m[t];
}

export function inkTransfer(t: LinoBlockType): number {
  const m: Record<LinoBlockType, number> = {
    grey_traditional_firm: 8, soft_cut_easy: 7, mounted_wood_back: 9, clear_carve_see: 7, battleship_grey_pro: 10,
  };
  return m[t];
}

export function blockCost(t: LinoBlockType): number {
  const m: Record<LinoBlockType, number> = {
    grey_traditional_firm: 2, soft_cut_easy: 2, mounted_wood_back: 4, clear_carve_see: 3, battleship_grey_pro: 3,
  };
  return m[t];
}

export function beginner(t: LinoBlockType): boolean {
  const m: Record<LinoBlockType, boolean> = {
    grey_traditional_firm: false, soft_cut_easy: true, mounted_wood_back: false, clear_carve_see: true, battleship_grey_pro: false,
  };
  return m[t];
}

export function transparent(t: LinoBlockType): boolean {
  const m: Record<LinoBlockType, boolean> = {
    grey_traditional_firm: false, soft_cut_easy: false, mounted_wood_back: false, clear_carve_see: true, battleship_grey_pro: false,
  };
  return m[t];
}

export function blockMaterial(t: LinoBlockType): string {
  const m: Record<LinoBlockType, string> = {
    grey_traditional_firm: "linseed_oil_cork_jute",
    soft_cut_easy: "rubber_vinyl_blend",
    mounted_wood_back: "lino_mdf_mounted",
    clear_carve_see: "clear_vinyl_polymer",
    battleship_grey_pro: "dense_lino_traditional",
  };
  return m[t];
}

export function bestUse(t: LinoBlockType): string {
  const m: Record<LinoBlockType, string> = {
    grey_traditional_firm: "fine_detail_edition",
    soft_cut_easy: "beginner_class_quick",
    mounted_wood_back: "press_print_register",
    clear_carve_see: "trace_design_visible",
    battleship_grey_pro: "large_edition_pro",
  };
  return m[t];
}

export function linoBlocks(): LinoBlockType[] {
  return ["grey_traditional_firm", "soft_cut_easy", "mounted_wood_back", "clear_carve_see", "battleship_grey_pro"];
}
