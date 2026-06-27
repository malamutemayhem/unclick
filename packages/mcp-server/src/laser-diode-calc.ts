export type LaserDiode =
  | "fabry_perot_fp"
  | "dfb_distributed_feedback"
  | "vcsel_surface_emit"
  | "eml_electro_absorb"
  | "tunable_mems_cavity";

const DATA: Record<LaserDiode, {
  linewidth: number; power: number; modSpeed: number;
  efficiency: number; ldCost: number; singleMode: boolean;
  forDatacenter: boolean; cavity: string; bestUse: string;
}> = {
  fabry_perot_fp: {
    linewidth: 3, power: 7, modSpeed: 5,
    efficiency: 8, ldCost: 2, singleMode: false,
    forDatacenter: false, cavity: "cleaved_facet_multimode",
    bestUse: "short_reach_consumer",
  },
  dfb_distributed_feedback: {
    linewidth: 8, power: 6, modSpeed: 7,
    efficiency: 6, ldCost: 6, singleMode: true,
    forDatacenter: true, cavity: "bragg_grating_single_mode",
    bestUse: "dwdm_telecom_transmitter",
  },
  vcsel_surface_emit: {
    linewidth: 5, power: 4, modSpeed: 9,
    efficiency: 9, ldCost: 3, singleMode: false,
    forDatacenter: true, cavity: "dbr_mirror_vertical",
    bestUse: "400g_parallel_optics",
  },
  eml_electro_absorb: {
    linewidth: 9, power: 5, modSpeed: 10,
    efficiency: 5, ldCost: 8, singleMode: true,
    forDatacenter: true, cavity: "integrated_eam_dfb",
    bestUse: "100g_per_lambda_fr4",
  },
  tunable_mems_cavity: {
    linewidth: 10, power: 5, modSpeed: 6,
    efficiency: 4, ldCost: 9, singleMode: true,
    forDatacenter: false, cavity: "mems_mirror_external",
    bestUse: "reconfigurable_wdm_node",
  },
};

const get = (t: LaserDiode) => DATA[t];

export const linewidth = (t: LaserDiode) => get(t).linewidth;
export const power = (t: LaserDiode) => get(t).power;
export const modSpeed = (t: LaserDiode) => get(t).modSpeed;
export const efficiency = (t: LaserDiode) => get(t).efficiency;
export const ldCost = (t: LaserDiode) => get(t).ldCost;
export const singleMode = (t: LaserDiode) => get(t).singleMode;
export const forDatacenter = (t: LaserDiode) => get(t).forDatacenter;
export const cavity = (t: LaserDiode) => get(t).cavity;
export const bestUse = (t: LaserDiode) => get(t).bestUse;
export const laserDiodes = (): LaserDiode[] => Object.keys(DATA) as LaserDiode[];
