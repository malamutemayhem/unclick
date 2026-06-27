export type InterlockSwitchType =
  | "tongue_interlock"
  | "hinge_interlock"
  | "solenoid_guard_lock"
  | "rfid_coded"
  | "magnetic_non_contact";

interface InterlockSwitchData {
  codingLevel: number;
  tamperResistance: number;
  durability: number;
  holdForce: number;
  isCost: number;
  guardLocking: boolean;
  forHighRisk: boolean;
  actuation: string;
  bestUse: string;
}

const DATA: Record<InterlockSwitchType, InterlockSwitchData> = {
  tongue_interlock: {
    codingLevel: 5, tamperResistance: 7, durability: 8, holdForce: 3, isCost: 3,
    guardLocking: false, forHighRisk: false,
    actuation: "metal_tongue_key_insert_positive_break_nc_contact",
    bestUse: "hinged_guard_door_sliding_panel_basic_interlock",
  },
  hinge_interlock: {
    codingLevel: 4, tamperResistance: 6, durability: 7, holdForce: 3, isCost: 3,
    guardLocking: false, forHighRisk: false,
    actuation: "rotary_cam_hinge_pin_actuator_direct_door_mount",
    bestUse: "small_hinged_door_access_panel_simple_guard_switch",
  },
  solenoid_guard_lock: {
    codingLevel: 6, tamperResistance: 9, durability: 8, holdForce: 10, isCost: 7,
    guardLocking: true, forHighRisk: true,
    actuation: "solenoid_bolt_lock_power_to_unlock_trapped_key",
    bestUse: "robot_cell_guard_door_spindown_wait_then_unlock",
  },
  rfid_coded: {
    codingLevel: 10, tamperResistance: 10, durability: 9, holdForce: 8, isCost: 8,
    guardLocking: true, forHighRisk: true,
    actuation: "rfid_transponder_unique_code_high_tamper_solenoid",
    bestUse: "high_risk_machine_multiple_guard_doors_coded_safety",
  },
  magnetic_non_contact: {
    codingLevel: 7, tamperResistance: 7, durability: 10, holdForce: 1, isCost: 5,
    guardLocking: false, forHighRisk: false,
    actuation: "coded_magnet_reed_or_hall_non_contact_alignment",
    bestUse: "wash_down_food_pharma_clean_room_no_mechanical_wear",
  },
};

function get(t: InterlockSwitchType): InterlockSwitchData {
  return DATA[t];
}

export const codingLevel = (t: InterlockSwitchType) => get(t).codingLevel;
export const tamperResistance = (t: InterlockSwitchType) => get(t).tamperResistance;
export const durability = (t: InterlockSwitchType) => get(t).durability;
export const holdForce = (t: InterlockSwitchType) => get(t).holdForce;
export const isCost = (t: InterlockSwitchType) => get(t).isCost;
export const guardLocking = (t: InterlockSwitchType) => get(t).guardLocking;
export const forHighRisk = (t: InterlockSwitchType) => get(t).forHighRisk;
export const actuation = (t: InterlockSwitchType) => get(t).actuation;
export const bestUse = (t: InterlockSwitchType) => get(t).bestUse;
export const interlockSwitchTypes = (): InterlockSwitchType[] =>
  Object.keys(DATA) as InterlockSwitchType[];
