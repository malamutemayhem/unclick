export type CartesianGantryType =
  | "xyz_gantry_overhead"
  | "xy_table_flat"
  | "single_axis_linear"
  | "cantilever_beam"
  | "h_frame_portal";

interface CartesianGantryData {
  precision: number;
  workEnvelope: number;
  rigidity: number;
  speed: number;
  cgCost: number;
  overhead: boolean;
  forCnc: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<CartesianGantryType, CartesianGantryData> = {
  xyz_gantry_overhead: {
    precision: 8, workEnvelope: 10, rigidity: 9, speed: 7, cgCost: 9,
    overhead: true, forCnc: true,
    structure: "bridge_rail_overhead_xyz_linear_guide_servo_drive",
    bestUse: "large_cnc_router_plasma_cutter_waterjet_3d_printer",
  },
  xy_table_flat: {
    precision: 10, workEnvelope: 5, rigidity: 9, speed: 9, cgCost: 6,
    overhead: false, forCnc: false,
    structure: "stacked_xy_stage_ball_screw_linear_motor_granite",
    bestUse: "pcb_assembly_laser_marking_wafer_inspection_precise",
  },
  single_axis_linear: {
    precision: 9, workEnvelope: 3, rigidity: 10, speed: 10, cgCost: 3,
    overhead: false, forCnc: false,
    structure: "single_axis_ball_screw_or_belt_servo_motor_guide",
    bestUse: "pick_place_transfer_slide_dispensing_press_feed",
  },
  cantilever_beam: {
    precision: 7, workEnvelope: 7, rigidity: 6, speed: 8, cgCost: 5,
    overhead: false, forCnc: false,
    structure: "single_side_support_beam_overhang_free_access_area",
    bestUse: "inspection_station_adhesive_dispensing_light_payload",
  },
  h_frame_portal: {
    precision: 8, workEnvelope: 9, rigidity: 8, speed: 8, cgCost: 8,
    overhead: true, forCnc: true,
    structure: "dual_rail_portal_frame_cross_beam_traveling_column",
    bestUse: "large_format_machining_5_axis_composite_layup_mill",
  },
};

function get(t: CartesianGantryType): CartesianGantryData {
  return DATA[t];
}

export const precision = (t: CartesianGantryType) => get(t).precision;
export const workEnvelope = (t: CartesianGantryType) => get(t).workEnvelope;
export const rigidity = (t: CartesianGantryType) => get(t).rigidity;
export const speed = (t: CartesianGantryType) => get(t).speed;
export const cgCost = (t: CartesianGantryType) => get(t).cgCost;
export const overhead = (t: CartesianGantryType) => get(t).overhead;
export const forCnc = (t: CartesianGantryType) => get(t).forCnc;
export const structure = (t: CartesianGantryType) => get(t).structure;
export const bestUse = (t: CartesianGantryType) => get(t).bestUse;
export const cartesianGantryTypes = (): CartesianGantryType[] =>
  Object.keys(DATA) as CartesianGantryType[];
