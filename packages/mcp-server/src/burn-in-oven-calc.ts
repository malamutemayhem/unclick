export type BurnInOvenType =
  | "static_chamber_basic"
  | "dynamic_powered_drive"
  | "hast_accel_humid"
  | "thermal_cycle_chamber"
  | "htol_high_temp_life";

const DATA: Record<BurnInOvenType, {
  tempRange: number; capacity: number; stressLevel: number;
  monitoring: number; ovenCost: number; powered: boolean;
  accelerated: boolean; testType: string; bestUse: string;
}> = {
  static_chamber_basic: { tempRange: 6, capacity: 8, stressLevel: 4, monitoring: 3, ovenCost: 3, powered: false, accelerated: false, testType: "static_bake_unpowered", bestUse: "incoming_component_screen" },
  dynamic_powered_drive: { tempRange: 7, capacity: 7, stressLevel: 8, monitoring: 8, ovenCost: 7, powered: true, accelerated: false, testType: "powered_signal_drive", bestUse: "board_level_infant_mort" },
  hast_accel_humid: { tempRange: 8, capacity: 5, stressLevel: 10, monitoring: 9, ovenCost: 9, powered: true, accelerated: true, testType: "humid_pressure_accel", bestUse: "moisture_corrosion_accel" },
  thermal_cycle_chamber: { tempRange: 10, capacity: 6, stressLevel: 9, monitoring: 7, ovenCost: 8, powered: false, accelerated: true, testType: "hot_cold_cycle_stress", bestUse: "solder_joint_fatigue_test" },
  htol_high_temp_life: { tempRange: 9, capacity: 6, stressLevel: 9, monitoring: 10, ovenCost: 10, powered: true, accelerated: true, testType: "high_temp_bias_life", bestUse: "semiconductor_qual_test" },
};

const get = (t: BurnInOvenType) => DATA[t];

export const tempRange = (t: BurnInOvenType) => get(t).tempRange;
export const capacity = (t: BurnInOvenType) => get(t).capacity;
export const stressLevel = (t: BurnInOvenType) => get(t).stressLevel;
export const monitoring = (t: BurnInOvenType) => get(t).monitoring;
export const ovenCost = (t: BurnInOvenType) => get(t).ovenCost;
export const powered = (t: BurnInOvenType) => get(t).powered;
export const accelerated = (t: BurnInOvenType) => get(t).accelerated;
export const testType = (t: BurnInOvenType) => get(t).testType;
export const bestUse = (t: BurnInOvenType) => get(t).bestUse;
export const burnInOvens = (): BurnInOvenType[] => Object.keys(DATA) as BurnInOvenType[];
