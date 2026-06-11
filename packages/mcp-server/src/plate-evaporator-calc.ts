export type PlateEvaporatorType =
  | "climbing_film_plate"
  | "falling_film_plate"
  | "flash_plate_evap"
  | "multi_effect_plate"
  | "mvr_plate_evap";

interface PlateEvaporatorData {
  evapRate: number;
  energyEff: number;
  compactness: number;
  foulingResist: number;
  peCost: number;
  mechanicalVapor: boolean;
  forDairy: boolean;
  plateConfig: string;
  bestUse: string;
}

const DATA: Record<PlateEvaporatorType, PlateEvaporatorData> = {
  climbing_film_plate: {
    evapRate: 7, energyEff: 6, compactness: 9, foulingResist: 7, peCost: 5,
    mechanicalVapor: false, forDairy: true,
    plateConfig: "rising_film_between_corrugated_plates_gravity",
    bestUse: "juice_milk_concentration_compact_single_effect",
  },
  falling_film_plate: {
    evapRate: 9, energyEff: 7, compactness: 9, foulingResist: 8, peCost: 6,
    mechanicalVapor: false, forDairy: true,
    plateConfig: "falling_film_gravity_flow_thin_plate_gap",
    bestUse: "dairy_sugar_fruit_juice_gentle_concentration",
  },
  flash_plate_evap: {
    evapRate: 8, energyEff: 6, compactness: 8, foulingResist: 9, peCost: 5,
    mechanicalVapor: false, forDairy: false,
    plateConfig: "flash_chamber_plate_pack_recirculation_loop",
    bestUse: "chemical_salt_crystallization_flash_evaporate",
  },
  multi_effect_plate: {
    evapRate: 8, energyEff: 9, compactness: 8, foulingResist: 7, peCost: 8,
    mechanicalVapor: false, forDairy: true,
    plateConfig: "series_plate_effects_vapor_cascade_condensate",
    bestUse: "large_scale_dairy_desalination_multi_effect",
  },
  mvr_plate_evap: {
    evapRate: 9, energyEff: 10, compactness: 7, foulingResist: 7, peCost: 9,
    mechanicalVapor: true, forDairy: true,
    plateConfig: "mechanical_vapor_recompression_plate_electric",
    bestUse: "zero_liquid_discharge_wastewater_high_eff_evap",
  },
};

function get(t: PlateEvaporatorType): PlateEvaporatorData {
  return DATA[t];
}

export const evapRate = (t: PlateEvaporatorType) => get(t).evapRate;
export const energyEff = (t: PlateEvaporatorType) => get(t).energyEff;
export const compactness = (t: PlateEvaporatorType) => get(t).compactness;
export const foulingResist = (t: PlateEvaporatorType) => get(t).foulingResist;
export const peCost = (t: PlateEvaporatorType) => get(t).peCost;
export const mechanicalVapor = (t: PlateEvaporatorType) => get(t).mechanicalVapor;
export const forDairy = (t: PlateEvaporatorType) => get(t).forDairy;
export const plateConfig = (t: PlateEvaporatorType) => get(t).plateConfig;
export const bestUse = (t: PlateEvaporatorType) => get(t).bestUse;
export const plateEvaporatorTypes = (): PlateEvaporatorType[] =>
  Object.keys(DATA) as PlateEvaporatorType[];
