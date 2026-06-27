export type RooftopUnitType =
  | "constant_volume_basic"
  | "variable_air_volume"
  | "heat_pump_rooftop"
  | "doas_dedicated_outdoor"
  | "make_up_air_kitchen";

interface RooftopUnitData {
  efficiency: number;
  capacity: number;
  noise: number;
  maintenance: number;
  rtCost: number;
  variableSpeed: boolean;
  forRetail: boolean;
  refrigerant: string;
  bestUse: string;
}

const DATA: Record<RooftopUnitType, RooftopUnitData> = {
  constant_volume_basic: {
    efficiency: 5, capacity: 7, noise: 6, maintenance: 8, rtCost: 3,
    variableSpeed: false, forRetail: true,
    refrigerant: "r410a_single_stage_scroll",
    bestUse: "small_retail_restaurant_basic",
  },
  variable_air_volume: {
    efficiency: 9, capacity: 9, noise: 7, maintenance: 7, rtCost: 7,
    variableSpeed: true, forRetail: false,
    refrigerant: "r410a_variable_speed_inverter",
    bestUse: "large_office_multi_zone_vav",
  },
  heat_pump_rooftop: {
    efficiency: 8, capacity: 7, noise: 7, maintenance: 7, rtCost: 6,
    variableSpeed: true, forRetail: true,
    refrigerant: "r410a_reversing_valve_hp",
    bestUse: "moderate_climate_heat_cool",
  },
  doas_dedicated_outdoor: {
    efficiency: 9, capacity: 6, noise: 7, maintenance: 6, rtCost: 8,
    variableSpeed: true, forRetail: false,
    refrigerant: "r410a_energy_recovery_wheel",
    bestUse: "lab_hospital_100_pct_oa",
  },
  make_up_air_kitchen: {
    efficiency: 6, capacity: 8, noise: 5, maintenance: 7, rtCost: 6,
    variableSpeed: false, forRetail: false,
    refrigerant: "direct_gas_fired_tempered",
    bestUse: "commercial_kitchen_exhaust_mua",
  },
};

function get(t: RooftopUnitType): RooftopUnitData {
  return DATA[t];
}

export const efficiency = (t: RooftopUnitType) => get(t).efficiency;
export const capacity = (t: RooftopUnitType) => get(t).capacity;
export const noise = (t: RooftopUnitType) => get(t).noise;
export const maintenance = (t: RooftopUnitType) => get(t).maintenance;
export const rtCost = (t: RooftopUnitType) => get(t).rtCost;
export const variableSpeed = (t: RooftopUnitType) => get(t).variableSpeed;
export const forRetail = (t: RooftopUnitType) => get(t).forRetail;
export const refrigerant = (t: RooftopUnitType) => get(t).refrigerant;
export const bestUse = (t: RooftopUnitType) => get(t).bestUse;
export const rooftopUnitTypes = (): RooftopUnitType[] =>
  Object.keys(DATA) as RooftopUnitType[];
