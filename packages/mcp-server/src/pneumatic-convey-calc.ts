export type PneumaticConveyType =
  | "dilute_phase_positive"
  | "dilute_phase_vacuum"
  | "dense_phase_slug"
  | "dense_phase_plug"
  | "semi_dense_medium";

interface PneumaticConveyData {
  throughput: number;
  distance: number;
  gentleness: number;
  dustFree: number;
  pcCost: number;
  enclosed: boolean;
  forFragile: boolean;
  transport: string;
  bestUse: string;
}

const DATA: Record<PneumaticConveyType, PneumaticConveyData> = {
  dilute_phase_positive: {
    throughput: 8, distance: 7, gentleness: 4, dustFree: 9, pcCost: 5,
    enclosed: true, forFragile: false,
    transport: "high_velocity_air_suspend_particle",
    bestUse: "powder_flour_cement_medium_distance",
  },
  dilute_phase_vacuum: {
    throughput: 5, distance: 5, gentleness: 5, dustFree: 10, pcCost: 4,
    enclosed: true, forFragile: false,
    transport: "suction_negative_pressure_pull_material",
    bestUse: "multi_pickup_point_dust_free_transfer",
  },
  dense_phase_slug: {
    throughput: 7, distance: 9, gentleness: 8, dustFree: 9, pcCost: 8,
    enclosed: true, forFragile: true,
    transport: "low_velocity_slug_full_pipe_batch",
    bestUse: "fragile_abrasive_long_distance_gentle",
  },
  dense_phase_plug: {
    throughput: 6, distance: 8, gentleness: 9, dustFree: 9, pcCost: 7,
    enclosed: true, forFragile: true,
    transport: "discrete_plug_air_knife_separation",
    bestUse: "pellet_granule_minimal_breakage_attrition",
  },
  semi_dense_medium: {
    throughput: 9, distance: 6, gentleness: 6, dustFree: 9, pcCost: 6,
    enclosed: true, forFragile: false,
    transport: "medium_velocity_strand_flow_transition",
    bestUse: "versatile_moderate_rate_mixed_material",
  },
};

function get(t: PneumaticConveyType): PneumaticConveyData {
  return DATA[t];
}

export const throughput = (t: PneumaticConveyType) => get(t).throughput;
export const distance = (t: PneumaticConveyType) => get(t).distance;
export const gentleness = (t: PneumaticConveyType) => get(t).gentleness;
export const dustFree = (t: PneumaticConveyType) => get(t).dustFree;
export const pcCost = (t: PneumaticConveyType) => get(t).pcCost;
export const enclosed = (t: PneumaticConveyType) => get(t).enclosed;
export const forFragile = (t: PneumaticConveyType) => get(t).forFragile;
export const transport = (t: PneumaticConveyType) => get(t).transport;
export const bestUse = (t: PneumaticConveyType) => get(t).bestUse;
export const pneumaticConveyTypes = (): PneumaticConveyType[] =>
  Object.keys(DATA) as PneumaticConveyType[];
