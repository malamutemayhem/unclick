export type ContinuousMinerType =
  | "drum_type"
  | "boring_type"
  | "roadheader"
  | "auger_miner"
  | "surface_miner";

interface ContinuousMinerData {
  speed: number;
  cuttingForce: number;
  selectivity: number;
  mobility: number;
  cmCost__: number;
  underground: boolean;
  forCoal: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<ContinuousMinerType, ContinuousMinerData> = {
  drum_type: {
    speed: 8, cuttingForce: 9, selectivity: 6, mobility: 7, cmCost__: 8,
    underground: true, forCoal: true,
    cutting: "rotating_drum_head_picks_rip_coal_face_loading_conveyor",
    bestUse: "room_and_pillar_coal_mine_medium_seam_underground_entry",
  },
  boring_type: {
    speed: 9, cuttingForce: 8, selectivity: 5, mobility: 5, cmCost__: 9,
    underground: true, forCoal: true,
    cutting: "full_face_boring_head_circular_cut_continuous_advance",
    bestUse: "soft_coal_potash_salt_mine_uniform_seam_continuous_bore",
  },
  roadheader: {
    speed: 5, cuttingForce: 10, selectivity: 10, mobility: 8, cmCost__: 7,
    underground: true, forCoal: false,
    cutting: "boom_mounted_rotating_cutterhead_selective_profile_cut",
    bestUse: "tunnel_development_hard_rock_heading_selective_excavation",
  },
  auger_miner: {
    speed: 7, cuttingForce: 7, selectivity: 4, mobility: 6, cmCost__: 5,
    underground: true, forCoal: true,
    cutting: "large_diameter_auger_bit_bore_horizontal_into_coal_seam",
    bestUse: "highwall_mining_exposed_seam_recovery_barrier_pillar_coal",
  },
  surface_miner: {
    speed: 6, cuttingForce: 8, selectivity: 7, mobility: 9, cmCost__: 10,
    underground: false, forCoal: false,
    cutting: "rotating_drum_on_crawler_chassis_cut_crush_load_surface",
    bestUse: "limestone_gypsum_coal_surface_selective_mining_no_blasting",
  },
};

function get(t: ContinuousMinerType): ContinuousMinerData {
  return DATA[t];
}

export const speed = (t: ContinuousMinerType) => get(t).speed;
export const cuttingForce = (t: ContinuousMinerType) => get(t).cuttingForce;
export const selectivity = (t: ContinuousMinerType) => get(t).selectivity;
export const mobility = (t: ContinuousMinerType) => get(t).mobility;
export const cmCost__ = (t: ContinuousMinerType) => get(t).cmCost__;
export const underground = (t: ContinuousMinerType) => get(t).underground;
export const forCoal = (t: ContinuousMinerType) => get(t).forCoal;
export const cutting = (t: ContinuousMinerType) => get(t).cutting;
export const bestUse = (t: ContinuousMinerType) => get(t).bestUse;
export const continuousMinerTypes = (): ContinuousMinerType[] =>
  Object.keys(DATA) as ContinuousMinerType[];
