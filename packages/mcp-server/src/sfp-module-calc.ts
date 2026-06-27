export type SfpModuleType =
  | "sfp_1g_copper_rj45"
  | "sfp_1g_sx_multimode"
  | "sfp_plus_10g_sr"
  | "sfp_plus_10g_lr"
  | "sfp28_25g_sr";

const DATA: Record<SfpModuleType, {
  dataRate: number; reachDistance: number; powerDraw: number;
  compatibility: number; moduleCost: number; fiberRequired: boolean;
  hotSwap: boolean; formFactor: string; bestUse: string;
}> = {
  sfp_1g_copper_rj45: { dataRate: 3, reachDistance: 4, powerDraw: 6, compatibility: 10, moduleCost: 3, fiberRequired: false, hotSwap: true, formFactor: "sfp_rj45_copper", bestUse: "legacy_1g_copper_uplink" },
  sfp_1g_sx_multimode: { dataRate: 3, reachDistance: 5, powerDraw: 4, compatibility: 8, moduleCost: 4, fiberRequired: true, hotSwap: true, formFactor: "sfp_lc_duplex", bestUse: "building_1g_fiber_link" },
  sfp_plus_10g_sr: { dataRate: 7, reachDistance: 5, powerDraw: 5, compatibility: 9, moduleCost: 5, fiberRequired: true, hotSwap: true, formFactor: "sfp_plus_lc_mm", bestUse: "datacenter_10g_short_reach" },
  sfp_plus_10g_lr: { dataRate: 7, reachDistance: 9, powerDraw: 7, compatibility: 8, moduleCost: 8, fiberRequired: true, hotSwap: true, formFactor: "sfp_plus_lc_sm", bestUse: "campus_10g_long_haul" },
  sfp28_25g_sr: { dataRate: 10, reachDistance: 4, powerDraw: 8, compatibility: 6, moduleCost: 9, fiberRequired: true, hotSwap: true, formFactor: "sfp28_lc_mm", bestUse: "spine_leaf_25g_fabric" },
};

const get = (t: SfpModuleType) => DATA[t];

export const dataRate = (t: SfpModuleType) => get(t).dataRate;
export const reachDistance = (t: SfpModuleType) => get(t).reachDistance;
export const powerDraw = (t: SfpModuleType) => get(t).powerDraw;
export const compatibility = (t: SfpModuleType) => get(t).compatibility;
export const moduleCost = (t: SfpModuleType) => get(t).moduleCost;
export const fiberRequired = (t: SfpModuleType) => get(t).fiberRequired;
export const hotSwap = (t: SfpModuleType) => get(t).hotSwap;
export const formFactor = (t: SfpModuleType) => get(t).formFactor;
export const bestUse = (t: SfpModuleType) => get(t).bestUse;
export const sfpModules = (): SfpModuleType[] => Object.keys(DATA) as SfpModuleType[];
