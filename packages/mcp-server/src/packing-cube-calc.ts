export type PackingCubeType = "mesh_top_basic" | "compression_zip" | "expandable_double" | "garment_folder" | "waterproof_roll";

export function organization(t: PackingCubeType): number {
  const m: Record<PackingCubeType, number> = {
    mesh_top_basic: 7, compression_zip: 8, expandable_double: 9, garment_folder: 10, waterproof_roll: 6,
  };
  return m[t];
}

export function spaceEfficiency(t: PackingCubeType): number {
  const m: Record<PackingCubeType, number> = {
    mesh_top_basic: 5, compression_zip: 10, expandable_double: 8, garment_folder: 6, waterproof_roll: 9,
  };
  return m[t];
}

export function wrinkleReduce(t: PackingCubeType): number {
  const m: Record<PackingCubeType, number> = {
    mesh_top_basic: 3, compression_zip: 4, expandable_double: 5, garment_folder: 10, waterproof_roll: 3,
  };
  return m[t];
}

export function durability(t: PackingCubeType): number {
  const m: Record<PackingCubeType, number> = {
    mesh_top_basic: 5, compression_zip: 8, expandable_double: 7, garment_folder: 6, waterproof_roll: 9,
  };
  return m[t];
}

export function cubeCost(t: PackingCubeType): number {
  const m: Record<PackingCubeType, number> = {
    mesh_top_basic: 3, compression_zip: 6, expandable_double: 5, garment_folder: 7, waterproof_roll: 8,
  };
  return m[t];
}

export function seeThrough(t: PackingCubeType): boolean {
  const m: Record<PackingCubeType, boolean> = {
    mesh_top_basic: true, compression_zip: false, expandable_double: true, garment_folder: false, waterproof_roll: false,
  };
  return m[t];
}

export function waterResistant(t: PackingCubeType): boolean {
  const m: Record<PackingCubeType, boolean> = {
    mesh_top_basic: false, compression_zip: false, expandable_double: false, garment_folder: false, waterproof_roll: true,
  };
  return m[t];
}

export function fabricType(t: PackingCubeType): string {
  const m: Record<PackingCubeType, string> = {
    mesh_top_basic: "nylon_ripstop_mesh",
    compression_zip: "double_zip_cordura",
    expandable_double: "poly_accordion_panel",
    garment_folder: "stiffened_nylon_board",
    waterproof_roll: "tpu_coated_rolltop",
  };
  return m[t];
}

export function bestPacker(t: PackingCubeType): string {
  const m: Record<PackingCubeType, string> = {
    mesh_top_basic: "weekend_trip_casual",
    compression_zip: "carry_on_maximizer",
    expandable_double: "family_multi_outfit",
    garment_folder: "business_suit_dress",
    waterproof_roll: "adventure_wet_gear",
  };
  return m[t];
}

export function packingCubes(): PackingCubeType[] {
  return ["mesh_top_basic", "compression_zip", "expandable_double", "garment_folder", "waterproof_roll"];
}
