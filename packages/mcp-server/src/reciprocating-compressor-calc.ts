export type ReciprocatingCompressorType =
  | "single_acting_trunk"
  | "double_acting_crosshead"
  | "labyrinth_piston_seal"
  | "diaphragm_hermetic"
  | "hyper_compressor_ldpe";

interface ReciprocatingCompressorData {
  pressureRatio: number;
  efficiency: number;
  flowRange: number;
  maintenance: number;
  rcCost: number;
  oilFree: boolean;
  forHighPressure: boolean;
  piston: string;
  bestUse: string;
}

const DATA: Record<ReciprocatingCompressorType, ReciprocatingCompressorData> = {
  single_acting_trunk: {
    pressureRatio: 6, efficiency: 7, flowRange: 6, maintenance: 7, rcCost: 4,
    oilFree: false, forHighPressure: false,
    piston: "trunk_piston_single_acting_simple_compact",
    bestUse: "small_workshop_air_refrigeration_portable",
  },
  double_acting_crosshead: {
    pressureRatio: 8, efficiency: 9, flowRange: 8, maintenance: 6, rcCost: 7,
    oilFree: false, forHighPressure: true,
    piston: "crosshead_double_acting_both_sides_stroke",
    bestUse: "refinery_hydrogen_natural_gas_process_large",
  },
  labyrinth_piston_seal: {
    pressureRatio: 8, efficiency: 8, flowRange: 7, maintenance: 7, rcCost: 8,
    oilFree: true, forHighPressure: true,
    piston: "labyrinth_groove_piston_non_contact_seal",
    bestUse: "oxygen_chlorine_toxic_gas_oil_free_critical",
  },
  diaphragm_hermetic: {
    pressureRatio: 9, efficiency: 7, flowRange: 4, maintenance: 8, rcCost: 9,
    oilFree: true, forHighPressure: true,
    piston: "metal_diaphragm_hydraulic_drive_zero_leak",
    bestUse: "ultra_high_purity_gas_nuclear_rare_gas_lab",
  },
  hyper_compressor_ldpe: {
    pressureRatio: 10, efficiency: 6, flowRange: 5, maintenance: 4, rcCost: 10,
    oilFree: false, forHighPressure: true,
    piston: "plunger_type_extreme_pressure_3000_bar_plus",
    bestUse: "ldpe_polyethylene_production_3500_bar_ethylene",
  },
};

function get(t: ReciprocatingCompressorType): ReciprocatingCompressorData {
  return DATA[t];
}

export const pressureRatio = (t: ReciprocatingCompressorType) => get(t).pressureRatio;
export const efficiency = (t: ReciprocatingCompressorType) => get(t).efficiency;
export const flowRange = (t: ReciprocatingCompressorType) => get(t).flowRange;
export const maintenance = (t: ReciprocatingCompressorType) => get(t).maintenance;
export const rcCost = (t: ReciprocatingCompressorType) => get(t).rcCost;
export const oilFree = (t: ReciprocatingCompressorType) => get(t).oilFree;
export const forHighPressure = (t: ReciprocatingCompressorType) => get(t).forHighPressure;
export const piston = (t: ReciprocatingCompressorType) => get(t).piston;
export const bestUse = (t: ReciprocatingCompressorType) => get(t).bestUse;
export const reciprocatingCompressorTypes = (): ReciprocatingCompressorType[] =>
  Object.keys(DATA) as ReciprocatingCompressorType[];
