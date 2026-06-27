// Balance poise calculator - clockmaking balance wheel adjustment tools

export type BalancePoiseType =
  | "poising_tool_knife"
  | "timing_screw_set"
  | "truing_caliper_spin"
  | "dynamic_test_rig"
  | "weight_screw_adjust";

const POISE_DATA: Record<
  BalancePoiseType,
  {
    poiseAccuracy: number;
    adjustRange: number;
    speedCheck: number;
    repeatability: number;
    cost: number;
    dynamic: boolean;
    forModern: boolean;
    measureMethod: string;
    bestUse: string;
  }
> = {
  poising_tool_knife: {
    poiseAccuracy: 9,
    adjustRange: 6,
    speedCheck: 7,
    repeatability: 8,
    cost: 4,
    dynamic: false,
    forModern: false,
    measureMethod: "knife_edge_rest",
    bestUse: "static_poise_check",
  },
  timing_screw_set: {
    poiseAccuracy: 8,
    adjustRange: 9,
    speedCheck: 6,
    repeatability: 9,
    cost: 5,
    dynamic: false,
    forModern: true,
    measureMethod: "screw_mass_adjust",
    bestUse: "fine_rate_adjust",
  },
  truing_caliper_spin: {
    poiseAccuracy: 8,
    adjustRange: 7,
    speedCheck: 8,
    repeatability: 8,
    cost: 5,
    dynamic: false,
    forModern: false,
    measureMethod: "caliper_roundness_check",
    bestUse: "wheel_true_round",
  },
  dynamic_test_rig: {
    poiseAccuracy: 10,
    adjustRange: 8,
    speedCheck: 9,
    repeatability: 10,
    cost: 9,
    dynamic: true,
    forModern: true,
    measureMethod: "electronic_vibration",
    bestUse: "full_dynamic_test",
  },
  weight_screw_adjust: {
    poiseAccuracy: 7,
    adjustRange: 10,
    speedCheck: 8,
    repeatability: 7,
    cost: 3,
    dynamic: false,
    forModern: false,
    measureMethod: "screw_in_out_turn",
    bestUse: "quick_weight_tweak",
  },
};

export function poiseAccuracy(type: BalancePoiseType): number {
  return POISE_DATA[type].poiseAccuracy;
}
export function adjustRange(type: BalancePoiseType): number {
  return POISE_DATA[type].adjustRange;
}
export function speedCheck(type: BalancePoiseType): number {
  return POISE_DATA[type].speedCheck;
}
export function repeatability(type: BalancePoiseType): number {
  return POISE_DATA[type].repeatability;
}
export function poiseCost(type: BalancePoiseType): number {
  return POISE_DATA[type].cost;
}
export function dynamic(type: BalancePoiseType): boolean {
  return POISE_DATA[type].dynamic;
}
export function forModern(type: BalancePoiseType): boolean {
  return POISE_DATA[type].forModern;
}
export function measureMethod(type: BalancePoiseType): string {
  return POISE_DATA[type].measureMethod;
}
export function bestUse(type: BalancePoiseType): string {
  return POISE_DATA[type].bestUse;
}
export function balancePoises(): BalancePoiseType[] {
  return Object.keys(POISE_DATA) as BalancePoiseType[];
}
