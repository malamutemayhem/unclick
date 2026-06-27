// Marlin spike calculator - rope/knot opening spike tools

export type MarlinSpikeType =
  | "fixed_blade_steel"
  | "folding_pocket_knife"
  | "wood_handle_spike"
  | "stainless_marine_grade"
  | "titanium_light_strong";

const SPIKE_DATA: Record<
  MarlinSpikeType,
  {
    knotPry: number;
    pinOpen: number;
    portability: number;
    corrosionResist: number;
    cost: number;
    folding: boolean;
    forMarine: boolean;
    spikeMaterial: string;
    bestUse: string;
  }
> = {
  fixed_blade_steel: {
    knotPry: 9,
    pinOpen: 8,
    portability: 5,
    corrosionResist: 5,
    cost: 4,
    folding: false,
    forMarine: false,
    spikeMaterial: "carbon_steel_forged",
    bestUse: "heavy_knot_work",
  },
  folding_pocket_knife: {
    knotPry: 6,
    pinOpen: 7,
    portability: 10,
    corrosionResist: 6,
    cost: 5,
    folding: true,
    forMarine: false,
    spikeMaterial: "stainless_blade_fold",
    bestUse: "pocket_carry_knot",
  },
  wood_handle_spike: {
    knotPry: 8,
    pinOpen: 7,
    portability: 6,
    corrosionResist: 4,
    cost: 3,
    folding: false,
    forMarine: false,
    spikeMaterial: "steel_wood_handle",
    bestUse: "deck_rope_splice",
  },
  stainless_marine_grade: {
    knotPry: 8,
    pinOpen: 8,
    portability: 7,
    corrosionResist: 10,
    cost: 7,
    folding: false,
    forMarine: true,
    spikeMaterial: "316_stainless_steel",
    bestUse: "saltwater_rigging",
  },
  titanium_light_strong: {
    knotPry: 7,
    pinOpen: 8,
    portability: 9,
    corrosionResist: 9,
    cost: 9,
    folding: false,
    forMarine: true,
    spikeMaterial: "grade5_titanium",
    bestUse: "lightweight_marine",
  },
};

export function knotPry(type: MarlinSpikeType): number {
  return SPIKE_DATA[type].knotPry;
}
export function pinOpen(type: MarlinSpikeType): number {
  return SPIKE_DATA[type].pinOpen;
}
export function portability(type: MarlinSpikeType): number {
  return SPIKE_DATA[type].portability;
}
export function corrosionResist(type: MarlinSpikeType): number {
  return SPIKE_DATA[type].corrosionResist;
}
export function spikeCost(type: MarlinSpikeType): number {
  return SPIKE_DATA[type].cost;
}
export function folding(type: MarlinSpikeType): boolean {
  return SPIKE_DATA[type].folding;
}
export function forMarine(type: MarlinSpikeType): boolean {
  return SPIKE_DATA[type].forMarine;
}
export function spikeMaterial(type: MarlinSpikeType): string {
  return SPIKE_DATA[type].spikeMaterial;
}
export function bestUse(type: MarlinSpikeType): string {
  return SPIKE_DATA[type].bestUse;
}
export function marlinSpikes(): MarlinSpikeType[] {
  return Object.keys(SPIKE_DATA) as MarlinSpikeType[];
}
