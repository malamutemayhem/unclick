// Ranging rod calculator - surveying sighting/alignment tools

export type RangingRodType =
  | "wood_painted_stripe"
  | "steel_telescopic_fold"
  | "fiberglass_light_flex"
  | "aluminum_section_join"
  | "carbon_fiber_ultra";

const ROD_DATA: Record<
  RangingRodType,
  {
    visibility: number;
    portability: number;
    durability: number;
    straightness: number;
    cost: number;
    telescopic: boolean;
    conductive: boolean;
    rodMaterial: string;
    bestUse: string;
  }
> = {
  wood_painted_stripe: {
    visibility: 8,
    portability: 4,
    durability: 5,
    straightness: 6,
    cost: 2,
    telescopic: false,
    conductive: false,
    rodMaterial: "hardwood_painted",
    bestUse: "basic_line_sight",
  },
  steel_telescopic_fold: {
    visibility: 7,
    portability: 8,
    durability: 9,
    straightness: 8,
    cost: 6,
    telescopic: true,
    conductive: true,
    rodMaterial: "stainless_steel",
    bestUse: "transport_field_work",
  },
  fiberglass_light_flex: {
    visibility: 7,
    portability: 7,
    durability: 7,
    straightness: 7,
    cost: 4,
    telescopic: false,
    conductive: false,
    rodMaterial: "fiberglass_composite",
    bestUse: "power_line_survey",
  },
  aluminum_section_join: {
    visibility: 7,
    portability: 7,
    durability: 8,
    straightness: 8,
    cost: 5,
    telescopic: false,
    conductive: true,
    rodMaterial: "anodized_aluminum",
    bestUse: "section_length_extend",
  },
  carbon_fiber_ultra: {
    visibility: 6,
    portability: 9,
    durability: 8,
    straightness: 9,
    cost: 9,
    telescopic: true,
    conductive: false,
    rodMaterial: "carbon_fiber_weave",
    bestUse: "precision_geodetic",
  },
};

export function visibility(type: RangingRodType): number {
  return ROD_DATA[type].visibility;
}
export function portability(type: RangingRodType): number {
  return ROD_DATA[type].portability;
}
export function durability(type: RangingRodType): number {
  return ROD_DATA[type].durability;
}
export function straightness(type: RangingRodType): number {
  return ROD_DATA[type].straightness;
}
export function rodCost(type: RangingRodType): number {
  return ROD_DATA[type].cost;
}
export function telescopic(type: RangingRodType): boolean {
  return ROD_DATA[type].telescopic;
}
export function conductive(type: RangingRodType): boolean {
  return ROD_DATA[type].conductive;
}
export function rodMaterial(type: RangingRodType): string {
  return ROD_DATA[type].rodMaterial;
}
export function bestUse(type: RangingRodType): string {
  return ROD_DATA[type].bestUse;
}
export function rangingRods(): RangingRodType[] {
  return Object.keys(ROD_DATA) as RangingRodType[];
}
