// Backing press calculator - bookbinding spine rounding/backing presses

export type BackingPressType =
  | "v_cradle_standard"
  | "screw_jaw_heavy"
  | "spring_loaded_quick"
  | "adjustable_angle_tilt"
  | "bench_mount_fixed";

const BACKING_DATA: Record<
  BackingPressType,
  {
    spineControl: number;
    backForce: number;
    setupSpeed: number;
    bookRange: number;
    cost: number;
    adjustable: boolean;
    forLargeBooks: boolean;
    cradleType: string;
    bestUse: string;
  }
> = {
  v_cradle_standard: {
    spineControl: 8,
    backForce: 7,
    setupSpeed: 8,
    bookRange: 7,
    cost: 5,
    adjustable: false,
    forLargeBooks: false,
    cradleType: "v_channel_wood",
    bestUse: "standard_spine_round",
  },
  screw_jaw_heavy: {
    spineControl: 9,
    backForce: 10,
    setupSpeed: 5,
    bookRange: 8,
    cost: 8,
    adjustable: false,
    forLargeBooks: true,
    cradleType: "iron_screw_jaw",
    bestUse: "heavy_volume_back",
  },
  spring_loaded_quick: {
    spineControl: 7,
    backForce: 6,
    setupSpeed: 10,
    bookRange: 6,
    cost: 6,
    adjustable: false,
    forLargeBooks: false,
    cradleType: "spring_clamp_rail",
    bestUse: "quick_pamphlet_back",
  },
  adjustable_angle_tilt: {
    spineControl: 9,
    backForce: 8,
    setupSpeed: 6,
    bookRange: 10,
    cost: 9,
    adjustable: true,
    forLargeBooks: true,
    cradleType: "tilt_angle_plate",
    bestUse: "variable_spine_angle",
  },
  bench_mount_fixed: {
    spineControl: 8,
    backForce: 9,
    setupSpeed: 7,
    bookRange: 7,
    cost: 7,
    adjustable: false,
    forLargeBooks: false,
    cradleType: "bolted_bench_base",
    bestUse: "production_line_back",
  },
};

export function spineControl(type: BackingPressType): number {
  return BACKING_DATA[type].spineControl;
}
export function backForce(type: BackingPressType): number {
  return BACKING_DATA[type].backForce;
}
export function setupSpeed(type: BackingPressType): number {
  return BACKING_DATA[type].setupSpeed;
}
export function bookRange(type: BackingPressType): number {
  return BACKING_DATA[type].bookRange;
}
export function backingCost(type: BackingPressType): number {
  return BACKING_DATA[type].cost;
}
export function adjustable(type: BackingPressType): boolean {
  return BACKING_DATA[type].adjustable;
}
export function forLargeBooks(type: BackingPressType): boolean {
  return BACKING_DATA[type].forLargeBooks;
}
export function cradleType(type: BackingPressType): string {
  return BACKING_DATA[type].cradleType;
}
export function bestUse(type: BackingPressType): string {
  return BACKING_DATA[type].bestUse;
}
export function backingPresses(): BackingPressType[] {
  return Object.keys(BACKING_DATA) as BackingPressType[];
}
