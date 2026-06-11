export type EmergencyStopType =
  | "mushroom_head_twist"
  | "rope_pull_cable"
  | "foot_pedal_deadman"
  | "wireless_e_stop"
  | "key_release_trapped";

interface EmergencyStopData {
  responseTime: number;
  accessibility: number;
  tamperResistance: number;
  reliability: number;
  esCost: number;
  wireless: boolean;
  forLineSafety: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<EmergencyStopType, EmergencyStopData> = {
  mushroom_head_twist: {
    responseTime: 9, accessibility: 9, tamperResistance: 7, reliability: 9, esCost: 3,
    wireless: false, forLineSafety: false,
    mechanism: "red_mushroom_head_push_lock_twist_release_nc_contact",
    bestUse: "machine_panel_mount_universal_emergency_stop_point",
  },
  rope_pull_cable: {
    responseTime: 7, accessibility: 10, tamperResistance: 8, reliability: 8, esCost: 5,
    wireless: false, forLineSafety: true,
    mechanism: "steel_cable_pull_switch_latching_conveyor_length",
    bestUse: "conveyor_belt_side_long_machine_run_pull_anywhere",
  },
  foot_pedal_deadman: {
    responseTime: 10, accessibility: 7, tamperResistance: 6, reliability: 8, esCost: 4,
    wireless: false, forLineSafety: false,
    mechanism: "three_position_foot_switch_release_to_stop_enable",
    bestUse: "press_brake_teach_pendant_enable_hold_to_run_safe",
  },
  wireless_e_stop: {
    responseTime: 8, accessibility: 8, tamperResistance: 7, reliability: 7, esCost: 8,
    wireless: true, forLineSafety: false,
    mechanism: "rf_915mhz_or_24ghz_watchdog_heartbeat_fail_safe",
    bestUse: "mobile_equipment_crane_remote_agv_fleet_e_stop",
  },
  key_release_trapped: {
    responseTime: 9, accessibility: 5, tamperResistance: 10, reliability: 9, esCost: 6,
    wireless: false, forLineSafety: false,
    mechanism: "key_trapped_in_stop_position_lockout_tagout_ready",
    bestUse: "hazardous_area_lockout_isolation_maintenance_access",
  },
};

function get(t: EmergencyStopType): EmergencyStopData {
  return DATA[t];
}

export const responseTime = (t: EmergencyStopType) => get(t).responseTime;
export const accessibility = (t: EmergencyStopType) => get(t).accessibility;
export const tamperResistance = (t: EmergencyStopType) => get(t).tamperResistance;
export const reliability = (t: EmergencyStopType) => get(t).reliability;
export const esCost = (t: EmergencyStopType) => get(t).esCost;
export const wireless = (t: EmergencyStopType) => get(t).wireless;
export const forLineSafety = (t: EmergencyStopType) => get(t).forLineSafety;
export const mechanism = (t: EmergencyStopType) => get(t).mechanism;
export const bestUse = (t: EmergencyStopType) => get(t).bestUse;
export const emergencyStopTypes = (): EmergencyStopType[] =>
  Object.keys(DATA) as EmergencyStopType[];
