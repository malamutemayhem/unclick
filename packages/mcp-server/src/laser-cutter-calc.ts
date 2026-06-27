export type LaserCutterType =
  | "co2_flatbed"
  | "fiber_flatbed"
  | "fiber_tube"
  | "direct_diode"
  | "ultrafast_pulsed";

interface LaserCutterData {
  cutSpeed: number;
  precision: number;
  materialRange: number;
  operatingCost: number;
  lcCost: number;
  fiberLaser: boolean;
  forMetal: boolean;
  source: string;
  bestUse: string;
}

const DATA: Record<LaserCutterType, LaserCutterData> = {
  co2_flatbed: {
    cutSpeed: 7, precision: 8, materialRange: 10, operatingCost: 6, lcCost: 6,
    fiberLaser: false, forMetal: true,
    source: "co2_gas_tube_10_6um_wavelength_mirror_beam_delivery_path",
    bestUse: "acrylic_wood_fabric_non_metal_cutting_engraving_signage",
  },
  fiber_flatbed: {
    cutSpeed: 10, precision: 9, materialRange: 7, operatingCost: 9, lcCost: 8,
    fiberLaser: true, forMetal: true,
    source: "ytterbium_doped_fiber_1um_wavelength_diode_pumped_solid",
    bestUse: "sheet_metal_fabrication_steel_aluminum_brass_production",
  },
  fiber_tube: {
    cutSpeed: 9, precision: 9, materialRange: 5, operatingCost: 8, lcCost: 9,
    fiberLaser: true, forMetal: true,
    source: "fiber_laser_rotary_chuck_tube_profile_3d_cutting_head",
    bestUse: "tube_pipe_structural_section_cutting_furniture_frame_auto",
  },
  direct_diode: {
    cutSpeed: 8, precision: 7, materialRange: 6, operatingCost: 10, lcCost: 7,
    fiberLaser: false, forMetal: true,
    source: "direct_diode_array_high_wall_plug_efficiency_beam_combine",
    bestUse: "thin_sheet_metal_high_efficiency_low_operating_cost_cut",
  },
  ultrafast_pulsed: {
    cutSpeed: 4, precision: 10, materialRange: 9, operatingCost: 4, lcCost: 10,
    fiberLaser: true, forMetal: true,
    source: "femtosecond_picosecond_pulse_cold_ablation_no_heat_zone",
    bestUse: "medical_device_semiconductor_glass_ceramic_micro_machine",
  },
};

function get(t: LaserCutterType): LaserCutterData {
  return DATA[t];
}

export const cutSpeed = (t: LaserCutterType) => get(t).cutSpeed;
export const precision = (t: LaserCutterType) => get(t).precision;
export const materialRange = (t: LaserCutterType) => get(t).materialRange;
export const operatingCost = (t: LaserCutterType) => get(t).operatingCost;
export const lcCost = (t: LaserCutterType) => get(t).lcCost;
export const fiberLaser = (t: LaserCutterType) => get(t).fiberLaser;
export const forMetal = (t: LaserCutterType) => get(t).forMetal;
export const source = (t: LaserCutterType) => get(t).source;
export const bestUse = (t: LaserCutterType) => get(t).bestUse;
export const laserCutterTypes = (): LaserCutterType[] =>
  Object.keys(DATA) as LaserCutterType[];
