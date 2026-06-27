// Buttoning needle calculator - upholstery deep button tools

export type ButtoningNeedleType =
  | "straight_long_reach"
  | "curved_round_body"
  | "double_point_through"
  | "bayonet_point_pierce"
  | "spring_eye_thread";

const BUTTON_DATA: Record<
  ButtoningNeedleType,
  {
    reachDepth: number;
    threadEase: number;
    fabricPierce: number;
    controlGuide: number;
    cost: number;
    curved: boolean;
    forDeep: boolean;
    pointStyle: string;
    bestUse: string;
  }
> = {
  straight_long_reach: {
    reachDepth: 10,
    threadEase: 7,
    fabricPierce: 8,
    controlGuide: 7,
    cost: 3,
    curved: false,
    forDeep: true,
    pointStyle: "sharp_straight_point",
    bestUse: "deep_button_pull",
  },
  curved_round_body: {
    reachDepth: 7,
    threadEase: 8,
    fabricPierce: 7,
    controlGuide: 9,
    cost: 4,
    curved: true,
    forDeep: false,
    pointStyle: "curved_round_tip",
    bestUse: "blind_stitch_close",
  },
  double_point_through: {
    reachDepth: 9,
    threadEase: 6,
    fabricPierce: 9,
    controlGuide: 7,
    cost: 4,
    curved: false,
    forDeep: true,
    pointStyle: "double_sharp_end",
    bestUse: "through_tie_button",
  },
  bayonet_point_pierce: {
    reachDepth: 8,
    threadEase: 7,
    fabricPierce: 10,
    controlGuide: 8,
    cost: 5,
    curved: false,
    forDeep: false,
    pointStyle: "triangular_bayonet",
    bestUse: "heavy_fabric_pierce",
  },
  spring_eye_thread: {
    reachDepth: 8,
    threadEase: 10,
    fabricPierce: 7,
    controlGuide: 8,
    cost: 5,
    curved: false,
    forDeep: false,
    pointStyle: "spring_eye_close",
    bestUse: "quick_thread_change",
  },
};

export function reachDepth(type: ButtoningNeedleType): number {
  return BUTTON_DATA[type].reachDepth;
}
export function threadEase(type: ButtoningNeedleType): number {
  return BUTTON_DATA[type].threadEase;
}
export function fabricPierce(type: ButtoningNeedleType): number {
  return BUTTON_DATA[type].fabricPierce;
}
export function controlGuide(type: ButtoningNeedleType): number {
  return BUTTON_DATA[type].controlGuide;
}
export function buttonCost(type: ButtoningNeedleType): number {
  return BUTTON_DATA[type].cost;
}
export function curved(type: ButtoningNeedleType): boolean {
  return BUTTON_DATA[type].curved;
}
export function forDeep(type: ButtoningNeedleType): boolean {
  return BUTTON_DATA[type].forDeep;
}
export function pointStyle(type: ButtoningNeedleType): string {
  return BUTTON_DATA[type].pointStyle;
}
export function bestUse(type: ButtoningNeedleType): string {
  return BUTTON_DATA[type].bestUse;
}
export function buttoningNeedles(): ButtoningNeedleType[] {
  return Object.keys(BUTTON_DATA) as ButtoningNeedleType[];
}
