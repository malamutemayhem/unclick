// Chiv knife calculator - cooperage flagging/sealing knives

export type ChivKnifeType =
  | "straight_blade_flag"
  | "curved_blade_stave"
  | "hooked_tip_pull"
  | "double_edge_trim"
  | "serrated_grip_rush";

const CHIV_DATA: Record<
  ChivKnifeType,
  {
    flagInsert: number;
    trimClean: number;
    controlGuide: number;
    bladeLife: number;
    cost: number;
    curved: boolean;
    forRush: boolean;
    edgeType: string;
    bestUse: string;
  }
> = {
  straight_blade_flag: {
    flagInsert: 9,
    trimClean: 7,
    controlGuide: 8,
    bladeLife: 7,
    cost: 4,
    curved: false,
    forRush: false,
    edgeType: "single_straight_edge",
    bestUse: "flag_reed_insert",
  },
  curved_blade_stave: {
    flagInsert: 7,
    trimClean: 8,
    controlGuide: 8,
    bladeLife: 7,
    cost: 5,
    curved: true,
    forRush: false,
    edgeType: "curved_sweep_blade",
    bestUse: "stave_joint_clean",
  },
  hooked_tip_pull: {
    flagInsert: 8,
    trimClean: 7,
    controlGuide: 9,
    bladeLife: 6,
    cost: 5,
    curved: true,
    forRush: false,
    edgeType: "hooked_pull_tip",
    bestUse: "old_flag_remove",
  },
  double_edge_trim: {
    flagInsert: 8,
    trimClean: 9,
    controlGuide: 7,
    bladeLife: 8,
    cost: 6,
    curved: false,
    forRush: false,
    edgeType: "double_sided_sharp",
    bestUse: "trim_excess_flag",
  },
  serrated_grip_rush: {
    flagInsert: 7,
    trimClean: 6,
    controlGuide: 7,
    bladeLife: 9,
    cost: 5,
    curved: false,
    forRush: true,
    edgeType: "serrated_grip_edge",
    bestUse: "rush_cattail_cut",
  },
};

export function flagInsert(type: ChivKnifeType): number {
  return CHIV_DATA[type].flagInsert;
}
export function trimClean(type: ChivKnifeType): number {
  return CHIV_DATA[type].trimClean;
}
export function controlGuide(type: ChivKnifeType): number {
  return CHIV_DATA[type].controlGuide;
}
export function bladeLife(type: ChivKnifeType): number {
  return CHIV_DATA[type].bladeLife;
}
export function chivCost(type: ChivKnifeType): number {
  return CHIV_DATA[type].cost;
}
export function curved(type: ChivKnifeType): boolean {
  return CHIV_DATA[type].curved;
}
export function forRush(type: ChivKnifeType): boolean {
  return CHIV_DATA[type].forRush;
}
export function edgeType(type: ChivKnifeType): string {
  return CHIV_DATA[type].edgeType;
}
export function bestUse(type: ChivKnifeType): string {
  return CHIV_DATA[type].bestUse;
}
export function chivKnives(): ChivKnifeType[] {
  return Object.keys(CHIV_DATA) as ChivKnifeType[];
}
