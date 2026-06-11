// Clinch cutter calculator - farriery nail clinch removal tools

export type ClinchCutterType =
  | "buffer_blade_flat"
  | "gouge_scoop_pull"
  | "crease_nail_pull"
  | "combined_pull_cut"
  | "electric_rotary_grind";

const CLINCH_DATA: Record<
  ClinchCutterType,
  {
    cutClean: number;
    hoofSafe: number;
    speedRemove: number;
    controlGrip: number;
    cost: number;
    powered: boolean;
    forOldShoe: boolean;
    edgeStyle: string;
    bestUse: string;
  }
> = {
  buffer_blade_flat: {
    cutClean: 8,
    hoofSafe: 9,
    speedRemove: 7,
    controlGrip: 8,
    cost: 4,
    powered: false,
    forOldShoe: true,
    edgeStyle: "flat_blade_buffer",
    bestUse: "clinch_cut_safe",
  },
  gouge_scoop_pull: {
    cutClean: 7,
    hoofSafe: 7,
    speedRemove: 8,
    controlGrip: 7,
    cost: 4,
    powered: false,
    forOldShoe: true,
    edgeStyle: "scoop_gouge_pull",
    bestUse: "deep_clinch_remove",
  },
  crease_nail_pull: {
    cutClean: 8,
    hoofSafe: 8,
    speedRemove: 9,
    controlGrip: 8,
    cost: 5,
    powered: false,
    forOldShoe: false,
    edgeStyle: "crease_channel_grip",
    bestUse: "nail_head_pull",
  },
  combined_pull_cut: {
    cutClean: 7,
    hoofSafe: 8,
    speedRemove: 8,
    controlGrip: 9,
    cost: 6,
    powered: false,
    forOldShoe: true,
    edgeStyle: "dual_function_head",
    bestUse: "full_shoe_remove",
  },
  electric_rotary_grind: {
    cutClean: 9,
    hoofSafe: 6,
    speedRemove: 10,
    controlGrip: 6,
    cost: 8,
    powered: true,
    forOldShoe: false,
    edgeStyle: "rotary_disc_grind",
    bestUse: "rapid_clinch_grind",
  },
};

export function cutClean(type: ClinchCutterType): number {
  return CLINCH_DATA[type].cutClean;
}
export function hoofSafe(type: ClinchCutterType): number {
  return CLINCH_DATA[type].hoofSafe;
}
export function speedRemove(type: ClinchCutterType): number {
  return CLINCH_DATA[type].speedRemove;
}
export function controlGrip(type: ClinchCutterType): number {
  return CLINCH_DATA[type].controlGrip;
}
export function clinchCost(type: ClinchCutterType): number {
  return CLINCH_DATA[type].cost;
}
export function powered(type: ClinchCutterType): boolean {
  return CLINCH_DATA[type].powered;
}
export function forOldShoe(type: ClinchCutterType): boolean {
  return CLINCH_DATA[type].forOldShoe;
}
export function edgeStyle(type: ClinchCutterType): string {
  return CLINCH_DATA[type].edgeStyle;
}
export function bestUse(type: ClinchCutterType): string {
  return CLINCH_DATA[type].bestUse;
}
export function clinchCutters(): ClinchCutterType[] {
  return Object.keys(CLINCH_DATA) as ClinchCutterType[];
}
