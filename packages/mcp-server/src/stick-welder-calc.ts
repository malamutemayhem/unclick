export type StickWelderType =
  | "dc_inverter_portable"
  | "ac_transformer_basic"
  | "dc_rectifier_industrial"
  | "engine_driven_field"
  | "multi_process_combo";

interface StickWelderData {
  arcStability: number;
  portability: number;
  dutyCycle: number;
  rodRange: number;
  swCost: number;
  inverter: boolean;
  forField: boolean;
  power: string;
  bestUse: string;
}

const DATA: Record<StickWelderType, StickWelderData> = {
  dc_inverter_portable: {
    arcStability: 9, portability: 10, dutyCycle: 7, rodRange: 8, swCost: 5,
    inverter: true, forField: true,
    power: "igbt_inverter_dc_output_115_230v",
    bestUse: "maintenance_repair_farm_home_portable",
  },
  ac_transformer_basic: {
    arcStability: 5, portability: 3, dutyCycle: 8, rodRange: 5, swCost: 2,
    inverter: false, forField: false,
    power: "copper_wound_transformer_ac_60hz",
    bestUse: "hobby_basic_steel_fabrication_low_cost",
  },
  dc_rectifier_industrial: {
    arcStability: 8, portability: 2, dutyCycle: 10, rodRange: 9, swCost: 6,
    inverter: false, forField: false,
    power: "three_phase_rectifier_dc_high_duty",
    bestUse: "heavy_fabrication_shop_pipeline_high_amp",
  },
  engine_driven_field: {
    arcStability: 8, portability: 7, dutyCycle: 9, rodRange: 9, swCost: 8,
    inverter: true, forField: true,
    power: "diesel_engine_generator_welder_combo",
    bestUse: "pipeline_cross_country_remote_no_power",
  },
  multi_process_combo: {
    arcStability: 9, portability: 6, dutyCycle: 8, rodRange: 10, swCost: 7,
    inverter: true, forField: false,
    power: "inverter_multi_process_stick_tig_mig",
    bestUse: "fabrication_shop_versatile_all_process",
  },
};

function get(t: StickWelderType): StickWelderData {
  return DATA[t];
}

export const arcStability = (t: StickWelderType) => get(t).arcStability;
export const portability = (t: StickWelderType) => get(t).portability;
export const dutyCycle = (t: StickWelderType) => get(t).dutyCycle;
export const rodRange = (t: StickWelderType) => get(t).rodRange;
export const swCost = (t: StickWelderType) => get(t).swCost;
export const inverter = (t: StickWelderType) => get(t).inverter;
export const forField = (t: StickWelderType) => get(t).forField;
export const power = (t: StickWelderType) => get(t).power;
export const bestUse = (t: StickWelderType) => get(t).bestUse;
export const stickWelderTypes = (): StickWelderType[] =>
  Object.keys(DATA) as StickWelderType[];
