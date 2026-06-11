export type PipeSupportType =
  | "clevis_hanger_vertical"
  | "pipe_clamp_riser_band"
  | "spring_hanger_variable"
  | "roller_support_horizontal"
  | "trapeze_channel_strut";

interface PipeSupportData {
  loadCapacity: number;
  movement: number;
  adjustability: number;
  vibration: number;
  psCost: number;
  springLoaded: boolean;
  forHot: boolean;
  attachment: string;
  bestUse: string;
}

const DATA: Record<PipeSupportType, PipeSupportData> = {
  clevis_hanger_vertical: {
    loadCapacity: 7, movement: 3, adjustability: 7, vibration: 5, psCost: 3,
    springLoaded: false, forHot: false,
    attachment: "rod_threaded_beam_clamp_drop",
    bestUse: "horizontal_pipe_overhead_suspend",
  },
  pipe_clamp_riser_band: {
    loadCapacity: 6, movement: 2, adjustability: 6, vibration: 6, psCost: 2,
    springLoaded: false, forHot: false,
    attachment: "band_clamp_bolt_wall_bracket",
    bestUse: "vertical_riser_wall_mount_support",
  },
  spring_hanger_variable: {
    loadCapacity: 9, movement: 9, adjustability: 8, vibration: 8, psCost: 9,
    springLoaded: true, forHot: true,
    attachment: "spring_can_rod_load_indicator",
    bestUse: "steam_line_thermal_movement_absorb",
  },
  roller_support_horizontal: {
    loadCapacity: 8, movement: 8, adjustability: 5, vibration: 7, psCost: 6,
    springLoaded: false, forHot: true,
    attachment: "roller_cradle_steel_base_plate",
    bestUse: "large_bore_pipe_axial_expansion",
  },
  trapeze_channel_strut: {
    loadCapacity: 8, movement: 2, adjustability: 9, vibration: 4, psCost: 4,
    springLoaded: false, forHot: false,
    attachment: "strut_channel_spring_nut_bolt",
    bestUse: "multi_pipe_run_mechanical_room",
  },
};

function get(t: PipeSupportType): PipeSupportData {
  return DATA[t];
}

export const loadCapacity = (t: PipeSupportType) => get(t).loadCapacity;
export const movement = (t: PipeSupportType) => get(t).movement;
export const adjustability = (t: PipeSupportType) => get(t).adjustability;
export const vibration = (t: PipeSupportType) => get(t).vibration;
export const psCost = (t: PipeSupportType) => get(t).psCost;
export const springLoaded = (t: PipeSupportType) => get(t).springLoaded;
export const forHot = (t: PipeSupportType) => get(t).forHot;
export const attachment = (t: PipeSupportType) => get(t).attachment;
export const bestUse = (t: PipeSupportType) => get(t).bestUse;
export const pipeSupportTypes = (): PipeSupportType[] =>
  Object.keys(DATA) as PipeSupportType[];
