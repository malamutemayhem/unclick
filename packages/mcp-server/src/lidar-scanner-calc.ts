export type LidarScanner =
  | "mems_mirror_scan"
  | "spinning_multi_ch"
  | "flash_array_spad"
  | "opa_solid_state"
  | "fmcw_coherent";

const DATA: Record<LidarScanner, {
  range: number; pointRate: number; fov: number;
  resolution: number; scannerCost: number; solidState: boolean;
  forAuto: boolean; detection: string; bestUse: string;
}> = {
  mems_mirror_scan: {
    range: 7, pointRate: 7, fov: 6,
    resolution: 7, scannerCost: 5, solidState: false,
    forAuto: true, detection: "single_photon_tof",
    bestUse: "adas_forward_facing",
  },
  spinning_multi_ch: {
    range: 9, pointRate: 10, fov: 10,
    resolution: 8, scannerCost: 9, solidState: false,
    forAuto: true, detection: "multi_channel_apd_tof",
    bestUse: "l4_rooftop_360_scan",
  },
  flash_array_spad: {
    range: 4, pointRate: 5, fov: 5,
    resolution: 9, scannerCost: 6, solidState: true,
    forAuto: false, detection: "spad_array_tof",
    bestUse: "short_range_gesture",
  },
  opa_solid_state: {
    range: 6, pointRate: 8, fov: 7,
    resolution: 6, scannerCost: 4, solidState: true,
    forAuto: true, detection: "phased_array_beam",
    bestUse: "mass_market_adas_embed",
  },
  fmcw_coherent: {
    range: 8, pointRate: 6, fov: 4,
    resolution: 10, scannerCost: 8, solidState: true,
    forAuto: true, detection: "coherent_chirped_beat",
    bestUse: "velocity_plus_range_map",
  },
};

const get = (t: LidarScanner) => DATA[t];

export const range = (t: LidarScanner) => get(t).range;
export const pointRate = (t: LidarScanner) => get(t).pointRate;
export const fov = (t: LidarScanner) => get(t).fov;
export const resolution = (t: LidarScanner) => get(t).resolution;
export const scannerCost = (t: LidarScanner) => get(t).scannerCost;
export const solidState = (t: LidarScanner) => get(t).solidState;
export const forAuto = (t: LidarScanner) => get(t).forAuto;
export const detection = (t: LidarScanner) => get(t).detection;
export const bestUse = (t: LidarScanner) => get(t).bestUse;
export const lidarScanners = (): LidarScanner[] => Object.keys(DATA) as LidarScanner[];
