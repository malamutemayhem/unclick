export type SafetyValveType =
  | "spring_loaded_conventional"
  | "pilot_operated_piston"
  | "balanced_bellows_back"
  | "temperature_actuated_thermal"
  | "vacuum_relief_breather";

interface SafetyValveData {
  capacity: number;
  precision: number;
  reliability: number;
  backPressure: number;
  svCost: number;
  reseat: boolean;
  forSteam: boolean;
  actuator: string;
  bestUse: string;
}

const DATA: Record<SafetyValveType, SafetyValveData> = {
  spring_loaded_conventional: {
    capacity: 8, precision: 7, reliability: 9, backPressure: 4, svCost: 5,
    reseat: true, forSteam: true,
    actuator: "compression_spring_direct_load",
    bestUse: "boiler_vessel_general_overpressure",
  },
  pilot_operated_piston: {
    capacity: 10, precision: 10, reliability: 8, backPressure: 10, svCost: 9,
    reseat: true, forSteam: false,
    actuator: "pilot_dome_piston_main_valve",
    bestUse: "high_pressure_gas_pipeline_variable",
  },
  balanced_bellows_back: {
    capacity: 8, precision: 9, reliability: 8, backPressure: 9, svCost: 7,
    reseat: true, forSteam: true,
    actuator: "bellows_balance_spring_isolate",
    bestUse: "refinery_chemical_backpressure_system",
  },
  temperature_actuated_thermal: {
    capacity: 5, precision: 6, reliability: 9, backPressure: 3, svCost: 4,
    reseat: true, forSteam: false,
    actuator: "thermal_element_wax_bimetal_open",
    bestUse: "water_heater_solar_thermal_protect",
  },
  vacuum_relief_breather: {
    capacity: 7, precision: 6, reliability: 9, backPressure: 2, svCost: 3,
    reseat: true, forSteam: false,
    actuator: "weight_spring_pallet_vent_atmos",
    bestUse: "storage_tank_vacuum_protect_vent",
  },
};

function get(t: SafetyValveType): SafetyValveData {
  return DATA[t];
}

export const capacity = (t: SafetyValveType) => get(t).capacity;
export const precision = (t: SafetyValveType) => get(t).precision;
export const reliability = (t: SafetyValveType) => get(t).reliability;
export const backPressure = (t: SafetyValveType) => get(t).backPressure;
export const svCost = (t: SafetyValveType) => get(t).svCost;
export const reseat = (t: SafetyValveType) => get(t).reseat;
export const forSteam = (t: SafetyValveType) => get(t).forSteam;
export const actuator = (t: SafetyValveType) => get(t).actuator;
export const bestUse = (t: SafetyValveType) => get(t).bestUse;
export const safetyValveTypes = (): SafetyValveType[] =>
  Object.keys(DATA) as SafetyValveType[];
