export type TruckRestraintType =
  | "manual_wheel_chock"
  | "automatic_hook_rear_guard"
  | "rotating_hook_powered"
  | "wheel_based_sensor"
  | "barrier_arm_light_combo";

interface TruckRestraintData {
  security: number;
  speed: number;
  automation: number;
  reliability: number;
  trCost: number;
  automatic: boolean;
  forHighTraffic: boolean;
  engagement: string;
  bestUse: string;
}

const DATA: Record<TruckRestraintType, TruckRestraintData> = {
  manual_wheel_chock: {
    security: 4, speed: 2, automation: 1, reliability: 8, trCost: 1,
    automatic: false, forHighTraffic: false,
    engagement: "manual_rubber_chock_placement",
    bestUse: "low_volume_dock_basic_safety",
  },
  automatic_hook_rear_guard: {
    security: 9, speed: 8, automation: 9, reliability: 9, trCost: 7,
    automatic: true, forHighTraffic: true,
    engagement: "auto_hook_rear_icc_bar_engage",
    bestUse: "high_volume_distribution_dock",
  },
  rotating_hook_powered: {
    security: 10, speed: 9, automation: 10, reliability: 9, trCost: 9,
    automatic: true, forHighTraffic: true,
    engagement: "powered_rotating_hook_hydraul",
    bestUse: "automated_dock_interlock_sys",
  },
  wheel_based_sensor: {
    security: 7, speed: 7, automation: 8, reliability: 7, trCost: 6,
    automatic: true, forHighTraffic: false,
    engagement: "wheel_chock_sensor_interlock",
    bestUse: "retrofit_existing_dock_upgrade",
  },
  barrier_arm_light_combo: {
    security: 6, speed: 6, automation: 7, reliability: 8, trCost: 4,
    automatic: false, forHighTraffic: false,
    engagement: "barrier_arm_traffic_light_sig",
    bestUse: "visual_safety_communication",
  },
};

function get(t: TruckRestraintType): TruckRestraintData {
  return DATA[t];
}

export const security = (t: TruckRestraintType) => get(t).security;
export const speed = (t: TruckRestraintType) => get(t).speed;
export const automation = (t: TruckRestraintType) => get(t).automation;
export const reliability = (t: TruckRestraintType) => get(t).reliability;
export const trCost = (t: TruckRestraintType) => get(t).trCost;
export const automatic = (t: TruckRestraintType) => get(t).automatic;
export const forHighTraffic = (t: TruckRestraintType) => get(t).forHighTraffic;
export const engagement = (t: TruckRestraintType) => get(t).engagement;
export const bestUse = (t: TruckRestraintType) => get(t).bestUse;
export const truckRestraintTypes = (): TruckRestraintType[] =>
  Object.keys(DATA) as TruckRestraintType[];
