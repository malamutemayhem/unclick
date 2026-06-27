export type LaserSource =
  | "dfb_telecom"
  | "vcsel_850nm"
  | "tunable_ecl"
  | "quantum_dot"
  | "hybrid_iii_v_si";

const DATA: Record<LaserSource, {
  linewidth: number; outputPower: number; wallPlug: number;
  tempStability: number; laserCost: number; directMod: boolean;
  forCoherent: boolean; cavity: string; bestUse: string;
}> = {
  dfb_telecom: {
    linewidth: 7, outputPower: 7, wallPlug: 7,
    tempStability: 8, laserCost: 5, directMod: true,
    forCoherent: false, cavity: "distributed_feedback_grating",
    bestUse: "cwdm_direct_detect",
  },
  vcsel_850nm: {
    linewidth: 5, outputPower: 4, wallPlug: 9,
    tempStability: 6, laserCost: 3, directMod: true,
    forCoherent: false, cavity: "vertical_dbr_mirror",
    bestUse: "short_reach_multimode",
  },
  tunable_ecl: {
    linewidth: 9, outputPower: 8, wallPlug: 5,
    tempStability: 7, laserCost: 8, directMod: false,
    forCoherent: true, cavity: "external_cavity_grating",
    bestUse: "coherent_pluggable_zr",
  },
  quantum_dot: {
    linewidth: 6, outputPower: 6, wallPlug: 8,
    tempStability: 9, laserCost: 7, directMod: true,
    forCoherent: false, cavity: "self_assembled_dot",
    bestUse: "uncooled_datacenter",
  },
  hybrid_iii_v_si: {
    linewidth: 8, outputPower: 7, wallPlug: 6,
    tempStability: 7, laserCost: 9, directMod: false,
    forCoherent: true, cavity: "bonded_iii_v_on_soi",
    bestUse: "silicon_photonic_engine",
  },
};

const get = (t: LaserSource) => DATA[t];

export const linewidth = (t: LaserSource) => get(t).linewidth;
export const outputPower = (t: LaserSource) => get(t).outputPower;
export const wallPlug = (t: LaserSource) => get(t).wallPlug;
export const tempStability = (t: LaserSource) => get(t).tempStability;
export const laserCost = (t: LaserSource) => get(t).laserCost;
export const directMod = (t: LaserSource) => get(t).directMod;
export const forCoherent = (t: LaserSource) => get(t).forCoherent;
export const cavity = (t: LaserSource) => get(t).cavity;
export const bestUse = (t: LaserSource) => get(t).bestUse;
export const laserSources = (): LaserSource[] => Object.keys(DATA) as LaserSource[];
