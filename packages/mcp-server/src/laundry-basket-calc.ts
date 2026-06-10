export type LaundryBasketType = "plastic_hamper" | "woven_natural" | "rolling_cart" | "wall_mount_bag" | "triple_sorter";

export function capacity(t: LaundryBasketType): number {
  const m: Record<LaundryBasketType, number> = {
    plastic_hamper: 7, woven_natural: 6, rolling_cart: 8, wall_mount_bag: 4, triple_sorter: 10,
  };
  return m[t];
}

export function durability(t: LaundryBasketType): number {
  const m: Record<LaundryBasketType, number> = {
    plastic_hamper: 8, woven_natural: 5, rolling_cart: 9, wall_mount_bag: 4, triple_sorter: 7,
  };
  return m[t];
}

export function ventilation(t: LaundryBasketType): number {
  const m: Record<LaundryBasketType, number> = {
    plastic_hamper: 7, woven_natural: 10, rolling_cart: 6, wall_mount_bag: 8, triple_sorter: 5,
  };
  return m[t];
}

export function floorSpace(t: LaundryBasketType): number {
  const m: Record<LaundryBasketType, number> = {
    plastic_hamper: 5, woven_natural: 5, rolling_cart: 4, wall_mount_bag: 10, triple_sorter: 2,
  };
  return m[t];
}

export function basketCost(t: LaundryBasketType): number {
  const m: Record<LaundryBasketType, number> = {
    plastic_hamper: 1, woven_natural: 4, rolling_cart: 5, wall_mount_bag: 3, triple_sorter: 6,
  };
  return m[t];
}

export function collapsible(t: LaundryBasketType): boolean {
  const m: Record<LaundryBasketType, boolean> = {
    plastic_hamper: false, woven_natural: false, rolling_cart: false, wall_mount_bag: true, triple_sorter: true,
  };
  return m[t];
}

export function hasWheels(t: LaundryBasketType): boolean {
  const m: Record<LaundryBasketType, boolean> = {
    plastic_hamper: false, woven_natural: false, rolling_cart: true, wall_mount_bag: false, triple_sorter: false,
  };
  return m[t];
}

export function basketMaterial(t: LaundryBasketType): string {
  const m: Record<LaundryBasketType, string> = {
    plastic_hamper: "injection_mold_polypropylene",
    woven_natural: "seagrass_rattan_weave",
    rolling_cart: "canvas_bag_metal_frame",
    wall_mount_bag: "hanging_fabric_hook",
    triple_sorter: "fabric_bin_metal_rack",
  };
  return m[t];
}

export function bestSetup(t: LaundryBasketType): string {
  const m: Record<LaundryBasketType, string> = {
    plastic_hamper: "closet_bedroom_basic",
    woven_natural: "decorative_visible_spot",
    rolling_cart: "laundry_room_to_machine",
    wall_mount_bag: "small_bathroom_door",
    triple_sorter: "family_pre_sort_station",
  };
  return m[t];
}

export function laundryBaskets(): LaundryBasketType[] {
  return ["plastic_hamper", "woven_natural", "rolling_cart", "wall_mount_bag", "triple_sorter"];
}
