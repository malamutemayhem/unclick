export type ScumSkimmerType =
  | "chain_flight_skim"
  | "rotary_pipe_skim"
  | "helical_skim"
  | "beach_plate_skim"
  | "floating_weir_skim";

interface ScumSkimmerData {
  removalRate: number;
  throughput: number;
  surfaceCoverage: number;
  reliability: number;
  ssCost: number;
  submerged: boolean;
  forPrimary: boolean;
  skimmerConfig: string;
  bestUse: string;
}

const DATA: Record<ScumSkimmerType, ScumSkimmerData> = {
  chain_flight_skim: {
    removalRate: 8, throughput: 9, surfaceCoverage: 9, reliability: 7, ssCost: 7,
    submerged: true, forPrimary: true,
    skimmerConfig: "chain_flight_skimmer_collector_blade_push_scum_trough_continuous",
    bestUse: "primary_clarifier_chain_flight_skimmer_full_surface_scum_remove",
  },
  rotary_pipe_skim: {
    removalRate: 7, throughput: 8, surfaceCoverage: 7, reliability: 9, ssCost: 5,
    submerged: true, forPrimary: true,
    skimmerConfig: "rotary_pipe_skimmer_slotted_tube_rotate_skim_simple_reliable",
    bestUse: "circular_clarifier_rotary_pipe_skimmer_simple_slot_rotate_skim",
  },
  helical_skim: {
    removalRate: 9, throughput: 7, surfaceCoverage: 8, reliability: 8, ssCost: 8,
    submerged: false, forPrimary: true,
    skimmerConfig: "helical_skimmer_spiral_blade_lift_scum_above_water_level_convey",
    bestUse: "daf_tank_helical_skimmer_spiral_lift_float_sludge_concentrate",
  },
  beach_plate_skim: {
    removalRate: 6, throughput: 7, surfaceCoverage: 6, reliability: 10, ssCost: 3,
    submerged: false, forPrimary: false,
    skimmerConfig: "beach_plate_skimmer_inclined_surface_gravity_drain_no_moving_part",
    bestUse: "secondary_clarifier_beach_plate_skimmer_passive_gravity_no_power",
  },
  floating_weir_skim: {
    removalRate: 10, throughput: 6, surfaceCoverage: 10, reliability: 6, ssCost: 6,
    submerged: true, forPrimary: false,
    skimmerConfig: "floating_weir_skimmer_adjustable_level_thin_layer_precise_skim",
    bestUse: "oil_water_separator_floating_weir_skimmer_thin_layer_precise",
  },
};

function get(t: ScumSkimmerType): ScumSkimmerData {
  return DATA[t];
}

export const removalRate = (t: ScumSkimmerType) => get(t).removalRate;
export const throughput = (t: ScumSkimmerType) => get(t).throughput;
export const surfaceCoverage = (t: ScumSkimmerType) => get(t).surfaceCoverage;
export const reliability = (t: ScumSkimmerType) => get(t).reliability;
export const ssCost = (t: ScumSkimmerType) => get(t).ssCost;
export const submerged = (t: ScumSkimmerType) => get(t).submerged;
export const forPrimary = (t: ScumSkimmerType) => get(t).forPrimary;
export const skimmerConfig = (t: ScumSkimmerType) => get(t).skimmerConfig;
export const bestUse = (t: ScumSkimmerType) => get(t).bestUse;
export const scumSkimmerTypes = (): ScumSkimmerType[] =>
  Object.keys(DATA) as ScumSkimmerType[];
