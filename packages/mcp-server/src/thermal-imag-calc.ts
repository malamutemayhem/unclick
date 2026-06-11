export type ThermalImagType =
  | "handheld_spot_survey"
  | "fixed_mount_continuous"
  | "drone_aerial_survey"
  | "cooled_mwir_research"
  | "ot_fever_screening";

interface ThermalImagData {
  resolution: number;
  sensitivity: number;
  range: number;
  portability: number;
  tiCost: number;
  cooled: boolean;
  forPredictive: boolean;
  detector: string;
  bestUse: string;
}

const DATA: Record<ThermalImagType, ThermalImagData> = {
  handheld_spot_survey: {
    resolution: 7, sensitivity: 8, range: 7, portability: 10, tiCost: 5,
    cooled: false, forPredictive: true,
    detector: "uncooled_vox_microbolometer",
    bestUse: "electrical_panel_bearing_motor",
  },
  fixed_mount_continuous: {
    resolution: 8, sensitivity: 9, range: 8, portability: 3, tiCost: 7,
    cooled: false, forPredictive: true,
    detector: "uncooled_asi_fixed_mount_24_7",
    bestUse: "kiln_furnace_conveyor_hot_spot",
  },
  drone_aerial_survey: {
    resolution: 8, sensitivity: 8, range: 10, portability: 8, tiCost: 8,
    cooled: false, forPredictive: false,
    detector: "lightweight_vox_gimbal_stabilized",
    bestUse: "solar_farm_roof_power_line_scan",
  },
  cooled_mwir_research: {
    resolution: 10, sensitivity: 10, range: 9, portability: 4, tiCost: 10,
    cooled: true, forPredictive: false,
    detector: "insb_mwir_stirling_cooled",
    bestUse: "rnd_gas_leak_military_science",
  },
  ot_fever_screening: {
    resolution: 6, sensitivity: 9, range: 5, portability: 7, tiCost: 4,
    cooled: false, forPredictive: false,
    detector: "uncooled_vox_blackbody_reference",
    bestUse: "body_temp_screening_access_gate",
  },
};

function get(t: ThermalImagType): ThermalImagData {
  return DATA[t];
}

export const resolution = (t: ThermalImagType) => get(t).resolution;
export const sensitivity = (t: ThermalImagType) => get(t).sensitivity;
export const range = (t: ThermalImagType) => get(t).range;
export const portability = (t: ThermalImagType) => get(t).portability;
export const tiCost = (t: ThermalImagType) => get(t).tiCost;
export const cooled = (t: ThermalImagType) => get(t).cooled;
export const forPredictive = (t: ThermalImagType) => get(t).forPredictive;
export const detector = (t: ThermalImagType) => get(t).detector;
export const bestUse = (t: ThermalImagType) => get(t).bestUse;
export const thermalImagTypes = (): ThermalImagType[] =>
  Object.keys(DATA) as ThermalImagType[];
