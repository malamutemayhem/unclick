// Hairspring collet calculator - clockmaking hairspring manipulation tools

export type HairspringColletType =
  | "collet_opener_lever"
  | "spring_tweezers_fine"
  | "stud_carrier_hold"
  | "vibrating_tool_adjust"
  | "pinning_vice_clamp";

const COLLET_DATA: Record<
  HairspringColletType,
  {
    gripPrecision: number;
    springSafe: number;
    adjustFine: number;
    handleErgon: number;
    cost: number;
    selfClosing: boolean;
    forPinning: boolean;
    jawProfile: string;
    bestUse: string;
  }
> = {
  collet_opener_lever: {
    gripPrecision: 8,
    springSafe: 8,
    adjustFine: 7,
    handleErgon: 8,
    cost: 4,
    selfClosing: false,
    forPinning: false,
    jawProfile: "tapered_lever_jaw",
    bestUse: "collet_open_close",
  },
  spring_tweezers_fine: {
    gripPrecision: 10,
    springSafe: 9,
    adjustFine: 9,
    handleErgon: 7,
    cost: 6,
    selfClosing: true,
    forPinning: false,
    jawProfile: "fine_point_spring",
    bestUse: "spring_coil_handle",
  },
  stud_carrier_hold: {
    gripPrecision: 7,
    springSafe: 8,
    adjustFine: 8,
    handleErgon: 9,
    cost: 5,
    selfClosing: false,
    forPinning: false,
    jawProfile: "stud_slot_cradle",
    bestUse: "stud_position_set",
  },
  vibrating_tool_adjust: {
    gripPrecision: 8,
    springSafe: 7,
    adjustFine: 10,
    handleErgon: 7,
    cost: 7,
    selfClosing: false,
    forPinning: false,
    jawProfile: "vibrate_arm_tip",
    bestUse: "coil_spacing_even",
  },
  pinning_vice_clamp: {
    gripPrecision: 9,
    springSafe: 9,
    adjustFine: 8,
    handleErgon: 8,
    cost: 5,
    selfClosing: false,
    forPinning: true,
    jawProfile: "pin_slot_clamp",
    bestUse: "pin_spring_to_collet",
  },
};

export function gripPrecision(type: HairspringColletType): number {
  return COLLET_DATA[type].gripPrecision;
}
export function springSafe(type: HairspringColletType): number {
  return COLLET_DATA[type].springSafe;
}
export function adjustFine(type: HairspringColletType): number {
  return COLLET_DATA[type].adjustFine;
}
export function handleErgon(type: HairspringColletType): number {
  return COLLET_DATA[type].handleErgon;
}
export function colletCost(type: HairspringColletType): number {
  return COLLET_DATA[type].cost;
}
export function selfClosing(type: HairspringColletType): boolean {
  return COLLET_DATA[type].selfClosing;
}
export function forPinning(type: HairspringColletType): boolean {
  return COLLET_DATA[type].forPinning;
}
export function jawProfile(type: HairspringColletType): string {
  return COLLET_DATA[type].jawProfile;
}
export function bestUse(type: HairspringColletType): string {
  return COLLET_DATA[type].bestUse;
}
export function hairspringCollets(): HairspringColletType[] {
  return Object.keys(COLLET_DATA) as HairspringColletType[];
}
