export type LauterTunType =
  | "traditional_rake"
  | "mash_filter_press"
  | "strain_master"
  | "lauter_grant"
  | "continuous_sparging";

interface LauterTunData {
  lauteringSpeed: number;
  extractEfficiency: number;
  wortClarity: number;
  grainBedDepth: number;
  ltCost: number;
  automated: boolean;
  forHighGravity: boolean;
  vesselConfig: string;
  bestUse: string;
}

const DATA: Record<LauterTunType, LauterTunData> = {
  traditional_rake: {
    lauteringSpeed: 7, extractEfficiency: 8, wortClarity: 8, grainBedDepth: 8, ltCost: 5,
    automated: false, forHighGravity: false,
    vesselConfig: "slotted_false_bottom_rotating_rake_arm_cut_grain_bed_sparge",
    bestUse: "standard_brewery_all_malt_beer_traditional_infusion_lauter",
  },
  mash_filter_press: {
    lauteringSpeed: 10, extractEfficiency: 10, wortClarity: 10, grainBedDepth: 5, ltCost: 9,
    automated: true, forHighGravity: true,
    vesselConfig: "plate_frame_filter_press_thin_cake_high_pressure_squeeze_wort",
    bestUse: "high_adjunct_brew_rice_corn_high_gravity_fast_lauter_squeeze",
  },
  strain_master: {
    lauteringSpeed: 8, extractEfficiency: 7, wortClarity: 7, grainBedDepth: 7, ltCost: 6,
    automated: true, forHighGravity: false,
    vesselConfig: "perforated_screen_drum_rotating_strain_separate_wort_grain",
    bestUse: "craft_brewery_medium_batch_simple_grain_separation_wort_run",
  },
  lauter_grant: {
    lauteringSpeed: 6, extractEfficiency: 7, wortClarity: 9, grainBedDepth: 9, ltCost: 4,
    automated: false, forHighGravity: false,
    vesselConfig: "grant_vessel_below_tun_gravity_collect_wort_sight_glass_flow",
    bestUse: "traditional_gravity_fed_brew_house_wort_collection_monitoring",
  },
  continuous_sparging: {
    lauteringSpeed: 9, extractEfficiency: 9, wortClarity: 7, grainBedDepth: 6, ltCost: 8,
    automated: true, forHighGravity: true,
    vesselConfig: "continuous_counter_flow_sparge_rotating_arm_rinse_grain_sugar",
    bestUse: "large_industrial_brewery_continuous_sparge_maximum_extraction",
  },
};

function get(t: LauterTunType): LauterTunData {
  return DATA[t];
}

export const lauteringSpeed = (t: LauterTunType) => get(t).lauteringSpeed;
export const extractEfficiency = (t: LauterTunType) => get(t).extractEfficiency;
export const wortClarity = (t: LauterTunType) => get(t).wortClarity;
export const grainBedDepth = (t: LauterTunType) => get(t).grainBedDepth;
export const ltCost = (t: LauterTunType) => get(t).ltCost;
export const automated = (t: LauterTunType) => get(t).automated;
export const forHighGravity = (t: LauterTunType) => get(t).forHighGravity;
export const vesselConfig = (t: LauterTunType) => get(t).vesselConfig;
export const bestUse = (t: LauterTunType) => get(t).bestUse;
export const lauterTunTypes = (): LauterTunType[] =>
  Object.keys(DATA) as LauterTunType[];
