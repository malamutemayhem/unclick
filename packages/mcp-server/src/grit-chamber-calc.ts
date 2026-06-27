export type GritChamberType =
  | "horizontal_flow_grit"
  | "aerated_grit"
  | "vortex_grit"
  | "detritor_grit"
  | "stacked_tray_grit";

interface GritChamberData {
  removalEfficiency: number;
  throughput: number;
  organicSeparation: number;
  footprint: number;
  gcCost: number;
  mechanical: boolean;
  forLargeWwtp: boolean;
  chamberConfig: string;
  bestUse: string;
}

const DATA: Record<GritChamberType, GritChamberData> = {
  horizontal_flow_grit: {
    removalEfficiency: 5, throughput: 7, organicSeparation: 4, footprint: 4, gcCost: 3,
    mechanical: false, forLargeWwtp: false,
    chamberConfig: "horizontal_flow_grit_channel_velocity_control_settle_heavy_particle",
    bestUse: "small_wwtp_horizontal_flow_grit_channel_simple_gravity_settle",
  },
  aerated_grit: {
    removalEfficiency: 8, throughput: 9, organicSeparation: 9, footprint: 7, gcCost: 7,
    mechanical: true, forLargeWwtp: true,
    chamberConfig: "aerated_grit_chamber_air_roll_spiral_separate_organic_from_grit",
    bestUse: "municipal_wwtp_aerated_grit_chamber_spiral_roll_organic_separate",
  },
  vortex_grit: {
    removalEfficiency: 9, throughput: 8, organicSeparation: 8, footprint: 9, gcCost: 8,
    mechanical: true, forLargeWwtp: true,
    chamberConfig: "vortex_grit_chamber_forced_vortex_paddle_centrifugal_concentrate",
    bestUse: "large_wwtp_vortex_grit_chamber_compact_centrifugal_high_removal",
  },
  detritor_grit: {
    removalEfficiency: 7, throughput: 8, organicSeparation: 7, footprint: 6, gcCost: 5,
    mechanical: true, forLargeWwtp: false,
    chamberConfig: "detritor_grit_chamber_constant_velocity_scraper_bucket_remove",
    bestUse: "medium_wwtp_detritor_grit_chamber_constant_velocity_scraper_clean",
  },
  stacked_tray_grit: {
    removalEfficiency: 10, throughput: 7, organicSeparation: 10, footprint: 10, gcCost: 9,
    mechanical: true, forLargeWwtp: true,
    chamberConfig: "stacked_tray_grit_chamber_multi_level_lamella_fine_grit_capture",
    bestUse: "upgrade_retrofit_stacked_tray_grit_chamber_fine_grit_compact",
  },
};

function get(t: GritChamberType): GritChamberData {
  return DATA[t];
}

export const removalEfficiency = (t: GritChamberType) => get(t).removalEfficiency;
export const throughput = (t: GritChamberType) => get(t).throughput;
export const organicSeparation = (t: GritChamberType) => get(t).organicSeparation;
export const footprint = (t: GritChamberType) => get(t).footprint;
export const gcCost = (t: GritChamberType) => get(t).gcCost;
export const mechanical = (t: GritChamberType) => get(t).mechanical;
export const forLargeWwtp = (t: GritChamberType) => get(t).forLargeWwtp;
export const chamberConfig = (t: GritChamberType) => get(t).chamberConfig;
export const bestUse = (t: GritChamberType) => get(t).bestUse;
export const gritChamberTypes = (): GritChamberType[] =>
  Object.keys(DATA) as GritChamberType[];
