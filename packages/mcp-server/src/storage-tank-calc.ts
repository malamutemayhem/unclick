export type StorageTankType =
  | "fixed_roof_cone"
  | "floating_roof_external"
  | "internal_floating_roof"
  | "double_wall_containment"
  | "cryogenic_inner_outer";

interface StorageTankData {
  capacity: number;
  vaporLoss: number;
  safety: number;
  maintenance: number;
  stCost: number;
  secondaryContain: boolean;
  forVolatile: boolean;
  roof: string;
  bestUse: string;
}

const DATA: Record<StorageTankType, StorageTankData> = {
  fixed_roof_cone: {
    capacity: 8, vaporLoss: 4, safety: 6, maintenance: 8, stCost: 4,
    secondaryContain: false, forVolatile: false,
    roof: "cone_dome_fixed_steel_welded",
    bestUse: "water_diesel_low_vapor_bulk_store",
  },
  floating_roof_external: {
    capacity: 10, vaporLoss: 9, safety: 7, maintenance: 5, stCost: 7,
    secondaryContain: false, forVolatile: true,
    roof: "pontoon_double_deck_float_seal",
    bestUse: "crude_oil_gasoline_large_terminal",
  },
  internal_floating_roof: {
    capacity: 8, vaporLoss: 8, safety: 8, maintenance: 6, stCost: 6,
    secondaryContain: false, forVolatile: true,
    roof: "aluminum_panel_float_fixed_outer",
    bestUse: "jet_fuel_solvent_weather_protect",
  },
  double_wall_containment: {
    capacity: 7, vaporLoss: 7, safety: 10, maintenance: 7, stCost: 8,
    secondaryContain: true, forVolatile: false,
    roof: "fixed_roof_annular_spill_contain",
    bestUse: "chemical_hazmat_spill_prevention",
  },
  cryogenic_inner_outer: {
    capacity: 6, vaporLoss: 10, safety: 9, maintenance: 6, stCost: 10,
    secondaryContain: true, forVolatile: true,
    roof: "dome_vacuum_perlite_insulate_inner",
    bestUse: "lng_lox_lin_cryogenic_liquid_store",
  },
};

function get(t: StorageTankType): StorageTankData {
  return DATA[t];
}

export const capacity = (t: StorageTankType) => get(t).capacity;
export const vaporLoss = (t: StorageTankType) => get(t).vaporLoss;
export const safety = (t: StorageTankType) => get(t).safety;
export const maintenance = (t: StorageTankType) => get(t).maintenance;
export const stCost = (t: StorageTankType) => get(t).stCost;
export const secondaryContain = (t: StorageTankType) => get(t).secondaryContain;
export const forVolatile = (t: StorageTankType) => get(t).forVolatile;
export const roof = (t: StorageTankType) => get(t).roof;
export const bestUse = (t: StorageTankType) => get(t).bestUse;
export const storageTankTypes = (): StorageTankType[] =>
  Object.keys(DATA) as StorageTankType[];
