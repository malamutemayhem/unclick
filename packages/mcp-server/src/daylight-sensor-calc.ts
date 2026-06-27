export type DaylightSensorType =
  | "photocell_closed_loop"
  | "photocell_open_loop"
  | "dual_loop_hybrid"
  | "commissioning_handheld"
  | "wireless_mesh_daylight";

interface DaylightSensorData {
  accuracy: number;
  response: number;
  stability: number;
  installEase: number;
  dlCost: number;
  closedLoop: boolean;
  forOpenOffice: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<DaylightSensorType, DaylightSensorData> = {
  photocell_closed_loop: {
    accuracy: 9, response: 8, stability: 9, installEase: 6, dlCost: 5,
    closedLoop: true, forOpenOffice: true,
    mounting: "ceiling_downward_task_plane_read",
    bestUse: "open_office_perimeter_daylight",
  },
  photocell_open_loop: {
    accuracy: 7, response: 9, stability: 7, installEase: 8, dlCost: 4,
    closedLoop: false, forOpenOffice: false,
    mounting: "window_facing_exterior_skylight",
    bestUse: "skylight_clerestory_toplighting",
  },
  dual_loop_hybrid: {
    accuracy: 10, response: 8, stability: 10, installEase: 5, dlCost: 7,
    closedLoop: true, forOpenOffice: true,
    mounting: "ceiling_plus_facade_dual_sensor",
    bestUse: "high_performance_leed_building",
  },
  commissioning_handheld: {
    accuracy: 8, response: 10, stability: 6, installEase: 10, dlCost: 3,
    closedLoop: false, forOpenOffice: false,
    mounting: "handheld_portable_lux_meter",
    bestUse: "commissioning_verification_spot",
  },
  wireless_mesh_daylight: {
    accuracy: 8, response: 7, stability: 8, installEase: 9, dlCost: 6,
    closedLoop: true, forOpenOffice: true,
    mounting: "battery_wireless_mesh_ceiling",
    bestUse: "retrofit_existing_building_zones",
  },
};

function get(t: DaylightSensorType): DaylightSensorData {
  return DATA[t];
}

export const accuracy = (t: DaylightSensorType) => get(t).accuracy;
export const response = (t: DaylightSensorType) => get(t).response;
export const stability = (t: DaylightSensorType) => get(t).stability;
export const installEase = (t: DaylightSensorType) => get(t).installEase;
export const dlCost = (t: DaylightSensorType) => get(t).dlCost;
export const closedLoop = (t: DaylightSensorType) => get(t).closedLoop;
export const forOpenOffice = (t: DaylightSensorType) => get(t).forOpenOffice;
export const mounting = (t: DaylightSensorType) => get(t).mounting;
export const bestUse = (t: DaylightSensorType) => get(t).bestUse;
export const daylightSensorTypes = (): DaylightSensorType[] =>
  Object.keys(DATA) as DaylightSensorType[];
