// Marline spike calculator - rigging marline spike tools

export type MarlineSpikeType =
  | "steel_straight_standard"
  | "hollow_fid_tubular"
  | "wood_handle_comfort"
  | "folding_pocket_travel"
  | "swedish_pattern_heavy";

const SPIKE_DATA: Record<
  MarlineSpikeType,
  {
    separateForce: number;
    knotWork: number;
    controlGrip: number;
    durability: number;
    cost: number;
    folding: boolean;
    forHeavy: boolean;
    spikeShape: string;
    bestUse: string;
  }
> = {
  steel_straight_standard: {
    separateForce: 8,
    knotWork: 8,
    controlGrip: 7,
    durability: 9,
    cost: 4,
    folding: false,
    forHeavy: false,
    spikeShape: "tapered_round_steel",
    bestUse: "general_splice_work",
  },
  hollow_fid_tubular: {
    separateForce: 6,
    knotWork: 9,
    controlGrip: 8,
    durability: 7,
    cost: 5,
    folding: false,
    forHeavy: false,
    spikeShape: "hollow_tube_end",
    bestUse: "braided_rope_splice",
  },
  wood_handle_comfort: {
    separateForce: 8,
    knotWork: 8,
    controlGrip: 10,
    durability: 7,
    cost: 5,
    folding: false,
    forHeavy: false,
    spikeShape: "steel_wood_handle",
    bestUse: "long_session_rig",
  },
  folding_pocket_travel: {
    separateForce: 6,
    knotWork: 7,
    controlGrip: 7,
    durability: 6,
    cost: 6,
    folding: true,
    forHeavy: false,
    spikeShape: "folding_blade_spike",
    bestUse: "pocket_field_rig",
  },
  swedish_pattern_heavy: {
    separateForce: 10,
    knotWork: 7,
    controlGrip: 8,
    durability: 10,
    cost: 7,
    folding: false,
    forHeavy: true,
    spikeShape: "heavy_forged_taper",
    bestUse: "heavy_wire_splice",
  },
};

export function separateForce(type: MarlineSpikeType): number {
  return SPIKE_DATA[type].separateForce;
}
export function knotWork(type: MarlineSpikeType): number {
  return SPIKE_DATA[type].knotWork;
}
export function controlGrip(type: MarlineSpikeType): number {
  return SPIKE_DATA[type].controlGrip;
}
export function durability(type: MarlineSpikeType): number {
  return SPIKE_DATA[type].durability;
}
export function spikeCost(type: MarlineSpikeType): number {
  return SPIKE_DATA[type].cost;
}
export function folding(type: MarlineSpikeType): boolean {
  return SPIKE_DATA[type].folding;
}
export function forHeavy(type: MarlineSpikeType): boolean {
  return SPIKE_DATA[type].forHeavy;
}
export function spikeShape(type: MarlineSpikeType): string {
  return SPIKE_DATA[type].spikeShape;
}
export function bestUse(type: MarlineSpikeType): string {
  return SPIKE_DATA[type].bestUse;
}
export function marlineSpikes(): MarlineSpikeType[] {
  return Object.keys(SPIKE_DATA) as MarlineSpikeType[];
}
