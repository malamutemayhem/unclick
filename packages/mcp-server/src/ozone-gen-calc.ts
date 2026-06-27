export type OzoneGenType =
  | "corona_discharge_air"
  | "corona_discharge_oxygen"
  | "uv_lamp_low_conc"
  | "electrolytic_cell"
  | "cold_plasma_advanced";

interface OzoneGenData {
  output: number;
  efficiency: number;
  purity: number;
  maintenance: number;
  ogCost: number;
  oxygenFed: boolean;
  forDrinking: boolean;
  generation: string;
  bestUse: string;
}

const DATA: Record<OzoneGenType, OzoneGenData> = {
  corona_discharge_air: {
    output: 7, efficiency: 6, purity: 6, maintenance: 7, ogCost: 5,
    oxygenFed: false, forDrinking: true,
    generation: "dielectric_barrier_air_fed_cd",
    bestUse: "municipal_water_treatment_plant",
  },
  corona_discharge_oxygen: {
    output: 10, efficiency: 9, purity: 9, maintenance: 6, ogCost: 8,
    oxygenFed: true, forDrinking: true,
    generation: "dielectric_barrier_psa_oxygen",
    bestUse: "large_scale_potable_disinfection",
  },
  uv_lamp_low_conc: {
    output: 3, efficiency: 5, purity: 7, maintenance: 8, ogCost: 3,
    oxygenFed: false, forDrinking: false,
    generation: "uv_185nm_lamp_ambient_air",
    bestUse: "small_pool_spa_odor_control",
  },
  electrolytic_cell: {
    output: 5, efficiency: 7, purity: 10, maintenance: 7, ogCost: 7,
    oxygenFed: false, forDrinking: true,
    generation: "pem_electrolysis_water_dissolved",
    bestUse: "food_wash_pharma_clean_in_place",
  },
  cold_plasma_advanced: {
    output: 8, efficiency: 8, purity: 8, maintenance: 5, ogCost: 9,
    oxygenFed: false, forDrinking: false,
    generation: "non_thermal_plasma_reactor_tube",
    bestUse: "wastewater_aop_micropollutant",
  },
};

function get(t: OzoneGenType): OzoneGenData {
  return DATA[t];
}

export const output = (t: OzoneGenType) => get(t).output;
export const efficiency = (t: OzoneGenType) => get(t).efficiency;
export const purity = (t: OzoneGenType) => get(t).purity;
export const maintenance = (t: OzoneGenType) => get(t).maintenance;
export const ogCost = (t: OzoneGenType) => get(t).ogCost;
export const oxygenFed = (t: OzoneGenType) => get(t).oxygenFed;
export const forDrinking = (t: OzoneGenType) => get(t).forDrinking;
export const generation = (t: OzoneGenType) => get(t).generation;
export const bestUse = (t: OzoneGenType) => get(t).bestUse;
export const ozoneGenTypes = (): OzoneGenType[] =>
  Object.keys(DATA) as OzoneGenType[];
