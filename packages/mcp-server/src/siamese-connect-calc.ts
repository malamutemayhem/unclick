export type SiameseConnectType =
  | "wall_mount_flush_two"
  | "freestanding_post_two"
  | "roof_manifold_multi"
  | "underground_pit_vault"
  | "clapper_check_swivel";

interface SiameseConnectData {
  accessibility: number;
  durability: number;
  capacity: number;
  aesthetic: number;
  scCost: number;
  frostProof: boolean;
  forHighRise: boolean;
  inlet: string;
  bestUse: string;
}

const DATA: Record<SiameseConnectType, SiameseConnectData> = {
  wall_mount_flush_two: {
    accessibility: 8, durability: 7, capacity: 7, aesthetic: 7, scCost: 4,
    frostProof: false, forHighRise: false,
    inlet: "two_2_5_inch_nst_clapper",
    bestUse: "standard_building_wall_mount",
  },
  freestanding_post_two: {
    accessibility: 10, durability: 8, capacity: 7, aesthetic: 6, scCost: 6,
    frostProof: true, forHighRise: false,
    inlet: "two_2_5_inch_post_indicator",
    bestUse: "setback_building_yard_access",
  },
  roof_manifold_multi: {
    accessibility: 5, durability: 7, capacity: 10, aesthetic: 4, scCost: 8,
    frostProof: false, forHighRise: true,
    inlet: "four_2_5_inch_manifold_header",
    bestUse: "high_rise_multiple_zone_supply",
  },
  underground_pit_vault: {
    accessibility: 4, durability: 9, capacity: 8, aesthetic: 9, scCost: 9,
    frostProof: true, forHighRise: false,
    inlet: "two_4_inch_storz_pit_cover",
    bestUse: "campus_flush_grade_concealed",
  },
  clapper_check_swivel: {
    accessibility: 7, durability: 6, capacity: 7, aesthetic: 6, scCost: 3,
    frostProof: false, forHighRise: false,
    inlet: "swivel_clapper_auto_drain",
    bestUse: "sprinkler_system_basic_fdc",
  },
};

function get(t: SiameseConnectType): SiameseConnectData {
  return DATA[t];
}

export const accessibility = (t: SiameseConnectType) => get(t).accessibility;
export const durability = (t: SiameseConnectType) => get(t).durability;
export const capacity = (t: SiameseConnectType) => get(t).capacity;
export const aesthetic = (t: SiameseConnectType) => get(t).aesthetic;
export const scCost = (t: SiameseConnectType) => get(t).scCost;
export const frostProof = (t: SiameseConnectType) => get(t).frostProof;
export const forHighRise = (t: SiameseConnectType) => get(t).forHighRise;
export const inlet = (t: SiameseConnectType) => get(t).inlet;
export const bestUse = (t: SiameseConnectType) => get(t).bestUse;
export const siameseConnectTypes = (): SiameseConnectType[] =>
  Object.keys(DATA) as SiameseConnectType[];
