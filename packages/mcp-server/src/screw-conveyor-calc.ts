export type ScrewConveyorType =
  | "horizontal_trough_standard"
  | "inclined_shaftless_sludge"
  | "vertical_screw_lift"
  | "flexible_spiral_route"
  | "live_bottom_bin_reclaim";

interface ScrewConveyorData {
  throughput: number;
  incline: number;
  versatility: number;
  sealing: number;
  scCost: number;
  enclosed: boolean;
  forPowder: boolean;
  flight: string;
  bestUse: string;
}

const DATA: Record<ScrewConveyorType, ScrewConveyorData> = {
  horizontal_trough_standard: {
    throughput: 9, incline: 3, versatility: 9, sealing: 7, scCost: 5,
    enclosed: true, forPowder: true,
    flight: "helicoid_full_pitch_standard_flight",
    bestUse: "grain_cement_powder_horizontal_move",
  },
  inclined_shaftless_sludge: {
    throughput: 7, incline: 8, versatility: 7, sealing: 9, scCost: 7,
    enclosed: true, forPowder: false,
    flight: "shaftless_ribbon_spiral_no_center",
    bestUse: "sludge_screenings_wet_sticky_incline",
  },
  vertical_screw_lift: {
    throughput: 6, incline: 10, versatility: 5, sealing: 8, scCost: 8,
    enclosed: true, forPowder: true,
    flight: "close_pitch_casing_enclosed_lift",
    bestUse: "grain_elevator_powder_vertical_lift",
  },
  flexible_spiral_route: {
    throughput: 5, incline: 7, versatility: 8, sealing: 9, scCost: 6,
    enclosed: true, forPowder: true,
    flight: "flexible_coil_tube_enclosed_route",
    bestUse: "food_pharma_flexible_path_clean",
  },
  live_bottom_bin_reclaim: {
    throughput: 8, incline: 2, versatility: 6, sealing: 6, scCost: 7,
    enclosed: false, forPowder: false,
    flight: "multiple_parallel_screw_bin_floor",
    bestUse: "silo_hopper_bin_discharge_reclaim",
  },
};

function get(t: ScrewConveyorType): ScrewConveyorData {
  return DATA[t];
}

export const throughput = (t: ScrewConveyorType) => get(t).throughput;
export const incline = (t: ScrewConveyorType) => get(t).incline;
export const versatility = (t: ScrewConveyorType) => get(t).versatility;
export const sealing = (t: ScrewConveyorType) => get(t).sealing;
export const scCost = (t: ScrewConveyorType) => get(t).scCost;
export const enclosed = (t: ScrewConveyorType) => get(t).enclosed;
export const forPowder = (t: ScrewConveyorType) => get(t).forPowder;
export const flight = (t: ScrewConveyorType) => get(t).flight;
export const bestUse = (t: ScrewConveyorType) => get(t).bestUse;
export const screwConveyorTypes = (): ScrewConveyorType[] =>
  Object.keys(DATA) as ScrewConveyorType[];
