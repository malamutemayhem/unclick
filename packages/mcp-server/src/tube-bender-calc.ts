export type TubeBenderType =
  | "rotary_draw"
  | "mandrel_bend"
  | "roll_bend"
  | "press_bend"
  | "cnc_multi_stack";

interface TubeBenderData {
  bendAccuracy: number;
  throughput: number;
  minRadius: number;
  wallThinning: number;
  tbCost: number;
  multiAxis: boolean;
  forThinWall: boolean;
  benderConfig: string;
  bestUse: string;
}

const DATA: Record<TubeBenderType, TubeBenderData> = {
  rotary_draw: {
    bendAccuracy: 8, throughput: 7, minRadius: 8, wallThinning: 7, tbCost: 6,
    multiAxis: false, forThinWall: false,
    benderConfig: "rotary_draw_tube_bender_clamp_die_pressure_die_tight_radius",
    bestUse: "exhaust_pipe_rotary_draw_tube_bender_clamp_die_tight_radius",
  },
  mandrel_bend: {
    bendAccuracy: 9, throughput: 6, minRadius: 10, wallThinning: 10, tbCost: 8,
    multiAxis: false, forThinWall: true,
    benderConfig: "mandrel_tube_bender_internal_ball_support_thin_wall_no_wrinkle",
    bestUse: "aircraft_tube_mandrel_bender_ball_support_thin_wall_no_wrinkle",
  },
  roll_bend: {
    bendAccuracy: 6, throughput: 8, minRadius: 5, wallThinning: 6, tbCost: 4,
    multiAxis: false, forThinWall: false,
    benderConfig: "roll_tube_bender_three_roll_pyramid_large_radius_curve_arch",
    bestUse: "handrail_arch_roll_tube_bender_three_roll_pyramid_large_curve",
  },
  press_bend: {
    bendAccuracy: 5, throughput: 9, minRadius: 4, wallThinning: 5, tbCost: 3,
    multiAxis: false, forThinWall: false,
    benderConfig: "press_tube_bender_ram_vee_die_simple_fast_low_cost_heavy_wall",
    bestUse: "heavy_pipe_press_tube_bender_ram_vee_die_simple_fast_bend",
  },
  cnc_multi_stack: {
    bendAccuracy: 10, throughput: 7, minRadius: 9, wallThinning: 9, tbCost: 10,
    multiAxis: true, forThinWall: true,
    benderConfig: "cnc_multi_stack_tube_bender_servo_axis_compound_bend_3d_shape",
    bestUse: "chassis_frame_cnc_multi_stack_tube_bender_compound_3d_shape",
  },
};

function get(t: TubeBenderType): TubeBenderData {
  return DATA[t];
}

export const bendAccuracy = (t: TubeBenderType) => get(t).bendAccuracy;
export const throughput = (t: TubeBenderType) => get(t).throughput;
export const minRadius = (t: TubeBenderType) => get(t).minRadius;
export const wallThinning = (t: TubeBenderType) => get(t).wallThinning;
export const tbCost = (t: TubeBenderType) => get(t).tbCost;
export const multiAxis = (t: TubeBenderType) => get(t).multiAxis;
export const forThinWall = (t: TubeBenderType) => get(t).forThinWall;
export const benderConfig = (t: TubeBenderType) => get(t).benderConfig;
export const bestUse = (t: TubeBenderType) => get(t).bestUse;
export const tubeBenderTypes = (): TubeBenderType[] =>
  Object.keys(DATA) as TubeBenderType[];
