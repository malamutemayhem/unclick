export type ShuttleCarType =
  | "battery_electric"
  | "trailing_cable"
  | "ram_car"
  | "flexible_conveyor_train"
  | "diesel_underground";

interface ShuttleCarData {
  loadCapacity: number;
  tramSpeed: number;
  turnaroundTime: number;
  profileHeight: number;
  scCost: number;
  electric: boolean;
  forLowSeam: boolean;
  driveConfig: string;
  bestUse: string;
}

const DATA: Record<ShuttleCarType, ShuttleCarData> = {
  battery_electric: {
    loadCapacity: 8, tramSpeed: 7, turnaroundTime: 7, profileHeight: 7, scCost: 8,
    electric: true, forLowSeam: false,
    driveConfig: "onboard_battery_pack_electric_drive_motor_no_trailing_cable",
    bestUse: "modern_coal_mine_battery_haulage_no_cable_hazard_clean_drive",
  },
  trailing_cable: {
    loadCapacity: 9, tramSpeed: 8, turnaroundTime: 8, profileHeight: 7, scCost: 6,
    electric: true, forLowSeam: false,
    driveConfig: "ac_electric_motor_trailing_power_cable_reel_continuous_supply",
    bestUse: "standard_coal_mine_shuttle_car_continuous_miner_to_feeder",
  },
  ram_car: {
    loadCapacity: 10, tramSpeed: 6, turnaroundTime: 6, profileHeight: 8, scCost: 7,
    electric: true, forLowSeam: false,
    driveConfig: "hydraulic_ram_conveyor_floor_push_load_forward_discharge_dump",
    bestUse: "high_capacity_ram_discharge_conveyor_fast_dump_cycle_haulage",
  },
  flexible_conveyor_train: {
    loadCapacity: 7, tramSpeed: 9, turnaroundTime: 10, profileHeight: 6, scCost: 9,
    electric: true, forLowSeam: true,
    driveConfig: "articulated_multi_car_train_belt_conveyor_continuous_haulage",
    bestUse: "continuous_haulage_no_shuttle_wait_time_long_panel_development",
  },
  diesel_underground: {
    loadCapacity: 8, tramSpeed: 8, turnaroundTime: 7, profileHeight: 5, scCost: 5,
    electric: false, forLowSeam: true,
    driveConfig: "diesel_engine_scrubber_exhaust_treatment_underground_permitted",
    bestUse: "hard_rock_mine_development_ore_haulage_diesel_permitted_area",
  },
};

function get(t: ShuttleCarType): ShuttleCarData {
  return DATA[t];
}

export const loadCapacity = (t: ShuttleCarType) => get(t).loadCapacity;
export const tramSpeed = (t: ShuttleCarType) => get(t).tramSpeed;
export const turnaroundTime = (t: ShuttleCarType) => get(t).turnaroundTime;
export const profileHeight = (t: ShuttleCarType) => get(t).profileHeight;
export const scCost = (t: ShuttleCarType) => get(t).scCost;
export const electric = (t: ShuttleCarType) => get(t).electric;
export const forLowSeam = (t: ShuttleCarType) => get(t).forLowSeam;
export const driveConfig = (t: ShuttleCarType) => get(t).driveConfig;
export const bestUse = (t: ShuttleCarType) => get(t).bestUse;
export const shuttleCarTypes = (): ShuttleCarType[] =>
  Object.keys(DATA) as ShuttleCarType[];
