// Regulator needle calculator - upholstery stuffing manipulation tools

export type RegulatorNeedleType =
  | "straight_long_reach"
  | "bent_tip_angle"
  | "double_point_through"
  | "buttoning_loop_pull"
  | "mattress_heavy_gauge";

const NEEDLE_DATA: Record<
  RegulatorNeedleType,
  {
    stuffReach: number;
    controlMove: number;
    fabricSafe: number;
    versatility: number;
    cost: number;
    curved: boolean;
    doubleEnd: boolean;
    gaugeSize: string;
    bestUse: string;
  }
> = {
  straight_long_reach: {
    stuffReach: 9,
    controlMove: 7,
    fabricSafe: 6,
    versatility: 8,
    cost: 3,
    curved: false,
    doubleEnd: false,
    gaugeSize: "ten_inch_standard",
    bestUse: "deep_stuff_regulate",
  },
  bent_tip_angle: {
    stuffReach: 7,
    controlMove: 9,
    fabricSafe: 8,
    versatility: 7,
    cost: 4,
    curved: true,
    doubleEnd: false,
    gaugeSize: "eight_inch_medium",
    bestUse: "edge_roll_shape",
  },
  double_point_through: {
    stuffReach: 8,
    controlMove: 6,
    fabricSafe: 5,
    versatility: 9,
    cost: 4,
    curved: false,
    doubleEnd: true,
    gaugeSize: "twelve_inch_long",
    bestUse: "tie_through_stitch",
  },
  buttoning_loop_pull: {
    stuffReach: 5,
    controlMove: 8,
    fabricSafe: 9,
    versatility: 5,
    cost: 3,
    curved: true,
    doubleEnd: false,
    gaugeSize: "six_inch_short",
    bestUse: "button_loop_thread",
  },
  mattress_heavy_gauge: {
    stuffReach: 10,
    controlMove: 5,
    fabricSafe: 4,
    versatility: 6,
    cost: 5,
    curved: false,
    doubleEnd: true,
    gaugeSize: "sixteen_inch_heavy",
    bestUse: "mattress_tie_deep",
  },
};

export function stuffReach(type: RegulatorNeedleType): number {
  return NEEDLE_DATA[type].stuffReach;
}
export function controlMove(type: RegulatorNeedleType): number {
  return NEEDLE_DATA[type].controlMove;
}
export function fabricSafe(type: RegulatorNeedleType): number {
  return NEEDLE_DATA[type].fabricSafe;
}
export function versatility(type: RegulatorNeedleType): number {
  return NEEDLE_DATA[type].versatility;
}
export function needleCost(type: RegulatorNeedleType): number {
  return NEEDLE_DATA[type].cost;
}
export function curved(type: RegulatorNeedleType): boolean {
  return NEEDLE_DATA[type].curved;
}
export function doubleEnd(type: RegulatorNeedleType): boolean {
  return NEEDLE_DATA[type].doubleEnd;
}
export function gaugeSize(type: RegulatorNeedleType): string {
  return NEEDLE_DATA[type].gaugeSize;
}
export function bestUse(type: RegulatorNeedleType): string {
  return NEEDLE_DATA[type].bestUse;
}
export function regulatorNeedles(): RegulatorNeedleType[] {
  return Object.keys(NEEDLE_DATA) as RegulatorNeedleType[];
}
