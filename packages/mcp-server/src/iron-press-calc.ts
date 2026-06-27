export type IronPressType = "steam_iron_standard" | "dry_iron_basic" | "steam_generator" | "garment_steamer" | "heat_press_transfer";

export function wrinkleRemoval(t: IronPressType): number {
  const m: Record<IronPressType, number> = {
    steam_iron_standard: 8, dry_iron_basic: 5, steam_generator: 10, garment_steamer: 7, heat_press_transfer: 4,
  };
  return m[t];
}

export function steamOutput(t: IronPressType): number {
  const m: Record<IronPressType, number> = {
    steam_iron_standard: 7, dry_iron_basic: 0, steam_generator: 10, garment_steamer: 8, heat_press_transfer: 2,
  };
  return m[t];
}

export function heatUpSpeed(t: IronPressType): number {
  const m: Record<IronPressType, number> = {
    steam_iron_standard: 7, dry_iron_basic: 9, steam_generator: 4, garment_steamer: 8, heat_press_transfer: 5,
  };
  return m[t];
}

export function ironWeight(t: IronPressType): number {
  const m: Record<IronPressType, number> = {
    steam_iron_standard: 5, dry_iron_basic: 3, steam_generator: 8, garment_steamer: 4, heat_press_transfer: 9,
  };
  return m[t];
}

export function ironCost(t: IronPressType): number {
  const m: Record<IronPressType, number> = {
    steam_iron_standard: 4, dry_iron_basic: 1, steam_generator: 8, garment_steamer: 5, heat_press_transfer: 7,
  };
  return m[t];
}

export function verticalSteam(t: IronPressType): boolean {
  const m: Record<IronPressType, boolean> = {
    steam_iron_standard: true, dry_iron_basic: false, steam_generator: true, garment_steamer: true, heat_press_transfer: false,
  };
  return m[t];
}

export function needsBoard(t: IronPressType): boolean {
  const m: Record<IronPressType, boolean> = {
    steam_iron_standard: true, dry_iron_basic: true, steam_generator: true, garment_steamer: false, heat_press_transfer: false,
  };
  return m[t];
}

export function solePlate(t: IronPressType): string {
  const m: Record<IronPressType, string> = {
    steam_iron_standard: "ceramic_coated_glide",
    dry_iron_basic: "aluminum_nonstick",
    steam_generator: "stainless_precision_holes",
    garment_steamer: "fabric_brush_head",
    heat_press_transfer: "teflon_flat_platen",
  };
  return m[t];
}

export function bestTask(t: IronPressType): string {
  const m: Record<IronPressType, string> = {
    steam_iron_standard: "daily_garment_pressing",
    dry_iron_basic: "delicate_fabric_no_steam",
    steam_generator: "bulk_linen_professional",
    garment_steamer: "hanging_curtain_refresh",
    heat_press_transfer: "vinyl_sublimation_print",
  };
  return m[t];
}

export function ironPresses(): IronPressType[] {
  return ["steam_iron_standard", "dry_iron_basic", "steam_generator", "garment_steamer", "heat_press_transfer"];
}
