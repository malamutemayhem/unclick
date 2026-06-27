export type CarVacuumType = "handheld_cordless_12v" | "corded_high_power_plug" | "wet_dry_dual_mode" | "mini_usb_rechargeable" | "shop_vac_detailing";

export function suctionPower(t: CarVacuumType): number {
  const m: Record<CarVacuumType, number> = {
    handheld_cordless_12v: 6, corded_high_power_plug: 9, wet_dry_dual_mode: 7, mini_usb_rechargeable: 3, shop_vac_detailing: 10,
  };
  return m[t];
}

export function portability(t: CarVacuumType): number {
  const m: Record<CarVacuumType, number> = {
    handheld_cordless_12v: 9, corded_high_power_plug: 5, wet_dry_dual_mode: 6, mini_usb_rechargeable: 10, shop_vac_detailing: 2,
  };
  return m[t];
}

export function runtime(t: CarVacuumType): number {
  const m: Record<CarVacuumType, number> = {
    handheld_cordless_12v: 5, corded_high_power_plug: 10, wet_dry_dual_mode: 6, mini_usb_rechargeable: 3, shop_vac_detailing: 10,
  };
  return m[t];
}

export function attachmentRange(t: CarVacuumType): number {
  const m: Record<CarVacuumType, number> = {
    handheld_cordless_12v: 6, corded_high_power_plug: 8, wet_dry_dual_mode: 7, mini_usb_rechargeable: 3, shop_vac_detailing: 10,
  };
  return m[t];
}

export function vacuumCost(t: CarVacuumType): number {
  const m: Record<CarVacuumType, number> = {
    handheld_cordless_12v: 4, corded_high_power_plug: 5, wet_dry_dual_mode: 5, mini_usb_rechargeable: 2, shop_vac_detailing: 8,
  };
  return m[t];
}

export function cordless(t: CarVacuumType): boolean {
  const m: Record<CarVacuumType, boolean> = {
    handheld_cordless_12v: true, corded_high_power_plug: false, wet_dry_dual_mode: true, mini_usb_rechargeable: true, shop_vac_detailing: false,
  };
  return m[t];
}

export function handlesLiquid(t: CarVacuumType): boolean {
  const m: Record<CarVacuumType, boolean> = {
    handheld_cordless_12v: false, corded_high_power_plug: false, wet_dry_dual_mode: true, mini_usb_rechargeable: false, shop_vac_detailing: true,
  };
  return m[t];
}

export function filterType(t: CarVacuumType): string {
  const m: Record<CarVacuumType, string> = {
    handheld_cordless_12v: "hepa_cartridge_washable",
    corded_high_power_plug: "cloth_bag_reusable",
    wet_dry_dual_mode: "foam_filter_wet_dry",
    mini_usb_rechargeable: "mesh_screen_basic",
    shop_vac_detailing: "cartridge_hepa_bag",
  };
  return m[t];
}

export function bestUse(t: CarVacuumType): string {
  const m: Record<CarVacuumType, string> = {
    handheld_cordless_12v: "quick_cleanup_crumbs",
    corded_high_power_plug: "deep_clean_pet_hair",
    wet_dry_dual_mode: "spill_cleanup_versatile",
    mini_usb_rechargeable: "desk_console_keyboard",
    shop_vac_detailing: "full_detail_garage",
  };
  return m[t];
}

export function carVacuums(): CarVacuumType[] {
  return ["handheld_cordless_12v", "corded_high_power_plug", "wet_dry_dual_mode", "mini_usb_rechargeable", "shop_vac_detailing"];
}
