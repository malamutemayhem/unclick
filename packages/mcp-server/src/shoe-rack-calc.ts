export type ShoeRackType = "over_door_hanging" | "stackable_tier" | "spinning_lazy_susan" | "bench_seat_combo" | "drop_front_box";

export function pairCapacity(t: ShoeRackType): number {
  const m: Record<ShoeRackType, number> = {
    over_door_hanging: 8, stackable_tier: 9, spinning_lazy_susan: 6, bench_seat_combo: 4, drop_front_box: 7,
  };
  return m[t];
}

export function easyAccess(t: ShoeRackType): number {
  const m: Record<ShoeRackType, number> = {
    over_door_hanging: 7, stackable_tier: 8, spinning_lazy_susan: 10, bench_seat_combo: 6, drop_front_box: 9,
  };
  return m[t];
}

export function dustProtection(t: ShoeRackType): number {
  const m: Record<ShoeRackType, number> = {
    over_door_hanging: 3, stackable_tier: 2, spinning_lazy_susan: 4, bench_seat_combo: 5, drop_front_box: 10,
  };
  return m[t];
}

export function floorSpace(t: ShoeRackType): number {
  const m: Record<ShoeRackType, number> = {
    over_door_hanging: 10, stackable_tier: 6, spinning_lazy_susan: 5, bench_seat_combo: 4, drop_front_box: 7,
  };
  return m[t];
}

export function rackCost(t: ShoeRackType): number {
  const m: Record<ShoeRackType, number> = {
    over_door_hanging: 2, stackable_tier: 3, spinning_lazy_susan: 7, bench_seat_combo: 6, drop_front_box: 5,
  };
  return m[t];
}

export function noAssembly(t: ShoeRackType): boolean {
  const m: Record<ShoeRackType, boolean> = {
    over_door_hanging: true, stackable_tier: false, spinning_lazy_susan: false, bench_seat_combo: false, drop_front_box: true,
  };
  return m[t];
}

export function dualPurpose(t: ShoeRackType): boolean {
  const m: Record<ShoeRackType, boolean> = {
    over_door_hanging: false, stackable_tier: false, spinning_lazy_susan: false, bench_seat_combo: true, drop_front_box: false,
  };
  return m[t];
}

export function designStyle(t: ShoeRackType): string {
  const m: Record<ShoeRackType, string> = {
    over_door_hanging: "hook_pocket_vertical",
    stackable_tier: "horizontal_shelf_layer",
    spinning_lazy_susan: "rotating_carousel_tower",
    bench_seat_combo: "seat_top_shelf_below",
    drop_front_box: "clear_panel_modular_cube",
  };
  return m[t];
}

export function bestSpace(t: ShoeRackType): string {
  const m: Record<ShoeRackType, string> = {
    over_door_hanging: "apartment_closet_door",
    stackable_tier: "garage_mudroom_entry",
    spinning_lazy_susan: "walk_in_closet_corner",
    bench_seat_combo: "entryway_hallway_seat",
    drop_front_box: "sneaker_display_collect",
  };
  return m[t];
}

export function shoeRacks(): ShoeRackType[] {
  return ["over_door_hanging", "stackable_tier", "spinning_lazy_susan", "bench_seat_combo", "drop_front_box"];
}
