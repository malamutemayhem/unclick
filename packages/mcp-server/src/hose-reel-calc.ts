export type HoseReelType = "wall_mount_crank_manual" | "retractable_auto_rewind" | "cart_wheeled_portable" | "freestanding_decorative_pot" | "hideaway_box_enclosed";

export function hoseCapacity(t: HoseReelType): number {
  const m: Record<HoseReelType, number> = {
    wall_mount_crank_manual: 7, retractable_auto_rewind: 6, cart_wheeled_portable: 9, freestanding_decorative_pot: 5, hideaway_box_enclosed: 7,
  };
  return m[t];
}

export function easeOfUse(t: HoseReelType): number {
  const m: Record<HoseReelType, number> = {
    wall_mount_crank_manual: 6, retractable_auto_rewind: 10, cart_wheeled_portable: 7, freestanding_decorative_pot: 5, hideaway_box_enclosed: 8,
  };
  return m[t];
}

export function durability(t: HoseReelType): number {
  const m: Record<HoseReelType, number> = {
    wall_mount_crank_manual: 9, retractable_auto_rewind: 6, cart_wheeled_portable: 8, freestanding_decorative_pot: 7, hideaway_box_enclosed: 7,
  };
  return m[t];
}

export function portability(t: HoseReelType): number {
  const m: Record<HoseReelType, number> = {
    wall_mount_crank_manual: 2, retractable_auto_rewind: 2, cart_wheeled_portable: 10, freestanding_decorative_pot: 6, hideaway_box_enclosed: 4,
  };
  return m[t];
}

export function reelCost(t: HoseReelType): number {
  const m: Record<HoseReelType, number> = {
    wall_mount_crank_manual: 2, retractable_auto_rewind: 4, cart_wheeled_portable: 3, freestanding_decorative_pot: 3, hideaway_box_enclosed: 3,
  };
  return m[t];
}

export function autoRewind(t: HoseReelType): boolean {
  const m: Record<HoseReelType, boolean> = {
    wall_mount_crank_manual: false, retractable_auto_rewind: true, cart_wheeled_portable: false, freestanding_decorative_pot: false, hideaway_box_enclosed: false,
  };
  return m[t];
}

export function hidesHose(t: HoseReelType): boolean {
  const m: Record<HoseReelType, boolean> = {
    wall_mount_crank_manual: false, retractable_auto_rewind: true, cart_wheeled_portable: false, freestanding_decorative_pot: true, hideaway_box_enclosed: true,
  };
  return m[t];
}

export function reelMaterial(t: HoseReelType): string {
  const m: Record<HoseReelType, string> = {
    wall_mount_crank_manual: "powder_coated_steel",
    retractable_auto_rewind: "abs_plastic_spring",
    cart_wheeled_portable: "steel_frame_pneumatic",
    freestanding_decorative_pot: "resin_wicker_weave",
    hideaway_box_enclosed: "uv_resistant_poly",
  };
  return m[t];
}

export function bestYard(t: HoseReelType): string {
  const m: Record<HoseReelType, string> = {
    wall_mount_crank_manual: "garage_wall_permanent",
    retractable_auto_rewind: "patio_clean_look",
    cart_wheeled_portable: "large_yard_multi_zone",
    freestanding_decorative_pot: "front_garden_visible",
    hideaway_box_enclosed: "deck_tidy_storage",
  };
  return m[t];
}

export function hoseReels(): HoseReelType[] {
  return ["wall_mount_crank_manual", "retractable_auto_rewind", "cart_wheeled_portable", "freestanding_decorative_pot", "hideaway_box_enclosed"];
}
