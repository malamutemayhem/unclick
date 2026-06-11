export type WaterstopType =
  | "pvc_dumbbell_center_bulb"
  | "rubber_flat_strip_bentonite"
  | "hydrophilic_swelling_strip"
  | "metal_copper_stainless_plate"
  | "injectable_grout_tube_hose";

interface WaterstopData {
  waterproof: number;
  movement: number;
  durability: number;
  installEase: number;
  wsCost: number;
  swelling: boolean;
  forJoint: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<WaterstopType, WaterstopData> = {
  pvc_dumbbell_center_bulb: {
    waterproof: 9, movement: 8, durability: 8, installEase: 6, wsCost: 4,
    swelling: false, forJoint: true,
    material: "pvc_ribbed_center_bulb_profile",
    bestUse: "expansion_joint_below_grade_wall",
  },
  rubber_flat_strip_bentonite: {
    waterproof: 8, movement: 6, durability: 7, installEase: 7, wsCost: 5,
    swelling: false, forJoint: true,
    material: "epdm_rubber_flat_strip_nailed",
    bestUse: "construction_joint_slab_wall_base",
  },
  hydrophilic_swelling_strip: {
    waterproof: 7, movement: 3, durability: 6, installEase: 9, wsCost: 3,
    swelling: true, forJoint: true,
    material: "bentonite_rubber_composite_strip",
    bestUse: "construction_joint_simple_install",
  },
  metal_copper_stainless_plate: {
    waterproof: 10, movement: 9, durability: 10, installEase: 3, wsCost: 9,
    swelling: false, forJoint: true,
    material: "copper_stainless_steel_sheet_plate",
    bestUse: "dam_tunnel_critical_movement_joint",
  },
  injectable_grout_tube_hose: {
    waterproof: 8, movement: 4, durability: 7, installEase: 8, wsCost: 6,
    swelling: false, forJoint: true,
    material: "perforated_hose_grout_inject",
    bestUse: "remedial_leak_repair_existing_joint",
  },
};

function get(t: WaterstopType): WaterstopData {
  return DATA[t];
}

export const waterproof = (t: WaterstopType) => get(t).waterproof;
export const movement = (t: WaterstopType) => get(t).movement;
export const durability = (t: WaterstopType) => get(t).durability;
export const installEase = (t: WaterstopType) => get(t).installEase;
export const wsCost = (t: WaterstopType) => get(t).wsCost;
export const swelling = (t: WaterstopType) => get(t).swelling;
export const forJoint = (t: WaterstopType) => get(t).forJoint;
export const material = (t: WaterstopType) => get(t).material;
export const bestUse = (t: WaterstopType) => get(t).bestUse;
export const waterstopTypes = (): WaterstopType[] =>
  Object.keys(DATA) as WaterstopType[];
