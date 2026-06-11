export type SolarTrackerType =
  | "single_axis_horizontal"
  | "single_axis_tilted"
  | "dual_axis_pedestal"
  | "passive_thermal_tracker"
  | "concentrated_parabolic";

interface SolarTrackerData {
  gain: number;
  reliability: number;
  windResist: number;
  maintenance: number;
  stCost: number;
  motorized: boolean;
  forUtility: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<SolarTrackerType, SolarTrackerData> = {
  single_axis_horizontal: {
    gain: 7, reliability: 9, windResist: 8, maintenance: 8, stCost: 5,
    motorized: true, forUtility: true,
    drive: "slew_drive_row_linked_horizontal",
    bestUse: "utility_scale_flat_terrain",
  },
  single_axis_tilted: {
    gain: 8, reliability: 8, windResist: 7, maintenance: 7, stCost: 6,
    motorized: true, forUtility: true,
    drive: "linear_actuator_tilted_row",
    bestUse: "high_latitude_ground_mount",
  },
  dual_axis_pedestal: {
    gain: 10, reliability: 6, windResist: 5, maintenance: 5, stCost: 9,
    motorized: true, forUtility: false,
    drive: "azimuth_elevation_dual_motor",
    bestUse: "cpv_research_high_concentration",
  },
  passive_thermal_tracker: {
    gain: 5, reliability: 10, windResist: 9, maintenance: 10, stCost: 3,
    motorized: false, forUtility: false,
    drive: "thermal_fluid_expansion_gravity",
    bestUse: "off_grid_remote_low_maintenance",
  },
  concentrated_parabolic: {
    gain: 9, reliability: 7, windResist: 6, maintenance: 5, stCost: 10,
    motorized: true, forUtility: true,
    drive: "parabolic_trough_hydraulic_track",
    bestUse: "csp_thermal_power_plant",
  },
};

function get(t: SolarTrackerType): SolarTrackerData {
  return DATA[t];
}

export const gain = (t: SolarTrackerType) => get(t).gain;
export const reliability = (t: SolarTrackerType) => get(t).reliability;
export const windResist = (t: SolarTrackerType) => get(t).windResist;
export const maintenance = (t: SolarTrackerType) => get(t).maintenance;
export const stCost = (t: SolarTrackerType) => get(t).stCost;
export const motorized = (t: SolarTrackerType) => get(t).motorized;
export const forUtility = (t: SolarTrackerType) => get(t).forUtility;
export const drive = (t: SolarTrackerType) => get(t).drive;
export const bestUse = (t: SolarTrackerType) => get(t).bestUse;
export const solarTrackerTypes = (): SolarTrackerType[] =>
  Object.keys(DATA) as SolarTrackerType[];
