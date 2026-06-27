// Whorl spin calculator - spindle whorl spinning tools

export type WhorlSpinType =
  | "top_whorl_high"
  | "bottom_whorl_low"
  | "turkish_cross_fold"
  | "supported_bowl_rest"
  | "tahkli_metal_fine";

const WHORL_DATA: Record<
  WhorlSpinType,
  {
    spinTime: number;
    draftControl: number;
    yarnConsist: number;
    portability: number;
    cost: number;
    supported: boolean;
    forFine: boolean;
    whorlPlace: string;
    bestUse: string;
  }
> = {
  top_whorl_high: {
    spinTime: 8,
    draftControl: 8,
    yarnConsist: 7,
    portability: 9,
    cost: 4,
    supported: false,
    forFine: false,
    whorlPlace: "top_shaft_high",
    bestUse: "general_drop_spin",
  },
  bottom_whorl_low: {
    spinTime: 9,
    draftControl: 7,
    yarnConsist: 8,
    portability: 9,
    cost: 4,
    supported: false,
    forFine: false,
    whorlPlace: "bottom_shaft_low",
    bestUse: "long_draw_spin",
  },
  turkish_cross_fold: {
    spinTime: 7,
    draftControl: 8,
    yarnConsist: 8,
    portability: 10,
    cost: 5,
    supported: false,
    forFine: false,
    whorlPlace: "cross_arm_center",
    bestUse: "center_pull_ball",
  },
  supported_bowl_rest: {
    spinTime: 6,
    draftControl: 10,
    yarnConsist: 9,
    portability: 7,
    cost: 6,
    supported: true,
    forFine: true,
    whorlPlace: "bowl_rest_point",
    bestUse: "fine_lace_spin",
  },
  tahkli_metal_fine: {
    spinTime: 5,
    draftControl: 9,
    yarnConsist: 10,
    portability: 8,
    cost: 7,
    supported: true,
    forFine: true,
    whorlPlace: "metal_point_rest",
    bestUse: "cotton_silk_spin",
  },
};

export function spinTime(type: WhorlSpinType): number {
  return WHORL_DATA[type].spinTime;
}
export function draftControl(type: WhorlSpinType): number {
  return WHORL_DATA[type].draftControl;
}
export function yarnConsist(type: WhorlSpinType): number {
  return WHORL_DATA[type].yarnConsist;
}
export function portability(type: WhorlSpinType): number {
  return WHORL_DATA[type].portability;
}
export function whorlCost(type: WhorlSpinType): number {
  return WHORL_DATA[type].cost;
}
export function supported(type: WhorlSpinType): boolean {
  return WHORL_DATA[type].supported;
}
export function forFine(type: WhorlSpinType): boolean {
  return WHORL_DATA[type].forFine;
}
export function whorlPlace(type: WhorlSpinType): string {
  return WHORL_DATA[type].whorlPlace;
}
export function bestUse(type: WhorlSpinType): string {
  return WHORL_DATA[type].bestUse;
}
export function whorlSpins(): WhorlSpinType[] {
  return Object.keys(WHORL_DATA) as WhorlSpinType[];
}
