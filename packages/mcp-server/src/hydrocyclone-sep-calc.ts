export type HydrocycloneSepType =
  | "standard_conical_class"
  | "flat_bottom_thicken"
  | "dense_medium_gravity"
  | "dewatering_fine_recovery"
  | "multi_stage_cluster";

interface HydrocycloneSepData {
  cutPoint: number;
  capacity: number;
  sharpness: number;
  wearResist: number;
  hsCost: number;
  pressureFed: boolean;
  forFine: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<HydrocycloneSepType, HydrocycloneSepData> = {
  standard_conical_class: {
    cutPoint: 7, capacity: 8, sharpness: 7, wearResist: 6, hsCost: 4,
    pressureFed: true, forFine: false,
    geometry: "conical_body_tangential_feed_vortex",
    bestUse: "mineral_classify_closed_circuit_grind",
  },
  flat_bottom_thicken: {
    cutPoint: 5, capacity: 9, sharpness: 5, wearResist: 7, hsCost: 4,
    pressureFed: true, forFine: false,
    geometry: "flat_bottom_underflow_high_density",
    bestUse: "thickening_tailings_dewatering_dense",
  },
  dense_medium_gravity: {
    cutPoint: 8, capacity: 7, sharpness: 9, wearResist: 5, hsCost: 6,
    pressureFed: true, forFine: true,
    geometry: "heavy_medium_magnetite_suspension",
    bestUse: "coal_diamond_gravity_separate_density",
  },
  dewatering_fine_recovery: {
    cutPoint: 9, capacity: 5, sharpness: 6, wearResist: 4, hsCost: 5,
    pressureFed: true, forFine: true,
    geometry: "small_diameter_high_g_fine_cut",
    bestUse: "fine_particle_recovery_effluent_clean",
  },
  multi_stage_cluster: {
    cutPoint: 10, capacity: 10, sharpness: 8, wearResist: 6, hsCost: 8,
    pressureFed: true, forFine: true,
    geometry: "cluster_bank_parallel_multi_stage",
    bestUse: "high_capacity_mine_process_multi_cut",
  },
};

function get(t: HydrocycloneSepType): HydrocycloneSepData {
  return DATA[t];
}

export const cutPoint = (t: HydrocycloneSepType) => get(t).cutPoint;
export const capacity = (t: HydrocycloneSepType) => get(t).capacity;
export const sharpness = (t: HydrocycloneSepType) => get(t).sharpness;
export const wearResist = (t: HydrocycloneSepType) => get(t).wearResist;
export const hsCost = (t: HydrocycloneSepType) => get(t).hsCost;
export const pressureFed = (t: HydrocycloneSepType) => get(t).pressureFed;
export const forFine = (t: HydrocycloneSepType) => get(t).forFine;
export const geometry = (t: HydrocycloneSepType) => get(t).geometry;
export const bestUse = (t: HydrocycloneSepType) => get(t).bestUse;
export const hydrocycloneSepTypes = (): HydrocycloneSepType[] =>
  Object.keys(DATA) as HydrocycloneSepType[];
