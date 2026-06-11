// Twybill calculator - timber framing twybill tools

export type TwybillType =
  | "standard_double_axe"
  | "narrow_mortise_deep"
  | "wide_mortise_broad"
  | "curved_edge_scoop"
  | "heavy_pattern_large";

const TWYBILL_DATA: Record<
  TwybillType,
  {
    mortiseChop: number;
    wasteRemove: number;
    controlSwing: number;
    edgeKeep: number;
    cost: number;
    doubleBit: boolean;
    forDeep: boolean;
    headPattern: string;
    bestUse: string;
  }
> = {
  standard_double_axe: {
    mortiseChop: 8,
    wasteRemove: 9,
    controlSwing: 8,
    edgeKeep: 7,
    cost: 5,
    doubleBit: true,
    forDeep: false,
    headPattern: "cross_double_bit",
    bestUse: "general_mortise_chop",
  },
  narrow_mortise_deep: {
    mortiseChop: 9,
    wasteRemove: 7,
    controlSwing: 7,
    edgeKeep: 8,
    cost: 5,
    doubleBit: true,
    forDeep: true,
    headPattern: "narrow_cross_deep",
    bestUse: "deep_mortise_reach",
  },
  wide_mortise_broad: {
    mortiseChop: 8,
    wasteRemove: 10,
    controlSwing: 7,
    edgeKeep: 7,
    cost: 6,
    doubleBit: true,
    forDeep: false,
    headPattern: "wide_cross_broad",
    bestUse: "large_mortise_waste",
  },
  curved_edge_scoop: {
    mortiseChop: 7,
    wasteRemove: 8,
    controlSwing: 8,
    edgeKeep: 6,
    cost: 6,
    doubleBit: true,
    forDeep: false,
    headPattern: "curved_scoop_edge",
    bestUse: "curved_bottom_mortise",
  },
  heavy_pattern_large: {
    mortiseChop: 10,
    wasteRemove: 10,
    controlSwing: 6,
    edgeKeep: 8,
    cost: 7,
    doubleBit: true,
    forDeep: true,
    headPattern: "heavy_forged_large",
    bestUse: "heavy_beam_mortise",
  },
};

export function mortiseChop(type: TwybillType): number {
  return TWYBILL_DATA[type].mortiseChop;
}
export function wasteRemove(type: TwybillType): number {
  return TWYBILL_DATA[type].wasteRemove;
}
export function controlSwing(type: TwybillType): number {
  return TWYBILL_DATA[type].controlSwing;
}
export function edgeKeep(type: TwybillType): number {
  return TWYBILL_DATA[type].edgeKeep;
}
export function twybillCost(type: TwybillType): number {
  return TWYBILL_DATA[type].cost;
}
export function doubleBit(type: TwybillType): boolean {
  return TWYBILL_DATA[type].doubleBit;
}
export function forDeep(type: TwybillType): boolean {
  return TWYBILL_DATA[type].forDeep;
}
export function headPattern(type: TwybillType): string {
  return TWYBILL_DATA[type].headPattern;
}
export function bestUse(type: TwybillType): string {
  return TWYBILL_DATA[type].bestUse;
}
export function twybills(): TwybillType[] {
  return Object.keys(TWYBILL_DATA) as TwybillType[];
}
