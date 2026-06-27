export type OpticalTurnstileType =
  | "swing_glass_barrier"
  | "sliding_panel_barrier"
  | "speed_lane_retractable"
  | "full_height_glass_portal"
  | "tripod_drop_arm_optical";

interface OpticalTurnstileData {
  throughput: number;
  security: number;
  aesthetic: number;
  accessibility: number;
  otCost: number;
  biDirectional: boolean;
  forCorporate: boolean;
  barrier: string;
  bestUse: string;
}

const DATA: Record<OpticalTurnstileType, OpticalTurnstileData> = {
  swing_glass_barrier: {
    throughput: 8, security: 7, aesthetic: 9, accessibility: 9, otCost: 7,
    biDirectional: true, forCorporate: true,
    barrier: "tempered_glass_swing_panel",
    bestUse: "corporate_lobby_visitor_mgmt",
  },
  sliding_panel_barrier: {
    throughput: 9, security: 8, aesthetic: 8, accessibility: 7, otCost: 8,
    biDirectional: true, forCorporate: true,
    barrier: "retractable_glass_slide_panel",
    bestUse: "high_rise_office_tower_lobby",
  },
  speed_lane_retractable: {
    throughput: 10, security: 6, aesthetic: 7, accessibility: 8, otCost: 6,
    biDirectional: true, forCorporate: true,
    barrier: "flap_barrier_ir_sensor_fast",
    bestUse: "transit_hub_high_volume_entry",
  },
  full_height_glass_portal: {
    throughput: 5, security: 10, aesthetic: 8, accessibility: 6, otCost: 10,
    biDirectional: false, forCorporate: false,
    barrier: "interlocking_glass_mantrap_portal",
    bestUse: "data_center_secure_area_entry",
  },
  tripod_drop_arm_optical: {
    throughput: 7, security: 5, aesthetic: 5, accessibility: 6, otCost: 4,
    biDirectional: true, forCorporate: false,
    barrier: "tripod_arm_optical_sensor_basic",
    bestUse: "gym_stadium_basic_access_count",
  },
};

function get(t: OpticalTurnstileType): OpticalTurnstileData {
  return DATA[t];
}

export const throughput = (t: OpticalTurnstileType) => get(t).throughput;
export const security = (t: OpticalTurnstileType) => get(t).security;
export const aesthetic = (t: OpticalTurnstileType) => get(t).aesthetic;
export const accessibility = (t: OpticalTurnstileType) => get(t).accessibility;
export const otCost = (t: OpticalTurnstileType) => get(t).otCost;
export const biDirectional = (t: OpticalTurnstileType) => get(t).biDirectional;
export const forCorporate = (t: OpticalTurnstileType) => get(t).forCorporate;
export const barrier = (t: OpticalTurnstileType) => get(t).barrier;
export const bestUse = (t: OpticalTurnstileType) => get(t).bestUse;
export const opticalTurnstileTypes = (): OpticalTurnstileType[] =>
  Object.keys(DATA) as OpticalTurnstileType[];
