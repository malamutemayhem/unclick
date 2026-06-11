export type ScrubberFgdType =
  | "wet_limestone"
  | "dry_sorbent_injection"
  | "spray_dry_absorber"
  | "seawater_scrubber"
  | "dual_alkali";

interface ScrubberFgdData {
  so2Removal: number;
  throughput: number;
  waterUsage: number;
  byproductValue: number;
  fgdCost: number;
  wet: boolean;
  forHighSulfur: boolean;
  reagent: string;
  bestUse: string;
}

const DATA: Record<ScrubberFgdType, ScrubberFgdData> = {
  wet_limestone: {
    so2Removal: 10, throughput: 10, waterUsage: 4, byproductValue: 9, fgdCost: 8,
    wet: true, forHighSulfur: true,
    reagent: "ground_limestone_caco3_slurry_gypsum_byproduct_wallboard",
    bestUse: "large_coal_fired_power_plant_high_sulfur_coal_gypsum_sale",
  },
  dry_sorbent_injection: {
    so2Removal: 6, throughput: 7, waterUsage: 10, byproductValue: 3, fgdCost: 4,
    wet: false, forHighSulfur: false,
    reagent: "hydrated_lime_trona_sodium_bicarb_inject_into_duct_baghouse",
    bestUse: "small_industrial_boiler_retrofit_low_sulfur_fuel_simple",
  },
  spray_dry_absorber: {
    so2Removal: 8, throughput: 8, waterUsage: 8, byproductValue: 4, fgdCost: 6,
    wet: false, forHighSulfur: false,
    reagent: "lime_slurry_atomizer_spray_into_absorber_dry_powder_collect",
    bestUse: "medium_power_plant_waste_incinerator_acid_gas_hcl_so2",
  },
  seawater_scrubber: {
    so2Removal: 9, throughput: 9, waterUsage: 3, byproductValue: 5, fgdCost: 5,
    wet: true, forHighSulfur: true,
    reagent: "natural_seawater_alkalinity_absorb_so2_discharge_treated",
    bestUse: "coastal_power_plant_refinery_seawater_available_no_reagent",
  },
  dual_alkali: {
    so2Removal: 9, throughput: 8, waterUsage: 5, byproductValue: 6, fgdCost: 7,
    wet: true, forHighSulfur: true,
    reagent: "sodium_hydroxide_scrub_lime_regenerate_closed_loop_recycle",
    bestUse: "industrial_smelter_high_so2_concentration_closed_loop_regen",
  },
};

function get(t: ScrubberFgdType): ScrubberFgdData {
  return DATA[t];
}

export const so2Removal = (t: ScrubberFgdType) => get(t).so2Removal;
export const throughput = (t: ScrubberFgdType) => get(t).throughput;
export const waterUsage = (t: ScrubberFgdType) => get(t).waterUsage;
export const byproductValue = (t: ScrubberFgdType) => get(t).byproductValue;
export const fgdCost = (t: ScrubberFgdType) => get(t).fgdCost;
export const wet = (t: ScrubberFgdType) => get(t).wet;
export const forHighSulfur = (t: ScrubberFgdType) => get(t).forHighSulfur;
export const reagent = (t: ScrubberFgdType) => get(t).reagent;
export const bestUse = (t: ScrubberFgdType) => get(t).bestUse;
export const scrubberFgdTypes = (): ScrubberFgdType[] =>
  Object.keys(DATA) as ScrubberFgdType[];
