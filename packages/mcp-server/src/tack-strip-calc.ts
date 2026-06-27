// Tack strip calculator - upholstery carpet/fabric edge fastening strips

export type TackStripType =
  | "wood_standard_nail"
  | "concrete_adhesive_bond"
  | "metal_gripper_tooth"
  | "pre_nailed_anchor"
  | "curved_stair_flex";

const TACK_DATA: Record<
  TackStripType,
  {
    holdStrength: number;
    installSpeed: number;
    surfaceRange: number;
    concealAbility: number;
    cost: number;
    forConcrete: boolean;
    flexible: boolean;
    pinType: string;
    bestUse: string;
  }
> = {
  wood_standard_nail: {
    holdStrength: 7,
    installSpeed: 7,
    surfaceRange: 5,
    concealAbility: 8,
    cost: 2,
    forConcrete: false,
    flexible: false,
    pinType: "angled_nail_row",
    bestUse: "standard_carpet_edge",
  },
  concrete_adhesive_bond: {
    holdStrength: 8,
    installSpeed: 5,
    surfaceRange: 8,
    concealAbility: 7,
    cost: 4,
    forConcrete: true,
    flexible: false,
    pinType: "masonry_pin_glue",
    bestUse: "concrete_slab_carpet",
  },
  metal_gripper_tooth: {
    holdStrength: 9,
    installSpeed: 6,
    surfaceRange: 7,
    concealAbility: 6,
    cost: 5,
    forConcrete: false,
    flexible: false,
    pinType: "hardened_tooth_strip",
    bestUse: "heavy_traffic_hold",
  },
  pre_nailed_anchor: {
    holdStrength: 7,
    installSpeed: 9,
    surfaceRange: 4,
    concealAbility: 8,
    cost: 3,
    forConcrete: false,
    flexible: false,
    pinType: "factory_set_nail",
    bestUse: "quick_install_wood",
  },
  curved_stair_flex: {
    holdStrength: 6,
    installSpeed: 4,
    surfaceRange: 6,
    concealAbility: 9,
    cost: 6,
    forConcrete: false,
    flexible: true,
    pinType: "segmented_flex_pin",
    bestUse: "stair_nose_curve",
  },
};

export function holdStrength(type: TackStripType): number {
  return TACK_DATA[type].holdStrength;
}
export function installSpeed(type: TackStripType): number {
  return TACK_DATA[type].installSpeed;
}
export function surfaceRange(type: TackStripType): number {
  return TACK_DATA[type].surfaceRange;
}
export function concealAbility(type: TackStripType): number {
  return TACK_DATA[type].concealAbility;
}
export function stripCost(type: TackStripType): number {
  return TACK_DATA[type].cost;
}
export function forConcrete(type: TackStripType): boolean {
  return TACK_DATA[type].forConcrete;
}
export function flexible(type: TackStripType): boolean {
  return TACK_DATA[type].flexible;
}
export function pinType(type: TackStripType): string {
  return TACK_DATA[type].pinType;
}
export function bestUse(type: TackStripType): string {
  return TACK_DATA[type].bestUse;
}
export function tackStrips(): TackStripType[] {
  return Object.keys(TACK_DATA) as TackStripType[];
}
