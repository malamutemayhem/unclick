export type SteamTrapType =
  | "thermodynamic_disc_impulse"
  | "thermostatic_bellows_bimetal"
  | "mechanical_float_bucket"
  | "inverted_bucket_lever"
  | "venturi_orifice_fixed";

interface SteamTrapData {
  capacity: number;
  airVent: number;
  durability: number;
  energyLoss: number;
  stCost: number;
  modulating: boolean;
  forProcess: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SteamTrapType, SteamTrapData> = {
  thermodynamic_disc_impulse: {
    capacity: 6, airVent: 4, durability: 7, energyLoss: 5, stCost: 3,
    modulating: false, forProcess: false,
    mechanism: "disc_flash_steam_velocity_close",
    bestUse: "drip_leg_steam_main_tracer_line",
  },
  thermostatic_bellows_bimetal: {
    capacity: 5, airVent: 9, durability: 5, energyLoss: 8, stCost: 4,
    modulating: true, forProcess: false,
    mechanism: "bellows_element_temp_differential",
    bestUse: "radiator_unit_heater_air_vent",
  },
  mechanical_float_bucket: {
    capacity: 10, airVent: 8, durability: 8, energyLoss: 9, stCost: 8,
    modulating: true, forProcess: true,
    mechanism: "float_ball_lever_valve_continuous",
    bestUse: "process_heat_exchanger_continuous",
  },
  inverted_bucket_lever: {
    capacity: 8, airVent: 6, durability: 9, energyLoss: 7, stCost: 6,
    modulating: false, forProcess: true,
    mechanism: "inverted_bucket_buoyancy_lever",
    bestUse: "high_pressure_steam_main_robust",
  },
  venturi_orifice_fixed: {
    capacity: 7, airVent: 3, durability: 10, energyLoss: 6, stCost: 2,
    modulating: false, forProcess: false,
    mechanism: "fixed_orifice_continuous_bleed",
    bestUse: "simple_drip_no_moving_parts_low",
  },
};

function get(t: SteamTrapType): SteamTrapData {
  return DATA[t];
}

export const capacity = (t: SteamTrapType) => get(t).capacity;
export const airVent = (t: SteamTrapType) => get(t).airVent;
export const durability = (t: SteamTrapType) => get(t).durability;
export const energyLoss = (t: SteamTrapType) => get(t).energyLoss;
export const stCost = (t: SteamTrapType) => get(t).stCost;
export const modulating = (t: SteamTrapType) => get(t).modulating;
export const forProcess = (t: SteamTrapType) => get(t).forProcess;
export const mechanism = (t: SteamTrapType) => get(t).mechanism;
export const bestUse = (t: SteamTrapType) => get(t).bestUse;
export const steamTrapTypes = (): SteamTrapType[] =>
  Object.keys(DATA) as SteamTrapType[];
