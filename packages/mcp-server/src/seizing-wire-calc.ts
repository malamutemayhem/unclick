// Seizing wire calculator - rigging seizing wire tools

export type SeizingWireType =
  | "soft_iron_standard"
  | "stainless_marine_grade"
  | "monel_alloy_salt"
  | "copper_annealed_soft"
  | "nylon_coated_protect";

const WIRE_DATA: Record<
  SeizingWireType,
  {
    holdStrength: number;
    corrosionResist: number;
    bendEase: number;
    durability: number;
    cost: number;
    marine: boolean;
    coated: boolean;
    wireGauge: string;
    bestUse: string;
  }
> = {
  soft_iron_standard: {
    holdStrength: 8,
    corrosionResist: 4,
    bendEase: 9,
    durability: 6,
    cost: 2,
    marine: false,
    coated: false,
    wireGauge: "medium_18_gauge",
    bestUse: "general_land_seize",
  },
  stainless_marine_grade: {
    holdStrength: 9,
    corrosionResist: 9,
    bendEase: 7,
    durability: 9,
    cost: 5,
    marine: true,
    coated: false,
    wireGauge: "medium_16_gauge",
    bestUse: "marine_standing_rig",
  },
  monel_alloy_salt: {
    holdStrength: 9,
    corrosionResist: 10,
    bendEase: 7,
    durability: 10,
    cost: 8,
    marine: true,
    coated: false,
    wireGauge: "heavy_14_gauge",
    bestUse: "saltwater_long_term",
  },
  copper_annealed_soft: {
    holdStrength: 6,
    corrosionResist: 7,
    bendEase: 10,
    durability: 5,
    cost: 4,
    marine: false,
    coated: false,
    wireGauge: "light_20_gauge",
    bestUse: "temporary_soft_seize",
  },
  nylon_coated_protect: {
    holdStrength: 7,
    corrosionResist: 8,
    bendEase: 8,
    durability: 7,
    cost: 4,
    marine: false,
    coated: true,
    wireGauge: "coated_18_gauge",
    bestUse: "chafe_protect_seize",
  },
};

export function holdStrength(type: SeizingWireType): number {
  return WIRE_DATA[type].holdStrength;
}
export function corrosionResist(type: SeizingWireType): number {
  return WIRE_DATA[type].corrosionResist;
}
export function bendEase(type: SeizingWireType): number {
  return WIRE_DATA[type].bendEase;
}
export function durability(type: SeizingWireType): number {
  return WIRE_DATA[type].durability;
}
export function wireCost(type: SeizingWireType): number {
  return WIRE_DATA[type].cost;
}
export function marine(type: SeizingWireType): boolean {
  return WIRE_DATA[type].marine;
}
export function coated(type: SeizingWireType): boolean {
  return WIRE_DATA[type].coated;
}
export function wireGauge(type: SeizingWireType): string {
  return WIRE_DATA[type].wireGauge;
}
export function bestUse(type: SeizingWireType): string {
  return WIRE_DATA[type].bestUse;
}
export function seizingWires(): SeizingWireType[] {
  return Object.keys(WIRE_DATA) as SeizingWireType[];
}
