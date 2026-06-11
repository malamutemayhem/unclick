export type BallastSystemType =
  | "gravity_sea_chest"
  | "uv_treatment_inline"
  | "electrochlorination"
  | "ballast_water_exchange"
  | "filtration_uv_combo";

const DATA: Record<BallastSystemType, {
  treatmentEff: number; flowRate: number; compliance: number;
  footprint: number; blCost: number; chemical: boolean;
  forRetrofit: boolean; method: string; bestUse: string;
}> = {
  gravity_sea_chest: {
    treatmentEff: 1, flowRate: 10, compliance: 1,
    footprint: 9, blCost: 1, chemical: false,
    forRetrofit: false, method: "gravity_fill_discharge",
    bestUse: "legacy_vessel_no_treatment",
  },
  uv_treatment_inline: {
    treatmentEff: 8, flowRate: 7, compliance: 9,
    footprint: 7, blCost: 3, chemical: false,
    forRetrofit: true, method: "medium_pressure_uv_lamp",
    bestUse: "tanker_bulk_imo_d2_compliance",
  },
  electrochlorination: {
    treatmentEff: 9, flowRate: 8, compliance: 9,
    footprint: 5, blCost: 4, chemical: true,
    forRetrofit: true, method: "seawater_electrolysis_naclo",
    bestUse: "large_vessel_high_flow_bwms",
  },
  ballast_water_exchange: {
    treatmentEff: 5, flowRate: 6, compliance: 5,
    footprint: 10, blCost: 1, chemical: false,
    forRetrofit: true, method: "sequential_flow_through_exchange",
    bestUse: "interim_mid_ocean_exchange",
  },
  filtration_uv_combo: {
    treatmentEff: 10, flowRate: 6, compliance: 10,
    footprint: 4, blCost: 5, chemical: false,
    forRetrofit: true, method: "auto_backwash_filter_plus_uv",
    bestUse: "container_ship_uscg_type_approved",
  },
};

const get = (t: BallastSystemType) => DATA[t];

export const treatmentEff = (t: BallastSystemType) => get(t).treatmentEff;
export const flowRate = (t: BallastSystemType) => get(t).flowRate;
export const compliance = (t: BallastSystemType) => get(t).compliance;
export const footprint = (t: BallastSystemType) => get(t).footprint;
export const blCost = (t: BallastSystemType) => get(t).blCost;
export const chemical = (t: BallastSystemType) => get(t).chemical;
export const forRetrofit = (t: BallastSystemType) => get(t).forRetrofit;
export const method = (t: BallastSystemType) => get(t).method;
export const bestUse = (t: BallastSystemType) => get(t).bestUse;
export const ballastSystemTypes = (): BallastSystemType[] => Object.keys(DATA) as BallastSystemType[];
