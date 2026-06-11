export type GrainElevatorType =
  | "bucket_elevator"
  | "pneumatic_conveyor"
  | "chain_conveyor"
  | "screw_auger"
  | "belt_conveyor";

interface GrainElevatorData {
  speed: number;
  capacity: number;
  grainGentle: number;
  energyEfficiency: number;
  geCost: number;
  enclosed: boolean;
  forVerticalLift: boolean;
  transport: string;
  bestUse: string;
}

const DATA: Record<GrainElevatorType, GrainElevatorData> = {
  bucket_elevator: {
    speed: 8, capacity: 9, grainGentle: 7, energyEfficiency: 8, geCost: 7,
    enclosed: true, forVerticalLift: true,
    transport: "continuous_belt_or_chain_mounted_buckets_vertical_discharge",
    bestUse: "grain_terminal_silo_loading_vertical_lift_bulk_storage",
  },
  pneumatic_conveyor: {
    speed: 7, capacity: 5, grainGentle: 5, energyEfficiency: 4, geCost: 6,
    enclosed: true, forVerticalLift: true,
    transport: "air_stream_positive_or_negative_pressure_pipe_cyclone",
    bestUse: "flour_mill_seed_plant_dust_free_enclosed_transfer_route",
  },
  chain_conveyor: {
    speed: 7, capacity: 8, grainGentle: 8, energyEfficiency: 7, geCost: 8,
    enclosed: true, forVerticalLift: false,
    transport: "drag_chain_en_masse_trough_horizontal_incline_gentle",
    bestUse: "horizontal_transfer_silo_reclaim_gentle_handling_malt_seed",
  },
  screw_auger: {
    speed: 6, capacity: 6, grainGentle: 6, energyEfficiency: 6, geCost: 3,
    enclosed: true, forVerticalLift: false,
    transport: "helical_screw_flight_rotating_inside_tube_incline_move",
    bestUse: "farm_bin_loading_short_distance_portable_grain_transfer",
  },
  belt_conveyor: {
    speed: 9, capacity: 10, grainGentle: 9, energyEfficiency: 9, geCost: 5,
    enclosed: false, forVerticalLift: false,
    transport: "continuous_flat_belt_idler_roller_horizontal_slight_incline",
    bestUse: "port_terminal_long_distance_high_volume_horizontal_transfer",
  },
};

function get(t: GrainElevatorType): GrainElevatorData {
  return DATA[t];
}

export const speed = (t: GrainElevatorType) => get(t).speed;
export const capacity = (t: GrainElevatorType) => get(t).capacity;
export const grainGentle = (t: GrainElevatorType) => get(t).grainGentle;
export const energyEfficiency = (t: GrainElevatorType) => get(t).energyEfficiency;
export const geCost = (t: GrainElevatorType) => get(t).geCost;
export const enclosed = (t: GrainElevatorType) => get(t).enclosed;
export const forVerticalLift = (t: GrainElevatorType) => get(t).forVerticalLift;
export const transport = (t: GrainElevatorType) => get(t).transport;
export const bestUse = (t: GrainElevatorType) => get(t).bestUse;
export const grainElevatorTypes = (): GrainElevatorType[] =>
  Object.keys(DATA) as GrainElevatorType[];
