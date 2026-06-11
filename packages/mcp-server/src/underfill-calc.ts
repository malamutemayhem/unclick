export type UnderfillType =
  | "capillary_flow_epoxy"
  | "no_flow_pre_apply"
  | "reworkable_thermo"
  | "corner_bond_dot"
  | "molded_underfill_muf";

const DATA: Record<UnderfillType, {
  flowability: number; reliability: number; cureSpeed: number;
  reworkability: number; fillCost: number; reworkable: boolean;
  preApplied: boolean; cureMethod: string; bestUse: string;
}> = {
  capillary_flow_epoxy: { flowability: 10, reliability: 9, cureSpeed: 6, reworkability: 2, fillCost: 4, reworkable: false, preApplied: false, cureMethod: "thermal_oven_cure", bestUse: "bga_flip_chip_fill" },
  no_flow_pre_apply: { flowability: 3, reliability: 8, cureSpeed: 9, reworkability: 3, fillCost: 6, reworkable: false, preApplied: true, cureMethod: "reflow_self_cure", bestUse: "high_volume_csp_fill" },
  reworkable_thermo: { flowability: 8, reliability: 6, cureSpeed: 5, reworkability: 10, fillCost: 7, reworkable: true, preApplied: false, cureMethod: "thermal_reversible", bestUse: "prototype_rework_fill" },
  corner_bond_dot: { flowability: 2, reliability: 5, cureSpeed: 10, reworkability: 8, fillCost: 3, reworkable: true, preApplied: false, cureMethod: "uv_snap_cure", bestUse: "quick_corner_reinforce" },
  molded_underfill_muf: { flowability: 4, reliability: 10, cureSpeed: 7, reworkability: 1, fillCost: 8, reworkable: false, preApplied: false, cureMethod: "transfer_mold_cure", bestUse: "wafer_level_package_fill" },
};

const get = (t: UnderfillType) => DATA[t];

export const flowability = (t: UnderfillType) => get(t).flowability;
export const reliability = (t: UnderfillType) => get(t).reliability;
export const cureSpeed = (t: UnderfillType) => get(t).cureSpeed;
export const reworkability = (t: UnderfillType) => get(t).reworkability;
export const fillCost = (t: UnderfillType) => get(t).fillCost;
export const reworkable = (t: UnderfillType) => get(t).reworkable;
export const preApplied = (t: UnderfillType) => get(t).preApplied;
export const cureMethod = (t: UnderfillType) => get(t).cureMethod;
export const bestUse = (t: UnderfillType) => get(t).bestUse;
export const underfills = (): UnderfillType[] => Object.keys(DATA) as UnderfillType[];
