export type PneumaticConveyorType =
  | "dilute_phase_positive"
  | "dilute_phase_vacuum"
  | "dense_phase_pressure"
  | "semi_dense_plug_flow"
  | "combined_push_pull";

interface PneumaticConveyorData {
  capacity: number;
  distance: number;
  gentleness: number;
  energy: number;
  pcCost: number;
  dustFree: boolean;
  forAbrasive: boolean;
  velocity: string;
  bestUse: string;
}

const DATA: Record<PneumaticConveyorType, PneumaticConveyorData> = {
  dilute_phase_positive: {
    capacity: 8, distance: 8, gentleness: 5, energy: 5, pcCost: 5,
    dustFree: true, forAbrasive: false,
    velocity: "high_velocity_20_30_ms_suspension",
    bestUse: "cement_flour_light_powder_transfer",
  },
  dilute_phase_vacuum: {
    capacity: 6, distance: 5, gentleness: 6, energy: 6, pcCost: 4,
    dustFree: true, forAbrasive: false,
    velocity: "vacuum_suction_multiple_pickup",
    bestUse: "multi_point_collection_dust_control",
  },
  dense_phase_pressure: {
    capacity: 9, distance: 10, gentleness: 9, energy: 8, pcCost: 9,
    dustFree: true, forAbrasive: true,
    velocity: "low_velocity_5_10_ms_slug_flow",
    bestUse: "fragile_abrasive_long_distance",
  },
  semi_dense_plug_flow: {
    capacity: 7, distance: 7, gentleness: 8, energy: 7, pcCost: 7,
    dustFree: true, forAbrasive: true,
    velocity: "medium_velocity_plug_conveying",
    bestUse: "plastic_pellet_granule_gentle",
  },
  combined_push_pull: {
    capacity: 7, distance: 6, gentleness: 6, energy: 6, pcCost: 6,
    dustFree: true, forAbrasive: false,
    velocity: "vacuum_pickup_pressure_delivery",
    bestUse: "rail_car_unloading_silo_fill",
  },
};

function get(t: PneumaticConveyorType): PneumaticConveyorData {
  return DATA[t];
}

export const capacity = (t: PneumaticConveyorType) => get(t).capacity;
export const distance = (t: PneumaticConveyorType) => get(t).distance;
export const gentleness = (t: PneumaticConveyorType) => get(t).gentleness;
export const energy = (t: PneumaticConveyorType) => get(t).energy;
export const pcCost = (t: PneumaticConveyorType) => get(t).pcCost;
export const dustFree = (t: PneumaticConveyorType) => get(t).dustFree;
export const forAbrasive = (t: PneumaticConveyorType) => get(t).forAbrasive;
export const velocity = (t: PneumaticConveyorType) => get(t).velocity;
export const bestUse = (t: PneumaticConveyorType) => get(t).bestUse;
export const pneumaticConveyorTypes = (): PneumaticConveyorType[] =>
  Object.keys(DATA) as PneumaticConveyorType[];
