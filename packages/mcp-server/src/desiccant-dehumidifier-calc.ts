export type DesiccantDehumidifierType =
  | "rotary_wheel_silica"
  | "liquid_desiccant_lithium"
  | "dual_tower_packed_bed"
  | "hybrid_desiccant_dx"
  | "solar_regeneration_wheel";

interface DesiccantDehumidifierData {
  moisture: number;
  energy: number;
  lowDewPoint: number;
  reliability: number;
  ddCost: number;
  continuous: boolean;
  forCleanroom: boolean;
  sorbent: string;
  bestUse: string;
}

const DATA: Record<DesiccantDehumidifierType, DesiccantDehumidifierData> = {
  rotary_wheel_silica: {
    moisture: 9, energy: 6, lowDewPoint: 10, reliability: 9, ddCost: 7,
    continuous: true, forCleanroom: true,
    sorbent: "silica_gel_molecular_sieve_wheel",
    bestUse: "pharma_cleanroom_lithium_battery",
  },
  liquid_desiccant_lithium: {
    moisture: 8, energy: 7, lowDewPoint: 7, reliability: 7, ddCost: 8,
    continuous: true, forCleanroom: false,
    sorbent: "lithium_chloride_solution_spray",
    bestUse: "natatorium_pool_hall_humid",
  },
  dual_tower_packed_bed: {
    moisture: 10, energy: 5, lowDewPoint: 10, reliability: 8, ddCost: 6,
    continuous: false, forCleanroom: true,
    sorbent: "alumina_zeolite_packed_tower",
    bestUse: "compressed_air_dryer_instrument",
  },
  hybrid_desiccant_dx: {
    moisture: 8, energy: 8, lowDewPoint: 8, reliability: 9, ddCost: 9,
    continuous: true, forCleanroom: false,
    sorbent: "wheel_plus_dx_coil_reheat",
    bestUse: "supermarket_grocery_display_case",
  },
  solar_regeneration_wheel: {
    moisture: 7, energy: 10, lowDewPoint: 6, reliability: 7, ddCost: 10,
    continuous: true, forCleanroom: false,
    sorbent: "solar_thermal_regenerated_wheel",
    bestUse: "tropical_ventilation_solar_site",
  },
};

function get(t: DesiccantDehumidifierType): DesiccantDehumidifierData {
  return DATA[t];
}

export const moisture = (t: DesiccantDehumidifierType) => get(t).moisture;
export const energy = (t: DesiccantDehumidifierType) => get(t).energy;
export const lowDewPoint = (t: DesiccantDehumidifierType) => get(t).lowDewPoint;
export const reliability = (t: DesiccantDehumidifierType) => get(t).reliability;
export const ddCost = (t: DesiccantDehumidifierType) => get(t).ddCost;
export const continuous = (t: DesiccantDehumidifierType) => get(t).continuous;
export const forCleanroom = (t: DesiccantDehumidifierType) => get(t).forCleanroom;
export const sorbent = (t: DesiccantDehumidifierType) => get(t).sorbent;
export const bestUse = (t: DesiccantDehumidifierType) => get(t).bestUse;
export const desiccantDehumidifierTypes = (): DesiccantDehumidifierType[] =>
  Object.keys(DATA) as DesiccantDehumidifierType[];
