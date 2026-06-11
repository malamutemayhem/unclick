export type FiberOpticCableType =
  | "single_mode_os2"
  | "multimode_om3"
  | "multimode_om4"
  | "plastic_optical_pof"
  | "armored_outdoor_sm";

const DATA: Record<FiberOpticCableType, {
  bandwidth: number; maxDistance: number; durability: number;
  installEase: number; cableCost: number; singleMode: boolean;
  forOutdoor: boolean; coreType: string; bestUse: string;
}> = {
  single_mode_os2: { bandwidth: 10, maxDistance: 10, durability: 6, installEase: 4, cableCost: 6, singleMode: true, forOutdoor: false, coreType: "9_125_glass_core", bestUse: "long_haul_telecom_trunk" },
  multimode_om3: { bandwidth: 7, maxDistance: 5, durability: 6, installEase: 7, cableCost: 4, singleMode: false, forOutdoor: false, coreType: "50_125_laser_optimized", bestUse: "data_center_10g_link" },
  multimode_om4: { bandwidth: 8, maxDistance: 6, durability: 6, installEase: 7, cableCost: 5, singleMode: false, forOutdoor: false, coreType: "50_125_bend_insensitive", bestUse: "data_center_40g_link" },
  plastic_optical_pof: { bandwidth: 3, maxDistance: 2, durability: 8, installEase: 10, cableCost: 2, singleMode: false, forOutdoor: false, coreType: "1mm_pmma_plastic", bestUse: "automotive_media_link" },
  armored_outdoor_sm: { bandwidth: 10, maxDistance: 10, durability: 10, installEase: 3, cableCost: 9, singleMode: true, forOutdoor: true, coreType: "9_125_steel_armor", bestUse: "direct_burial_backbone" },
};

const get = (t: FiberOpticCableType) => DATA[t];

export const bandwidth = (t: FiberOpticCableType) => get(t).bandwidth;
export const maxDistance = (t: FiberOpticCableType) => get(t).maxDistance;
export const durability = (t: FiberOpticCableType) => get(t).durability;
export const installEase = (t: FiberOpticCableType) => get(t).installEase;
export const cableCost = (t: FiberOpticCableType) => get(t).cableCost;
export const singleMode = (t: FiberOpticCableType) => get(t).singleMode;
export const forOutdoor = (t: FiberOpticCableType) => get(t).forOutdoor;
export const coreType = (t: FiberOpticCableType) => get(t).coreType;
export const bestUse = (t: FiberOpticCableType) => get(t).bestUse;
export const fiberOpticCables = (): FiberOpticCableType[] => Object.keys(DATA) as FiberOpticCableType[];
