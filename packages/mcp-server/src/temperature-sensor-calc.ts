export type TemperatureSensorType =
  | "thermocouple_type_k"
  | "rtd_platinum_100"
  | "thermistor_ntc_bead"
  | "infrared_pyrometer"
  | "fiber_optic_distributed";

interface TemperatureSensorData {
  accuracy: number;
  rangeSpan: number;
  responseTime: number;
  stability: number;
  tsCost: number;
  contactless: boolean;
  forHighTemp: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<TemperatureSensorType, TemperatureSensorData> = {
  thermocouple_type_k: {
    accuracy: 6, rangeSpan: 9, responseTime: 8, stability: 6, tsCost: 3,
    contactless: false, forHighTemp: true,
    element: "chromel_alumel_junction_type_k_mineral_insulated",
    bestUse: "furnace_kiln_exhaust_general_industrial_wide_range",
  },
  rtd_platinum_100: {
    accuracy: 10, rangeSpan: 6, responseTime: 5, stability: 10, tsCost: 6,
    contactless: false, forHighTemp: false,
    element: "platinum_wire_wound_or_thin_film_100_ohm_base",
    bestUse: "pharma_food_lab_precision_process_control_loop",
  },
  thermistor_ntc_bead: {
    accuracy: 8, rangeSpan: 3, responseTime: 9, stability: 5, tsCost: 2,
    contactless: false, forHighTemp: false,
    element: "sintered_metal_oxide_bead_negative_temp_coefficient",
    bestUse: "hvac_medical_device_battery_management_narrow_range",
  },
  infrared_pyrometer: {
    accuracy: 7, rangeSpan: 8, responseTime: 10, stability: 7, tsCost: 8,
    contactless: true, forHighTemp: true,
    element: "thermopile_detector_optical_lens_emissivity_adjust",
    bestUse: "moving_target_molten_metal_rotating_kiln_non_contact",
  },
  fiber_optic_distributed: {
    accuracy: 7, rangeSpan: 7, responseTime: 4, stability: 8, tsCost: 10,
    contactless: false, forHighTemp: true,
    element: "fiber_optic_cable_raman_scattering_distributed_temp",
    bestUse: "pipeline_tunnel_cable_tray_fire_detection_continuous",
  },
};

function get(t: TemperatureSensorType): TemperatureSensorData {
  return DATA[t];
}

export const accuracy = (t: TemperatureSensorType) => get(t).accuracy;
export const rangeSpan = (t: TemperatureSensorType) => get(t).rangeSpan;
export const responseTime = (t: TemperatureSensorType) => get(t).responseTime;
export const stability = (t: TemperatureSensorType) => get(t).stability;
export const tsCost = (t: TemperatureSensorType) => get(t).tsCost;
export const contactless = (t: TemperatureSensorType) => get(t).contactless;
export const forHighTemp = (t: TemperatureSensorType) => get(t).forHighTemp;
export const element = (t: TemperatureSensorType) => get(t).element;
export const bestUse = (t: TemperatureSensorType) => get(t).bestUse;
export const temperatureSensorTypes = (): TemperatureSensorType[] =>
  Object.keys(DATA) as TemperatureSensorType[];
