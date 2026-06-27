export type ControlValveType =
  | "globe_linear_pneumatic"
  | "butterfly_rotary_actuated"
  | "ball_segmented_characterized"
  | "diaphragm_sanitary_clean"
  | "eccentric_plug_tight_shutoff";

interface ControlValveData {
  rangeability: number;
  accuracy: number;
  capacity: number;
  shutoff: number;
  cvCost: number;
  failSafe: boolean;
  forThrottle: boolean;
  characteristic: string;
  bestUse: string;
}

const DATA: Record<ControlValveType, ControlValveData> = {
  globe_linear_pneumatic: {
    rangeability: 10, accuracy: 10, capacity: 6, shutoff: 9, cvCost: 7,
    failSafe: true, forThrottle: true,
    characteristic: "equal_percentage_trim_cage_guided",
    bestUse: "steam_pressure_temperature_control",
  },
  butterfly_rotary_actuated: {
    rangeability: 7, accuracy: 7, capacity: 10, shutoff: 7, cvCost: 5,
    failSafe: true, forThrottle: true,
    characteristic: "modified_equal_pct_disc_rotation",
    bestUse: "large_pipe_chilled_water_hvac",
  },
  ball_segmented_characterized: {
    rangeability: 9, accuracy: 8, capacity: 8, shutoff: 10, cvCost: 8,
    failSafe: true, forThrottle: true,
    characteristic: "v_notch_ball_linear_flow",
    bestUse: "slurry_pulp_fibrous_fluid",
  },
  diaphragm_sanitary_clean: {
    rangeability: 5, accuracy: 6, capacity: 5, shutoff: 8, cvCost: 6,
    failSafe: false, forThrottle: false,
    characteristic: "weir_diaphragm_on_off_sanitary",
    bestUse: "pharmaceutical_food_clean_process",
  },
  eccentric_plug_tight_shutoff: {
    rangeability: 8, accuracy: 8, capacity: 7, shutoff: 10, cvCost: 7,
    failSafe: true, forThrottle: true,
    characteristic: "eccentric_rotating_plug_tight",
    bestUse: "high_pressure_drop_erosive_flow",
  },
};

function get(t: ControlValveType): ControlValveData {
  return DATA[t];
}

export const rangeability = (t: ControlValveType) => get(t).rangeability;
export const accuracy = (t: ControlValveType) => get(t).accuracy;
export const capacity = (t: ControlValveType) => get(t).capacity;
export const shutoff = (t: ControlValveType) => get(t).shutoff;
export const cvCost = (t: ControlValveType) => get(t).cvCost;
export const failSafe = (t: ControlValveType) => get(t).failSafe;
export const forThrottle = (t: ControlValveType) => get(t).forThrottle;
export const characteristic = (t: ControlValveType) => get(t).characteristic;
export const bestUse = (t: ControlValveType) => get(t).bestUse;
export const controlValveTypes = (): ControlValveType[] =>
  Object.keys(DATA) as ControlValveType[];
