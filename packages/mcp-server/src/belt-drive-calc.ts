export type BeltDriveType =
  | "timing_belt"
  | "flat_belt"
  | "v_belt_drive"
  | "poly_v_belt"
  | "round_belt";

interface BeltDriveData {
  powerCapacity: number;
  throughput: number;
  speedRatio: number;
  efficiency: number;
  bdCost: number;
  synchronous: boolean;
  forPrecision: boolean;
  beltConfig: string;
  bestUse: string;
}

const DATA: Record<BeltDriveType, BeltDriveData> = {
  timing_belt: {
    powerCapacity: 7, throughput: 8, speedRatio: 8, efficiency: 9, bdCost: 5,
    synchronous: true, forPrecision: true,
    beltConfig: "timing_belt_drive_toothed_synchronous_no_slip_position_control",
    bestUse: "position_sync_timing_belt_drive_toothed_no_slip_cnc_printer",
  },
  flat_belt: {
    powerCapacity: 6, throughput: 7, speedRatio: 7, efficiency: 10, bdCost: 3,
    synchronous: false, forPrecision: false,
    beltConfig: "flat_belt_drive_smooth_high_speed_low_noise_textile_spindle",
    bestUse: "high_speed_flat_belt_drive_smooth_quiet_spindle_textile_line",
  },
  v_belt_drive: {
    powerCapacity: 9, throughput: 9, speedRatio: 8, efficiency: 7, bdCost: 3,
    synchronous: false, forPrecision: false,
    beltConfig: "v_belt_drive_wedge_grip_high_power_fan_compressor_industrial",
    bestUse: "industrial_fan_v_belt_drive_wedge_grip_high_power_compressor",
  },
  poly_v_belt: {
    powerCapacity: 8, throughput: 8, speedRatio: 9, efficiency: 8, bdCost: 4,
    synchronous: false, forPrecision: false,
    beltConfig: "poly_v_belt_drive_multi_rib_compact_high_speed_ratio_appliance",
    bestUse: "compact_drive_poly_v_belt_multi_rib_high_speed_ratio_appliance",
  },
  round_belt: {
    powerCapacity: 3, throughput: 6, speedRatio: 6, efficiency: 7, bdCost: 2,
    synchronous: false, forPrecision: false,
    beltConfig: "round_belt_drive_elastic_conveyor_twist_right_angle_light_duty",
    bestUse: "light_conveyor_round_belt_drive_elastic_twist_right_angle_sort",
  },
};

function get(t: BeltDriveType): BeltDriveData {
  return DATA[t];
}

export const powerCapacity = (t: BeltDriveType) => get(t).powerCapacity;
export const throughput = (t: BeltDriveType) => get(t).throughput;
export const speedRatio = (t: BeltDriveType) => get(t).speedRatio;
export const efficiency = (t: BeltDriveType) => get(t).efficiency;
export const bdCost = (t: BeltDriveType) => get(t).bdCost;
export const synchronous = (t: BeltDriveType) => get(t).synchronous;
export const forPrecision = (t: BeltDriveType) => get(t).forPrecision;
export const beltConfig = (t: BeltDriveType) => get(t).beltConfig;
export const bestUse = (t: BeltDriveType) => get(t).bestUse;
export const beltDriveTypes = (): BeltDriveType[] =>
  Object.keys(DATA) as BeltDriveType[];
