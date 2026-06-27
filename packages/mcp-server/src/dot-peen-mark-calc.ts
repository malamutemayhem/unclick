export type DotPeenMarkType =
  | "pneumatic_single_pin"
  | "electromagnetic_stylus"
  | "scribe_drag_continuous"
  | "portable_handheld_battery"
  | "integrated_inline_auto";

interface DotPeenMarkData {
  depth: number;
  speed: number;
  readability: number;
  noise: number;
  dpCost: number;
  portable: boolean;
  forTraceability: boolean;
  actuator: string;
  bestUse: string;
}

const DATA: Record<DotPeenMarkType, DotPeenMarkData> = {
  pneumatic_single_pin: {
    depth: 9, speed: 8, readability: 8, noise: 4, dpCost: 5,
    portable: false, forTraceability: true,
    actuator: "pneumatic_solenoid_carbide_pin",
    bestUse: "vin_number_chassis_casting_mark",
  },
  electromagnetic_stylus: {
    depth: 7, speed: 9, readability: 9, noise: 6, dpCost: 6,
    portable: false, forTraceability: true,
    actuator: "electromagnetic_coil_hard_stylus",
    bestUse: "nameplate_tag_data_matrix_code",
  },
  scribe_drag_continuous: {
    depth: 6, speed: 7, readability: 7, noise: 8, dpCost: 4,
    portable: false, forTraceability: false,
    actuator: "drag_scribe_continuous_line",
    bestUse: "logo_text_decorative_panel_mark",
  },
  portable_handheld_battery: {
    depth: 7, speed: 5, readability: 7, noise: 5, dpCost: 4,
    portable: true, forTraceability: true,
    actuator: "battery_powered_handheld_unit",
    bestUse: "field_asset_marking_pipe_valve",
  },
  integrated_inline_auto: {
    depth: 8, speed: 10, readability: 10, noise: 6, dpCost: 9,
    portable: false, forTraceability: true,
    actuator: "servo_driven_inline_conveyor",
    bestUse: "production_line_auto_part_trace",
  },
};

function get(t: DotPeenMarkType): DotPeenMarkData {
  return DATA[t];
}

export const depth = (t: DotPeenMarkType) => get(t).depth;
export const speed = (t: DotPeenMarkType) => get(t).speed;
export const readability = (t: DotPeenMarkType) => get(t).readability;
export const noise = (t: DotPeenMarkType) => get(t).noise;
export const dpCost = (t: DotPeenMarkType) => get(t).dpCost;
export const portable = (t: DotPeenMarkType) => get(t).portable;
export const forTraceability = (t: DotPeenMarkType) => get(t).forTraceability;
export const actuator = (t: DotPeenMarkType) => get(t).actuator;
export const bestUse = (t: DotPeenMarkType) => get(t).bestUse;
export const dotPeenMarkTypes = (): DotPeenMarkType[] =>
  Object.keys(DATA) as DotPeenMarkType[];
