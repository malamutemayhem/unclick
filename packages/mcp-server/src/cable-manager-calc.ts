export type CableManagerType =
  | "horizontal_1u_panel"
  | "vertical_finger_duct"
  | "overhead_basket_tray"
  | "underfloor_raceway_duct"
  | "waterfall_side_mount";

interface CableManagerData {
  capacity: number;
  accessibility: number;
  airflow: number;
  density: number;
  cmCost: number;
  toolless: boolean;
  forOverhead: boolean;
  routing: string;
  bestUse: string;
}

const DATA: Record<CableManagerType, CableManagerData> = {
  horizontal_1u_panel: {
    capacity: 5, accessibility: 8, airflow: 7, density: 6, cmCost: 3,
    toolless: true, forOverhead: false,
    routing: "d_ring_brush_panel_horizontal",
    bestUse: "standard_rack_patch_cable_mgmt",
  },
  vertical_finger_duct: {
    capacity: 8, accessibility: 9, airflow: 8, density: 8, cmCost: 5,
    toolless: true, forOverhead: false,
    routing: "vertical_finger_duct_hinged",
    bestUse: "high_density_rack_side_cable",
  },
  overhead_basket_tray: {
    capacity: 10, accessibility: 7, airflow: 10, density: 5, cmCost: 6,
    toolless: false, forOverhead: true,
    routing: "wire_basket_overhead_runway",
    bestUse: "data_center_row_overhead_path",
  },
  underfloor_raceway_duct: {
    capacity: 9, accessibility: 5, airflow: 4, density: 7, cmCost: 7,
    toolless: false, forOverhead: false,
    routing: "metal_raceway_under_raised_floor",
    bestUse: "raised_floor_power_data_path",
  },
  waterfall_side_mount: {
    capacity: 6, accessibility: 10, airflow: 9, density: 4, cmCost: 4,
    toolless: true, forOverhead: false,
    routing: "waterfall_bracket_side_rail",
    bestUse: "open_rack_frame_side_routing",
  },
};

function get(t: CableManagerType): CableManagerData {
  return DATA[t];
}

export const capacity = (t: CableManagerType) => get(t).capacity;
export const accessibility = (t: CableManagerType) => get(t).accessibility;
export const airflow = (t: CableManagerType) => get(t).airflow;
export const density = (t: CableManagerType) => get(t).density;
export const cmCost = (t: CableManagerType) => get(t).cmCost;
export const toolless = (t: CableManagerType) => get(t).toolless;
export const forOverhead = (t: CableManagerType) => get(t).forOverhead;
export const routing = (t: CableManagerType) => get(t).routing;
export const bestUse = (t: CableManagerType) => get(t).bestUse;
export const cableManagerTypes = (): CableManagerType[] =>
  Object.keys(DATA) as CableManagerType[];
