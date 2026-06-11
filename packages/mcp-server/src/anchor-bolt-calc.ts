export type AnchorBoltType =
  | "wedge_expansion_torque_set"
  | "sleeve_expansion_cone_pull"
  | "drop_in_flush_internal_thread"
  | "chemical_epoxy_adhesive_bond"
  | "cast_in_place_j_bolt_embed";

interface AnchorBoltData {
  pullout: number;
  shear: number;
  vibration: number;
  removability: number;
  abCost: number;
  expansionType: boolean;
  forConcrete: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<AnchorBoltType, AnchorBoltData> = {
  wedge_expansion_torque_set: {
    pullout: 8, shear: 8, vibration: 6, removability: 4, abCost: 5,
    expansionType: true, forConcrete: true,
    mechanism: "wedge_clip_expansion_sleeve",
    bestUse: "structural_steel_base_plate_anchor",
  },
  sleeve_expansion_cone_pull: {
    pullout: 7, shear: 7, vibration: 5, removability: 5, abCost: 4,
    expansionType: true, forConcrete: true,
    mechanism: "cone_pull_sleeve_spread",
    bestUse: "medium_duty_handrail_bracket_fix",
  },
  drop_in_flush_internal_thread: {
    pullout: 6, shear: 6, vibration: 7, removability: 6, abCost: 3,
    expansionType: true, forConcrete: true,
    mechanism: "internal_cone_lip_expansion",
    bestUse: "flush_mount_overhead_concrete_insert",
  },
  chemical_epoxy_adhesive_bond: {
    pullout: 10, shear: 9, vibration: 9, removability: 2, abCost: 8,
    expansionType: false, forConcrete: true,
    mechanism: "resin_capsule_chemical_cure_bond",
    bestUse: "heavy_structural_close_edge_rebar",
  },
  cast_in_place_j_bolt_embed: {
    pullout: 9, shear: 9, vibration: 10, removability: 1, abCost: 3,
    expansionType: false, forConcrete: true,
    mechanism: "j_hook_embedded_wet_concrete",
    bestUse: "foundation_column_base_plate_primary",
  },
};

function get(t: AnchorBoltType): AnchorBoltData {
  return DATA[t];
}

export const pullout = (t: AnchorBoltType) => get(t).pullout;
export const shear = (t: AnchorBoltType) => get(t).shear;
export const vibration = (t: AnchorBoltType) => get(t).vibration;
export const removability = (t: AnchorBoltType) => get(t).removability;
export const abCost = (t: AnchorBoltType) => get(t).abCost;
export const expansionType = (t: AnchorBoltType) => get(t).expansionType;
export const forConcrete = (t: AnchorBoltType) => get(t).forConcrete;
export const mechanism = (t: AnchorBoltType) => get(t).mechanism;
export const bestUse = (t: AnchorBoltType) => get(t).bestUse;
export const anchorBoltTypes = (): AnchorBoltType[] =>
  Object.keys(DATA) as AnchorBoltType[];
