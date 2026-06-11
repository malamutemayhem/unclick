// Finishing press calculator - bookbinding clamping presses

export type FinishingPressType =
  | "wooden_screw_classic"
  | "iron_frame_heavy"
  | "quick_release_cam"
  | "lying_press_trim"
  | "portable_clamp_field";

const PRESS_DATA: Record<
  FinishingPressType,
  {
    clampForce: number;
    jawAlign: number;
    openSpeed: number;
    bookRange: number;
    cost: number;
    quickRelease: boolean;
    forTrimming: boolean;
    jawMaterial: string;
    bestUse: string;
  }
> = {
  wooden_screw_classic: {
    clampForce: 8,
    jawAlign: 8,
    openSpeed: 5,
    bookRange: 7,
    cost: 6,
    quickRelease: false,
    forTrimming: false,
    jawMaterial: "hardwood_beech_jaw",
    bestUse: "general_bind_hold",
  },
  iron_frame_heavy: {
    clampForce: 10,
    jawAlign: 9,
    openSpeed: 4,
    bookRange: 8,
    cost: 9,
    quickRelease: false,
    forTrimming: false,
    jawMaterial: "cast_iron_cheek",
    bestUse: "heavy_volume_press",
  },
  quick_release_cam: {
    clampForce: 6,
    jawAlign: 7,
    openSpeed: 10,
    bookRange: 6,
    cost: 7,
    quickRelease: true,
    forTrimming: false,
    jawMaterial: "steel_cam_lever",
    bestUse: "rapid_swap_bind",
  },
  lying_press_trim: {
    clampForce: 9,
    jawAlign: 9,
    openSpeed: 5,
    bookRange: 7,
    cost: 8,
    quickRelease: false,
    forTrimming: true,
    jawMaterial: "maple_flush_cheek",
    bestUse: "edge_trim_plough",
  },
  portable_clamp_field: {
    clampForce: 5,
    jawAlign: 6,
    openSpeed: 9,
    bookRange: 5,
    cost: 4,
    quickRelease: true,
    forTrimming: false,
    jawMaterial: "aluminum_light_jaw",
    bestUse: "field_repair_hold",
  },
};

export function clampForce(type: FinishingPressType): number {
  return PRESS_DATA[type].clampForce;
}
export function jawAlign(type: FinishingPressType): number {
  return PRESS_DATA[type].jawAlign;
}
export function openSpeed(type: FinishingPressType): number {
  return PRESS_DATA[type].openSpeed;
}
export function bookRange(type: FinishingPressType): number {
  return PRESS_DATA[type].bookRange;
}
export function pressCost(type: FinishingPressType): number {
  return PRESS_DATA[type].cost;
}
export function quickRelease(type: FinishingPressType): boolean {
  return PRESS_DATA[type].quickRelease;
}
export function forTrimming(type: FinishingPressType): boolean {
  return PRESS_DATA[type].forTrimming;
}
export function jawMaterial(type: FinishingPressType): string {
  return PRESS_DATA[type].jawMaterial;
}
export function bestUse(type: FinishingPressType): string {
  return PRESS_DATA[type].bestUse;
}
export function finishingPresses(): FinishingPressType[] {
  return Object.keys(PRESS_DATA) as FinishingPressType[];
}
