// Lying press calculator - bookbinding lying press tools

export type LyingPressType =
  | "cast_iron_heavy"
  | "wooden_jaw_classic"
  | "quick_release_lever"
  | "portable_bench_clamp"
  | "nipping_combo_dual";

const PRESS_DATA: Record<
  LyingPressType,
  {
    clampForce: number;
    jawWidth: number;
    setupSpeed: number;
    durability: number;
    cost: number;
    quickRelease: boolean;
    portable: boolean;
    jawMaterial: string;
    bestUse: string;
  }
> = {
  cast_iron_heavy: {
    clampForce: 10,
    jawWidth: 8,
    setupSpeed: 5,
    durability: 10,
    cost: 8,
    quickRelease: false,
    portable: false,
    jawMaterial: "cast_iron_face",
    bestUse: "heavy_trim_plough",
  },
  wooden_jaw_classic: {
    clampForce: 8,
    jawWidth: 9,
    setupSpeed: 6,
    durability: 7,
    cost: 6,
    quickRelease: false,
    portable: false,
    jawMaterial: "hardwood_beech",
    bestUse: "traditional_bind_trim",
  },
  quick_release_lever: {
    clampForce: 7,
    jawWidth: 7,
    setupSpeed: 10,
    durability: 8,
    cost: 7,
    quickRelease: true,
    portable: false,
    jawMaterial: "steel_padded",
    bestUse: "production_speed_trim",
  },
  portable_bench_clamp: {
    clampForce: 6,
    jawWidth: 6,
    setupSpeed: 8,
    durability: 6,
    cost: 4,
    quickRelease: false,
    portable: true,
    jawMaterial: "aluminum_light",
    bestUse: "workshop_travel_bind",
  },
  nipping_combo_dual: {
    clampForce: 9,
    jawWidth: 7,
    setupSpeed: 7,
    durability: 9,
    cost: 9,
    quickRelease: true,
    portable: false,
    jawMaterial: "steel_brass_combo",
    bestUse: "nip_and_trim_dual",
  },
};

export function clampForce(type: LyingPressType): number {
  return PRESS_DATA[type].clampForce;
}
export function jawWidth(type: LyingPressType): number {
  return PRESS_DATA[type].jawWidth;
}
export function setupSpeed(type: LyingPressType): number {
  return PRESS_DATA[type].setupSpeed;
}
export function durability(type: LyingPressType): number {
  return PRESS_DATA[type].durability;
}
export function pressCost(type: LyingPressType): number {
  return PRESS_DATA[type].cost;
}
export function quickRelease(type: LyingPressType): boolean {
  return PRESS_DATA[type].quickRelease;
}
export function portable(type: LyingPressType): boolean {
  return PRESS_DATA[type].portable;
}
export function jawMaterial(type: LyingPressType): string {
  return PRESS_DATA[type].jawMaterial;
}
export function bestUse(type: LyingPressType): string {
  return PRESS_DATA[type].bestUse;
}
export function lyingPresses(): LyingPressType[] {
  return Object.keys(PRESS_DATA) as LyingPressType[];
}
