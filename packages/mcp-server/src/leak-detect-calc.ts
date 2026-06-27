export type LeakDetectType =
  | "rope_cable_sensor"
  | "spot_probe_point"
  | "acoustic_pipe_monitor"
  | "flow_anomaly_software"
  | "infrared_thermal_scan";

interface LeakDetectData {
  sensitivity: number;
  coverage: number;
  localization: number;
  response: number;
  ldCost: number;
  continuous: boolean;
  forDataCenter: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<LeakDetectType, LeakDetectData> = {
  rope_cable_sensor: {
    sensitivity: 9, coverage: 8, localization: 9, response: 9, ldCost: 6,
    continuous: true, forDataCenter: true,
    method: "conductive_polymer_rope_zone_alarm",
    bestUse: "data_center_raised_floor_perimeter",
  },
  spot_probe_point: {
    sensitivity: 8, coverage: 4, localization: 10, response: 10, ldCost: 3,
    continuous: true, forDataCenter: true,
    method: "electrode_probe_point_contact",
    bestUse: "mechanical_room_drip_pan_valve",
  },
  acoustic_pipe_monitor: {
    sensitivity: 7, coverage: 10, localization: 7, response: 6, ldCost: 8,
    continuous: true, forDataCenter: false,
    method: "acoustic_correlator_pipe_clamp",
    bestUse: "municipal_water_main_buried",
  },
  flow_anomaly_software: {
    sensitivity: 6, coverage: 10, localization: 5, response: 7, ldCost: 7,
    continuous: true, forDataCenter: false,
    method: "flow_meter_ml_anomaly_detect",
    bestUse: "campus_building_water_audit",
  },
  infrared_thermal_scan: {
    sensitivity: 7, coverage: 7, localization: 8, response: 4, ldCost: 5,
    continuous: false, forDataCenter: false,
    method: "ir_camera_thermal_moisture_scan",
    bestUse: "roof_envelope_moisture_survey",
  },
};

function get(t: LeakDetectType): LeakDetectData {
  return DATA[t];
}

export const sensitivity = (t: LeakDetectType) => get(t).sensitivity;
export const coverage = (t: LeakDetectType) => get(t).coverage;
export const localization = (t: LeakDetectType) => get(t).localization;
export const response = (t: LeakDetectType) => get(t).response;
export const ldCost = (t: LeakDetectType) => get(t).ldCost;
export const continuous = (t: LeakDetectType) => get(t).continuous;
export const forDataCenter = (t: LeakDetectType) => get(t).forDataCenter;
export const method = (t: LeakDetectType) => get(t).method;
export const bestUse = (t: LeakDetectType) => get(t).bestUse;
export const leakDetectTypes = (): LeakDetectType[] =>
  Object.keys(DATA) as LeakDetectType[];
