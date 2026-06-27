export type BoilerType =
  | "fire_tube_shell_scotch"
  | "water_tube_drum_header"
  | "once_through_supercritical"
  | "electric_resistance_element"
  | "condensing_flue_gas_recovery";

interface BoilerData {
  steamRate: number;
  pressure: number;
  efficiency: number;
  startupTime: number;
  blCost: number;
  electric: boolean;
  forPower: boolean;
  circulation: string;
  bestUse: string;
}

const DATA: Record<BoilerType, BoilerData> = {
  fire_tube_shell_scotch: {
    steamRate: 6, pressure: 5, efficiency: 7, startupTime: 4, blCost: 4,
    electric: false, forPower: false,
    circulation: "hot_gas_inside_tubes_water_shell",
    bestUse: "process_steam_heating_small_plant",
  },
  water_tube_drum_header: {
    steamRate: 9, pressure: 9, efficiency: 8, startupTime: 5, blCost: 8,
    electric: false, forPower: true,
    circulation: "water_inside_tubes_gas_outside",
    bestUse: "power_plant_high_pressure_steam",
  },
  once_through_supercritical: {
    steamRate: 10, pressure: 10, efficiency: 10, startupTime: 3, blCost: 10,
    electric: false, forPower: true,
    circulation: "forced_flow_no_drum_supercritical",
    bestUse: "ultra_supercritical_power_station",
  },
  electric_resistance_element: {
    steamRate: 4, pressure: 6, efficiency: 9, startupTime: 9, blCost: 3,
    electric: true, forPower: false,
    circulation: "immersion_element_direct_heat",
    bestUse: "clean_steam_lab_food_no_combustion",
  },
  condensing_flue_gas_recovery: {
    steamRate: 7, pressure: 5, efficiency: 10, startupTime: 5, blCost: 6,
    electric: false, forPower: false,
    circulation: "flue_gas_condense_latent_recovery",
    bestUse: "building_heating_high_efficiency",
  },
};

function get(t: BoilerType): BoilerData {
  return DATA[t];
}

export const steamRate = (t: BoilerType) => get(t).steamRate;
export const pressure = (t: BoilerType) => get(t).pressure;
export const efficiency = (t: BoilerType) => get(t).efficiency;
export const startupTime = (t: BoilerType) => get(t).startupTime;
export const blCost = (t: BoilerType) => get(t).blCost;
export const electric = (t: BoilerType) => get(t).electric;
export const forPower = (t: BoilerType) => get(t).forPower;
export const circulation = (t: BoilerType) => get(t).circulation;
export const bestUse = (t: BoilerType) => get(t).bestUse;
export const boilerTypes = (): BoilerType[] =>
  Object.keys(DATA) as BoilerType[];
