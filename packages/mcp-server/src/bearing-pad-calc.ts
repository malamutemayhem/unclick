export type BearingPadType =
  | "elastomeric_plain_neoprene"
  | "elastomeric_steel_reinforced"
  | "pot_bearing_confined_rubber"
  | "spherical_curved_ptfe_surface"
  | "disc_bearing_polyether_urethane";

interface BearingPadData {
  loadCapacity: number;
  rotation: number;
  movement: number;
  durability: number;
  bpCost: number;
  steelReinforced: boolean;
  forBridge: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<BearingPadType, BearingPadData> = {
  elastomeric_plain_neoprene: {
    loadCapacity: 4, rotation: 5, movement: 4, durability: 6, bpCost: 2,
    steelReinforced: false, forBridge: true,
    material: "plain_neoprene_rubber_pad",
    bestUse: "small_bridge_precast_beam_seat",
  },
  elastomeric_steel_reinforced: {
    loadCapacity: 7, rotation: 7, movement: 6, durability: 8, bpCost: 5,
    steelReinforced: true, forBridge: true,
    material: "neoprene_steel_laminate_layers",
    bestUse: "highway_bridge_girder_support",
  },
  pot_bearing_confined_rubber: {
    loadCapacity: 9, rotation: 8, movement: 3, durability: 9, bpCost: 8,
    steelReinforced: true, forBridge: true,
    material: "steel_pot_confined_rubber_disc",
    bestUse: "heavy_load_bridge_pier_fixed_point",
  },
  spherical_curved_ptfe_surface: {
    loadCapacity: 10, rotation: 10, movement: 8, durability: 9, bpCost: 10,
    steelReinforced: true, forBridge: true,
    material: "steel_sphere_ptfe_slide_surface",
    bestUse: "long_span_cable_stayed_bridge",
  },
  disc_bearing_polyether_urethane: {
    loadCapacity: 8, rotation: 9, movement: 5, durability: 8, bpCost: 7,
    steelReinforced: true, forBridge: true,
    material: "polyether_urethane_disc_shim",
    bestUse: "curved_bridge_multi_rotation_point",
  },
};

function get(t: BearingPadType): BearingPadData {
  return DATA[t];
}

export const loadCapacity = (t: BearingPadType) => get(t).loadCapacity;
export const rotation = (t: BearingPadType) => get(t).rotation;
export const movement = (t: BearingPadType) => get(t).movement;
export const durability = (t: BearingPadType) => get(t).durability;
export const bpCost = (t: BearingPadType) => get(t).bpCost;
export const steelReinforced = (t: BearingPadType) => get(t).steelReinforced;
export const forBridge = (t: BearingPadType) => get(t).forBridge;
export const material = (t: BearingPadType) => get(t).material;
export const bestUse = (t: BearingPadType) => get(t).bestUse;
export const bearingPadTypes = (): BearingPadType[] =>
  Object.keys(DATA) as BearingPadType[];
