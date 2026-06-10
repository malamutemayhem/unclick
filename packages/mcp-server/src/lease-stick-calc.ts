export type LeaseStickType = "flat_wood_smooth" | "round_dowel_basic" | "acrylic_clear_see" | "metal_light_strong" | "bamboo_eco_natural";

export function threadSeparation(t: LeaseStickType): number {
  const m: Record<LeaseStickType, number> = {
    flat_wood_smooth: 9, round_dowel_basic: 7, acrylic_clear_see: 8, metal_light_strong: 8, bamboo_eco_natural: 7,
  };
  return m[t];
}

export function smoothness(t: LeaseStickType): number {
  const m: Record<LeaseStickType, number> = {
    flat_wood_smooth: 9, round_dowel_basic: 7, acrylic_clear_see: 10, metal_light_strong: 8, bamboo_eco_natural: 8,
  };
  return m[t];
}

export function durability(t: LeaseStickType): number {
  const m: Record<LeaseStickType, number> = {
    flat_wood_smooth: 8, round_dowel_basic: 6, acrylic_clear_see: 5, metal_light_strong: 10, bamboo_eco_natural: 7,
  };
  return m[t];
}

export function visibility(t: LeaseStickType): number {
  const m: Record<LeaseStickType, number> = {
    flat_wood_smooth: 6, round_dowel_basic: 5, acrylic_clear_see: 10, metal_light_strong: 7, bamboo_eco_natural: 6,
  };
  return m[t];
}

export function stickCost(t: LeaseStickType): number {
  const m: Record<LeaseStickType, number> = {
    flat_wood_smooth: 2, round_dowel_basic: 1, acrylic_clear_see: 3, metal_light_strong: 4, bamboo_eco_natural: 2,
  };
  return m[t];
}

export function flatProfile(t: LeaseStickType): boolean {
  const m: Record<LeaseStickType, boolean> = {
    flat_wood_smooth: true, round_dowel_basic: false, acrylic_clear_see: true, metal_light_strong: false, bamboo_eco_natural: false,
  };
  return m[t];
}

export function ecoFriendly(t: LeaseStickType): boolean {
  const m: Record<LeaseStickType, boolean> = {
    flat_wood_smooth: true, round_dowel_basic: true, acrylic_clear_see: false, metal_light_strong: false, bamboo_eco_natural: true,
  };
  return m[t];
}

export function stickMaterial(t: LeaseStickType): string {
  const m: Record<LeaseStickType, string> = {
    flat_wood_smooth: "maple_sanded_flat",
    round_dowel_basic: "birch_dowel_round",
    acrylic_clear_see: "clear_acrylic_rod",
    metal_light_strong: "aluminum_anodized",
    bamboo_eco_natural: "moso_bamboo_stick",
  };
  return m[t];
}

export function bestUse(t: LeaseStickType): string {
  const m: Record<LeaseStickType, string> = {
    flat_wood_smooth: "floor_loom_standard",
    round_dowel_basic: "rigid_heddle_simple",
    acrylic_clear_see: "fine_thread_visible",
    metal_light_strong: "heavy_warp_dense",
    bamboo_eco_natural: "eco_studio_natural",
  };
  return m[t];
}

export function leaseSticks(): LeaseStickType[] {
  return ["flat_wood_smooth", "round_dowel_basic", "acrylic_clear_see", "metal_light_strong", "bamboo_eco_natural"];
}
