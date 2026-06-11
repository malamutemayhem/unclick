export type OccupancySensorType =
  | "pir_passive_infrared"
  | "ultrasonic_doppler"
  | "dual_tech_pir_us"
  | "microwave_high_bay"
  | "camera_ai_people_count";

interface OccupancySensorData {
  accuracy: number;
  coverage: number;
  falseTrip: number;
  installEase: number;
  osCost: number;
  lineSight: boolean;
  forOpenPlan: boolean;
  detection: string;
  bestUse: string;
}

const DATA: Record<OccupancySensorType, OccupancySensorData> = {
  pir_passive_infrared: {
    accuracy: 7, coverage: 6, falseTrip: 7, installEase: 9, osCost: 3,
    lineSight: true, forOpenPlan: false,
    detection: "pyroelectric_motion_ir_lens",
    bestUse: "private_office_restroom_closet",
  },
  ultrasonic_doppler: {
    accuracy: 8, coverage: 9, falseTrip: 6, installEase: 8, osCost: 5,
    lineSight: false, forOpenPlan: true,
    detection: "ultrasonic_doppler_air_motion",
    bestUse: "open_office_cubicle_partition",
  },
  dual_tech_pir_us: {
    accuracy: 9, coverage: 8, falseTrip: 9, installEase: 7, osCost: 6,
    lineSight: false, forOpenPlan: true,
    detection: "pir_plus_ultrasonic_and_logic",
    bestUse: "classroom_conference_room",
  },
  microwave_high_bay: {
    accuracy: 8, coverage: 10, falseTrip: 7, installEase: 6, osCost: 7,
    lineSight: false, forOpenPlan: true,
    detection: "microwave_doppler_high_mount",
    bestUse: "warehouse_gym_high_ceiling",
  },
  camera_ai_people_count: {
    accuracy: 10, coverage: 9, falseTrip: 10, installEase: 5, osCost: 9,
    lineSight: true, forOpenPlan: true,
    detection: "ai_vision_thermal_people_count",
    bestUse: "smart_building_analytics_hvac",
  },
};

function get(t: OccupancySensorType): OccupancySensorData {
  return DATA[t];
}

export const accuracy = (t: OccupancySensorType) => get(t).accuracy;
export const coverage = (t: OccupancySensorType) => get(t).coverage;
export const falseTrip = (t: OccupancySensorType) => get(t).falseTrip;
export const installEase = (t: OccupancySensorType) => get(t).installEase;
export const osCost = (t: OccupancySensorType) => get(t).osCost;
export const lineSight = (t: OccupancySensorType) => get(t).lineSight;
export const forOpenPlan = (t: OccupancySensorType) => get(t).forOpenPlan;
export const detection = (t: OccupancySensorType) => get(t).detection;
export const bestUse = (t: OccupancySensorType) => get(t).bestUse;
export const occupancySensorTypes = (): OccupancySensorType[] =>
  Object.keys(DATA) as OccupancySensorType[];
