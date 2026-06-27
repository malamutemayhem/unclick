export type ParkingGuidanceType =
  | "ultrasonic_ceiling_sensor"
  | "camera_vision_ai"
  | "magnetic_ground_sensor"
  | "led_indicator_only"
  | "radar_overhead_count";

interface ParkingGuidanceData {
  accuracy: number;
  coverage: number;
  installEase: number;
  analytics: number;
  pgCost: number;
  realTime: boolean;
  forIndoor: boolean;
  detection: string;
  bestUse: string;
}

const DATA: Record<ParkingGuidanceType, ParkingGuidanceData> = {
  ultrasonic_ceiling_sensor: {
    accuracy: 8, coverage: 7, installEase: 7, analytics: 6, pgCost: 6,
    realTime: true, forIndoor: true,
    detection: "ultrasonic_per_space_ceiling",
    bestUse: "parking_garage_multi_level",
  },
  camera_vision_ai: {
    accuracy: 10, coverage: 10, installEase: 6, analytics: 10, pgCost: 8,
    realTime: true, forIndoor: true,
    detection: "ai_vision_camera_multi_space",
    bestUse: "smart_garage_lpr_analytics",
  },
  magnetic_ground_sensor: {
    accuracy: 9, coverage: 6, installEase: 5, analytics: 5, pgCost: 7,
    realTime: true, forIndoor: false,
    detection: "in_ground_magnetometer_flush",
    bestUse: "outdoor_surface_lot_metered",
  },
  led_indicator_only: {
    accuracy: 6, coverage: 7, installEase: 9, analytics: 3, pgCost: 3,
    realTime: false, forIndoor: true,
    detection: "red_green_led_per_space_simple",
    bestUse: "basic_garage_available_indicator",
  },
  radar_overhead_count: {
    accuracy: 7, coverage: 9, installEase: 8, analytics: 7, pgCost: 5,
    realTime: true, forIndoor: false,
    detection: "overhead_radar_zone_counting",
    bestUse: "large_lot_zone_count_display",
  },
};

function get(t: ParkingGuidanceType): ParkingGuidanceData {
  return DATA[t];
}

export const accuracy = (t: ParkingGuidanceType) => get(t).accuracy;
export const coverage = (t: ParkingGuidanceType) => get(t).coverage;
export const installEase = (t: ParkingGuidanceType) => get(t).installEase;
export const analytics = (t: ParkingGuidanceType) => get(t).analytics;
export const pgCost = (t: ParkingGuidanceType) => get(t).pgCost;
export const realTime = (t: ParkingGuidanceType) => get(t).realTime;
export const forIndoor = (t: ParkingGuidanceType) => get(t).forIndoor;
export const detection = (t: ParkingGuidanceType) => get(t).detection;
export const bestUse = (t: ParkingGuidanceType) => get(t).bestUse;
export const parkingGuidanceTypes = (): ParkingGuidanceType[] =>
  Object.keys(DATA) as ParkingGuidanceType[];
