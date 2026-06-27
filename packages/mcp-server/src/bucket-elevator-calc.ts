export type BucketElevatorType =
  | "centrifugal_discharge_belt"
  | "continuous_bucket_chain"
  | "positive_discharge_snub"
  | "high_speed_nylon_bucket"
  | "enclosed_z_type_vertical";

interface BucketElevatorData {
  capacity: number;
  height: number;
  gentleness: number;
  speed: number;
  beCost: number;
  enclosed: boolean;
  forFragile: boolean;
  discharge: string;
  bestUse: string;
}

const DATA: Record<BucketElevatorType, BucketElevatorData> = {
  centrifugal_discharge_belt: {
    capacity: 8, height: 8, gentleness: 6, speed: 9, beCost: 6,
    enclosed: true, forFragile: false,
    discharge: "centrifugal_throw_over_head",
    bestUse: "grain_cement_free_flowing_bulk",
  },
  continuous_bucket_chain: {
    capacity: 9, height: 10, gentleness: 9, speed: 6, beCost: 8,
    enclosed: true, forFragile: true,
    discharge: "gravity_inversion_continuous",
    bestUse: "fragile_material_gentle_handling",
  },
  positive_discharge_snub: {
    capacity: 7, height: 7, gentleness: 7, speed: 7, beCost: 7,
    enclosed: true, forFragile: false,
    discharge: "snub_wheel_positive_knockoff",
    bestUse: "sticky_wet_material_positive",
  },
  high_speed_nylon_bucket: {
    capacity: 10, height: 8, gentleness: 5, speed: 10, beCost: 7,
    enclosed: true, forFragile: false,
    discharge: "high_speed_centrifugal_nylon",
    bestUse: "high_throughput_fertilizer_pellet",
  },
  enclosed_z_type_vertical: {
    capacity: 7, height: 9, gentleness: 8, speed: 7, beCost: 9,
    enclosed: true, forFragile: true,
    discharge: "overlapping_bucket_z_path",
    bestUse: "food_pharma_sanitary_enclosed",
  },
};

function get(t: BucketElevatorType): BucketElevatorData {
  return DATA[t];
}

export const capacity = (t: BucketElevatorType) => get(t).capacity;
export const height = (t: BucketElevatorType) => get(t).height;
export const gentleness = (t: BucketElevatorType) => get(t).gentleness;
export const speed = (t: BucketElevatorType) => get(t).speed;
export const beCost = (t: BucketElevatorType) => get(t).beCost;
export const enclosed = (t: BucketElevatorType) => get(t).enclosed;
export const forFragile = (t: BucketElevatorType) => get(t).forFragile;
export const discharge = (t: BucketElevatorType) => get(t).discharge;
export const bestUse = (t: BucketElevatorType) => get(t).bestUse;
export const bucketElevatorTypes = (): BucketElevatorType[] =>
  Object.keys(DATA) as BucketElevatorType[];
