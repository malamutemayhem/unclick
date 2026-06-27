export type LayerBuildupType =
  | "foil_lamination_std"
  | "sequential_buildup"
  | "any_layer_hdi"
  | "rigid_flex_combo"
  | "coreless_substrate";

const DATA: Record<LayerBuildupType, {
  layerCount: number; viaFlexibility: number; thickness: number;
  yieldRate: number; buildCost: number; microvia: boolean;
  forMobile: boolean; processType: string; bestUse: string;
}> = {
  foil_lamination_std: { layerCount: 5, viaFlexibility: 4, thickness: 5, yieldRate: 9, buildCost: 2, microvia: false, forMobile: false, processType: "press_drill_plate", bestUse: "standard_multilayer_board" },
  sequential_buildup: { layerCount: 7, viaFlexibility: 7, thickness: 7, yieldRate: 7, buildCost: 6, microvia: true, forMobile: false, processType: "core_plus_buildup", bestUse: "hdi_bga_fine_pitch" },
  any_layer_hdi: { layerCount: 10, viaFlexibility: 10, thickness: 9, yieldRate: 5, buildCost: 10, microvia: true, forMobile: true, processType: "all_via_in_pad_stack", bestUse: "smartphone_wearable_pcb" },
  rigid_flex_combo: { layerCount: 6, viaFlexibility: 6, thickness: 6, yieldRate: 6, buildCost: 8, microvia: false, forMobile: true, processType: "rigid_flex_laminate", bestUse: "folding_device_camera" },
  coreless_substrate: { layerCount: 8, viaFlexibility: 9, thickness: 10, yieldRate: 4, buildCost: 9, microvia: true, forMobile: true, processType: "carrier_remove_buildup", bestUse: "ic_substrate_interposer" },
};

const get = (t: LayerBuildupType) => DATA[t];

export const layerCount = (t: LayerBuildupType) => get(t).layerCount;
export const viaFlexibility = (t: LayerBuildupType) => get(t).viaFlexibility;
export const thickness = (t: LayerBuildupType) => get(t).thickness;
export const yieldRate = (t: LayerBuildupType) => get(t).yieldRate;
export const buildCost = (t: LayerBuildupType) => get(t).buildCost;
export const microvia = (t: LayerBuildupType) => get(t).microvia;
export const forMobile = (t: LayerBuildupType) => get(t).forMobile;
export const processType = (t: LayerBuildupType) => get(t).processType;
export const bestUse = (t: LayerBuildupType) => get(t).bestUse;
export const layerBuildups = (): LayerBuildupType[] => Object.keys(DATA) as LayerBuildupType[];
