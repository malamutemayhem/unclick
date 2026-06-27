export type JHookType =
  | "standard_galv_steel"
  | "wide_mouth_multi"
  | "clip_on_beam_clamp"
  | "threaded_rod_mount"
  | "batwing_ceiling_snap";

const DATA: Record<JHookType, {
  cableCapacity: number; installSpeed: number; loadRating: number;
  versatility: number; hookCost: number; toolFree: boolean;
  forCeiling: boolean; mountMethod: string; bestUse: string;
}> = {
  standard_galv_steel: { cableCapacity: 6, installSpeed: 7, loadRating: 7, versatility: 7, hookCost: 2, toolFree: false, forCeiling: false, mountMethod: "screw_anchor_wall", bestUse: "general_cable_support" },
  wide_mouth_multi: { cableCapacity: 10, installSpeed: 7, loadRating: 8, versatility: 8, hookCost: 4, toolFree: false, forCeiling: false, mountMethod: "screw_stud_mount", bestUse: "high_count_bundle_route" },
  clip_on_beam_clamp: { cableCapacity: 6, installSpeed: 10, loadRating: 6, versatility: 6, hookCost: 3, toolFree: true, forCeiling: true, mountMethod: "beam_flange_clip", bestUse: "steel_beam_quick_hang" },
  threaded_rod_mount: { cableCapacity: 7, installSpeed: 5, loadRating: 9, versatility: 9, hookCost: 4, toolFree: false, forCeiling: true, mountMethod: "threaded_rod_nut", bestUse: "ceiling_grid_drop_run" },
  batwing_ceiling_snap: { cableCapacity: 5, installSpeed: 10, loadRating: 5, versatility: 5, hookCost: 2, toolFree: true, forCeiling: true, mountMethod: "ceiling_tile_snap", bestUse: "drop_ceiling_quick_clip" },
};

const get = (t: JHookType) => DATA[t];

export const cableCapacity = (t: JHookType) => get(t).cableCapacity;
export const installSpeed = (t: JHookType) => get(t).installSpeed;
export const loadRating = (t: JHookType) => get(t).loadRating;
export const versatility = (t: JHookType) => get(t).versatility;
export const hookCost = (t: JHookType) => get(t).hookCost;
export const toolFree = (t: JHookType) => get(t).toolFree;
export const forCeiling = (t: JHookType) => get(t).forCeiling;
export const mountMethod = (t: JHookType) => get(t).mountMethod;
export const bestUse = (t: JHookType) => get(t).bestUse;
export const jHooks = (): JHookType[] => Object.keys(DATA) as JHookType[];
