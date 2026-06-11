export type BoosterPumpType =
  | "constant_speed_simplex"
  | "variable_speed_vfd"
  | "triplex_packaged"
  | "inline_booster_compact"
  | "fire_jockey_maintain";

interface BoosterPumpData {
  pressure: number;
  efficiency: number;
  reliability: number;
  noise: number;
  bpCost: number;
  variableSpeed: boolean;
  forHighRise: boolean;
  motor: string;
  bestUse: string;
}

const DATA: Record<BoosterPumpType, BoosterPumpData> = {
  constant_speed_simplex: {
    pressure: 6, efficiency: 5, reliability: 7, noise: 5, bpCost: 3,
    variableSpeed: false, forHighRise: false,
    motor: "single_speed_tefc_motor",
    bestUse: "small_building_domestic_boost",
  },
  variable_speed_vfd: {
    pressure: 8, efficiency: 9, reliability: 8, noise: 7, bpCost: 7,
    variableSpeed: true, forHighRise: true,
    motor: "vfd_driven_premium_eff_motor",
    bestUse: "mid_rise_office_variable_demand",
  },
  triplex_packaged: {
    pressure: 10, efficiency: 8, reliability: 10, noise: 5, bpCost: 9,
    variableSpeed: true, forHighRise: true,
    motor: "triplex_vfd_lead_lag_standby",
    bestUse: "high_rise_tower_domestic_water",
  },
  inline_booster_compact: {
    pressure: 5, efficiency: 7, reliability: 7, noise: 8, bpCost: 2,
    variableSpeed: false, forHighRise: false,
    motor: "wet_rotor_inline_compact",
    bestUse: "residential_low_pressure_fix",
  },
  fire_jockey_maintain: {
    pressure: 7, efficiency: 4, reliability: 9, noise: 4, bpCost: 5,
    variableSpeed: false, forHighRise: true,
    motor: "fire_jockey_pressure_maintain",
    bestUse: "fire_sprinkler_pressure_maint",
  },
};

function get(t: BoosterPumpType): BoosterPumpData {
  return DATA[t];
}

export const pressure = (t: BoosterPumpType) => get(t).pressure;
export const efficiency = (t: BoosterPumpType) => get(t).efficiency;
export const reliability = (t: BoosterPumpType) => get(t).reliability;
export const noise = (t: BoosterPumpType) => get(t).noise;
export const bpCost = (t: BoosterPumpType) => get(t).bpCost;
export const variableSpeed = (t: BoosterPumpType) => get(t).variableSpeed;
export const forHighRise = (t: BoosterPumpType) => get(t).forHighRise;
export const motor = (t: BoosterPumpType) => get(t).motor;
export const bestUse = (t: BoosterPumpType) => get(t).bestUse;
export const boosterPumpTypes = (): BoosterPumpType[] =>
  Object.keys(DATA) as BoosterPumpType[];
