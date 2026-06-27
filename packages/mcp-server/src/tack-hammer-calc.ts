// Tack hammer calculator - upholstery tacking hammer tools

export type TackHammerType =
  | "magnetic_tip_hold"
  | "double_face_flat"
  | "claw_pull_remove"
  | "lightweight_trim_tap"
  | "staple_gun_pneumatic";

const TACK_DATA: Record<
  TackHammerType,
  {
    driveAccuracy: number;
    speedTack: number;
    controlFeel: number;
    fabricSafe: number;
    cost: number;
    magnetic: boolean;
    powered: boolean;
    headStyle: string;
    bestUse: string;
  }
> = {
  magnetic_tip_hold: {
    driveAccuracy: 9,
    speedTack: 8,
    controlFeel: 9,
    fabricSafe: 8,
    cost: 5,
    magnetic: true,
    powered: false,
    headStyle: "magnetic_round_tip",
    bestUse: "precision_tack_set",
  },
  double_face_flat: {
    driveAccuracy: 7,
    speedTack: 8,
    controlFeel: 7,
    fabricSafe: 7,
    cost: 3,
    magnetic: false,
    powered: false,
    headStyle: "flat_double_face",
    bestUse: "general_tack_drive",
  },
  claw_pull_remove: {
    driveAccuracy: 7,
    speedTack: 7,
    controlFeel: 8,
    fabricSafe: 6,
    cost: 4,
    magnetic: false,
    powered: false,
    headStyle: "claw_split_pull",
    bestUse: "tack_remove_reset",
  },
  lightweight_trim_tap: {
    driveAccuracy: 8,
    speedTack: 9,
    controlFeel: 9,
    fabricSafe: 9,
    cost: 4,
    magnetic: false,
    powered: false,
    headStyle: "light_narrow_face",
    bestUse: "trim_gimp_tack",
  },
  staple_gun_pneumatic: {
    driveAccuracy: 6,
    speedTack: 10,
    controlFeel: 6,
    fabricSafe: 5,
    cost: 7,
    magnetic: false,
    powered: true,
    headStyle: "staple_feed_nose",
    bestUse: "production_staple_fix",
  },
};

export function driveAccuracy(type: TackHammerType): number {
  return TACK_DATA[type].driveAccuracy;
}
export function speedTack(type: TackHammerType): number {
  return TACK_DATA[type].speedTack;
}
export function controlFeel(type: TackHammerType): number {
  return TACK_DATA[type].controlFeel;
}
export function fabricSafe(type: TackHammerType): number {
  return TACK_DATA[type].fabricSafe;
}
export function tackCost(type: TackHammerType): number {
  return TACK_DATA[type].cost;
}
export function magnetic(type: TackHammerType): boolean {
  return TACK_DATA[type].magnetic;
}
export function powered(type: TackHammerType): boolean {
  return TACK_DATA[type].powered;
}
export function headStyle(type: TackHammerType): string {
  return TACK_DATA[type].headStyle;
}
export function bestUse(type: TackHammerType): string {
  return TACK_DATA[type].bestUse;
}
export function tackHammers(): TackHammerType[] {
  return Object.keys(TACK_DATA) as TackHammerType[];
}
