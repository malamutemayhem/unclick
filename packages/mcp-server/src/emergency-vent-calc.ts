export type EmergencyVentType =
  | "emergency_relief_vent"
  | "conservation_vent_pv"
  | "pilot_operated_relief"
  | "gauge_hatch_inspect"
  | "blanketing_valve_inert";

interface EmergencyVentData {
  flowCapacity: number;
  setPointAccuracy: number;
  leakTightness: number;
  reliability: number;
  evCost: number;
  pilotOperated: boolean;
  forEmergency: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<EmergencyVentType, EmergencyVentData> = {
  emergency_relief_vent: {
    flowCapacity: 10, setPointAccuracy: 5, leakTightness: 5, reliability: 9, evCost: 5,
    pilotOperated: false, forEmergency: true,
    design: "weight_loaded_pallet_full_open_emergency_fire",
    bestUse: "api_2000_fire_case_emergency_tank_overpressure",
  },
  conservation_vent_pv: {
    flowCapacity: 6, setPointAccuracy: 8, leakTightness: 8, reliability: 8, evCost: 4,
    pilotOperated: false, forEmergency: false,
    design: "weight_or_spring_loaded_pressure_vacuum_pallet",
    bestUse: "atmospheric_tank_normal_breathing_vapor_conserve",
  },
  pilot_operated_relief: {
    flowCapacity: 8, setPointAccuracy: 10, leakTightness: 10, reliability: 8, evCost: 8,
    pilotOperated: true, forEmergency: true,
    design: "pilot_dome_loaded_main_valve_snap_action",
    bestUse: "high_value_product_zero_leak_precise_setpoint",
  },
  gauge_hatch_inspect: {
    flowCapacity: 4, setPointAccuracy: 3, leakTightness: 6, reliability: 9, evCost: 2,
    pilotOperated: false, forEmergency: false,
    design: "hinged_weighted_cover_gauge_dip_hatch_access",
    bestUse: "tank_gauging_sampling_inspection_access_point",
  },
  blanketing_valve_inert: {
    flowCapacity: 5, setPointAccuracy: 9, leakTightness: 9, reliability: 8, evCost: 6,
    pilotOperated: false, forEmergency: false,
    design: "snap_acting_blanketing_regulator_inert_gas_pad",
    bestUse: "nitrogen_blanket_inert_pad_oxidation_prevent",
  },
};

function get(t: EmergencyVentType): EmergencyVentData {
  return DATA[t];
}

export const flowCapacity = (t: EmergencyVentType) => get(t).flowCapacity;
export const setPointAccuracy = (t: EmergencyVentType) => get(t).setPointAccuracy;
export const leakTightness = (t: EmergencyVentType) => get(t).leakTightness;
export const reliability = (t: EmergencyVentType) => get(t).reliability;
export const evCost = (t: EmergencyVentType) => get(t).evCost;
export const pilotOperated = (t: EmergencyVentType) => get(t).pilotOperated;
export const forEmergency = (t: EmergencyVentType) => get(t).forEmergency;
export const design = (t: EmergencyVentType) => get(t).design;
export const bestUse = (t: EmergencyVentType) => get(t).bestUse;
export const emergencyVentTypes = (): EmergencyVentType[] =>
  Object.keys(DATA) as EmergencyVentType[];
