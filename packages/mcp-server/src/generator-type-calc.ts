export type GeneratorType =
  | "synchronous_wound_rotor"
  | "induction_squirrel_cage"
  | "permanent_magnet_direct"
  | "doubly_fed_induction"
  | "linear_free_piston";

const DATA: Record<GeneratorType, {
  efficiency: number; power: number; reliability: number;
  control: number; gnCost: number; brushless: boolean;
  forWind: boolean; excitation: string; bestUse: string;
}> = {
  synchronous_wound_rotor: {
    efficiency: 9, power: 10, reliability: 8,
    control: 10, gnCost: 4, brushless: false,
    forWind: false, excitation: "dc_field_winding_rotor",
    bestUse: "large_thermal_plant_grid_sync",
  },
  induction_squirrel_cage: {
    efficiency: 7, power: 7, reliability: 10,
    control: 5, gnCost: 1, brushless: true,
    forWind: true, excitation: "stator_induced_rotor_bar",
    bestUse: "small_hydro_fixed_speed_simple",
  },
  permanent_magnet_direct: {
    efficiency: 10, power: 6, reliability: 9,
    control: 7, gnCost: 5, brushless: true,
    forWind: true, excitation: "rare_earth_magnet_rotor",
    bestUse: "offshore_wind_direct_drive",
  },
  doubly_fed_induction: {
    efficiency: 8, power: 9, reliability: 7,
    control: 9, gnCost: 3, brushless: false,
    forWind: true, excitation: "partial_converter_rotor_feed",
    bestUse: "onshore_wind_variable_speed",
  },
  linear_free_piston: {
    efficiency: 6, power: 3, reliability: 6,
    control: 6, gnCost: 3, brushless: true,
    forWind: false, excitation: "oscillating_magnet_coil",
    bestUse: "stirling_engine_micro_chp",
  },
};

const get = (t: GeneratorType) => DATA[t];

export const efficiency = (t: GeneratorType) => get(t).efficiency;
export const power = (t: GeneratorType) => get(t).power;
export const reliability = (t: GeneratorType) => get(t).reliability;
export const control = (t: GeneratorType) => get(t).control;
export const gnCost = (t: GeneratorType) => get(t).gnCost;
export const brushless = (t: GeneratorType) => get(t).brushless;
export const forWind = (t: GeneratorType) => get(t).forWind;
export const excitation = (t: GeneratorType) => get(t).excitation;
export const bestUse = (t: GeneratorType) => get(t).bestUse;
export const generatorTypes = (): GeneratorType[] => Object.keys(DATA) as GeneratorType[];
