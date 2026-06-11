export type ThermalImagerType =
  | "uncooled_micro"
  | "cooled_mwir"
  | "cooled_lwir"
  | "multispectral_ir"
  | "handheld_therm";

interface ThermalImagerData {
  sensitivity: number;
  throughput: number;
  resolution: number;
  frameRate: number;
  tiCost: number;
  cooled: boolean;
  forScience: boolean;
  imagerConfig: string;
  bestUse: string;
}

const DATA: Record<ThermalImagerType, ThermalImagerData> = {
  uncooled_micro: {
    sensitivity: 6, throughput: 9, resolution: 7, frameRate: 7, tiCost: 4,
    cooled: false, forScience: false,
    imagerConfig: "uncooled_microbolometer_thermal_imager_vox_asi_maintenance_hvac",
    bestUse: "predictive_maint_uncooled_thermal_imager_electrical_mechanical",
  },
  cooled_mwir: {
    sensitivity: 10, throughput: 6, resolution: 9, frameRate: 9, tiCost: 9,
    cooled: true, forScience: true,
    imagerConfig: "cooled_mwir_thermal_imager_insb_detector_high_speed_science",
    bestUse: "rd_science_cooled_mwir_thermal_imager_high_speed_gas_detect",
  },
  cooled_lwir: {
    sensitivity: 9, throughput: 6, resolution: 8, frameRate: 8, tiCost: 10,
    cooled: true, forScience: true,
    imagerConfig: "cooled_lwir_thermal_imager_mct_detector_long_range_surveillance",
    bestUse: "surveillance_cooled_lwir_thermal_imager_long_range_target_id",
  },
  multispectral_ir: {
    sensitivity: 8, throughput: 4, resolution: 8, frameRate: 5, tiCost: 10,
    cooled: true, forScience: true,
    imagerConfig: "multispectral_ir_thermal_imager_filter_wheel_gas_species_map",
    bestUse: "gas_species_multispectral_ir_thermal_imager_filter_band_map",
  },
  handheld_therm: {
    sensitivity: 5, throughput: 10, resolution: 5, frameRate: 6, tiCost: 2,
    cooled: false, forScience: false,
    imagerConfig: "handheld_thermal_imager_point_shoot_building_inspect_spot_temp",
    bestUse: "building_inspect_handheld_thermal_imager_point_shoot_insulation",
  },
};

function get(t: ThermalImagerType): ThermalImagerData {
  return DATA[t];
}

export const sensitivity = (t: ThermalImagerType) => get(t).sensitivity;
export const throughput = (t: ThermalImagerType) => get(t).throughput;
export const resolution = (t: ThermalImagerType) => get(t).resolution;
export const frameRate = (t: ThermalImagerType) => get(t).frameRate;
export const tiCost = (t: ThermalImagerType) => get(t).tiCost;
export const cooled = (t: ThermalImagerType) => get(t).cooled;
export const forScience = (t: ThermalImagerType) => get(t).forScience;
export const imagerConfig = (t: ThermalImagerType) => get(t).imagerConfig;
export const bestUse = (t: ThermalImagerType) => get(t).bestUse;
export const thermalImagerTypes = (): ThermalImagerType[] =>
  Object.keys(DATA) as ThermalImagerType[];
