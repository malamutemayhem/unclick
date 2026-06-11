// Banker mason calculator - stone masonry workbench tools

export type BankerMasonType =
  | "oak_frame_standard"
  | "steel_frame_heavy"
  | "adjustable_height_lift"
  | "portable_trestle_fold"
  | "rotating_turntable_spin";

const BANKER_DATA: Record<
  BankerMasonType,
  {
    stability: number;
    weightCapacity: number;
    heightAdjust: number;
    portability: number;
    cost: number;
    adjustable: boolean;
    portable: boolean;
    frameType: string;
    bestUse: string;
  }
> = {
  oak_frame_standard: {
    stability: 9,
    weightCapacity: 8,
    heightAdjust: 4,
    portability: 3,
    cost: 5,
    adjustable: false,
    portable: false,
    frameType: "solid_oak_frame",
    bestUse: "traditional_stone_bench",
  },
  steel_frame_heavy: {
    stability: 10,
    weightCapacity: 10,
    heightAdjust: 5,
    portability: 2,
    cost: 7,
    adjustable: false,
    portable: false,
    frameType: "welded_steel_frame",
    bestUse: "heavy_block_work",
  },
  adjustable_height_lift: {
    stability: 8,
    weightCapacity: 8,
    heightAdjust: 10,
    portability: 4,
    cost: 9,
    adjustable: true,
    portable: false,
    frameType: "hydraulic_lift_frame",
    bestUse: "ergonomic_carve_work",
  },
  portable_trestle_fold: {
    stability: 6,
    weightCapacity: 6,
    heightAdjust: 6,
    portability: 10,
    cost: 4,
    adjustable: false,
    portable: true,
    frameType: "folding_trestle",
    bestUse: "site_repair_work",
  },
  rotating_turntable_spin: {
    stability: 8,
    weightCapacity: 7,
    heightAdjust: 5,
    portability: 3,
    cost: 8,
    adjustable: true,
    portable: false,
    frameType: "turntable_bearing",
    bestUse: "sculpture_all_side",
  },
};

export function stability(type: BankerMasonType): number {
  return BANKER_DATA[type].stability;
}
export function weightCapacity(type: BankerMasonType): number {
  return BANKER_DATA[type].weightCapacity;
}
export function heightAdjust(type: BankerMasonType): number {
  return BANKER_DATA[type].heightAdjust;
}
export function portability(type: BankerMasonType): number {
  return BANKER_DATA[type].portability;
}
export function bankerCost(type: BankerMasonType): number {
  return BANKER_DATA[type].cost;
}
export function adjustable(type: BankerMasonType): boolean {
  return BANKER_DATA[type].adjustable;
}
export function portable(type: BankerMasonType): boolean {
  return BANKER_DATA[type].portable;
}
export function frameType(type: BankerMasonType): string {
  return BANKER_DATA[type].frameType;
}
export function bestUse(type: BankerMasonType): string {
  return BANKER_DATA[type].bestUse;
}
export function bankerMasons(): BankerMasonType[] {
  return Object.keys(BANKER_DATA) as BankerMasonType[];
}
