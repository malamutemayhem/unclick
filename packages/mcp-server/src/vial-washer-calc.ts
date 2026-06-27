export type VialWasherType =
  | "rotary_jet"
  | "linear_tunnel"
  | "ultrasonic_wash"
  | "air_rinse_only"
  | "high_purity_wfi";

interface VialWasherData {
  cleaningEfficiency: number;
  throughput: number;
  particleRemoval: number;
  waterUsage: number;
  vwCost: number;
  forSterile: boolean;
  forLyophilized: boolean;
  washerConfig: string;
  bestUse: string;
}

const DATA: Record<VialWasherType, VialWasherData> = {
  rotary_jet: {
    cleaningEfficiency: 9, throughput: 9, particleRemoval: 9, waterUsage: 6, vwCost: 7,
    forSterile: true, forLyophilized: false,
    washerConfig: "rotary_jet_vial_washer_invert_spray_nozzle_rinse_blow_dry",
    bestUse: "pharma_injectable_rotary_jet_vial_washer_high_speed_gmp_line",
  },
  linear_tunnel: {
    cleaningEfficiency: 10, throughput: 10, particleRemoval: 10, waterUsage: 7, vwCost: 9,
    forSterile: true, forLyophilized: true,
    washerConfig: "linear_tunnel_vial_washer_multi_zone_rinse_dry_depyrogenate",
    bestUse: "pharma_aseptic_linear_tunnel_washer_depyrogenation_lyophilize",
  },
  ultrasonic_wash: {
    cleaningEfficiency: 10, throughput: 6, particleRemoval: 10, waterUsage: 5, vwCost: 8,
    forSterile: true, forLyophilized: false,
    washerConfig: "ultrasonic_vial_washer_cavitation_clean_rinse_residue_remove",
    bestUse: "biotech_ultrasonic_vial_washer_stubborn_residue_high_purity",
  },
  air_rinse_only: {
    cleaningEfficiency: 5, throughput: 10, particleRemoval: 6, waterUsage: 1, vwCost: 3,
    forSterile: false, forLyophilized: false,
    washerConfig: "air_rinse_vial_washer_compressed_air_blow_particle_remove_dry",
    bestUse: "nutraceutical_air_rinse_vial_washer_dust_removal_dry_fill_line",
  },
  high_purity_wfi: {
    cleaningEfficiency: 10, throughput: 8, particleRemoval: 10, waterUsage: 9, vwCost: 10,
    forSterile: true, forLyophilized: true,
    washerConfig: "high_purity_wfi_vial_washer_water_for_injection_final_rinse",
    bestUse: "pharma_parenteral_wfi_vial_washer_injectable_grade_final_clean",
  },
};

function get(t: VialWasherType): VialWasherData {
  return DATA[t];
}

export const cleaningEfficiency = (t: VialWasherType) => get(t).cleaningEfficiency;
export const throughput = (t: VialWasherType) => get(t).throughput;
export const particleRemoval = (t: VialWasherType) => get(t).particleRemoval;
export const waterUsage = (t: VialWasherType) => get(t).waterUsage;
export const vwCost = (t: VialWasherType) => get(t).vwCost;
export const forSterile = (t: VialWasherType) => get(t).forSterile;
export const forLyophilized = (t: VialWasherType) => get(t).forLyophilized;
export const washerConfig = (t: VialWasherType) => get(t).washerConfig;
export const bestUse = (t: VialWasherType) => get(t).bestUse;
export const vialWasherTypes = (): VialWasherType[] =>
  Object.keys(DATA) as VialWasherType[];
