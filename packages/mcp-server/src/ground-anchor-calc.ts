export type GroundAnchorType =
  | "straight_shaft_gravity"
  | "post_grouted_pressure"
  | "underreamed_bell_shape"
  | "removable_temporary_strand"
  | "micropile_hollow_bar";

const DATA: Record<GroundAnchorType, {
  capacity: number; depth: number; reliability: number;
  corrosionProt: number; gaCost: number; removable: boolean;
  forPermanent: boolean; tendon: string; bestUse: string;
}> = {
  straight_shaft_gravity: {
    capacity: 5, depth: 6, reliability: 7,
    corrosionProt: 6, gaCost: 2, removable: false,
    forPermanent: true, tendon: "steel_bar_single_thread",
    bestUse: "moderate_load_cohesive_soil",
  },
  post_grouted_pressure: {
    capacity: 9, depth: 8, reliability: 9,
    corrosionProt: 8, gaCost: 4, removable: false,
    forPermanent: true, tendon: "multi_strand_sheathed_greased",
    bestUse: "high_load_granular_variable_soil",
  },
  underreamed_bell_shape: {
    capacity: 8, depth: 7, reliability: 7,
    corrosionProt: 5, gaCost: 3, removable: false,
    forPermanent: true, tendon: "steel_bar_dywidag_thread",
    bestUse: "stiff_clay_high_pullout_resist",
  },
  removable_temporary_strand: {
    capacity: 7, depth: 7, reliability: 8,
    corrosionProt: 4, gaCost: 3, removable: true,
    forPermanent: false, tendon: "unbonded_strand_extractable",
    bestUse: "temporary_shoring_adjacent_build",
  },
  micropile_hollow_bar: {
    capacity: 6, depth: 9, reliability: 8,
    corrosionProt: 7, gaCost: 3, removable: false,
    forPermanent: true, tendon: "hollow_bar_self_drill_grout",
    bestUse: "restricted_access_weak_ground",
  },
};

const get = (t: GroundAnchorType) => DATA[t];

export const capacity = (t: GroundAnchorType) => get(t).capacity;
export const depth = (t: GroundAnchorType) => get(t).depth;
export const reliability = (t: GroundAnchorType) => get(t).reliability;
export const corrosionProt = (t: GroundAnchorType) => get(t).corrosionProt;
export const gaCost = (t: GroundAnchorType) => get(t).gaCost;
export const removable = (t: GroundAnchorType) => get(t).removable;
export const forPermanent = (t: GroundAnchorType) => get(t).forPermanent;
export const tendon = (t: GroundAnchorType) => get(t).tendon;
export const bestUse = (t: GroundAnchorType) => get(t).bestUse;
export const groundAnchorTypes = (): GroundAnchorType[] => Object.keys(DATA) as GroundAnchorType[];
