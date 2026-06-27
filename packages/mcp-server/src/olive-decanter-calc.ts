export type OliveDecanterType =
  | "two_phase"
  | "three_phase"
  | "two_half_phase"
  | "vertical_centrifuge"
  | "gravity_settling";

interface OliveDecanterData {
  oilRecovery: number;
  waterUsage: number;
  oilPurity: number;
  throughput: number;
  odCost: number;
  lowWaste: boolean;
  forOrganic: boolean;
  decanterConfig: string;
  bestUse: string;
}

const DATA: Record<OliveDecanterType, OliveDecanterData> = {
  two_phase: {
    oilRecovery: 9, waterUsage: 10, oilPurity: 8, throughput: 8, odCost: 8,
    lowWaste: true, forOrganic: true,
    decanterConfig: "two_phase_olive_decanter_oil_pomace_no_added_water_polyphenol_keep",
    bestUse: "eco_olive_mill_two_phase_decanter_no_water_polyphenol_preserve",
  },
  three_phase: {
    oilRecovery: 8, waterUsage: 4, oilPurity: 9, throughput: 10, odCost: 7,
    lowWaste: false, forOrganic: false,
    decanterConfig: "three_phase_olive_decanter_oil_water_pomace_added_water_high_volume",
    bestUse: "large_olive_mill_three_phase_decanter_high_volume_clean_separation",
  },
  two_half_phase: {
    oilRecovery: 9, waterUsage: 8, oilPurity: 9, throughput: 9, odCost: 9,
    lowWaste: true, forOrganic: true,
    decanterConfig: "two_half_phase_decanter_minimal_water_oil_wet_pomace_best_of_both",
    bestUse: "premium_olive_mill_two_half_phase_decanter_minimal_water_quality",
  },
  vertical_centrifuge: {
    oilRecovery: 7, waterUsage: 6, oilPurity: 10, throughput: 7, odCost: 6,
    lowWaste: false, forOrganic: true,
    decanterConfig: "vertical_centrifuge_olive_disc_stack_final_polish_oil_water_split",
    bestUse: "olive_mill_vertical_centrifuge_final_polish_oil_clarity_purity",
  },
  gravity_settling: {
    oilRecovery: 5, waterUsage: 10, oilPurity: 6, throughput: 2, odCost: 2,
    lowWaste: true, forOrganic: true,
    decanterConfig: "gravity_settling_olive_tank_natural_separate_slow_traditional_rest",
    bestUse: "small_artisan_olive_mill_gravity_settling_natural_slow_traditional",
  },
};

function get(t: OliveDecanterType): OliveDecanterData {
  return DATA[t];
}

export const oilRecovery = (t: OliveDecanterType) => get(t).oilRecovery;
export const waterUsage = (t: OliveDecanterType) => get(t).waterUsage;
export const oilPurity = (t: OliveDecanterType) => get(t).oilPurity;
export const throughput = (t: OliveDecanterType) => get(t).throughput;
export const odCost = (t: OliveDecanterType) => get(t).odCost;
export const lowWaste = (t: OliveDecanterType) => get(t).lowWaste;
export const forOrganic = (t: OliveDecanterType) => get(t).forOrganic;
export const decanterConfig = (t: OliveDecanterType) => get(t).decanterConfig;
export const bestUse = (t: OliveDecanterType) => get(t).bestUse;
export const oliveDecanterTypes = (): OliveDecanterType[] =>
  Object.keys(DATA) as OliveDecanterType[];
