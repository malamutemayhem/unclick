export type OlivePressType =
  | "mat_stack"
  | "hydraulic_press"
  | "screw_press"
  | "percolation"
  | "sinolea_drip";

interface OlivePressData {
  oilYield: number;
  oilQuality: number;
  throughput: number;
  laborRequired: number;
  opCost: number;
  continuous: boolean;
  forPremium: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<OlivePressType, OlivePressData> = {
  mat_stack: {
    oilYield: 7, oilQuality: 9, throughput: 3, laborRequired: 2, opCost: 4,
    continuous: false, forPremium: true,
    pressConfig: "mat_stack_olive_press_fiber_disc_stack_hydraulic_traditional_batch",
    bestUse: "traditional_olive_estate_mat_stack_press_artisan_premium_batch",
  },
  hydraulic_press: {
    oilYield: 8, oilQuality: 8, throughput: 5, laborRequired: 4, opCost: 5,
    continuous: false, forPremium: true,
    pressConfig: "hydraulic_press_olive_piston_chamber_high_pressure_paste_separate",
    bestUse: "mid_size_olive_mill_hydraulic_press_good_quality_moderate_volume",
  },
  screw_press: {
    oilYield: 8, oilQuality: 7, throughput: 8, laborRequired: 7, opCost: 6,
    continuous: true, forPremium: false,
    pressConfig: "screw_press_olive_continuous_auger_barrel_paste_squeeze_pomace",
    bestUse: "commercial_olive_mill_screw_press_continuous_moderate_quality_yield",
  },
  percolation: {
    oilYield: 6, oilQuality: 10, throughput: 4, laborRequired: 5, opCost: 7,
    continuous: false, forPremium: true,
    pressConfig: "percolation_olive_selective_steel_blade_dip_drain_free_run_oil",
    bestUse: "premium_evoo_percolation_selective_extraction_first_drip_highest_quality",
  },
  sinolea_drip: {
    oilYield: 5, oilQuality: 10, throughput: 3, laborRequired: 8, opCost: 8,
    continuous: false, forPremium: true,
    pressConfig: "sinolea_drip_olive_stainless_blade_paste_contact_oil_adhere_drain",
    bestUse: "ultra_premium_evoo_sinolea_drip_first_oil_cold_no_pressure_pure",
  },
};

function get(t: OlivePressType): OlivePressData {
  return DATA[t];
}

export const oilYield = (t: OlivePressType) => get(t).oilYield;
export const oilQuality = (t: OlivePressType) => get(t).oilQuality;
export const throughput = (t: OlivePressType) => get(t).throughput;
export const laborRequired = (t: OlivePressType) => get(t).laborRequired;
export const opCost = (t: OlivePressType) => get(t).opCost;
export const continuous = (t: OlivePressType) => get(t).continuous;
export const forPremium = (t: OlivePressType) => get(t).forPremium;
export const pressConfig = (t: OlivePressType) => get(t).pressConfig;
export const bestUse = (t: OlivePressType) => get(t).bestUse;
export const olivePressTypes = (): OlivePressType[] =>
  Object.keys(DATA) as OlivePressType[];
