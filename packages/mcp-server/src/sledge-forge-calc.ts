// Sledge forge calculator - blacksmithing sledge hammer tools

export type SledgeForgeType =
  | "straight_peen_standard"
  | "cross_peen_sledge"
  | "double_face_flat"
  | "dog_head_sledge"
  | "striking_hammer_helper";

const SLEDGE_DATA: Record<
  SledgeForgeType,
  {
    strikeForce: number;
    controlAim: number;
    speedSwing: number;
    fatigueResist: number;
    cost: number;
    doubleFace: boolean;
    forHelper: boolean;
    headWeight: string;
    bestUse: string;
  }
> = {
  straight_peen_standard: {
    strikeForce: 9,
    controlAim: 7,
    speedSwing: 7,
    fatigueResist: 6,
    cost: 4,
    doubleFace: false,
    forHelper: false,
    headWeight: "heavy_3600g",
    bestUse: "draw_heavy_stock",
  },
  cross_peen_sledge: {
    strikeForce: 9,
    controlAim: 7,
    speedSwing: 7,
    fatigueResist: 6,
    cost: 4,
    doubleFace: false,
    forHelper: false,
    headWeight: "heavy_3600g",
    bestUse: "spread_heavy_cross",
  },
  double_face_flat: {
    strikeForce: 10,
    controlAim: 8,
    speedSwing: 6,
    fatigueResist: 5,
    cost: 4,
    doubleFace: true,
    forHelper: true,
    headWeight: "extra_heavy_4500g",
    bestUse: "maximum_forge_move",
  },
  dog_head_sledge: {
    strikeForce: 8,
    controlAim: 8,
    speedSwing: 8,
    fatigueResist: 7,
    cost: 5,
    doubleFace: false,
    forHelper: false,
    headWeight: "medium_2700g",
    bestUse: "general_heavy_forge",
  },
  striking_hammer_helper: {
    strikeForce: 7,
    controlAim: 9,
    speedSwing: 9,
    fatigueResist: 8,
    cost: 4,
    doubleFace: true,
    forHelper: true,
    headWeight: "light_1800g",
    bestUse: "helper_strike_call",
  },
};

export function strikeForce(type: SledgeForgeType): number {
  return SLEDGE_DATA[type].strikeForce;
}
export function controlAim(type: SledgeForgeType): number {
  return SLEDGE_DATA[type].controlAim;
}
export function speedSwing(type: SledgeForgeType): number {
  return SLEDGE_DATA[type].speedSwing;
}
export function fatigueResist(type: SledgeForgeType): number {
  return SLEDGE_DATA[type].fatigueResist;
}
export function sledgeCost(type: SledgeForgeType): number {
  return SLEDGE_DATA[type].cost;
}
export function doubleFace(type: SledgeForgeType): boolean {
  return SLEDGE_DATA[type].doubleFace;
}
export function forHelper(type: SledgeForgeType): boolean {
  return SLEDGE_DATA[type].forHelper;
}
export function headWeight(type: SledgeForgeType): string {
  return SLEDGE_DATA[type].headWeight;
}
export function bestUse(type: SledgeForgeType): string {
  return SLEDGE_DATA[type].bestUse;
}
export function sledgeForges(): SledgeForgeType[] {
  return Object.keys(SLEDGE_DATA) as SledgeForgeType[];
}
