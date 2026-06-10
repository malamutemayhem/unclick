export type StorageOttomanType = "cube_foldable_fabric" | "round_tufted_leather" | "bench_long_hinged" | "tray_top_reversible" | "woven_basket_natural";

export function storageCapacity(t: StorageOttomanType): number {
  const m: Record<StorageOttomanType, number> = {
    cube_foldable_fabric: 5, round_tufted_leather: 6, bench_long_hinged: 10, tray_top_reversible: 6, woven_basket_natural: 7,
  };
  return m[t];
}

export function seatingComfort(t: StorageOttomanType): number {
  const m: Record<StorageOttomanType, number> = {
    cube_foldable_fabric: 5, round_tufted_leather: 9, bench_long_hinged: 8, tray_top_reversible: 7, woven_basket_natural: 4,
  };
  return m[t];
}

export function styleAppeal(t: StorageOttomanType): number {
  const m: Record<StorageOttomanType, number> = {
    cube_foldable_fabric: 4, round_tufted_leather: 10, bench_long_hinged: 8, tray_top_reversible: 7, woven_basket_natural: 8,
  };
  return m[t];
}

export function versatility(t: StorageOttomanType): number {
  const m: Record<StorageOttomanType, number> = {
    cube_foldable_fabric: 7, round_tufted_leather: 6, bench_long_hinged: 7, tray_top_reversible: 10, woven_basket_natural: 5,
  };
  return m[t];
}

export function ottomanCost(t: StorageOttomanType): number {
  const m: Record<StorageOttomanType, number> = {
    cube_foldable_fabric: 2, round_tufted_leather: 7, bench_long_hinged: 6, tray_top_reversible: 5, woven_basket_natural: 4,
  };
  return m[t];
}

export function foldable(t: StorageOttomanType): boolean {
  const m: Record<StorageOttomanType, boolean> = {
    cube_foldable_fabric: true, round_tufted_leather: false, bench_long_hinged: false, tray_top_reversible: false, woven_basket_natural: false,
  };
  return m[t];
}

export function hasServingTray(t: StorageOttomanType): boolean {
  const m: Record<StorageOttomanType, boolean> = {
    cube_foldable_fabric: false, round_tufted_leather: false, bench_long_hinged: false, tray_top_reversible: true, woven_basket_natural: false,
  };
  return m[t];
}

export function upholstery(t: StorageOttomanType): string {
  const m: Record<StorageOttomanType, string> = {
    cube_foldable_fabric: "polyester_linen_blend",
    round_tufted_leather: "bonded_leather_tufted",
    bench_long_hinged: "velvet_foam_padded",
    tray_top_reversible: "faux_leather_flip_tray",
    woven_basket_natural: "seagrass_rattan_weave",
  };
  return m[t];
}

export function bestRoom(t: StorageOttomanType): string {
  const m: Record<StorageOttomanType, string> = {
    cube_foldable_fabric: "dorm_small_space_temp",
    round_tufted_leather: "living_room_accent",
    bench_long_hinged: "entryway_bedroom_end",
    tray_top_reversible: "coffee_table_alternate",
    woven_basket_natural: "boho_coastal_sunroom",
  };
  return m[t];
}

export function storageOttomans(): StorageOttomanType[] {
  return ["cube_foldable_fabric", "round_tufted_leather", "bench_long_hinged", "tray_top_reversible", "woven_basket_natural"];
}
