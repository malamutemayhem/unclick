// Beetle maul calculator - green woodworking heavy striking mauls

export type BeetleMaulType =
  | "elm_head_round"
  | "iron_bound_ring"
  | "dogwood_dense_small"
  | "rawhide_wrap_soft"
  | "laminated_glue_stack";

const MAUL_DATA: Record<
  BeetleMaulType,
  {
    strikeForce: number;
    faceDurable: number;
    controlSwing: number;
    splashResist: number;
    cost: number;
    ironBound: boolean;
    forWedges: boolean;
    headWeight: string;
    bestUse: string;
  }
> = {
  elm_head_round: {
    strikeForce: 8,
    faceDurable: 7,
    controlSwing: 7,
    splashResist: 6,
    cost: 4,
    ironBound: false,
    forWedges: true,
    headWeight: "four_pound_round",
    bestUse: "general_wedge_drive",
  },
  iron_bound_ring: {
    strikeForce: 10,
    faceDurable: 10,
    controlSwing: 6,
    splashResist: 9,
    cost: 7,
    ironBound: true,
    forWedges: true,
    headWeight: "six_pound_heavy",
    bestUse: "heavy_froe_strike",
  },
  dogwood_dense_small: {
    strikeForce: 6,
    faceDurable: 8,
    controlSwing: 9,
    splashResist: 7,
    cost: 5,
    ironBound: false,
    forWedges: false,
    headWeight: "two_pound_dense",
    bestUse: "chisel_tap_control",
  },
  rawhide_wrap_soft: {
    strikeForce: 5,
    faceDurable: 6,
    controlSwing: 8,
    splashResist: 5,
    cost: 6,
    ironBound: false,
    forWedges: false,
    headWeight: "three_pound_soft",
    bestUse: "assembly_tap_seat",
  },
  laminated_glue_stack: {
    strikeForce: 7,
    faceDurable: 9,
    controlSwing: 8,
    splashResist: 8,
    cost: 6,
    ironBound: false,
    forWedges: true,
    headWeight: "five_pound_stack",
    bestUse: "split_resist_drive",
  },
};

export function strikeForce(type: BeetleMaulType): number {
  return MAUL_DATA[type].strikeForce;
}
export function faceDurable(type: BeetleMaulType): number {
  return MAUL_DATA[type].faceDurable;
}
export function controlSwing(type: BeetleMaulType): number {
  return MAUL_DATA[type].controlSwing;
}
export function splashResist(type: BeetleMaulType): number {
  return MAUL_DATA[type].splashResist;
}
export function maulCost(type: BeetleMaulType): number {
  return MAUL_DATA[type].cost;
}
export function ironBound(type: BeetleMaulType): boolean {
  return MAUL_DATA[type].ironBound;
}
export function forWedges(type: BeetleMaulType): boolean {
  return MAUL_DATA[type].forWedges;
}
export function headWeight(type: BeetleMaulType): string {
  return MAUL_DATA[type].headWeight;
}
export function bestUse(type: BeetleMaulType): string {
  return MAUL_DATA[type].bestUse;
}
export function beetleMauls(): BeetleMaulType[] {
  return Object.keys(MAUL_DATA) as BeetleMaulType[];
}
