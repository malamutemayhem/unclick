export type ElectricStrikeType =
  | "fail_secure_locked_no_power"
  | "fail_safe_unlock_no_power"
  | "monitored_status_feedback"
  | "fire_rated_3_hour_listed"
  | "heavy_duty_high_traffic";

interface ElectricStrikeData {
  security: number;
  durability: number;
  loadRating: number;
  installEase: number;
  esCost: number;
  failSecure: boolean;
  forFireDoor: boolean;
  voltage: string;
  bestUse: string;
}

const DATA: Record<ElectricStrikeType, ElectricStrikeData> = {
  fail_secure_locked_no_power: {
    security: 9, durability: 8, loadRating: 8, installEase: 7, esCost: 5,
    failSecure: true, forFireDoor: false,
    voltage: "12_24_vdc_dual_selectable",
    bestUse: "secure_office_server_room",
  },
  fail_safe_unlock_no_power: {
    security: 6, durability: 8, loadRating: 7, installEase: 7, esCost: 5,
    failSecure: false, forFireDoor: true,
    voltage: "12_24_vdc_dual_selectable",
    bestUse: "fire_egress_stairwell_door",
  },
  monitored_status_feedback: {
    security: 8, durability: 8, loadRating: 8, installEase: 5, esCost: 7,
    failSecure: true, forFireDoor: false,
    voltage: "12_24_vdc_sense_output",
    bestUse: "access_control_audit_trail",
  },
  fire_rated_3_hour_listed: {
    security: 8, durability: 9, loadRating: 9, installEase: 5, esCost: 8,
    failSecure: false, forFireDoor: true,
    voltage: "24_vdc_fire_alarm_release",
    bestUse: "fire_rated_corridor_door",
  },
  heavy_duty_high_traffic: {
    security: 8, durability: 10, loadRating: 10, installEase: 6, esCost: 7,
    failSecure: true, forFireDoor: false,
    voltage: "12_24_vdc_continuous_duty",
    bestUse: "main_entrance_high_cycle",
  },
};

function get(t: ElectricStrikeType): ElectricStrikeData {
  return DATA[t];
}

export const security = (t: ElectricStrikeType) => get(t).security;
export const durability = (t: ElectricStrikeType) => get(t).durability;
export const loadRating = (t: ElectricStrikeType) => get(t).loadRating;
export const installEase = (t: ElectricStrikeType) => get(t).installEase;
export const esCost = (t: ElectricStrikeType) => get(t).esCost;
export const failSecure = (t: ElectricStrikeType) => get(t).failSecure;
export const forFireDoor = (t: ElectricStrikeType) => get(t).forFireDoor;
export const voltage = (t: ElectricStrikeType) => get(t).voltage;
export const bestUse = (t: ElectricStrikeType) => get(t).bestUse;
export const electricStrikeTypes = (): ElectricStrikeType[] =>
  Object.keys(DATA) as ElectricStrikeType[];
