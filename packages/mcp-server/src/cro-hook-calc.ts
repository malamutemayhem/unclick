// cro-hook-calc - cro-hook (crochet-knit hybrid) tool types

export type CroHook =
  | "single_end_standard"
  | "double_end_flexible"
  | "cro_knit_long"
  | "tunisian_hook_inline"
  | "interchangeable_set";

const DATA: Record<CroHook, {
  stitchRange: number; controlFine: number; speedWork: number; yarnHold: number;
  cost: number; doubleEnded: boolean; forBeginners: boolean; hookProfile: string; bestUse: string;
}> = {
  single_end_standard:    { stitchRange: 6, controlFine: 8, speedWork: 7, yarnHold: 7, cost: 3, doubleEnded: false, forBeginners: true, hookProfile: "standard_inline_head", bestUse: "general_cro_knit" },
  double_end_flexible:    { stitchRange: 9, controlFine: 7, speedWork: 6, yarnHold: 8, cost: 5, doubleEnded: true, forBeginners: false, hookProfile: "dual_head_flex_cord", bestUse: "double_sided_fabric" },
  cro_knit_long:          { stitchRange: 7, controlFine: 6, speedWork: 8, yarnHold: 9, cost: 4, doubleEnded: false, forBeginners: true, hookProfile: "extended_shaft_hook", bestUse: "wide_blanket_panel" },
  tunisian_hook_inline:   { stitchRange: 8, controlFine: 9, speedWork: 7, yarnHold: 8, cost: 6, doubleEnded: false, forBeginners: false, hookProfile: "inline_tunisian_head", bestUse: "tunisian_stitch_work" },
  interchangeable_set:    { stitchRange: 10, controlFine: 7, speedWork: 6, yarnHold: 7, cost: 9, doubleEnded: true, forBeginners: false, hookProfile: "modular_tip_cable", bestUse: "versatile_multi_size" },
};

const get = (h: CroHook) => DATA[h];
export const stitchRange = (h: CroHook) => get(h).stitchRange;
export const controlFine = (h: CroHook) => get(h).controlFine;
export const speedWork = (h: CroHook) => get(h).speedWork;
export const yarnHold = (h: CroHook) => get(h).yarnHold;
export const hookCost = (h: CroHook) => get(h).cost;
export const doubleEnded = (h: CroHook) => get(h).doubleEnded;
export const forBeginners = (h: CroHook) => get(h).forBeginners;
export const hookProfile = (h: CroHook) => get(h).hookProfile;
export const bestUse = (h: CroHook) => get(h).bestUse;
export const croHooks = (): CroHook[] => Object.keys(DATA) as CroHook[];
