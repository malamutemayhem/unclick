export type LaserType =
  | "edge_emitting_fp"
  | "dfb_single_mode"
  | "vcsel_surface_emit"
  | "fiber_erbium_doped"
  | "qcl_mid_infrared";

const DATA: Record<LaserType, {
  power: number; linewidth: number; efficiency: number;
  modSpeed: number; lsCost: number; singleMode: boolean;
  forTelecom: boolean; cavity: string; bestUse: string;
}> = {
  edge_emitting_fp: {
    power: 7, linewidth: 3, efficiency: 6,
    modSpeed: 6, lsCost: 2, singleMode: false,
    forTelecom: false, cavity: "fabry_perot_cleaved_facet",
    bestUse: "cd_dvd_optical_pickup",
  },
  dfb_single_mode: {
    power: 6, linewidth: 9, efficiency: 7,
    modSpeed: 9, lsCost: 6, singleMode: true,
    forTelecom: true, cavity: "distributed_feedback_grating",
    bestUse: "dwdm_long_haul_transmit",
  },
  vcsel_surface_emit: {
    power: 4, linewidth: 5, efficiency: 9,
    modSpeed: 8, lsCost: 3, singleMode: false,
    forTelecom: false, cavity: "dbr_mirror_vertical_cavity",
    bestUse: "datacenter_multimode_transceive",
  },
  fiber_erbium_doped: {
    power: 10, linewidth: 10, efficiency: 5,
    modSpeed: 3, lsCost: 8, singleMode: true,
    forTelecom: true, cavity: "ring_cavity_erbium_gain",
    bestUse: "coherent_lidar_narrow_seed",
  },
  qcl_mid_infrared: {
    power: 8, linewidth: 7, efficiency: 4,
    modSpeed: 5, lsCost: 9, singleMode: true,
    forTelecom: false, cavity: "intersubband_cascade_well",
    bestUse: "gas_spectroscopy_methane_detect",
  },
};

const get = (t: LaserType) => DATA[t];

export const power = (t: LaserType) => get(t).power;
export const linewidth = (t: LaserType) => get(t).linewidth;
export const efficiency = (t: LaserType) => get(t).efficiency;
export const modSpeed = (t: LaserType) => get(t).modSpeed;
export const lsCost = (t: LaserType) => get(t).lsCost;
export const singleMode = (t: LaserType) => get(t).singleMode;
export const forTelecom = (t: LaserType) => get(t).forTelecom;
export const cavity = (t: LaserType) => get(t).cavity;
export const bestUse = (t: LaserType) => get(t).bestUse;
export const laserTypes = (): LaserType[] => Object.keys(DATA) as LaserType[];
