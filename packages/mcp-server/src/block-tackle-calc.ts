// Block tackle calculator - rigging block and tackle tools

export type BlockTackleType =
  | "single_sheave_basic"
  | "double_sheave_power"
  | "fiddle_block_compact"
  | "snatch_block_open"
  | "ratchet_block_hold";

const BLOCK_DATA: Record<
  BlockTackleType,
  {
    mechanicalAdv: number;
    frictionLoss: number;
    loadCapacity: number;
    compactness: number;
    cost: number;
    openSide: boolean;
    selfLocking: boolean;
    sheaveCount: string;
    bestUse: string;
  }
> = {
  single_sheave_basic: {
    mechanicalAdv: 4,
    frictionLoss: 9,
    loadCapacity: 6,
    compactness: 9,
    cost: 2,
    openSide: false,
    selfLocking: false,
    sheaveCount: "single_one",
    bestUse: "direction_change_pull",
  },
  double_sheave_power: {
    mechanicalAdv: 8,
    frictionLoss: 7,
    loadCapacity: 8,
    compactness: 6,
    cost: 5,
    openSide: false,
    selfLocking: false,
    sheaveCount: "double_two",
    bestUse: "heavy_lift_haul",
  },
  fiddle_block_compact: {
    mechanicalAdv: 7,
    frictionLoss: 7,
    loadCapacity: 7,
    compactness: 8,
    cost: 5,
    openSide: false,
    selfLocking: false,
    sheaveCount: "fiddle_stacked",
    bestUse: "mainsheet_compact",
  },
  snatch_block_open: {
    mechanicalAdv: 5,
    frictionLoss: 8,
    loadCapacity: 8,
    compactness: 7,
    cost: 4,
    openSide: true,
    selfLocking: false,
    sheaveCount: "single_open_side",
    bestUse: "quick_rig_redirect",
  },
  ratchet_block_hold: {
    mechanicalAdv: 6,
    frictionLoss: 6,
    loadCapacity: 7,
    compactness: 7,
    cost: 6,
    openSide: false,
    selfLocking: true,
    sheaveCount: "single_ratchet",
    bestUse: "sheet_hold_trim",
  },
};

export function mechanicalAdv(type: BlockTackleType): number {
  return BLOCK_DATA[type].mechanicalAdv;
}
export function frictionLoss(type: BlockTackleType): number {
  return BLOCK_DATA[type].frictionLoss;
}
export function loadCapacity(type: BlockTackleType): number {
  return BLOCK_DATA[type].loadCapacity;
}
export function compactness(type: BlockTackleType): number {
  return BLOCK_DATA[type].compactness;
}
export function blockCost(type: BlockTackleType): number {
  return BLOCK_DATA[type].cost;
}
export function openSide(type: BlockTackleType): boolean {
  return BLOCK_DATA[type].openSide;
}
export function selfLocking(type: BlockTackleType): boolean {
  return BLOCK_DATA[type].selfLocking;
}
export function sheaveCount(type: BlockTackleType): string {
  return BLOCK_DATA[type].sheaveCount;
}
export function bestUse(type: BlockTackleType): string {
  return BLOCK_DATA[type].bestUse;
}
export function blockTackles(): BlockTackleType[] {
  return Object.keys(BLOCK_DATA) as BlockTackleType[];
}
