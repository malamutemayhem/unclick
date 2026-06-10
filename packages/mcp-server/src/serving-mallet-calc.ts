// Serving mallet calculator - rope serving/wrapping tools

export type ServingMalletType =
  | "wood_barrel_classic"
  | "metal_ratchet_lock"
  | "plastic_light_quick"
  | "adjustable_tension_set"
  | "mini_whipping_hand";

const MALLET_DATA: Record<
  ServingMalletType,
  {
    wrapTight: number;
    speedServe: number;
    tensionControl: number;
    ropeRange: number;
    cost: number;
    ratchetLock: boolean;
    forSmallLine: boolean;
    barrelType: string;
    bestUse: string;
  }
> = {
  wood_barrel_classic: {
    wrapTight: 8,
    speedServe: 7,
    tensionControl: 7,
    ropeRange: 8,
    cost: 4,
    ratchetLock: false,
    forSmallLine: false,
    barrelType: "turned_hardwood_barrel",
    bestUse: "traditional_rope_serve",
  },
  metal_ratchet_lock: {
    wrapTight: 9,
    speedServe: 8,
    tensionControl: 9,
    ropeRange: 7,
    cost: 7,
    ratchetLock: true,
    forSmallLine: false,
    barrelType: "aluminum_ratchet_drum",
    bestUse: "heavy_standing_rigging",
  },
  plastic_light_quick: {
    wrapTight: 6,
    speedServe: 9,
    tensionControl: 5,
    ropeRange: 6,
    cost: 2,
    ratchetLock: false,
    forSmallLine: false,
    barrelType: "molded_abs_barrel",
    bestUse: "quick_field_serve",
  },
  adjustable_tension_set: {
    wrapTight: 8,
    speedServe: 7,
    tensionControl: 10,
    ropeRange: 9,
    cost: 8,
    ratchetLock: true,
    forSmallLine: false,
    barrelType: "spring_tension_drum",
    bestUse: "variable_rope_size",
  },
  mini_whipping_hand: {
    wrapTight: 5,
    speedServe: 6,
    tensionControl: 8,
    ropeRange: 4,
    cost: 3,
    ratchetLock: false,
    forSmallLine: true,
    barrelType: "small_wood_bobbin",
    bestUse: "fine_whipping_end",
  },
};

export function wrapTight(type: ServingMalletType): number {
  return MALLET_DATA[type].wrapTight;
}
export function speedServe(type: ServingMalletType): number {
  return MALLET_DATA[type].speedServe;
}
export function tensionControl(type: ServingMalletType): number {
  return MALLET_DATA[type].tensionControl;
}
export function ropeRange(type: ServingMalletType): number {
  return MALLET_DATA[type].ropeRange;
}
export function malletCost(type: ServingMalletType): number {
  return MALLET_DATA[type].cost;
}
export function ratchetLock(type: ServingMalletType): boolean {
  return MALLET_DATA[type].ratchetLock;
}
export function forSmallLine(type: ServingMalletType): boolean {
  return MALLET_DATA[type].forSmallLine;
}
export function barrelType(type: ServingMalletType): string {
  return MALLET_DATA[type].barrelType;
}
export function bestUse(type: ServingMalletType): string {
  return MALLET_DATA[type].bestUse;
}
export function servingMallets(): ServingMalletType[] {
  return Object.keys(MALLET_DATA) as ServingMalletType[];
}
