export type LaserCutType =
  | "co2_flatbed_sheet"
  | "fiber_flatbed_metal"
  | "tube_laser_rotary"
  | "fiber_bevel_3d"
  | "ultrafast_femto_micro";

interface LaserCutData {
  cutQuality: number;
  speed: number;
  thickness: number;
  precision: number;
  lcCost: number;
  reflectiveSafe: boolean;
  forTube: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<LaserCutType, LaserCutData> = {
  co2_flatbed_sheet: {
    cutQuality: 9, speed: 8, thickness: 8, precision: 8, lcCost: 6,
    reflectiveSafe: false, forTube: false,
    source: "co2_sealed_slab_rf_excited",
    bestUse: "acrylic_wood_fabric_thin_steel",
  },
  fiber_flatbed_metal: {
    cutQuality: 9, speed: 10, thickness: 9, precision: 9, lcCost: 8,
    reflectiveSafe: true, forTube: false,
    source: "ytterbium_fiber_1070nm_cw",
    bestUse: "mild_stainless_aluminum_sheet",
  },
  tube_laser_rotary: {
    cutQuality: 8, speed: 9, thickness: 7, precision: 9, lcCost: 9,
    reflectiveSafe: true, forTube: true,
    source: "fiber_laser_rotary_chuck_axis",
    bestUse: "tube_profile_section_frame_joint",
  },
  fiber_bevel_3d: {
    cutQuality: 9, speed: 7, thickness: 8, precision: 10, lcCost: 10,
    reflectiveSafe: true, forTube: false,
    source: "fiber_laser_5_axis_bevel_head",
    bestUse: "weld_prep_bevel_countersink_hole",
  },
  ultrafast_femto_micro: {
    cutQuality: 10, speed: 4, thickness: 3, precision: 10, lcCost: 10,
    reflectiveSafe: true, forTube: false,
    source: "femtosecond_ultrashort_pulse",
    bestUse: "medical_stent_electronic_micro",
  },
};

function get(t: LaserCutType): LaserCutData {
  return DATA[t];
}

export const cutQuality = (t: LaserCutType) => get(t).cutQuality;
export const speed = (t: LaserCutType) => get(t).speed;
export const thickness = (t: LaserCutType) => get(t).thickness;
export const precision = (t: LaserCutType) => get(t).precision;
export const lcCost = (t: LaserCutType) => get(t).lcCost;
export const reflectiveSafe = (t: LaserCutType) => get(t).reflectiveSafe;
export const forTube = (t: LaserCutType) => get(t).forTube;
export const source = (t: LaserCutType) => get(t).source;
export const bestUse = (t: LaserCutType) => get(t).bestUse;
export const laserCutTypes = (): LaserCutType[] =>
  Object.keys(DATA) as LaserCutType[];
