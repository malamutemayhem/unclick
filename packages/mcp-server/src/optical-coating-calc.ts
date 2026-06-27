export type OpticalCoatingType =
  | "anti_reflection_ar_mlar"
  | "high_reflector_hr_dielectric"
  | "bandpass_filter_narrowband"
  | "dichroic_color_selective"
  | "metallic_mirror_aluminum";

const DATA: Record<OpticalCoatingType, {
  performance: number; durability: number; bandwidth: number;
  angleShift: number; ocCost: number; multilayer: boolean;
  forLaser: boolean; material: string; bestUse: string;
}> = {
  anti_reflection_ar_mlar: {
    performance: 8, durability: 8, bandwidth: 9,
    angleShift: 6, ocCost: 2, multilayer: true,
    forLaser: true, material: "mgf2_sio2_tio2_stack",
    bestUse: "camera_lens_ghost_reduction",
  },
  high_reflector_hr_dielectric: {
    performance: 10, durability: 9, bandwidth: 4,
    angleShift: 5, ocCost: 4, multilayer: true,
    forLaser: true, material: "sio2_ta2o5_quarter_wave",
    bestUse: "laser_cavity_end_mirror",
  },
  bandpass_filter_narrowband: {
    performance: 9, durability: 7, bandwidth: 2,
    angleShift: 3, ocCost: 5, multilayer: true,
    forLaser: false, material: "multi_cavity_fabry_perot",
    bestUse: "fluorescence_emission_isolation",
  },
  dichroic_color_selective: {
    performance: 8, durability: 8, bandwidth: 6,
    angleShift: 4, ocCost: 3, multilayer: true,
    forLaser: false, material: "interference_edge_filter",
    bestUse: "projector_rgb_color_separation",
  },
  metallic_mirror_aluminum: {
    performance: 6, durability: 5, bandwidth: 10,
    angleShift: 9, ocCost: 1, multilayer: false,
    forLaser: false, material: "aluminum_with_sio2_overcoat",
    bestUse: "broadband_general_purpose_mirror",
  },
};

const get = (t: OpticalCoatingType) => DATA[t];

export const performance = (t: OpticalCoatingType) => get(t).performance;
export const durability = (t: OpticalCoatingType) => get(t).durability;
export const bandwidth = (t: OpticalCoatingType) => get(t).bandwidth;
export const angleShift = (t: OpticalCoatingType) => get(t).angleShift;
export const ocCost = (t: OpticalCoatingType) => get(t).ocCost;
export const multilayer = (t: OpticalCoatingType) => get(t).multilayer;
export const forLaser = (t: OpticalCoatingType) => get(t).forLaser;
export const material = (t: OpticalCoatingType) => get(t).material;
export const bestUse = (t: OpticalCoatingType) => get(t).bestUse;
export const opticalCoatingTypes = (): OpticalCoatingType[] => Object.keys(DATA) as OpticalCoatingType[];
