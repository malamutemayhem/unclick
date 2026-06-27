export type SeedTrayType = "cell_insert_72_plug" | "open_flat_standard" | "peat_pellet_expand" | "soil_block_maker" | "self_watering_dome";

export function seedlingCount(t: SeedTrayType): number {
  const m: Record<SeedTrayType, number> = {
    cell_insert_72_plug: 10, open_flat_standard: 8, peat_pellet_expand: 7, soil_block_maker: 5, self_watering_dome: 6,
  };
  return m[t];
}

export function transplantEase(t: SeedTrayType): number {
  const m: Record<SeedTrayType, number> = {
    cell_insert_72_plug: 8, open_flat_standard: 4, peat_pellet_expand: 10, soil_block_maker: 9, self_watering_dome: 7,
  };
  return m[t];
}

export function rootDevelopment(t: SeedTrayType): number {
  const m: Record<SeedTrayType, number> = {
    cell_insert_72_plug: 7, open_flat_standard: 5, peat_pellet_expand: 8, soil_block_maker: 10, self_watering_dome: 8,
  };
  return m[t];
}

export function moistureControl(t: SeedTrayType): number {
  const m: Record<SeedTrayType, number> = {
    cell_insert_72_plug: 6, open_flat_standard: 4, peat_pellet_expand: 7, soil_block_maker: 5, self_watering_dome: 10,
  };
  return m[t];
}

export function trayCost(t: SeedTrayType): number {
  const m: Record<SeedTrayType, number> = {
    cell_insert_72_plug: 3, open_flat_standard: 2, peat_pellet_expand: 5, soil_block_maker: 8, self_watering_dome: 7,
  };
  return m[t];
}

export function reusable(t: SeedTrayType): boolean {
  const m: Record<SeedTrayType, boolean> = {
    cell_insert_72_plug: true, open_flat_standard: true, peat_pellet_expand: false, soil_block_maker: true, self_watering_dome: true,
  };
  return m[t];
}

export function biodegradable(t: SeedTrayType): boolean {
  const m: Record<SeedTrayType, boolean> = {
    cell_insert_72_plug: false, open_flat_standard: false, peat_pellet_expand: true, soil_block_maker: false, self_watering_dome: false,
  };
  return m[t];
}

export function trayMaterial(t: SeedTrayType): string {
  const m: Record<SeedTrayType, string> = {
    cell_insert_72_plug: "thin_wall_polystyrene",
    open_flat_standard: "injection_molded_pp",
    peat_pellet_expand: "compressed_sphagnum_peat",
    soil_block_maker: "stainless_steel_press",
    self_watering_dome: "clear_pet_reservoir",
  };
  return m[t];
}

export function bestGrower(t: SeedTrayType): string {
  const m: Record<SeedTrayType, string> = {
    cell_insert_72_plug: "volume_market_grower",
    open_flat_standard: "microgreen_broadcast_sow",
    peat_pellet_expand: "beginner_easy_start",
    soil_block_maker: "organic_no_plastic",
    self_watering_dome: "indoor_windowsill_start",
  };
  return m[t];
}

export function seedTrays(): SeedTrayType[] {
  return ["cell_insert_72_plug", "open_flat_standard", "peat_pellet_expand", "soil_block_maker", "self_watering_dome"];
}
