export type PickupStickType = "flat_wood_basic" | "pointed_bamboo_fine" | "metal_tip_durable" | "curved_hook_grab" | "wide_paddle_broad";

export function patternLift(t: PickupStickType): number {
  const m: Record<PickupStickType, number> = {
    flat_wood_basic: 6, pointed_bamboo_fine: 9, metal_tip_durable: 7, curved_hook_grab: 8, wide_paddle_broad: 5,
  };
  return m[t];
}

export function threadSafe(t: PickupStickType): number {
  const m: Record<PickupStickType, number> = {
    flat_wood_basic: 8, pointed_bamboo_fine: 6, metal_tip_durable: 5, curved_hook_grab: 7, wide_paddle_broad: 9,
  };
  return m[t];
}

export function speedPick(t: PickupStickType): number {
  const m: Record<PickupStickType, number> = {
    flat_wood_basic: 7, pointed_bamboo_fine: 8, metal_tip_durable: 7, curved_hook_grab: 9, wide_paddle_broad: 6,
  };
  return m[t];
}

export function warpCount(t: PickupStickType): number {
  const m: Record<PickupStickType, number> = {
    flat_wood_basic: 6, pointed_bamboo_fine: 10, metal_tip_durable: 8, curved_hook_grab: 7, wide_paddle_broad: 4,
  };
  return m[t];
}

export function stickCost(t: PickupStickType): number {
  const m: Record<PickupStickType, number> = {
    flat_wood_basic: 1, pointed_bamboo_fine: 1, metal_tip_durable: 2, curved_hook_grab: 2, wide_paddle_broad: 1,
  };
  return m[t];
}

export function hasPoint(t: PickupStickType): boolean {
  const m: Record<PickupStickType, boolean> = {
    flat_wood_basic: false, pointed_bamboo_fine: true, metal_tip_durable: true, curved_hook_grab: false, wide_paddle_broad: false,
  };
  return m[t];
}

export function hooked(t: PickupStickType): boolean {
  const m: Record<PickupStickType, boolean> = {
    flat_wood_basic: false, pointed_bamboo_fine: false, metal_tip_durable: false, curved_hook_grab: true, wide_paddle_broad: false,
  };
  return m[t];
}

export function stickMaterial(t: PickupStickType): string {
  const m: Record<PickupStickType, string> = {
    flat_wood_basic: "hardwood_flat_sand",
    pointed_bamboo_fine: "bamboo_tapered_point",
    metal_tip_durable: "steel_tip_wood_shaft",
    curved_hook_grab: "bent_wire_handle",
    wide_paddle_broad: "wide_hardwood_paddle",
  };
  return m[t];
}

export function bestUse(t: PickupStickType): string {
  const m: Record<PickupStickType, string> = {
    flat_wood_basic: "basic_pattern_pick",
    pointed_bamboo_fine: "fine_thread_select",
    metal_tip_durable: "heavy_warp_lift",
    curved_hook_grab: "fast_hook_pull",
    wide_paddle_broad: "broad_warp_spread",
  };
  return m[t];
}

export function pickupSticks(): PickupStickType[] {
  return ["flat_wood_basic", "pointed_bamboo_fine", "metal_tip_durable", "curved_hook_grab", "wide_paddle_broad"];
}
