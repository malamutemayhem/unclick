export type BathCaddyType = "bamboo_bridge_tray" | "expandable_metal_rack" | "corner_suction_basket" | "hanging_shower_caddy" | "freestanding_floor_tower";

export function holdCapacity(t: BathCaddyType): number {
  const m: Record<BathCaddyType, number> = {
    bamboo_bridge_tray: 7, expandable_metal_rack: 8, corner_suction_basket: 4, hanging_shower_caddy: 6, freestanding_floor_tower: 10,
  };
  return m[t];
}

export function waterResist(t: BathCaddyType): number {
  const m: Record<BathCaddyType, number> = {
    bamboo_bridge_tray: 5, expandable_metal_rack: 8, corner_suction_basket: 9, hanging_shower_caddy: 7, freestanding_floor_tower: 10,
  };
  return m[t];
}

export function aesthetics(t: BathCaddyType): number {
  const m: Record<BathCaddyType, number> = {
    bamboo_bridge_tray: 10, expandable_metal_rack: 7, corner_suction_basket: 4, hanging_shower_caddy: 5, freestanding_floor_tower: 8,
  };
  return m[t];
}

export function installEase(t: BathCaddyType): number {
  const m: Record<BathCaddyType, number> = {
    bamboo_bridge_tray: 10, expandable_metal_rack: 8, corner_suction_basket: 7, hanging_shower_caddy: 9, freestanding_floor_tower: 10,
  };
  return m[t];
}

export function caddyCost(t: BathCaddyType): number {
  const m: Record<BathCaddyType, number> = {
    bamboo_bridge_tray: 4, expandable_metal_rack: 3, corner_suction_basket: 2, hanging_shower_caddy: 3, freestanding_floor_tower: 6,
  };
  return m[t];
}

export function noDrilling(t: BathCaddyType): boolean {
  const m: Record<BathCaddyType, boolean> = {
    bamboo_bridge_tray: true, expandable_metal_rack: true, corner_suction_basket: true, hanging_shower_caddy: true, freestanding_floor_tower: true,
  };
  return m[t];
}

export function adjustable(t: BathCaddyType): boolean {
  const m: Record<BathCaddyType, boolean> = {
    bamboo_bridge_tray: true, expandable_metal_rack: true, corner_suction_basket: false, hanging_shower_caddy: false, freestanding_floor_tower: false,
  };
  return m[t];
}

export function frameMaterial(t: BathCaddyType): string {
  const m: Record<BathCaddyType, string> = {
    bamboo_bridge_tray: "treated_bamboo_slat",
    expandable_metal_rack: "chrome_stainless_wire",
    corner_suction_basket: "abs_plastic_suction_cup",
    hanging_shower_caddy: "rust_resist_coated_steel",
    freestanding_floor_tower: "teak_stainless_hybrid",
  };
  return m[t];
}

export function bestSetup(t: BathCaddyType): string {
  const m: Record<BathCaddyType, string> = {
    bamboo_bridge_tray: "soaking_tub_relax_read",
    expandable_metal_rack: "bathtub_multi_item_soak",
    corner_suction_basket: "shower_stall_tight_space",
    hanging_shower_caddy: "over_showerhead_rental",
    freestanding_floor_tower: "large_bath_spa_luxury",
  };
  return m[t];
}

export function bathCaddies(): BathCaddyType[] {
  return ["bamboo_bridge_tray", "expandable_metal_rack", "corner_suction_basket", "hanging_shower_caddy", "freestanding_floor_tower"];
}
