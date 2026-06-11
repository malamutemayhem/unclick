export type GantryLoaderType =
  | "single_axis_gantry"
  | "dual_axis_gantry"
  | "three_axis_gantry"
  | "overhead_gantry"
  | "servo_shuttle";

interface GantryLoaderData {
  speed: number;
  throughput: number;
  payload: number;
  repeatability: number;
  glCost: number;
  multiAxis: boolean;
  forPressTend: boolean;
  loaderConfig: string;
  bestUse: string;
}

const DATA: Record<GantryLoaderType, GantryLoaderData> = {
  single_axis_gantry: {
    speed: 9, throughput: 9, payload: 6, repeatability: 8, glCost: 4,
    multiAxis: false, forPressTend: true,
    loaderConfig: "single_axis_gantry_loader_linear_rail_servo_shuttle_pick_place",
    bestUse: "press_feed_single_axis_gantry_loader_shuttle_blank_in_part_out",
  },
  dual_axis_gantry: {
    speed: 8, throughput: 8, payload: 7, repeatability: 8, glCost: 6,
    multiAxis: true, forPressTend: true,
    loaderConfig: "dual_axis_gantry_loader_x_z_travel_vertical_lift_horizontal_move",
    bestUse: "cnc_load_dual_axis_gantry_loader_lift_move_chuck_load_unload",
  },
  three_axis_gantry: {
    speed: 7, throughput: 7, payload: 8, repeatability: 9, glCost: 8,
    multiAxis: true, forPressTend: false,
    loaderConfig: "three_axis_gantry_loader_x_y_z_cartesian_large_work_envelope",
    bestUse: "pallet_transfer_three_axis_gantry_loader_x_y_z_large_envelope",
  },
  overhead_gantry: {
    speed: 7, throughput: 7, payload: 9, repeatability: 7, glCost: 9,
    multiAxis: true, forPressTend: false,
    loaderConfig: "overhead_gantry_loader_bridge_crane_style_heavy_part_span_cell",
    bestUse: "heavy_part_overhead_gantry_loader_bridge_span_machine_cell_move",
  },
  servo_shuttle: {
    speed: 9, throughput: 9, payload: 5, repeatability: 8, glCost: 3,
    multiAxis: false, forPressTend: true,
    loaderConfig: "servo_shuttle_gantry_loader_linear_motor_fast_index_cycle_time",
    bestUse: "stamping_feed_servo_shuttle_gantry_loader_fast_index_strip_feed",
  },
};

function get(t: GantryLoaderType): GantryLoaderData {
  return DATA[t];
}

export const speed = (t: GantryLoaderType) => get(t).speed;
export const throughput = (t: GantryLoaderType) => get(t).throughput;
export const payload = (t: GantryLoaderType) => get(t).payload;
export const repeatability = (t: GantryLoaderType) => get(t).repeatability;
export const glCost = (t: GantryLoaderType) => get(t).glCost;
export const multiAxis = (t: GantryLoaderType) => get(t).multiAxis;
export const forPressTend = (t: GantryLoaderType) => get(t).forPressTend;
export const loaderConfig = (t: GantryLoaderType) => get(t).loaderConfig;
export const bestUse = (t: GantryLoaderType) => get(t).bestUse;
export const gantryLoaderTypes = (): GantryLoaderType[] =>
  Object.keys(DATA) as GantryLoaderType[];
