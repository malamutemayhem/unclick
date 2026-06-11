export type TurbineType =
  | "gas_open_cycle_brayton"
  | "steam_rankine_condensing"
  | "hydro_francis_reaction"
  | "hydro_pelton_impulse"
  | "organic_rankine_orc";

const DATA: Record<TurbineType, {
  efficiency: number; power: number; startupTime: number;
  life: number; tbCost: number; renewable: boolean;
  forBaseload: boolean; working: string; bestUse: string;
}> = {
  gas_open_cycle_brayton: {
    efficiency: 6, power: 9, startupTime: 10,
    life: 6, tbCost: 4, renewable: false,
    forBaseload: false, working: "combustion_gas_air_mixture",
    bestUse: "peaker_plant_fast_dispatch",
  },
  steam_rankine_condensing: {
    efficiency: 8, power: 10, startupTime: 3,
    life: 9, tbCost: 5, renewable: false,
    forBaseload: true, working: "superheated_steam_water",
    bestUse: "coal_nuclear_baseload_power",
  },
  hydro_francis_reaction: {
    efficiency: 10, power: 8, startupTime: 8,
    life: 10, tbCost: 4, renewable: true,
    forBaseload: true, working: "pressurized_water_runner",
    bestUse: "large_dam_medium_head_hydro",
  },
  hydro_pelton_impulse: {
    efficiency: 9, power: 6, startupTime: 9,
    life: 10, tbCost: 3, renewable: true,
    forBaseload: false, working: "high_velocity_water_jet",
    bestUse: "mountain_high_head_small_flow",
  },
  organic_rankine_orc: {
    efficiency: 5, power: 3, startupTime: 6,
    life: 7, tbCost: 3, renewable: true,
    forBaseload: false, working: "low_boil_organic_fluid",
    bestUse: "waste_heat_geothermal_low_temp",
  },
};

const get = (t: TurbineType) => DATA[t];

export const efficiency = (t: TurbineType) => get(t).efficiency;
export const power = (t: TurbineType) => get(t).power;
export const startupTime = (t: TurbineType) => get(t).startupTime;
export const life = (t: TurbineType) => get(t).life;
export const tbCost = (t: TurbineType) => get(t).tbCost;
export const renewable = (t: TurbineType) => get(t).renewable;
export const forBaseload = (t: TurbineType) => get(t).forBaseload;
export const working = (t: TurbineType) => get(t).working;
export const bestUse = (t: TurbineType) => get(t).bestUse;
export const turbineTypes = (): TurbineType[] => Object.keys(DATA) as TurbineType[];
