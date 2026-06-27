export type TileNipperType = "wheel_nipper_score" | "compound_lever_heavy" | "glass_runner_snap" | "mosaic_cutter_spring" | "carbide_jaw_precision";

export function cutPrecision(t: TileNipperType): number {
  const m: Record<TileNipperType, number> = {
    wheel_nipper_score: 9, compound_lever_heavy: 5, glass_runner_snap: 7, mosaic_cutter_spring: 8, carbide_jaw_precision: 10,
  };
  return m[t];
}

export function cuttingForce(t: TileNipperType): number {
  const m: Record<TileNipperType, number> = {
    wheel_nipper_score: 6, compound_lever_heavy: 10, glass_runner_snap: 5, mosaic_cutter_spring: 7, carbide_jaw_precision: 8,
  };
  return m[t];
}

export function handFatigue(t: TileNipperType): number {
  const m: Record<TileNipperType, number> = {
    wheel_nipper_score: 8, compound_lever_heavy: 5, glass_runner_snap: 9, mosaic_cutter_spring: 10, carbide_jaw_precision: 7,
  };
  return m[t];
}

export function materialRange(t: TileNipperType): number {
  const m: Record<TileNipperType, number> = {
    wheel_nipper_score: 8, compound_lever_heavy: 10, glass_runner_snap: 4, mosaic_cutter_spring: 7, carbide_jaw_precision: 9,
  };
  return m[t];
}

export function nipperCost(t: TileNipperType): number {
  const m: Record<TileNipperType, number> = {
    wheel_nipper_score: 2, compound_lever_heavy: 2, glass_runner_snap: 1, mosaic_cutter_spring: 1, carbide_jaw_precision: 3,
  };
  return m[t];
}

export function forGlass(t: TileNipperType): boolean {
  const m: Record<TileNipperType, boolean> = {
    wheel_nipper_score: true, compound_lever_heavy: false, glass_runner_snap: true, mosaic_cutter_spring: false, carbide_jaw_precision: true,
  };
  return m[t];
}

export function springLoaded(t: TileNipperType): boolean {
  const m: Record<TileNipperType, boolean> = {
    wheel_nipper_score: false, compound_lever_heavy: false, glass_runner_snap: false, mosaic_cutter_spring: true, carbide_jaw_precision: false,
  };
  return m[t];
}

export function jawMaterial(t: TileNipperType): string {
  const m: Record<TileNipperType, string> = {
    wheel_nipper_score: "tungsten_carbide_wheel",
    compound_lever_heavy: "hardened_steel_jaw",
    glass_runner_snap: "brass_runner_wheel",
    mosaic_cutter_spring: "tempered_steel_spring",
    carbide_jaw_precision: "solid_carbide_insert",
  };
  return m[t];
}

export function bestMaterial(t: TileNipperType): string {
  const m: Record<TileNipperType, string> = {
    wheel_nipper_score: "ceramic_tile_porcelain",
    compound_lever_heavy: "marble_stone_thick",
    glass_runner_snap: "stained_glass_sheet",
    mosaic_cutter_spring: "smalti_vitreous_tile",
    carbide_jaw_precision: "millefiori_glass_cane",
  };
  return m[t];
}

export function tileNippers(): TileNipperType[] {
  return ["wheel_nipper_score", "compound_lever_heavy", "glass_runner_snap", "mosaic_cutter_spring", "carbide_jaw_precision"];
}
