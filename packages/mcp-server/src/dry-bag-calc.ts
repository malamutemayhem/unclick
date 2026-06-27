export type DryBagType = "roll_top_pvc_heavy" | "ultralight_sil_nylon" | "compression_valve_pack" | "clear_window_organizer" | "backpack_harness_combo";

export function waterproofRating(t: DryBagType): number {
  const m: Record<DryBagType, number> = {
    roll_top_pvc_heavy: 10, ultralight_sil_nylon: 7, compression_valve_pack: 9, clear_window_organizer: 8, backpack_harness_combo: 8,
  };
  return m[t];
}

export function packWeight(t: DryBagType): number {
  const m: Record<DryBagType, number> = {
    roll_top_pvc_heavy: 3, ultralight_sil_nylon: 10, compression_valve_pack: 5, clear_window_organizer: 6, backpack_harness_combo: 4,
  };
  return m[t];
}

export function durability(t: DryBagType): number {
  const m: Record<DryBagType, number> = {
    roll_top_pvc_heavy: 10, ultralight_sil_nylon: 5, compression_valve_pack: 7, clear_window_organizer: 6, backpack_harness_combo: 8,
  };
  return m[t];
}

export function volumeRange(t: DryBagType): number {
  const m: Record<DryBagType, number> = {
    roll_top_pvc_heavy: 9, ultralight_sil_nylon: 7, compression_valve_pack: 8, clear_window_organizer: 5, backpack_harness_combo: 9,
  };
  return m[t];
}

export function bagCost(t: DryBagType): number {
  const m: Record<DryBagType, number> = {
    roll_top_pvc_heavy: 2, ultralight_sil_nylon: 2, compression_valve_pack: 3, clear_window_organizer: 1, backpack_harness_combo: 3,
  };
  return m[t];
}

export function submersible(t: DryBagType): boolean {
  const m: Record<DryBagType, boolean> = {
    roll_top_pvc_heavy: true, ultralight_sil_nylon: false, compression_valve_pack: true, clear_window_organizer: false, backpack_harness_combo: false,
  };
  return m[t];
}

export function seeThrough(t: DryBagType): boolean {
  const m: Record<DryBagType, boolean> = {
    roll_top_pvc_heavy: false, ultralight_sil_nylon: false, compression_valve_pack: false, clear_window_organizer: true, backpack_harness_combo: false,
  };
  return m[t];
}

export function sealMethod(t: DryBagType): string {
  const m: Record<DryBagType, string> = {
    roll_top_pvc_heavy: "triple_roll_buckle",
    ultralight_sil_nylon: "roll_top_clip_light",
    compression_valve_pack: "roll_top_purge_valve",
    clear_window_organizer: "zip_lock_seal_strip",
    backpack_harness_combo: "roll_top_harness_clip",
  };
  return m[t];
}

export function bestActivity(t: DryBagType): string {
  const m: Record<DryBagType, string> = {
    roll_top_pvc_heavy: "kayak_river_rafting",
    ultralight_sil_nylon: "backpacking_ultralight",
    compression_valve_pack: "sailing_boat_storage",
    clear_window_organizer: "beach_pool_day_trip",
    backpack_harness_combo: "canyoneering_adventure",
  };
  return m[t];
}

export function dryBags(): DryBagType[] {
  return ["roll_top_pvc_heavy", "ultralight_sil_nylon", "compression_valve_pack", "clear_window_organizer", "backpack_harness_combo"];
}
