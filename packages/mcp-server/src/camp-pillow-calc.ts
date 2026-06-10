export type CampPillowType = "inflatable_air_valve" | "compressible_foam_stuff" | "hybrid_air_foam_top" | "self_inflating_open_cell" | "stuff_sack_clothes_fill";

export function sleepComfort(t: CampPillowType): number {
  const m: Record<CampPillowType, number> = {
    inflatable_air_valve: 6, compressible_foam_stuff: 9, hybrid_air_foam_top: 10, self_inflating_open_cell: 8, stuff_sack_clothes_fill: 4,
  };
  return m[t];
}

export function packSize(t: CampPillowType): number {
  const m: Record<CampPillowType, number> = {
    inflatable_air_valve: 10, compressible_foam_stuff: 4, hybrid_air_foam_top: 7, self_inflating_open_cell: 6, stuff_sack_clothes_fill: 10,
  };
  return m[t];
}

export function noiseFree(t: CampPillowType): number {
  const m: Record<CampPillowType, number> = {
    inflatable_air_valve: 4, compressible_foam_stuff: 10, hybrid_air_foam_top: 8, self_inflating_open_cell: 9, stuff_sack_clothes_fill: 10,
  };
  return m[t];
}

export function adjustability(t: CampPillowType): number {
  const m: Record<CampPillowType, number> = {
    inflatable_air_valve: 9, compressible_foam_stuff: 3, hybrid_air_foam_top: 8, self_inflating_open_cell: 5, stuff_sack_clothes_fill: 7,
  };
  return m[t];
}

export function pillowCost(t: CampPillowType): number {
  const m: Record<CampPillowType, number> = {
    inflatable_air_valve: 2, compressible_foam_stuff: 2, hybrid_air_foam_top: 3, self_inflating_open_cell: 2, stuff_sack_clothes_fill: 0,
  };
  return m[t];
}

export function punctureProof(t: CampPillowType): boolean {
  const m: Record<CampPillowType, boolean> = {
    inflatable_air_valve: false, compressible_foam_stuff: true, hybrid_air_foam_top: false, self_inflating_open_cell: false, stuff_sack_clothes_fill: true,
  };
  return m[t];
}

export function selfInflating(t: CampPillowType): boolean {
  const m: Record<CampPillowType, boolean> = {
    inflatable_air_valve: false, compressible_foam_stuff: false, hybrid_air_foam_top: false, self_inflating_open_cell: true, stuff_sack_clothes_fill: false,
  };
  return m[t];
}

export function fillType(t: CampPillowType): string {
  const m: Record<CampPillowType, string> = {
    inflatable_air_valve: "air_chamber_tpu",
    compressible_foam_stuff: "shredded_memory_foam",
    hybrid_air_foam_top: "air_base_foam_layer",
    self_inflating_open_cell: "open_cell_foam_auto",
    stuff_sack_clothes_fill: "user_clothing_layer",
  };
  return m[t];
}

export function bestCamper(t: CampPillowType): string {
  const m: Record<CampPillowType, string> = {
    inflatable_air_valve: "ultralight_gram_counter",
    compressible_foam_stuff: "comfort_priority_car",
    hybrid_air_foam_top: "balanced_backpacker",
    self_inflating_open_cell: "hassle_free_setup",
    stuff_sack_clothes_fill: "minimalist_thru_hiker",
  };
  return m[t];
}

export function campPillows(): CampPillowType[] {
  return ["inflatable_air_valve", "compressible_foam_stuff", "hybrid_air_foam_top", "self_inflating_open_cell", "stuff_sack_clothes_fill"];
}
