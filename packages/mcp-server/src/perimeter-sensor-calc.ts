export type PerimeterSensorType =
  | "microwave_volumetric"
  | "infrared_beam_active"
  | "fiber_optic_fence"
  | "buried_cable_rf"
  | "lidar_laser_scan";

interface PerimeterSensorData {
  range: number;
  falseAlarm: number;
  covertness: number;
  weather: number;
  psCost: number;
  invisible: boolean;
  forHighSecurity: boolean;
  detection: string;
  bestUse: string;
}

const DATA: Record<PerimeterSensorType, PerimeterSensorData> = {
  microwave_volumetric: {
    range: 8, falseAlarm: 6, covertness: 7, weather: 7, psCost: 6,
    invisible: true, forHighSecurity: false,
    detection: "doppler_microwave_field",
    bestUse: "open_field_perimeter_zone",
  },
  infrared_beam_active: {
    range: 7, falseAlarm: 7, covertness: 5, weather: 6, psCost: 4,
    invisible: false, forHighSecurity: false,
    detection: "active_ir_beam_break_multi",
    bestUse: "fence_line_property_boundary",
  },
  fiber_optic_fence: {
    range: 10, falseAlarm: 8, covertness: 9, weather: 9, psCost: 8,
    invisible: true, forHighSecurity: true,
    detection: "distributed_acoustic_sensing",
    bestUse: "military_critical_infra_fence",
  },
  buried_cable_rf: {
    range: 9, falseAlarm: 7, covertness: 10, weather: 10, psCost: 9,
    invisible: true, forHighSecurity: true,
    detection: "leaky_coax_rf_field_buried",
    bestUse: "covert_perimeter_no_visible",
  },
  lidar_laser_scan: {
    range: 8, falseAlarm: 9, covertness: 6, weather: 5, psCost: 10,
    invisible: false, forHighSecurity: true,
    detection: "3d_lidar_point_cloud_scan",
    bestUse: "airport_data_center_analytic",
  },
};

function get(t: PerimeterSensorType): PerimeterSensorData {
  return DATA[t];
}

export const range = (t: PerimeterSensorType) => get(t).range;
export const falseAlarm = (t: PerimeterSensorType) => get(t).falseAlarm;
export const covertness = (t: PerimeterSensorType) => get(t).covertness;
export const weather = (t: PerimeterSensorType) => get(t).weather;
export const psCost = (t: PerimeterSensorType) => get(t).psCost;
export const invisible = (t: PerimeterSensorType) => get(t).invisible;
export const forHighSecurity = (t: PerimeterSensorType) => get(t).forHighSecurity;
export const detection = (t: PerimeterSensorType) => get(t).detection;
export const bestUse = (t: PerimeterSensorType) => get(t).bestUse;
export const perimeterSensorTypes = (): PerimeterSensorType[] =>
  Object.keys(DATA) as PerimeterSensorType[];
