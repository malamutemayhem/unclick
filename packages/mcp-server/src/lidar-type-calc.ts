export type LidarType =
  | "mechanical_spinning"
  | "mems_mirror"
  | "opa_solid_state"
  | "flash_array"
  | "fmcw_coherent";

const DATA: Record<LidarType, {
  range: number; resolution: number; frameRate: number;
  reliability: number; lidCost: number; solidState: boolean;
  forAutonomous: boolean; scanning: string; bestUse: string;
}> = {
  mechanical_spinning: {
    range: 9, resolution: 8, frameRate: 7,
    reliability: 4, lidCost: 8, solidState: false,
    forAutonomous: true, scanning: "360_deg_rotating_head",
    bestUse: "robotaxi_rooftop_sensor",
  },
  mems_mirror: {
    range: 7, resolution: 7, frameRate: 8,
    reliability: 7, lidCost: 5, solidState: false,
    forAutonomous: true, scanning: "resonant_mirror_raster",
    bestUse: "adas_forward_facing",
  },
  opa_solid_state: {
    range: 6, resolution: 9, frameRate: 9,
    reliability: 9, lidCost: 4, solidState: true,
    forAutonomous: true, scanning: "phased_array_beam_steer",
    bestUse: "mass_market_automotive",
  },
  flash_array: {
    range: 4, resolution: 6, frameRate: 10,
    reliability: 10, lidCost: 3, solidState: true,
    forAutonomous: false, scanning: "flood_illuminate_capture",
    bestUse: "indoor_robot_obstacle",
  },
  fmcw_coherent: {
    range: 10, resolution: 10, frameRate: 6,
    reliability: 8, lidCost: 9, solidState: true,
    forAutonomous: true, scanning: "freq_chirp_doppler_range",
    bestUse: "long_range_velocity_detect",
  },
};

const get = (t: LidarType) => DATA[t];

export const range = (t: LidarType) => get(t).range;
export const resolution = (t: LidarType) => get(t).resolution;
export const frameRate = (t: LidarType) => get(t).frameRate;
export const reliability = (t: LidarType) => get(t).reliability;
export const lidCost = (t: LidarType) => get(t).lidCost;
export const solidState = (t: LidarType) => get(t).solidState;
export const forAutonomous = (t: LidarType) => get(t).forAutonomous;
export const scanning = (t: LidarType) => get(t).scanning;
export const bestUse = (t: LidarType) => get(t).bestUse;
export const lidarTypes = (): LidarType[] => Object.keys(DATA) as LidarType[];
