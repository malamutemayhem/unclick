export type GrapeCrusherType =
  | "roller_crusher"
  | "centrifugal_crusher"
  | "bladeless_impeller"
  | "whole_cluster_bypass"
  | "cryo_maceration";

interface GrapeCrusherData {
  berryIntegrity: number;
  throughput: number;
  seedDamage: number;
  stemRemoval: number;
  gcCost: number;
  gentle: boolean;
  forPinot: boolean;
  crusherConfig: string;
  bestUse: string;
}

const DATA: Record<GrapeCrusherType, GrapeCrusherData> = {
  roller_crusher: {
    berryIntegrity: 6, throughput: 8, seedDamage: 5, stemRemoval: 7, gcCost: 5,
    gentle: false, forPinot: false,
    crusherConfig: "roller_crusher_adjustable_gap_rubber_roller_grape_berry_split",
    bestUse: "standard_winery_roller_crusher_adjustable_gap_split_berry_juice",
  },
  centrifugal_crusher: {
    berryIntegrity: 4, throughput: 10, seedDamage: 3, stemRemoval: 8, gcCost: 7,
    gentle: false, forPinot: false,
    crusherConfig: "centrifugal_crusher_spinning_drum_high_speed_grape_pulp_extract",
    bestUse: "bulk_wine_production_centrifugal_crusher_high_volume_rapid_process",
  },
  bladeless_impeller: {
    berryIntegrity: 8, throughput: 7, seedDamage: 8, stemRemoval: 6, gcCost: 6,
    gentle: true, forPinot: true,
    crusherConfig: "bladeless_impeller_crusher_gentle_rotation_minimal_seed_damage",
    bestUse: "premium_red_wine_bladeless_impeller_gentle_crush_seed_preserve",
  },
  whole_cluster_bypass: {
    berryIntegrity: 10, throughput: 6, seedDamage: 10, stemRemoval: 3, gcCost: 4,
    gentle: true, forPinot: true,
    crusherConfig: "whole_cluster_bypass_no_crush_direct_ferment_carbonic_maceration",
    bestUse: "pinot_noir_whole_cluster_bypass_carbonic_maceration_stem_include",
  },
  cryo_maceration: {
    berryIntegrity: 9, throughput: 5, seedDamage: 9, stemRemoval: 7, gcCost: 9,
    gentle: true, forPinot: true,
    crusherConfig: "cryo_maceration_cold_soak_dry_ice_pre_ferment_color_aroma_extract",
    bestUse: "premium_pinot_cryo_maceration_cold_soak_color_aroma_extraction",
  },
};

function get(t: GrapeCrusherType): GrapeCrusherData {
  return DATA[t];
}

export const berryIntegrity = (t: GrapeCrusherType) => get(t).berryIntegrity;
export const throughput = (t: GrapeCrusherType) => get(t).throughput;
export const seedDamage = (t: GrapeCrusherType) => get(t).seedDamage;
export const stemRemoval = (t: GrapeCrusherType) => get(t).stemRemoval;
export const gcCost = (t: GrapeCrusherType) => get(t).gcCost;
export const gentle = (t: GrapeCrusherType) => get(t).gentle;
export const forPinot = (t: GrapeCrusherType) => get(t).forPinot;
export const crusherConfig = (t: GrapeCrusherType) => get(t).crusherConfig;
export const bestUse = (t: GrapeCrusherType) => get(t).bestUse;
export const grapeCrusherTypes = (): GrapeCrusherType[] =>
  Object.keys(DATA) as GrapeCrusherType[];
