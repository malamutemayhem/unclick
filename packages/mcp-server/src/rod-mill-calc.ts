export type RodMillType =
  | "overflow_rod_wet"
  | "center_peripheral_discharge"
  | "end_peripheral_discharge"
  | "dry_rod_air_swept"
  | "autogenous_rod_sag";

interface RodMillData {
  grindFineness: number;
  capacity: number;
  uniformity: number;
  mediaLife: number;
  rmCost: number;
  wetGrind: boolean;
  forCoarse: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<RodMillType, RodMillData> = {
  overflow_rod_wet: {
    grindFineness: 6, capacity: 8, uniformity: 9, mediaLife: 7, rmCost: 5,
    wetGrind: true, forCoarse: true,
    media: "steel_rod_line_contact_cascade_grind",
    bestUse: "coarse_grind_uniform_product_prep_ball",
  },
  center_peripheral_discharge: {
    grindFineness: 5, capacity: 9, uniformity: 7, mediaLife: 6, rmCost: 6,
    wetGrind: true, forCoarse: true,
    media: "steel_rod_center_feed_peripheral_out",
    bestUse: "high_capacity_open_circuit_single_pass",
  },
  end_peripheral_discharge: {
    grindFineness: 7, capacity: 7, uniformity: 8, mediaLife: 6, rmCost: 6,
    wetGrind: true, forCoarse: false,
    media: "steel_rod_end_feed_end_discharge",
    bestUse: "controlled_grind_narrow_size_distribution",
  },
  dry_rod_air_swept: {
    grindFineness: 8, capacity: 5, uniformity: 6, mediaLife: 5, rmCost: 7,
    wetGrind: false, forCoarse: false,
    media: "steel_rod_air_swept_classifier_loop",
    bestUse: "dry_grind_ite_mineral_powder_no_water",
  },
  autogenous_rod_sag: {
    grindFineness: 4, capacity: 10, uniformity: 5, mediaLife: 10, rmCost: 8,
    wetGrind: true, forCoarse: true,
    media: "ore_itself_plus_rod_semi_autogenous",
    bestUse: "large_mine_primary_grind_sag_circuit",
  },
};

function get(t: RodMillType): RodMillData {
  return DATA[t];
}

export const grindFineness = (t: RodMillType) => get(t).grindFineness;
export const capacity = (t: RodMillType) => get(t).capacity;
export const uniformity = (t: RodMillType) => get(t).uniformity;
export const mediaLife = (t: RodMillType) => get(t).mediaLife;
export const rmCost = (t: RodMillType) => get(t).rmCost;
export const wetGrind = (t: RodMillType) => get(t).wetGrind;
export const forCoarse = (t: RodMillType) => get(t).forCoarse;
export const media = (t: RodMillType) => get(t).media;
export const bestUse = (t: RodMillType) => get(t).bestUse;
export const rodMillTypes = (): RodMillType[] =>
  Object.keys(DATA) as RodMillType[];
