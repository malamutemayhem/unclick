// Pug mill calculator - pottery clay mixing/deairing tools

export type PugMillType =
  | "hand_crank_small"
  | "electric_auger_standard"
  | "deairing_vacuum_pro"
  | "dual_shaft_mix"
  | "portable_mini_bench";

const PUG_DATA: Record<
  PugMillType,
  {
    mixEven: number;
    deairQuality: number;
    throughput: number;
    clayRange: number;
    cost: number;
    powered: boolean;
    hasVacuum: boolean;
    augerType: string;
    bestUse: string;
  }
> = {
  hand_crank_small: {
    mixEven: 6,
    deairQuality: 4,
    throughput: 4,
    clayRange: 6,
    cost: 3,
    powered: false,
    hasVacuum: false,
    augerType: "single_hand_crank",
    bestUse: "small_batch_reclaim",
  },
  electric_auger_standard: {
    mixEven: 8,
    deairQuality: 6,
    throughput: 8,
    clayRange: 8,
    cost: 6,
    powered: true,
    hasVacuum: false,
    augerType: "electric_single_auger",
    bestUse: "studio_clay_prep",
  },
  deairing_vacuum_pro: {
    mixEven: 9,
    deairQuality: 10,
    throughput: 8,
    clayRange: 8,
    cost: 9,
    powered: true,
    hasVacuum: true,
    augerType: "vacuum_seal_auger",
    bestUse: "production_deair_mix",
  },
  dual_shaft_mix: {
    mixEven: 10,
    deairQuality: 7,
    throughput: 9,
    clayRange: 9,
    cost: 8,
    powered: true,
    hasVacuum: false,
    augerType: "dual_counter_shaft",
    bestUse: "heavy_mix_blend",
  },
  portable_mini_bench: {
    mixEven: 7,
    deairQuality: 5,
    throughput: 5,
    clayRange: 5,
    cost: 4,
    powered: true,
    hasVacuum: false,
    augerType: "mini_bench_auger",
    bestUse: "hobby_reclaim_mix",
  },
};

export function mixEven(type: PugMillType): number {
  return PUG_DATA[type].mixEven;
}
export function deairQuality(type: PugMillType): number {
  return PUG_DATA[type].deairQuality;
}
export function throughput(type: PugMillType): number {
  return PUG_DATA[type].throughput;
}
export function clayRange(type: PugMillType): number {
  return PUG_DATA[type].clayRange;
}
export function pugCost(type: PugMillType): number {
  return PUG_DATA[type].cost;
}
export function powered(type: PugMillType): boolean {
  return PUG_DATA[type].powered;
}
export function hasVacuum(type: PugMillType): boolean {
  return PUG_DATA[type].hasVacuum;
}
export function augerType(type: PugMillType): string {
  return PUG_DATA[type].augerType;
}
export function bestUse(type: PugMillType): string {
  return PUG_DATA[type].bestUse;
}
export function pugMills(): PugMillType[] {
  return Object.keys(PUG_DATA) as PugMillType[];
}
