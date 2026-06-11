export type ExpansionAnchorType =
  | "torque_controlled_wedge"
  | "displacement_controlled_drop"
  | "undercut_mechanical_drill"
  | "self_tapping_concrete_screw"
  | "toggle_bolt_hollow_wall";

interface ExpansionAnchorData {
  pullout: number;
  shear: number;
  edgeDistance: number;
  installEase: number;
  eaCost: number;
  removable: boolean;
  forCracked: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ExpansionAnchorType, ExpansionAnchorData> = {
  torque_controlled_wedge: {
    pullout: 8, shear: 8, edgeDistance: 5, installEase: 7, eaCost: 5,
    removable: false, forCracked: true,
    mechanism: "wedge_expansion_torque_spread",
    bestUse: "structural_base_plate_overhead_anchor",
  },
  displacement_controlled_drop: {
    pullout: 7, shear: 7, edgeDistance: 6, installEase: 8, eaCost: 3,
    removable: false, forCracked: false,
    mechanism: "cone_set_hammer_displacement",
    bestUse: "flush_mount_ceiling_mep_hanger",
  },
  undercut_mechanical_drill: {
    pullout: 10, shear: 9, edgeDistance: 7, installEase: 4, eaCost: 9,
    removable: false, forCracked: true,
    mechanism: "undercut_cavity_mechanical_lock",
    bestUse: "seismic_critical_safety_anchor",
  },
  self_tapping_concrete_screw: {
    pullout: 5, shear: 5, edgeDistance: 8, installEase: 10, eaCost: 4,
    removable: true, forCracked: false,
    mechanism: "thread_tap_direct_concrete_grip",
    bestUse: "light_fixture_conduit_clip_rapid",
  },
  toggle_bolt_hollow_wall: {
    pullout: 4, shear: 4, edgeDistance: 9, installEase: 9, eaCost: 3,
    removable: false, forCracked: false,
    mechanism: "toggle_wing_spread_behind_wall",
    bestUse: "drywall_hollow_block_light_mount",
  },
};

function get(t: ExpansionAnchorType): ExpansionAnchorData {
  return DATA[t];
}

export const pullout = (t: ExpansionAnchorType) => get(t).pullout;
export const shear = (t: ExpansionAnchorType) => get(t).shear;
export const edgeDistance = (t: ExpansionAnchorType) => get(t).edgeDistance;
export const installEase = (t: ExpansionAnchorType) => get(t).installEase;
export const eaCost = (t: ExpansionAnchorType) => get(t).eaCost;
export const removable = (t: ExpansionAnchorType) => get(t).removable;
export const forCracked = (t: ExpansionAnchorType) => get(t).forCracked;
export const mechanism = (t: ExpansionAnchorType) => get(t).mechanism;
export const bestUse = (t: ExpansionAnchorType) => get(t).bestUse;
export const expansionAnchorTypes = (): ExpansionAnchorType[] =>
  Object.keys(DATA) as ExpansionAnchorType[];
