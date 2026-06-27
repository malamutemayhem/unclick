// Flag iron calculator - coopering flagging and sealing tools

export type FlagIronType =
  | "straight_flat_standard"
  | "curved_barrel_follow"
  | "electric_heat_modern"
  | "narrow_tight_joint"
  | "wide_spread_cover";

const IRON_DATA: Record<
  FlagIronType,
  {
    sealQuality: number;
    heatRetain: number;
    controlFeel: number;
    reachDepth: number;
    cost: number;
    heated: boolean;
    forTight: boolean;
    tipShape: string;
    bestUse: string;
  }
> = {
  straight_flat_standard: {
    sealQuality: 8,
    heatRetain: 7,
    controlFeel: 8,
    reachDepth: 7,
    cost: 4,
    heated: false,
    forTight: false,
    tipShape: "flat_straight_tip",
    bestUse: "general_flag_seal",
  },
  curved_barrel_follow: {
    sealQuality: 9,
    heatRetain: 7,
    controlFeel: 8,
    reachDepth: 8,
    cost: 5,
    heated: false,
    forTight: false,
    tipShape: "curved_follow_tip",
    bestUse: "barrel_curve_seal",
  },
  electric_heat_modern: {
    sealQuality: 9,
    heatRetain: 10,
    controlFeel: 7,
    reachDepth: 7,
    cost: 8,
    heated: true,
    forTight: false,
    tipShape: "electric_element_tip",
    bestUse: "consistent_heat_seal",
  },
  narrow_tight_joint: {
    sealQuality: 8,
    heatRetain: 6,
    controlFeel: 9,
    reachDepth: 9,
    cost: 5,
    heated: false,
    forTight: true,
    tipShape: "narrow_point_tip",
    bestUse: "tight_joint_flag",
  },
  wide_spread_cover: {
    sealQuality: 7,
    heatRetain: 8,
    controlFeel: 7,
    reachDepth: 5,
    cost: 4,
    heated: false,
    forTight: false,
    tipShape: "wide_flat_spread",
    bestUse: "broad_area_seal",
  },
};

export function sealQuality(type: FlagIronType): number {
  return IRON_DATA[type].sealQuality;
}
export function heatRetain(type: FlagIronType): number {
  return IRON_DATA[type].heatRetain;
}
export function controlFeel(type: FlagIronType): number {
  return IRON_DATA[type].controlFeel;
}
export function reachDepth(type: FlagIronType): number {
  return IRON_DATA[type].reachDepth;
}
export function ironCost(type: FlagIronType): number {
  return IRON_DATA[type].cost;
}
export function heated(type: FlagIronType): boolean {
  return IRON_DATA[type].heated;
}
export function forTight(type: FlagIronType): boolean {
  return IRON_DATA[type].forTight;
}
export function tipShape(type: FlagIronType): string {
  return IRON_DATA[type].tipShape;
}
export function bestUse(type: FlagIronType): string {
  return IRON_DATA[type].bestUse;
}
export function flagIrons(): FlagIronType[] {
  return Object.keys(IRON_DATA) as FlagIronType[];
}
