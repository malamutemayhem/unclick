export type VRingSealType =
  | "v_ring_axial_standard"
  | "v_ring_split_large"
  | "v_packing_chevron"
  | "spring_energized_u"
  | "hat_type_flinger";

interface VRingSealData {
  dustExclusion: number;
  speedLimit: number;
  installEase: number;
  maintenance: number;
  vrCost: number;
  axialSeal: boolean;
  forContamination: boolean;
  profile: string;
  bestUse: string;
}

const DATA: Record<VRingSealType, VRingSealData> = {
  v_ring_axial_standard: {
    dustExclusion: 8, speedLimit: 8, installEase: 10, maintenance: 9, vrCost: 2,
    axialSeal: true, forContamination: true,
    profile: "v_shaped_rubber_ring_axial_lip_on_shaft",
    bestUse: "bearing_protection_conveyor_electric_motor",
  },
  v_ring_split_large: {
    dustExclusion: 7, speedLimit: 7, installEase: 10, maintenance: 10, vrCost: 3,
    axialSeal: true, forContamination: true,
    profile: "split_v_ring_large_diameter_no_disassembly",
    bestUse: "large_shaft_retrofit_no_dismount_bearing_prot",
  },
  v_packing_chevron: {
    dustExclusion: 6, speedLimit: 5, installEase: 6, maintenance: 7, vrCost: 4,
    axialSeal: false, forContamination: false,
    profile: "stacked_v_chevron_rings_adjustable_compression",
    bestUse: "hydraulic_cylinder_rod_piston_high_pressure",
  },
  spring_energized_u: {
    dustExclusion: 7, speedLimit: 6, installEase: 7, maintenance: 8, vrCost: 7,
    axialSeal: false, forContamination: false,
    profile: "u_cup_profile_spring_energized_ptfe_jacket",
    bestUse: "reciprocating_rod_piston_clean_low_friction",
  },
  hat_type_flinger: {
    dustExclusion: 9, speedLimit: 9, installEase: 8, maintenance: 9, vrCost: 3,
    axialSeal: true, forContamination: true,
    profile: "hat_shaped_rubber_flinger_disc_centrifugal",
    bestUse: "high_speed_shaft_slinger_disc_splash_protect",
  },
};

function get(t: VRingSealType): VRingSealData {
  return DATA[t];
}

export const dustExclusion = (t: VRingSealType) => get(t).dustExclusion;
export const speedLimit = (t: VRingSealType) => get(t).speedLimit;
export const installEase = (t: VRingSealType) => get(t).installEase;
export const maintenance = (t: VRingSealType) => get(t).maintenance;
export const vrCost = (t: VRingSealType) => get(t).vrCost;
export const axialSeal = (t: VRingSealType) => get(t).axialSeal;
export const forContamination = (t: VRingSealType) => get(t).forContamination;
export const profile = (t: VRingSealType) => get(t).profile;
export const bestUse = (t: VRingSealType) => get(t).bestUse;
export const vRingSealTypes = (): VRingSealType[] =>
  Object.keys(DATA) as VRingSealType[];
