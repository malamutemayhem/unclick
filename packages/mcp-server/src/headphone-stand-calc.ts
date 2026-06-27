export type HeadphoneStandType = "wood_single_arm" | "metal_dual_hanger" | "acrylic_clear_display" | "under_desk_clamp" | "charging_dock_wireless";

export function headbandCare(t: HeadphoneStandType): number {
  const m: Record<HeadphoneStandType, number> = {
    wood_single_arm: 9, metal_dual_hanger: 7, acrylic_clear_display: 8, under_desk_clamp: 6, charging_dock_wireless: 8,
  };
  return m[t];
}

export function deskFootprint(t: HeadphoneStandType): number {
  const m: Record<HeadphoneStandType, number> = {
    wood_single_arm: 6, metal_dual_hanger: 5, acrylic_clear_display: 7, under_desk_clamp: 10, charging_dock_wireless: 6,
  };
  return m[t];
}

export function aesthetics(t: HeadphoneStandType): number {
  const m: Record<HeadphoneStandType, number> = {
    wood_single_arm: 10, metal_dual_hanger: 7, acrylic_clear_display: 9, under_desk_clamp: 4, charging_dock_wireless: 8,
  };
  return m[t];
}

export function capacity(t: HeadphoneStandType): number {
  const m: Record<HeadphoneStandType, number> = {
    wood_single_arm: 5, metal_dual_hanger: 10, acrylic_clear_display: 5, under_desk_clamp: 5, charging_dock_wireless: 5,
  };
  return m[t];
}

export function standCost(t: HeadphoneStandType): number {
  const m: Record<HeadphoneStandType, number> = {
    wood_single_arm: 2, metal_dual_hanger: 2, acrylic_clear_display: 2, under_desk_clamp: 1, charging_dock_wireless: 3,
  };
  return m[t];
}

export function hasCharger(t: HeadphoneStandType): boolean {
  const m: Record<HeadphoneStandType, boolean> = {
    wood_single_arm: false, metal_dual_hanger: false, acrylic_clear_display: false, under_desk_clamp: false, charging_dock_wireless: true,
  };
  return m[t];
}

export function savesDesk(t: HeadphoneStandType): boolean {
  const m: Record<HeadphoneStandType, boolean> = {
    wood_single_arm: false, metal_dual_hanger: false, acrylic_clear_display: false, under_desk_clamp: true, charging_dock_wireless: false,
  };
  return m[t];
}

export function standMaterial(t: HeadphoneStandType): string {
  const m: Record<HeadphoneStandType, string> = {
    wood_single_arm: "walnut_hardwood_finish",
    metal_dual_hanger: "aluminum_powder_coat",
    acrylic_clear_display: "cast_acrylic_clear",
    under_desk_clamp: "steel_clamp_silicone",
    charging_dock_wireless: "abs_qi_coil_built_in",
  };
  return m[t];
}

export function bestSetup(t: HeadphoneStandType): string {
  const m: Record<HeadphoneStandType, string> = {
    wood_single_arm: "audiophile_desk_display",
    metal_dual_hanger: "multi_headphone_studio",
    acrylic_clear_display: "minimal_modern_desk",
    under_desk_clamp: "clean_desk_hidden",
    charging_dock_wireless: "wireless_headphone_daily",
  };
  return m[t];
}

export function headphoneStands(): HeadphoneStandType[] {
  return ["wood_single_arm", "metal_dual_hanger", "acrylic_clear_display", "under_desk_clamp", "charging_dock_wireless"];
}
