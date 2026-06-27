export type BlowerType =
  | "centrifugal_radial_fan"
  | "positive_displacement_rotary_lobe"
  | "regenerative_side_channel"
  | "axial_propeller_tube"
  | "multistage_centrifugal_turbo";

interface BlowerData {
  pressure: number;
  flow: number;
  efficiency: number;
  noise: number;
  bwCost: number;
  oilFree: boolean;
  forAeration: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<BlowerType, BlowerData> = {
  centrifugal_radial_fan: {
    pressure: 5, flow: 8, efficiency: 7, noise: 5, bwCost: 5,
    oilFree: true, forAeration: false,
    impeller: "backward_curved_radial_blade",
    bestUse: "ventilation_dust_collection_hvac",
  },
  positive_displacement_rotary_lobe: {
    pressure: 8, flow: 7, efficiency: 6, noise: 4, bwCost: 7,
    oilFree: true, forAeration: true,
    impeller: "tri_lobe_rotor_timing_gear",
    bestUse: "wastewater_aeration_pneumatic_convey",
  },
  regenerative_side_channel: {
    pressure: 6, flow: 4, efficiency: 5, noise: 6, bwCost: 4,
    oilFree: true, forAeration: false,
    impeller: "peripheral_vane_recirculate",
    bestUse: "aquaculture_dental_vacuum_spa",
  },
  axial_propeller_tube: {
    pressure: 2, flow: 10, efficiency: 8, noise: 4, bwCost: 3,
    oilFree: true, forAeration: false,
    impeller: "propeller_blade_tube_axial",
    bestUse: "cooling_tower_mine_vent_tunnel",
  },
  multistage_centrifugal_turbo: {
    pressure: 9, flow: 9, efficiency: 9, noise: 7, bwCost: 10,
    oilFree: true, forAeration: true,
    impeller: "multi_impeller_integrally_geared",
    bestUse: "large_wwtp_steel_plant_air_supply",
  },
};

function get(t: BlowerType): BlowerData {
  return DATA[t];
}

export const pressure = (t: BlowerType) => get(t).pressure;
export const flow = (t: BlowerType) => get(t).flow;
export const efficiency = (t: BlowerType) => get(t).efficiency;
export const noise = (t: BlowerType) => get(t).noise;
export const bwCost = (t: BlowerType) => get(t).bwCost;
export const oilFree = (t: BlowerType) => get(t).oilFree;
export const forAeration = (t: BlowerType) => get(t).forAeration;
export const impeller = (t: BlowerType) => get(t).impeller;
export const bestUse = (t: BlowerType) => get(t).bestUse;
export const blowerTypes = (): BlowerType[] =>
  Object.keys(DATA) as BlowerType[];
