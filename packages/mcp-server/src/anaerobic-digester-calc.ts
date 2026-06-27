export type AnaerobicDigesterType =
  | "cstr_complete_mix"
  | "uasb_upflow_blanket"
  | "egsb_expanded_granular"
  | "plug_flow_covered_lagoon"
  | "dry_batch_garage";

interface AnaerobicDigesterData {
  biogasYield: number;
  loading: number;
  retention: number;
  stability: number;
  adCost: number;
  highRate: boolean;
  forSolids: boolean;
  reactor: string;
  bestUse: string;
}

const DATA: Record<AnaerobicDigesterType, AnaerobicDigesterData> = {
  cstr_complete_mix: {
    biogasYield: 7, loading: 6, retention: 5, stability: 9, adCost: 6,
    highRate: false, forSolids: true,
    reactor: "heated_mixed_tank_mesophilic",
    bestUse: "sewage_sludge_manure_codigest",
  },
  uasb_upflow_blanket: {
    biogasYield: 8, loading: 9, retention: 9, stability: 7, adCost: 5,
    highRate: true, forSolids: false,
    reactor: "upflow_granular_sludge_blanket",
    bestUse: "brewery_distillery_wastewater",
  },
  egsb_expanded_granular: {
    biogasYield: 9, loading: 10, retention: 10, stability: 7, adCost: 7,
    highRate: true, forSolids: false,
    reactor: "expanded_granular_tall_column",
    bestUse: "chemical_pharma_high_cod_water",
  },
  plug_flow_covered_lagoon: {
    biogasYield: 6, loading: 4, retention: 4, stability: 8, adCost: 3,
    highRate: false, forSolids: true,
    reactor: "covered_lagoon_plug_flow_long",
    bestUse: "dairy_farm_manure_simple_biogas",
  },
  dry_batch_garage: {
    biogasYield: 7, loading: 5, retention: 6, stability: 8, adCost: 5,
    highRate: false, forSolids: true,
    reactor: "garage_style_batch_percolate",
    bestUse: "green_waste_msw_dry_ferment",
  },
};

function get(t: AnaerobicDigesterType): AnaerobicDigesterData {
  return DATA[t];
}

export const biogasYield = (t: AnaerobicDigesterType) => get(t).biogasYield;
export const loading = (t: AnaerobicDigesterType) => get(t).loading;
export const retention = (t: AnaerobicDigesterType) => get(t).retention;
export const stability = (t: AnaerobicDigesterType) => get(t).stability;
export const adCost = (t: AnaerobicDigesterType) => get(t).adCost;
export const highRate = (t: AnaerobicDigesterType) => get(t).highRate;
export const forSolids = (t: AnaerobicDigesterType) => get(t).forSolids;
export const reactor = (t: AnaerobicDigesterType) => get(t).reactor;
export const bestUse = (t: AnaerobicDigesterType) => get(t).bestUse;
export const anaerobicDigesterTypes = (): AnaerobicDigesterType[] =>
  Object.keys(DATA) as AnaerobicDigesterType[];
