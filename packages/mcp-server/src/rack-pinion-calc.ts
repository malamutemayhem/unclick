export type RackPinionType =
  | "spur_rack"
  | "helical_rack"
  | "precision_rack"
  | "planetary_rack"
  | "dual_pinion_rack";

interface RackPinionData {
  forceCapacity: number;
  throughput: number;
  posAccuracy: number;
  travelLength: number;
  rpCost: number;
  preloaded: boolean;
  forGantry: boolean;
  rackConfig: string;
  bestUse: string;
}

const DATA: Record<RackPinionType, RackPinionData> = {
  spur_rack: {
    forceCapacity: 7, throughput: 8, posAccuracy: 6, travelLength: 9, rpCost: 4,
    preloaded: false, forGantry: true,
    rackConfig: "spur_rack_pinion_straight_tooth_simple_long_travel_linear",
    bestUse: "long_travel_spur_rack_pinion_gantry_portal_simple_robust",
  },
  helical_rack: {
    forceCapacity: 9, throughput: 8, posAccuracy: 8, travelLength: 9, rpCost: 6,
    preloaded: false, forGantry: true,
    rackConfig: "helical_rack_pinion_angled_tooth_smooth_quiet_high_force",
    bestUse: "cnc_gantry_helical_rack_pinion_smooth_quiet_high_force_axis",
  },
  precision_rack: {
    forceCapacity: 7, throughput: 7, posAccuracy: 10, travelLength: 8, rpCost: 8,
    preloaded: true, forGantry: true,
    rackConfig: "precision_rack_pinion_ground_tooth_low_backlash_servo_axis",
    bestUse: "servo_axis_precision_rack_pinion_ground_tooth_low_backlash",
  },
  planetary_rack: {
    forceCapacity: 10, throughput: 7, posAccuracy: 7, travelLength: 8, rpCost: 9,
    preloaded: false, forGantry: false,
    rackConfig: "planetary_rack_pinion_multiple_mesh_high_torque_no_backlash",
    bestUse: "heavy_duty_planetary_rack_pinion_multiple_mesh_high_torque",
  },
  dual_pinion_rack: {
    forceCapacity: 8, throughput: 8, posAccuracy: 9, travelLength: 9, rpCost: 7,
    preloaded: true, forGantry: true,
    rackConfig: "dual_pinion_rack_anti_backlash_preload_split_pinion_precision",
    bestUse: "laser_cut_dual_pinion_rack_anti_backlash_preload_precision",
  },
};

function get(t: RackPinionType): RackPinionData {
  return DATA[t];
}

export const forceCapacity = (t: RackPinionType) => get(t).forceCapacity;
export const throughput = (t: RackPinionType) => get(t).throughput;
export const posAccuracy = (t: RackPinionType) => get(t).posAccuracy;
export const travelLength = (t: RackPinionType) => get(t).travelLength;
export const rpCost = (t: RackPinionType) => get(t).rpCost;
export const preloaded = (t: RackPinionType) => get(t).preloaded;
export const forGantry = (t: RackPinionType) => get(t).forGantry;
export const rackConfig = (t: RackPinionType) => get(t).rackConfig;
export const bestUse = (t: RackPinionType) => get(t).bestUse;
export const rackPinionTypes = (): RackPinionType[] =>
  Object.keys(DATA) as RackPinionType[];
