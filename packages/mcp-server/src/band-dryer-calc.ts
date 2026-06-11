export type BandDryerType =
  | "single_pass"
  | "multi_pass"
  | "vacuum_band"
  | "perforated_band"
  | "foam_mat_band";

interface BandDryerData {
  dryingRate: number;
  throughput: number;
  productQuality: number;
  energyEfficiency: number;
  bdCost: number;
  continuous: boolean;
  forPaste: boolean;
  dryerConfig: string;
  bestUse: string;
}

const DATA: Record<BandDryerType, BandDryerData> = {
  single_pass: {
    dryingRate: 7, throughput: 8, productQuality: 7, energyEfficiency: 6, bdCost: 5,
    continuous: true, forPaste: false,
    dryerConfig: "single_pass_band_dryer_one_belt_hot_air_through_flow_simple",
    bestUse: "vegetable_chip_single_pass_band_dryer_simple_through_air_dry",
  },
  multi_pass: {
    dryingRate: 8, throughput: 9, productQuality: 7, energyEfficiency: 8, bdCost: 7,
    continuous: true, forPaste: false,
    dryerConfig: "multi_pass_band_dryer_stacked_belt_cascade_recirculate_heat",
    bestUse: "herb_leaf_multi_pass_band_dryer_stacked_belt_gentle_long_dry",
  },
  vacuum_band: {
    dryingRate: 6, throughput: 5, productQuality: 9, energyEfficiency: 5, bdCost: 9,
    continuous: true, forPaste: true,
    dryerConfig: "vacuum_band_dryer_low_pressure_belt_gentle_heat_sensitive_dry",
    bestUse: "enzyme_extract_vacuum_band_dryer_low_temp_preserve_bioactive",
  },
  perforated_band: {
    dryingRate: 8, throughput: 8, productQuality: 7, energyEfficiency: 7, bdCost: 6,
    continuous: true, forPaste: false,
    dryerConfig: "perforated_band_dryer_hole_belt_air_up_through_bed_even_dry",
    bestUse: "grain_pellet_perforated_band_dryer_air_through_bed_uniform_dry",
  },
  foam_mat_band: {
    dryingRate: 9, throughput: 6, productQuality: 8, energyEfficiency: 6, bdCost: 8,
    continuous: true, forPaste: true,
    dryerConfig: "foam_mat_band_dryer_whip_foam_spread_belt_rapid_evaporate_dry",
    bestUse: "fruit_juice_foam_mat_band_dryer_foam_spread_rapid_dry_powder",
  },
};

function get(t: BandDryerType): BandDryerData {
  return DATA[t];
}

export const dryingRate = (t: BandDryerType) => get(t).dryingRate;
export const throughput = (t: BandDryerType) => get(t).throughput;
export const productQuality = (t: BandDryerType) => get(t).productQuality;
export const energyEfficiency = (t: BandDryerType) => get(t).energyEfficiency;
export const bdCost = (t: BandDryerType) => get(t).bdCost;
export const continuous = (t: BandDryerType) => get(t).continuous;
export const forPaste = (t: BandDryerType) => get(t).forPaste;
export const dryerConfig = (t: BandDryerType) => get(t).dryerConfig;
export const bestUse = (t: BandDryerType) => get(t).bestUse;
export const bandDryerTypes = (): BandDryerType[] =>
  Object.keys(DATA) as BandDryerType[];
