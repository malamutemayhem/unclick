export type PsaAdsorbType =
  | "psa_hydrogen_purify"
  | "vpsa_oxygen_generate"
  | "tsa_moisture_remove"
  | "psa_nitrogen_generate"
  | "rapid_psa_medical";

interface PsaAdsorbData {
  purity: number;
  recovery: number;
  throughput: number;
  energyUse: number;
  paCost: number;
  continuous: boolean;
  forHighPurity: boolean;
  adsorbent: string;
  bestUse: string;
}

const DATA: Record<PsaAdsorbType, PsaAdsorbData> = {
  psa_hydrogen_purify: {
    purity: 10, recovery: 7, throughput: 8, energyUse: 6, paCost: 8,
    continuous: true, forHighPurity: true,
    adsorbent: "activated_carbon_zeolite_multi_bed",
    bestUse: "refinery_h2_purify_smr_product_clean",
  },
  vpsa_oxygen_generate: {
    purity: 7, recovery: 8, throughput: 9, energyUse: 7, paCost: 7,
    continuous: true, forHighPurity: false,
    adsorbent: "zeolite_lithium_x_nitrogen_selective",
    bestUse: "steel_mill_wastewater_oxygen_on_site",
  },
  tsa_moisture_remove: {
    purity: 8, recovery: 9, throughput: 7, energyUse: 5, paCost: 6,
    continuous: true, forHighPurity: false,
    adsorbent: "molecular_sieve_silica_gel_alumina",
    bestUse: "natural_gas_dehydrate_air_dry_pretreat",
  },
  psa_nitrogen_generate: {
    purity: 9, recovery: 7, throughput: 8, energyUse: 7, paCost: 6,
    continuous: true, forHighPurity: true,
    adsorbent: "carbon_molecular_sieve_kinetic_select",
    bestUse: "inert_blanket_food_pack_electronic_mfg",
  },
  rapid_psa_medical: {
    purity: 8, recovery: 6, throughput: 6, energyUse: 8, paCost: 9,
    continuous: true, forHighPurity: true,
    adsorbent: "fast_cycle_zeolite_compact_bed_valve",
    bestUse: "hospital_oxygen_concentrate_portable",
  },
};

function get(t: PsaAdsorbType): PsaAdsorbData {
  return DATA[t];
}

export const purity = (t: PsaAdsorbType) => get(t).purity;
export const recovery = (t: PsaAdsorbType) => get(t).recovery;
export const throughput = (t: PsaAdsorbType) => get(t).throughput;
export const energyUse = (t: PsaAdsorbType) => get(t).energyUse;
export const paCost = (t: PsaAdsorbType) => get(t).paCost;
export const continuous = (t: PsaAdsorbType) => get(t).continuous;
export const forHighPurity = (t: PsaAdsorbType) => get(t).forHighPurity;
export const adsorbent = (t: PsaAdsorbType) => get(t).adsorbent;
export const bestUse = (t: PsaAdsorbType) => get(t).bestUse;
export const psaAdsorbTypes = (): PsaAdsorbType[] =>
  Object.keys(DATA) as PsaAdsorbType[];
