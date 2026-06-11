export type ExpansionJointType =
  | "strip_seal_steel_neoprene"
  | "modular_multiple_seal_gap"
  | "finger_plate_cantilever"
  | "compression_seal_preformed"
  | "sliding_plate_steel_ptfe";

interface ExpansionJointData {
  movement: number;
  durability: number;
  rideQuality: number;
  waterproof: number;
  ejCost: number;
  sealed: boolean;
  forBridge: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ExpansionJointType, ExpansionJointData> = {
  strip_seal_steel_neoprene: {
    movement: 7, durability: 8, rideQuality: 8, waterproof: 9, ejCost: 6,
    sealed: true, forBridge: true,
    material: "steel_extrusion_neoprene_gland",
    bestUse: "highway_bridge_moderate_movement",
  },
  modular_multiple_seal_gap: {
    movement: 10, durability: 7, rideQuality: 6, waterproof: 8, ejCost: 10,
    sealed: true, forBridge: true,
    material: "steel_beam_multiple_neoprene_seal",
    bestUse: "long_span_bridge_large_movement",
  },
  finger_plate_cantilever: {
    movement: 8, durability: 9, rideQuality: 7, waterproof: 4, ejCost: 8,
    sealed: false, forBridge: true,
    material: "steel_finger_plate_meshed",
    bestUse: "heavy_traffic_bridge_steel_deck",
  },
  compression_seal_preformed: {
    movement: 4, durability: 6, rideQuality: 9, waterproof: 7, ejCost: 3,
    sealed: true, forBridge: true,
    material: "neoprene_foam_cellular_strip",
    bestUse: "small_bridge_sidewalk_joint_fill",
  },
  sliding_plate_steel_ptfe: {
    movement: 9, durability: 8, rideQuality: 5, waterproof: 3, ejCost: 7,
    sealed: false, forBridge: true,
    material: "steel_plate_ptfe_bearing_surface",
    bestUse: "skewed_bridge_multi_direction_move",
  },
};

function get(t: ExpansionJointType): ExpansionJointData {
  return DATA[t];
}

export const movement = (t: ExpansionJointType) => get(t).movement;
export const durability = (t: ExpansionJointType) => get(t).durability;
export const rideQuality = (t: ExpansionJointType) => get(t).rideQuality;
export const waterproof = (t: ExpansionJointType) => get(t).waterproof;
export const ejCost = (t: ExpansionJointType) => get(t).ejCost;
export const sealed = (t: ExpansionJointType) => get(t).sealed;
export const forBridge = (t: ExpansionJointType) => get(t).forBridge;
export const material = (t: ExpansionJointType) => get(t).material;
export const bestUse = (t: ExpansionJointType) => get(t).bestUse;
export const expansionJointTypes = (): ExpansionJointType[] =>
  Object.keys(DATA) as ExpansionJointType[];
