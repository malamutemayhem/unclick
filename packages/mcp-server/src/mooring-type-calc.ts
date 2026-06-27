export type MooringType =
  | "pile_mooring_fixed_dolphin"
  | "buoy_mooring_catenary_chain"
  | "mediterranean_stern_to_quay"
  | "single_point_turret_spm"
  | "dynamic_positioning_dp";

interface MooringData {
  holding: number;
  flexibility: number;
  depth: number;
  weatherLimit: number;
  mrCost: number;
  permanent: boolean;
  forTanker: boolean;
  system: string;
  bestUse: string;
}

const DATA: Record<MooringType, MooringData> = {
  pile_mooring_fixed_dolphin: {
    holding: 9, flexibility: 3, depth: 5, weatherLimit: 8, mrCost: 7,
    permanent: true, forTanker: false,
    system: "steel_pile_cluster_breast_hook",
    bestUse: "port_berth_fixed_vessel_position",
  },
  buoy_mooring_catenary_chain: {
    holding: 7, flexibility: 8, depth: 7, weatherLimit: 6, mrCost: 5,
    permanent: true, forTanker: false,
    system: "anchor_chain_buoy_pickup_line",
    bestUse: "harbor_anchorage_swing_mooring",
  },
  mediterranean_stern_to_quay: {
    holding: 6, flexibility: 5, depth: 4, weatherLimit: 5, mrCost: 3,
    permanent: false, forTanker: false,
    system: "bow_anchor_stern_line_to_quay",
    bestUse: "marina_yacht_space_efficient",
  },
  single_point_turret_spm: {
    holding: 8, flexibility: 10, depth: 10, weatherLimit: 9, mrCost: 10,
    permanent: true, forTanker: true,
    system: "turret_swivel_hose_riser",
    bestUse: "offshore_tanker_loading_fpso",
  },
  dynamic_positioning_dp: {
    holding: 10, flexibility: 10, depth: 10, weatherLimit: 7, mrCost: 9,
    permanent: false, forTanker: false,
    system: "thruster_gps_computer_stationkeep",
    bestUse: "drill_ship_pipe_lay_subsea_ops",
  },
};

function get(t: MooringType): MooringData {
  return DATA[t];
}

export const holding = (t: MooringType) => get(t).holding;
export const flexibility = (t: MooringType) => get(t).flexibility;
export const depth = (t: MooringType) => get(t).depth;
export const weatherLimit = (t: MooringType) => get(t).weatherLimit;
export const mrCost = (t: MooringType) => get(t).mrCost;
export const permanent = (t: MooringType) => get(t).permanent;
export const forTanker = (t: MooringType) => get(t).forTanker;
export const system = (t: MooringType) => get(t).system;
export const bestUse = (t: MooringType) => get(t).bestUse;
export const mooringTypes = (): MooringType[] =>
  Object.keys(DATA) as MooringType[];
