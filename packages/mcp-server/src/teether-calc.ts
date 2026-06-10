export type TeetherType = "silicone_ring_textured" | "wooden_maple_natural" | "water_filled_cooling" | "mesh_feeder_fruit" | "amber_necklace_baltic";

export function soothingRelief(t: TeetherType): number {
  const m: Record<TeetherType, number> = {
    silicone_ring_textured: 8, wooden_maple_natural: 6, water_filled_cooling: 10, mesh_feeder_fruit: 7, amber_necklace_baltic: 4,
  };
  return m[t];
}

export function gripEase(t: TeetherType): number {
  const m: Record<TeetherType, number> = {
    silicone_ring_textured: 9, wooden_maple_natural: 7, water_filled_cooling: 6, mesh_feeder_fruit: 8, amber_necklace_baltic: 3,
  };
  return m[t];
}

export function durability(t: TeetherType): number {
  const m: Record<TeetherType, number> = {
    silicone_ring_textured: 9, wooden_maple_natural: 8, water_filled_cooling: 4, mesh_feeder_fruit: 5, amber_necklace_baltic: 7,
  };
  return m[t];
}

export function cleanEase(t: TeetherType): number {
  const m: Record<TeetherType, number> = {
    silicone_ring_textured: 10, wooden_maple_natural: 6, water_filled_cooling: 7, mesh_feeder_fruit: 5, amber_necklace_baltic: 8,
  };
  return m[t];
}

export function teetherCost(t: TeetherType): number {
  const m: Record<TeetherType, number> = {
    silicone_ring_textured: 2, wooden_maple_natural: 4, water_filled_cooling: 3, mesh_feeder_fruit: 3, amber_necklace_baltic: 6,
  };
  return m[t];
}

export function bpaFree(t: TeetherType): boolean {
  const m: Record<TeetherType, boolean> = {
    silicone_ring_textured: true, wooden_maple_natural: true, water_filled_cooling: true, mesh_feeder_fruit: true, amber_necklace_baltic: true,
  };
  return m[t];
}

export function canFreeze(t: TeetherType): boolean {
  const m: Record<TeetherType, boolean> = {
    silicone_ring_textured: true, wooden_maple_natural: false, water_filled_cooling: true, mesh_feeder_fruit: true, amber_necklace_baltic: false,
  };
  return m[t];
}

export function teetherMaterial(t: TeetherType): string {
  const m: Record<TeetherType, string> = {
    silicone_ring_textured: "food_grade_silicone",
    wooden_maple_natural: "untreated_maple_hardwood",
    water_filled_cooling: "peva_water_filled_gel",
    mesh_feeder_fruit: "bpa_free_mesh_nylon",
    amber_necklace_baltic: "raw_baltic_amber_bead",
  };
  return m[t];
}

export function bestAge(t: TeetherType): string {
  const m: Record<TeetherType, string> = {
    silicone_ring_textured: "three_to_twelve_months",
    wooden_maple_natural: "six_months_plus_eco",
    water_filled_cooling: "sore_gum_acute_teething",
    mesh_feeder_fruit: "six_months_solid_intro",
    amber_necklace_baltic: "wearable_passive_comfort",
  };
  return m[t];
}

export function teethers(): TeetherType[] {
  return ["silicone_ring_textured", "wooden_maple_natural", "water_filled_cooling", "mesh_feeder_fruit", "amber_necklace_baltic"];
}
