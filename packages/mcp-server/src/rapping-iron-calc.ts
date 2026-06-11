// Rapping iron calculator - basket weaving tamping/packing tools

export type RappingIronType =
  | "flat_blade_wide"
  | "pointed_tip_tight"
  | "curved_hook_pull"
  | "weighted_heavy_pack"
  | "shell_shaped_scoop";

const RAPPING_DATA: Record<
  RappingIronType,
  {
    packForce: number;
    reachTight: number;
    weaveSafe: number;
    controlFeel: number;
    cost: number;
    weighted: boolean;
    forTightWeave: boolean;
    bladeProfile: string;
    bestUse: string;
  }
> = {
  flat_blade_wide: {
    packForce: 8,
    reachTight: 5,
    weaveSafe: 7,
    controlFeel: 7,
    cost: 4,
    weighted: false,
    forTightWeave: false,
    bladeProfile: "flat_wide_blade",
    bestUse: "general_weft_pack",
  },
  pointed_tip_tight: {
    packForce: 6,
    reachTight: 10,
    weaveSafe: 6,
    controlFeel: 8,
    cost: 4,
    weighted: false,
    forTightWeave: true,
    bladeProfile: "narrow_point_tip",
    bestUse: "tight_corner_pack",
  },
  curved_hook_pull: {
    packForce: 5,
    reachTight: 8,
    weaveSafe: 8,
    controlFeel: 9,
    cost: 5,
    weighted: false,
    forTightWeave: true,
    bladeProfile: "curved_hook_end",
    bestUse: "pull_adjust_weft",
  },
  weighted_heavy_pack: {
    packForce: 10,
    reachTight: 4,
    weaveSafe: 5,
    controlFeel: 6,
    cost: 6,
    weighted: true,
    forTightWeave: false,
    bladeProfile: "heavy_block_face",
    bestUse: "dense_weft_compact",
  },
  shell_shaped_scoop: {
    packForce: 7,
    reachTight: 7,
    weaveSafe: 9,
    controlFeel: 8,
    cost: 5,
    weighted: false,
    forTightWeave: false,
    bladeProfile: "concave_shell_curve",
    bestUse: "round_basket_shape",
  },
};

export function packForce(type: RappingIronType): number {
  return RAPPING_DATA[type].packForce;
}
export function reachTight(type: RappingIronType): number {
  return RAPPING_DATA[type].reachTight;
}
export function weaveSafe(type: RappingIronType): number {
  return RAPPING_DATA[type].weaveSafe;
}
export function controlFeel(type: RappingIronType): number {
  return RAPPING_DATA[type].controlFeel;
}
export function ironCost(type: RappingIronType): number {
  return RAPPING_DATA[type].cost;
}
export function weighted(type: RappingIronType): boolean {
  return RAPPING_DATA[type].weighted;
}
export function forTightWeave(type: RappingIronType): boolean {
  return RAPPING_DATA[type].forTightWeave;
}
export function bladeProfile(type: RappingIronType): string {
  return RAPPING_DATA[type].bladeProfile;
}
export function bestUse(type: RappingIronType): string {
  return RAPPING_DATA[type].bestUse;
}
export function rappingIrons(): RappingIronType[] {
  return Object.keys(RAPPING_DATA) as RappingIronType[];
}
