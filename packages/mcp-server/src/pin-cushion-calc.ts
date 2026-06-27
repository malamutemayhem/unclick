export type PinCushionType = "tomato_classic" | "magnetic_bowl" | "wrist_band" | "weighted_base" | "emery_sharpener";

export function pinCapacity(t: PinCushionType): number {
  const m: Record<PinCushionType, number> = {
    tomato_classic: 6, magnetic_bowl: 10, wrist_band: 3, weighted_base: 7, emery_sharpener: 5,
  };
  return m[t];
}

export function easyRetrieve(t: PinCushionType): number {
  const m: Record<PinCushionType, number> = {
    tomato_classic: 5, magnetic_bowl: 10, wrist_band: 7, weighted_base: 6, emery_sharpener: 5,
  };
  return m[t];
}

export function portability(t: PinCushionType): number {
  const m: Record<PinCushionType, number> = {
    tomato_classic: 7, magnetic_bowl: 4, wrist_band: 10, weighted_base: 3, emery_sharpener: 8,
  };
  return m[t];
}

export function stability(t: PinCushionType): number {
  const m: Record<PinCushionType, number> = {
    tomato_classic: 5, magnetic_bowl: 8, wrist_band: 3, weighted_base: 10, emery_sharpener: 5,
  };
  return m[t];
}

export function cushionCost(t: PinCushionType): number {
  const m: Record<PinCushionType, number> = {
    tomato_classic: 1, magnetic_bowl: 5, wrist_band: 3, weighted_base: 4, emery_sharpener: 2,
  };
  return m[t];
}

export function sharpensNeedle(t: PinCushionType): boolean {
  const m: Record<PinCushionType, boolean> = {
    tomato_classic: true, magnetic_bowl: false, wrist_band: false, weighted_base: false, emery_sharpener: true,
  };
  return m[t];
}

export function handsFree(t: PinCushionType): boolean {
  const m: Record<PinCushionType, boolean> = {
    tomato_classic: false, magnetic_bowl: true, wrist_band: true, weighted_base: false, emery_sharpener: false,
  };
  return m[t];
}

export function fillMaterial(t: PinCushionType): string {
  const m: Record<PinCushionType, string> = {
    tomato_classic: "sawdust_wool_stuffing",
    magnetic_bowl: "rare_earth_magnet_dish",
    wrist_band: "elastic_band_foam_pad",
    weighted_base: "sand_fill_silicone_grip",
    emery_sharpener: "emery_powder_strawberry",
  };
  return m[t];
}

export function bestSewer(t: PinCushionType): string {
  const m: Record<PinCushionType, string> = {
    tomato_classic: "traditional_hand_sew",
    magnetic_bowl: "machine_sew_many_pins",
    wrist_band: "fitting_draping_session",
    weighted_base: "ironing_board_station",
    emery_sharpener: "dull_needle_refresh",
  };
  return m[t];
}

export function pinCushions(): PinCushionType[] {
  return ["tomato_classic", "magnetic_bowl", "wrist_band", "weighted_base", "emery_sharpener"];
}
