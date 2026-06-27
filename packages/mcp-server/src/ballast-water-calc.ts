export type BallastWaterType =
  | "uv_treatment"
  | "electrochlorination"
  | "chemical_injection"
  | "filtration_uv"
  | "electrolysis_advanced";

interface BallastWaterData {
  flowRate: number;
  effectiveness: number;
  maintenance: number;
  powerConsumption: number;
  bwCost: number;
  chemical: boolean;
  forLargeVessel: boolean;
  treatment: string;
  bestUse: string;
}

const DATA: Record<BallastWaterType, BallastWaterData> = {
  uv_treatment: {
    flowRate: 8, effectiveness: 8, maintenance: 8, powerConsumption: 7, bwCost: 7,
    chemical: false, forLargeVessel: true,
    treatment: "medium_pressure_uv_lamp_inline_reactor_dna_damage_organism",
    bestUse: "bulk_carrier_tanker_fresh_salt_water_imo_d2_compliance",
  },
  electrochlorination: {
    flowRate: 9, effectiveness: 9, maintenance: 6, powerConsumption: 6, bwCost: 8,
    chemical: true, forLargeVessel: true,
    treatment: "in_situ_electrolysis_seawater_hypochlorite_generation_dose",
    bestUse: "large_tanker_vlcc_seawater_only_high_flow_rate_ballast",
  },
  chemical_injection: {
    flowRate: 10, effectiveness: 9, maintenance: 7, powerConsumption: 9, bwCost: 5,
    chemical: true, forLargeVessel: true,
    treatment: "active_substance_chemical_dose_neutralize_before_discharge",
    bestUse: "retrofit_existing_vessel_simple_install_chemical_supply",
  },
  filtration_uv: {
    flowRate: 7, effectiveness: 9, maintenance: 7, powerConsumption: 7, bwCost: 8,
    chemical: false, forLargeVessel: false,
    treatment: "automatic_backwash_filter_plus_uv_reactor_two_stage_clean",
    bestUse: "medium_vessel_ferry_cruise_combined_physical_uv_treatment",
  },
  electrolysis_advanced: {
    flowRate: 8, effectiveness: 10, maintenance: 5, powerConsumption: 5, bwCost: 10,
    chemical: false, forLargeVessel: true,
    treatment: "advanced_oxidation_electrolysis_hydroxyl_radical_generation",
    bestUse: "premium_cruise_lng_carrier_uscg_type_approval_strictest",
  },
};

function get(t: BallastWaterType): BallastWaterData {
  return DATA[t];
}

export const flowRate = (t: BallastWaterType) => get(t).flowRate;
export const effectiveness = (t: BallastWaterType) => get(t).effectiveness;
export const maintenance = (t: BallastWaterType) => get(t).maintenance;
export const powerConsumption = (t: BallastWaterType) => get(t).powerConsumption;
export const bwCost = (t: BallastWaterType) => get(t).bwCost;
export const chemical = (t: BallastWaterType) => get(t).chemical;
export const forLargeVessel = (t: BallastWaterType) => get(t).forLargeVessel;
export const treatment = (t: BallastWaterType) => get(t).treatment;
export const bestUse = (t: BallastWaterType) => get(t).bestUse;
export const ballastWaterTypes = (): BallastWaterType[] =>
  Object.keys(DATA) as BallastWaterType[];
