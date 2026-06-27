export type TubeBendType =
  | "rotary_draw_mandrel"
  | "compression_ram_push"
  | "roll_bend_three_roll"
  | "induction_hot_bend"
  | "stretch_form_wrap";

interface TubeBendData {
  precision: number;
  minRadius: number;
  wallThin: number;
  speed: number;
  tbCost: number;
  mandrel: boolean;
  forTightRadius: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<TubeBendType, TubeBendData> = {
  rotary_draw_mandrel: {
    precision: 10, minRadius: 10, wallThin: 9, speed: 7, tbCost: 8,
    mandrel: true, forTightRadius: true,
    mechanism: "clamp_die_pressure_die_mandrel",
    bestUse: "exhaust_handrail_furniture_tube",
  },
  compression_ram_push: {
    precision: 6, minRadius: 6, wallThin: 5, speed: 8, tbCost: 4,
    mandrel: false, forTightRadius: false,
    mechanism: "ram_push_against_stationary_die",
    bestUse: "simple_conduit_duct_low_precision",
  },
  roll_bend_three_roll: {
    precision: 7, minRadius: 5, wallThin: 7, speed: 6, tbCost: 5,
    mandrel: false, forTightRadius: false,
    mechanism: "three_roll_pyramid_curvature_feed",
    bestUse: "large_radius_coil_ring_structural",
  },
  induction_hot_bend: {
    precision: 8, minRadius: 8, wallThin: 8, speed: 4, tbCost: 9,
    mandrel: false, forTightRadius: true,
    mechanism: "induction_coil_heat_push_quench",
    bestUse: "thick_wall_pipeline_ship_hull_pipe",
  },
  stretch_form_wrap: {
    precision: 9, minRadius: 7, wallThin: 8, speed: 5, tbCost: 7,
    mandrel: false, forTightRadius: false,
    mechanism: "tension_wrap_around_form_block",
    bestUse: "aircraft_skin_frame_large_section",
  },
};

function get(t: TubeBendType): TubeBendData {
  return DATA[t];
}

export const precision = (t: TubeBendType) => get(t).precision;
export const minRadius = (t: TubeBendType) => get(t).minRadius;
export const wallThin = (t: TubeBendType) => get(t).wallThin;
export const speed = (t: TubeBendType) => get(t).speed;
export const tbCost = (t: TubeBendType) => get(t).tbCost;
export const mandrel = (t: TubeBendType) => get(t).mandrel;
export const forTightRadius = (t: TubeBendType) => get(t).forTightRadius;
export const mechanism = (t: TubeBendType) => get(t).mechanism;
export const bestUse = (t: TubeBendType) => get(t).bestUse;
export const tubeBendTypes = (): TubeBendType[] =>
  Object.keys(DATA) as TubeBendType[];
