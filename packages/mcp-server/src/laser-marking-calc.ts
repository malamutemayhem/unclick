export type LaserMarkingType =
  | "fiber_laser_metal"
  | "co2_laser_organic"
  | "uv_laser_cold_mark"
  | "green_laser_silicon"
  | "mopa_fiber_color";

interface LaserMarkingData {
  speed: number;
  contrast: number;
  precision: number;
  depth: number;
  lmCost: number;
  nonContact: boolean;
  forMetal: boolean;
  wavelength: string;
  bestUse: string;
}

const DATA: Record<LaserMarkingType, LaserMarkingData> = {
  fiber_laser_metal: {
    speed: 10, contrast: 9, precision: 9, depth: 8, lmCost: 6,
    nonContact: true, forMetal: true,
    wavelength: "1064nm_ytterbium_fiber",
    bestUse: "serial_number_barcode_metal_part",
  },
  co2_laser_organic: {
    speed: 9, contrast: 8, precision: 7, depth: 6, lmCost: 5,
    nonContact: true, forMetal: false,
    wavelength: "10600nm_co2_gas_tube",
    bestUse: "wood_acrylic_paper_label_engrave",
  },
  uv_laser_cold_mark: {
    speed: 7, contrast: 10, precision: 10, depth: 4, lmCost: 9,
    nonContact: true, forMetal: false,
    wavelength: "355nm_third_harmonic_uv",
    bestUse: "pcb_glass_medical_device_fine",
  },
  green_laser_silicon: {
    speed: 8, contrast: 8, precision: 10, depth: 5, lmCost: 8,
    nonContact: true, forMetal: false,
    wavelength: "532nm_second_harmonic_green",
    bestUse: "silicon_wafer_solar_cell_scribe",
  },
  mopa_fiber_color: {
    speed: 9, contrast: 10, precision: 9, depth: 7, lmCost: 8,
    nonContact: true, forMetal: true,
    wavelength: "1064nm_variable_pulse_mopa",
    bestUse: "stainless_color_mark_anodized_al",
  },
};

function get(t: LaserMarkingType): LaserMarkingData {
  return DATA[t];
}

export const speed = (t: LaserMarkingType) => get(t).speed;
export const contrast = (t: LaserMarkingType) => get(t).contrast;
export const precision = (t: LaserMarkingType) => get(t).precision;
export const depth = (t: LaserMarkingType) => get(t).depth;
export const lmCost = (t: LaserMarkingType) => get(t).lmCost;
export const nonContact = (t: LaserMarkingType) => get(t).nonContact;
export const forMetal = (t: LaserMarkingType) => get(t).forMetal;
export const wavelength = (t: LaserMarkingType) => get(t).wavelength;
export const bestUse = (t: LaserMarkingType) => get(t).bestUse;
export const laserMarkingTypes = (): LaserMarkingType[] =>
  Object.keys(DATA) as LaserMarkingType[];
