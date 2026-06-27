export type HydraulicValveType =
  | "directional_spool"
  | "pressure_relief_cartridge"
  | "flow_control_needle"
  | "check_poppet"
  | "counterbalance_pilot";

interface HydraulicValveData {
  flowCapacity: number;
  responseTime: number;
  leakRate: number;
  pressureRating: number;
  hvCost: number;
  proportional: boolean;
  forSafety: boolean;
  valveDesign: string;
  bestUse: string;
}

const DATA: Record<HydraulicValveType, HydraulicValveData> = {
  directional_spool: {
    flowCapacity: 9, responseTime: 8, leakRate: 6, pressureRating: 8, hvCost: 6,
    proportional: false, forSafety: false,
    valveDesign: "sliding_spool_in_bore_solenoid_or_lever_shift_port_connect",
    bestUse: "cylinder_control_motor_direction_main_circuit_switching",
  },
  pressure_relief_cartridge: {
    flowCapacity: 8, responseTime: 9, leakRate: 7, pressureRating: 10, hvCost: 4,
    proportional: false, forSafety: true,
    valveDesign: "poppet_spring_loaded_cartridge_screw_in_manifold_mount",
    bestUse: "system_overpressure_protection_pump_unload_circuit_limit",
  },
  flow_control_needle: {
    flowCapacity: 5, responseTime: 6, leakRate: 7, pressureRating: 8, hvCost: 3,
    proportional: true, forSafety: false,
    valveDesign: "tapered_needle_in_orifice_manual_knob_adjust_flow_restrict",
    bestUse: "actuator_speed_control_meter_in_meter_out_fine_adjustment",
  },
  check_poppet: {
    flowCapacity: 10, responseTime: 10, leakRate: 10, pressureRating: 9, hvCost: 2,
    proportional: false, forSafety: true,
    valveDesign: "spring_loaded_poppet_ball_or_cone_one_way_flow_zero_leak",
    bestUse: "backflow_prevention_pump_isolation_accumulator_lock_valve",
  },
  counterbalance_pilot: {
    flowCapacity: 7, responseTime: 7, leakRate: 8, pressureRating: 9, hvCost: 7,
    proportional: false, forSafety: true,
    valveDesign: "pilot_operated_relief_hold_load_prevent_runaway_controlled",
    bestUse: "crane_boom_lower_press_platen_hold_load_prevent_free_fall",
  },
};

function get(t: HydraulicValveType): HydraulicValveData {
  return DATA[t];
}

export const flowCapacity = (t: HydraulicValveType) => get(t).flowCapacity;
export const responseTime = (t: HydraulicValveType) => get(t).responseTime;
export const leakRate = (t: HydraulicValveType) => get(t).leakRate;
export const pressureRating = (t: HydraulicValveType) => get(t).pressureRating;
export const hvCost = (t: HydraulicValveType) => get(t).hvCost;
export const proportional = (t: HydraulicValveType) => get(t).proportional;
export const forSafety = (t: HydraulicValveType) => get(t).forSafety;
export const valveDesign = (t: HydraulicValveType) => get(t).valveDesign;
export const bestUse = (t: HydraulicValveType) => get(t).bestUse;
export const hydraulicValveTypes = (): HydraulicValveType[] =>
  Object.keys(DATA) as HydraulicValveType[];
