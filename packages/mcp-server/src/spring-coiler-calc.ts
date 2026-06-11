export type SpringCoilerType =
  | "cnc_coiler"
  | "cam_coiler"
  | "wire_former"
  | "torsion_coiler"
  | "extension_coiler";

interface SpringCoilerData {
  coilAccuracy: number;
  throughput: number;
  wireRange: number;
  repeatability: number;
  srCost: number;
  cnc: boolean;
  forComplex: boolean;
  coilerConfig: string;
  bestUse: string;
}

const DATA: Record<SpringCoilerType, SpringCoilerData> = {
  cnc_coiler: {
    coilAccuracy: 10, throughput: 8, wireRange: 9, repeatability: 10, srCost: 9,
    cnc: true, forComplex: true,
    coilerConfig: "cnc_spring_coiler_servo_feed_pitch_tool_variable_rate_complex",
    bestUse: "precision_spring_cnc_coiler_servo_variable_rate_complex_shape",
  },
  cam_coiler: {
    coilAccuracy: 7, throughput: 10, wireRange: 7, repeatability: 8, srCost: 5,
    cnc: false, forComplex: false,
    coilerConfig: "cam_spring_coiler_mechanical_cam_high_speed_simple_compress",
    bestUse: "commodity_spring_cam_coiler_mechanical_high_speed_compress",
  },
  wire_former: {
    coilAccuracy: 9, throughput: 7, wireRange: 10, repeatability: 9, srCost: 8,
    cnc: true, forComplex: true,
    coilerConfig: "wire_former_spring_coiler_multi_slide_bend_cut_3d_wire_shape",
    bestUse: "wire_form_clip_wire_former_spring_coiler_multi_slide_3d_shape",
  },
  torsion_coiler: {
    coilAccuracy: 8, throughput: 7, wireRange: 7, repeatability: 8, srCost: 6,
    cnc: false, forComplex: false,
    coilerConfig: "torsion_spring_coiler_leg_bend_angle_set_door_hinge_clip_pin",
    bestUse: "door_hinge_torsion_spring_coiler_leg_bend_angle_set_clip",
  },
  extension_coiler: {
    coilAccuracy: 8, throughput: 8, wireRange: 7, repeatability: 8, srCost: 6,
    cnc: false, forComplex: false,
    coilerConfig: "extension_spring_coiler_hook_form_initial_tension_pull_spring",
    bestUse: "garage_door_extension_spring_coiler_hook_initial_tension_pull",
  },
};

function get(t: SpringCoilerType): SpringCoilerData {
  return DATA[t];
}

export const coilAccuracy = (t: SpringCoilerType) => get(t).coilAccuracy;
export const throughput = (t: SpringCoilerType) => get(t).throughput;
export const wireRange = (t: SpringCoilerType) => get(t).wireRange;
export const repeatability = (t: SpringCoilerType) => get(t).repeatability;
export const srCost = (t: SpringCoilerType) => get(t).srCost;
export const cnc = (t: SpringCoilerType) => get(t).cnc;
export const forComplex = (t: SpringCoilerType) => get(t).forComplex;
export const coilerConfig = (t: SpringCoilerType) => get(t).coilerConfig;
export const bestUse = (t: SpringCoilerType) => get(t).bestUse;
export const springCoilerTypes = (): SpringCoilerType[] =>
  Object.keys(DATA) as SpringCoilerType[];
