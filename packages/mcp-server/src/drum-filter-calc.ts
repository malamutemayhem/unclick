export type DrumFilterType =
  | "rotary_vacuum_drum"
  | "rotary_pressure_drum"
  | "precoat_drum_filter"
  | "top_feed_drum_belt"
  | "internal_feed_drum";

interface DrumFilterData {
  throughput: number;
  cakeDryness: number;
  washability: number;
  automation: number;
  drCost: number;
  continuous: boolean;
  forViscous: boolean;
  feed: string;
  bestUse: string;
}

const DATA: Record<DrumFilterType, DrumFilterData> = {
  rotary_vacuum_drum: {
    throughput: 9, cakeDryness: 7, washability: 8, automation: 9, drCost: 6,
    continuous: true, forViscous: false,
    feed: "external_submersion_slurry_trough_vacuum",
    bestUse: "mining_chemical_starch_continuous_dewatering",
  },
  rotary_pressure_drum: {
    throughput: 8, cakeDryness: 9, washability: 9, automation: 8, drCost: 8,
    continuous: true, forViscous: true,
    feed: "enclosed_pressure_vessel_feed_pneumatic_blow",
    bestUse: "fine_chemical_pigment_toxic_enclosed_pressure",
  },
  precoat_drum_filter: {
    throughput: 5, cakeDryness: 6, washability: 3, automation: 7, drCost: 7,
    continuous: true, forViscous: false,
    feed: "diatomaceous_earth_precoat_advancing_blade",
    bestUse: "beverage_pharma_low_solids_clarification",
  },
  top_feed_drum_belt: {
    throughput: 10, cakeDryness: 8, washability: 10, automation: 9, drCost: 7,
    continuous: true, forViscous: false,
    feed: "top_feed_gravity_belt_discharge_horizontal",
    bestUse: "mineral_ore_high_capacity_multi_stage_wash",
  },
  internal_feed_drum: {
    throughput: 7, cakeDryness: 7, washability: 6, automation: 8, drCost: 5,
    continuous: true, forViscous: true,
    feed: "internal_feed_pipe_slurry_inside_drum_rotation",
    bestUse: "wastewater_sludge_thickening_fiber_recovery",
  },
};

function get(t: DrumFilterType): DrumFilterData {
  return DATA[t];
}

export const throughput = (t: DrumFilterType) => get(t).throughput;
export const cakeDryness = (t: DrumFilterType) => get(t).cakeDryness;
export const washability = (t: DrumFilterType) => get(t).washability;
export const automation = (t: DrumFilterType) => get(t).automation;
export const drCost = (t: DrumFilterType) => get(t).drCost;
export const continuous = (t: DrumFilterType) => get(t).continuous;
export const forViscous = (t: DrumFilterType) => get(t).forViscous;
export const feed = (t: DrumFilterType) => get(t).feed;
export const bestUse = (t: DrumFilterType) => get(t).bestUse;
export const drumFilterTypes = (): DrumFilterType[] =>
  Object.keys(DATA) as DrumFilterType[];
