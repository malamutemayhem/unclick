export type PatchPanelType =
  | "cat6_24port_1u"
  | "fiber_lc_12port"
  | "keystone_blank_modular"
  | "coax_bnc_16port"
  | "feed_through_rj45";

const DATA: Record<PatchPanelType, {
  portDensity: number; signalQuality: number; installEase: number;
  durability: number; panelCost: number; modular: boolean;
  forFiber: boolean; connectorType: string; bestUse: string;
}> = {
  cat6_24port_1u: { portDensity: 8, signalQuality: 8, installEase: 7, durability: 8, panelCost: 4, modular: false, forFiber: false, connectorType: "rj45_110_punch_down", bestUse: "server_room_copper_patch" },
  fiber_lc_12port: { portDensity: 6, signalQuality: 10, installEase: 5, durability: 7, panelCost: 7, modular: false, forFiber: true, connectorType: "lc_duplex_adapter", bestUse: "fiber_distribution_panel" },
  keystone_blank_modular: { portDensity: 7, signalQuality: 7, installEase: 10, durability: 7, panelCost: 3, modular: true, forFiber: false, connectorType: "keystone_snap_in", bestUse: "mixed_media_custom_panel" },
  coax_bnc_16port: { portDensity: 5, signalQuality: 7, installEase: 6, durability: 9, panelCost: 5, modular: false, forFiber: false, connectorType: "bnc_bulkhead_female", bestUse: "cctv_video_distribution" },
  feed_through_rj45: { portDensity: 8, signalQuality: 8, installEase: 9, durability: 6, panelCost: 5, modular: false, forFiber: false, connectorType: "rj45_coupler_through", bestUse: "quick_patch_no_punch" },
};

const get = (t: PatchPanelType) => DATA[t];

export const portDensity = (t: PatchPanelType) => get(t).portDensity;
export const signalQuality = (t: PatchPanelType) => get(t).signalQuality;
export const installEase = (t: PatchPanelType) => get(t).installEase;
export const durability = (t: PatchPanelType) => get(t).durability;
export const panelCost = (t: PatchPanelType) => get(t).panelCost;
export const modular = (t: PatchPanelType) => get(t).modular;
export const forFiber = (t: PatchPanelType) => get(t).forFiber;
export const connectorType = (t: PatchPanelType) => get(t).connectorType;
export const bestUse = (t: PatchPanelType) => get(t).bestUse;
export const patchPanels = (): PatchPanelType[] => Object.keys(DATA) as PatchPanelType[];
