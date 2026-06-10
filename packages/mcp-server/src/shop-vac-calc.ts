export type ShopVacType = "wet_dry_standard" | "wall_mount_compact" | "dust_collector_barrel" | "cordless_portable" | "ash_vacuum_fireplace";

export function suctionPower(t: ShopVacType): number {
  const m: Record<ShopVacType, number> = {
    wet_dry_standard: 8, wall_mount_compact: 6, dust_collector_barrel: 10, cordless_portable: 4, ash_vacuum_fireplace: 5,
  };
  return m[t];
}

export function tankCapacity(t: ShopVacType): number {
  const m: Record<ShopVacType, number> = {
    wet_dry_standard: 8, wall_mount_compact: 4, dust_collector_barrel: 10, cordless_portable: 3, ash_vacuum_fireplace: 5,
  };
  return m[t];
}

export function portability(t: ShopVacType): number {
  const m: Record<ShopVacType, number> = {
    wet_dry_standard: 5, wall_mount_compact: 3, dust_collector_barrel: 1, cordless_portable: 10, ash_vacuum_fireplace: 6,
  };
  return m[t];
}

export function noiseLevel(t: ShopVacType): number {
  const m: Record<ShopVacType, number> = {
    wet_dry_standard: 3, wall_mount_compact: 5, dust_collector_barrel: 2, cordless_portable: 8, ash_vacuum_fireplace: 6,
  };
  return m[t];
}

export function vacCost(t: ShopVacType): number {
  const m: Record<ShopVacType, number> = {
    wet_dry_standard: 4, wall_mount_compact: 5, dust_collector_barrel: 8, cordless_portable: 6, ash_vacuum_fireplace: 3,
  };
  return m[t];
}

export function handlesWet(t: ShopVacType): boolean {
  const m: Record<ShopVacType, boolean> = {
    wet_dry_standard: true, wall_mount_compact: true, dust_collector_barrel: false, cordless_portable: false, ash_vacuum_fireplace: false,
  };
  return m[t];
}

export function cordless(t: ShopVacType): boolean {
  const m: Record<ShopVacType, boolean> = {
    wet_dry_standard: false, wall_mount_compact: false, dust_collector_barrel: false, cordless_portable: true, ash_vacuum_fireplace: false,
  };
  return m[t];
}

export function filterType(t: ShopVacType): string {
  const m: Record<ShopVacType, string> = {
    wet_dry_standard: "cartridge_pleated_hepa",
    wall_mount_compact: "foam_sleeve_washable",
    dust_collector_barrel: "bag_canister_micron",
    cordless_portable: "cone_filter_reusable",
    ash_vacuum_fireplace: "metal_mesh_heat_rated",
  };
  return m[t];
}

export function bestUse(t: ShopVacType): string {
  const m: Record<ShopVacType, string> = {
    wet_dry_standard: "garage_workshop_cleanup",
    wall_mount_compact: "small_shop_wall_mounted",
    dust_collector_barrel: "woodshop_table_saw_dust",
    cordless_portable: "car_detail_quick_pickup",
    ash_vacuum_fireplace: "fireplace_pellet_stove",
  };
  return m[t];
}

export function shopVacs(): ShopVacType[] {
  return ["wet_dry_standard", "wall_mount_compact", "dust_collector_barrel", "cordless_portable", "ash_vacuum_fireplace"];
}
