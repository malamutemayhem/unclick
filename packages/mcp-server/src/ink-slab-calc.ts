export type InkSlabType = "glass_plate_smooth" | "granite_stone_heavy" | "acrylic_sheet_clear" | "marble_tile_cold" | "steel_plate_magnetic";

export function inkMixing(t: InkSlabType): number {
  const m: Record<InkSlabType, number> = {
    glass_plate_smooth: 10, granite_stone_heavy: 8, acrylic_sheet_clear: 7, marble_tile_cold: 9, steel_plate_magnetic: 7,
  };
  return m[t];
}

export function cleanEase(t: InkSlabType): number {
  const m: Record<InkSlabType, number> = {
    glass_plate_smooth: 10, granite_stone_heavy: 7, acrylic_sheet_clear: 8, marble_tile_cold: 9, steel_plate_magnetic: 8,
  };
  return m[t];
}

export function stability(t: InkSlabType): number {
  const m: Record<InkSlabType, number> = {
    glass_plate_smooth: 6, granite_stone_heavy: 10, acrylic_sheet_clear: 4, marble_tile_cold: 9, steel_plate_magnetic: 8,
  };
  return m[t];
}

export function inkRetention(t: InkSlabType): number {
  const m: Record<InkSlabType, number> = {
    glass_plate_smooth: 8, granite_stone_heavy: 9, acrylic_sheet_clear: 6, marble_tile_cold: 7, steel_plate_magnetic: 8,
  };
  return m[t];
}

export function slabCost(t: InkSlabType): number {
  const m: Record<InkSlabType, number> = {
    glass_plate_smooth: 1, granite_stone_heavy: 2, acrylic_sheet_clear: 1, marble_tile_cold: 3, steel_plate_magnetic: 2,
  };
  return m[t];
}

export function seeThrough(t: InkSlabType): boolean {
  const m: Record<InkSlabType, boolean> = {
    glass_plate_smooth: true, granite_stone_heavy: false, acrylic_sheet_clear: true, marble_tile_cold: false, steel_plate_magnetic: false,
  };
  return m[t];
}

export function nonPorous(t: InkSlabType): boolean {
  const m: Record<InkSlabType, boolean> = {
    glass_plate_smooth: true, granite_stone_heavy: false, acrylic_sheet_clear: true, marble_tile_cold: true, steel_plate_magnetic: true,
  };
  return m[t];
}

export function surfaceFinish(t: InkSlabType): string {
  const m: Record<InkSlabType, string> = {
    glass_plate_smooth: "polished_float_glass",
    granite_stone_heavy: "honed_natural_granite",
    acrylic_sheet_clear: "cast_acrylic_clear",
    marble_tile_cold: "polished_carrara_marble",
    steel_plate_magnetic: "brushed_stainless_steel",
  };
  return m[t];
}

export function bestInk(t: InkSlabType): string {
  const m: Record<InkSlabType, string> = {
    glass_plate_smooth: "oil_based_relief_ink",
    granite_stone_heavy: "lithography_ink_thick",
    acrylic_sheet_clear: "water_based_block_ink",
    marble_tile_cold: "etching_ink_stiff",
    steel_plate_magnetic: "screen_print_ink",
  };
  return m[t];
}

export function inkSlabs(): InkSlabType[] {
  return ["glass_plate_smooth", "granite_stone_heavy", "acrylic_sheet_clear", "marble_tile_cold", "steel_plate_magnetic"];
}
