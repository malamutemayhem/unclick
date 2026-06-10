export type CompressionBagType = "vacuum_seal_flat" | "roll_up_valve" | "zip_compression_cube" | "space_saver_hanging" | "stuff_sack_drawstring";

export function spaceReduction(t: CompressionBagType): number {
  const m: Record<CompressionBagType, number> = {
    vacuum_seal_flat: 10, roll_up_valve: 8, zip_compression_cube: 6, space_saver_hanging: 7, stuff_sack_drawstring: 5,
  };
  return m[t];
}

export function easeOfUse(t: CompressionBagType): number {
  const m: Record<CompressionBagType, number> = {
    vacuum_seal_flat: 4, roll_up_valve: 8, zip_compression_cube: 9, space_saver_hanging: 6, stuff_sack_drawstring: 10,
  };
  return m[t];
}

export function reusability(t: CompressionBagType): number {
  const m: Record<CompressionBagType, number> = {
    vacuum_seal_flat: 6, roll_up_valve: 8, zip_compression_cube: 9, space_saver_hanging: 7, stuff_sack_drawstring: 10,
  };
  return m[t];
}

export function clothingProtect(t: CompressionBagType): number {
  const m: Record<CompressionBagType, number> = {
    vacuum_seal_flat: 9, roll_up_valve: 7, zip_compression_cube: 8, space_saver_hanging: 8, stuff_sack_drawstring: 5,
  };
  return m[t];
}

export function bagCost(t: CompressionBagType): number {
  const m: Record<CompressionBagType, number> = {
    vacuum_seal_flat: 2, roll_up_valve: 2, zip_compression_cube: 3, space_saver_hanging: 3, stuff_sack_drawstring: 1,
  };
  return m[t];
}

export function needsPump(t: CompressionBagType): boolean {
  const m: Record<CompressionBagType, boolean> = {
    vacuum_seal_flat: true, roll_up_valve: false, zip_compression_cube: false, space_saver_hanging: true, stuff_sack_drawstring: false,
  };
  return m[t];
}

export function waterproof(t: CompressionBagType): boolean {
  const m: Record<CompressionBagType, boolean> = {
    vacuum_seal_flat: true, roll_up_valve: true, zip_compression_cube: false, space_saver_hanging: true, stuff_sack_drawstring: false,
  };
  return m[t];
}

export function sealMethod(t: CompressionBagType): string {
  const m: Record<CompressionBagType, string> = {
    vacuum_seal_flat: "heat_seal_valve_pump",
    roll_up_valve: "one_way_valve_roll",
    zip_compression_cube: "double_zipper_press",
    space_saver_hanging: "vacuum_valve_hanger",
    stuff_sack_drawstring: "cinch_cord_top",
  };
  return m[t];
}

export function bestUse(t: CompressionBagType): string {
  const m: Record<CompressionBagType, string> = {
    vacuum_seal_flat: "seasonal_closet_storage",
    roll_up_valve: "suitcase_travel_pack",
    zip_compression_cube: "carry_on_organize",
    space_saver_hanging: "coat_blanket_closet",
    stuff_sack_drawstring: "camping_sleeping_bag",
  };
  return m[t];
}

export function compressionBags(): CompressionBagType[] {
  return ["vacuum_seal_flat", "roll_up_valve", "zip_compression_cube", "space_saver_hanging", "stuff_sack_drawstring"];
}
