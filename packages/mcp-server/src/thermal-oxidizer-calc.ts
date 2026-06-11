export type ThermalOxidizerType =
  | "regenerative_rto"
  | "recuperative"
  | "catalytic_oxidizer"
  | "direct_fired"
  | "flameless_thermal";

interface ThermalOxidizerData {
  destructionEfficiency: number;
  heatRecovery: number;
  fuelConsumption: number;
  vocRange: number;
  toCost: number;
  catalytic: boolean;
  forHighVoc: boolean;
  oxidationMethod: string;
  bestUse: string;
}

const DATA: Record<ThermalOxidizerType, ThermalOxidizerData> = {
  regenerative_rto: {
    destructionEfficiency: 10, heatRecovery: 10, fuelConsumption: 9, vocRange: 8, toCost: 8,
    catalytic: false, forHighVoc: false,
    oxidationMethod: "ceramic_media_bed_heat_store_alternate_flow_95_pct_recovery",
    bestUse: "paint_booth_printing_coating_line_low_voc_high_airflow",
  },
  recuperative: {
    destructionEfficiency: 9, heatRecovery: 6, fuelConsumption: 5, vocRange: 9, toCost: 5,
    catalytic: false, forHighVoc: true,
    oxidationMethod: "shell_tube_heat_exchanger_preheat_incoming_air_70_pct",
    bestUse: "chemical_plant_medium_voc_load_compact_retrofit_install",
  },
  catalytic_oxidizer: {
    destructionEfficiency: 9, heatRecovery: 7, fuelConsumption: 8, vocRange: 7, toCost: 7,
    catalytic: true, forHighVoc: false,
    oxidationMethod: "precious_metal_catalyst_bed_lower_ignition_temperature_350c",
    bestUse: "pharmaceutical_food_process_clean_exhaust_low_temperature",
  },
  direct_fired: {
    destructionEfficiency: 10, heatRecovery: 3, fuelConsumption: 3, vocRange: 10, toCost: 4,
    catalytic: false, forHighVoc: true,
    oxidationMethod: "open_flame_combustion_chamber_high_temp_870c_residence_time",
    bestUse: "refinery_petrochemical_high_voc_halogenated_solvent_destroy",
  },
  flameless_thermal: {
    destructionEfficiency: 9, heatRecovery: 9, fuelConsumption: 8, vocRange: 6, toCost: 9,
    catalytic: false, forHighVoc: false,
    oxidationMethod: "gradual_oxidation_porous_media_no_flame_front_ultra_low_nox",
    bestUse: "semiconductor_lab_exhaust_odor_control_low_nox_requirement",
  },
};

function get(t: ThermalOxidizerType): ThermalOxidizerData {
  return DATA[t];
}

export const destructionEfficiency = (t: ThermalOxidizerType) => get(t).destructionEfficiency;
export const heatRecovery = (t: ThermalOxidizerType) => get(t).heatRecovery;
export const fuelConsumption = (t: ThermalOxidizerType) => get(t).fuelConsumption;
export const vocRange = (t: ThermalOxidizerType) => get(t).vocRange;
export const toCost = (t: ThermalOxidizerType) => get(t).toCost;
export const catalytic = (t: ThermalOxidizerType) => get(t).catalytic;
export const forHighVoc = (t: ThermalOxidizerType) => get(t).forHighVoc;
export const oxidationMethod = (t: ThermalOxidizerType) => get(t).oxidationMethod;
export const bestUse = (t: ThermalOxidizerType) => get(t).bestUse;
export const thermalOxidizerTypes = (): ThermalOxidizerType[] =>
  Object.keys(DATA) as ThermalOxidizerType[];
