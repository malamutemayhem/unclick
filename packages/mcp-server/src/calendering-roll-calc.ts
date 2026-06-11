export type CalenderingRollType =
  | "friction_calender"
  | "embossing_calender"
  | "supercalender"
  | "thermobonding"
  | "chilled_cast";

interface CalenderingRollData {
  surfaceFinish: number;
  nipPressure: number;
  lineSpeed: number;
  rollTemperature: number;
  crCost: number;
  heated: boolean;
  forPaper: boolean;
  rollConfig: string;
  bestUse: string;
}

const DATA: Record<CalenderingRollType, CalenderingRollData> = {
  friction_calender: {
    surfaceFinish: 8, nipPressure: 8, lineSpeed: 7, rollTemperature: 8, crCost: 6,
    heated: true, forPaper: false,
    rollConfig: "speed_differential_rolls_friction_polish_surface_lustre",
    bestUse: "rubber_sheet_pvc_film_surface_polish_lustre_finish_compound",
  },
  embossing_calender: {
    surfaceFinish: 9, nipPressure: 9, lineSpeed: 7, rollTemperature: 7, crCost: 8,
    heated: true, forPaper: false,
    rollConfig: "engraved_pattern_roll_press_texture_into_substrate_surface",
    bestUse: "vinyl_flooring_wallpaper_leather_grain_decorative_texture",
  },
  supercalender: {
    surfaceFinish: 10, nipPressure: 10, lineSpeed: 9, rollTemperature: 6, crCost: 9,
    heated: false, forPaper: true,
    rollConfig: "alternating_steel_soft_roll_stack_high_nip_gloss_paper",
    bestUse: "coated_paper_magazine_label_high_gloss_smoothness_printing",
  },
  thermobonding: {
    surfaceFinish: 6, nipPressure: 7, lineSpeed: 8, rollTemperature: 9, crCost: 5,
    heated: true, forPaper: false,
    rollConfig: "heated_engraved_roll_bond_nonwoven_fiber_web_point_fusion",
    bestUse: "nonwoven_fabric_diaper_wipe_geotextile_thermal_bond_web",
  },
  chilled_cast: {
    surfaceFinish: 8, nipPressure: 6, lineSpeed: 9, rollTemperature: 5, crCost: 7,
    heated: false, forPaper: false,
    rollConfig: "water_cooled_chrome_roll_quench_cast_film_rapid_cool_gloss",
    bestUse: "cast_polypropylene_cpp_film_stretch_wrap_food_packaging",
  },
};

function get(t: CalenderingRollType): CalenderingRollData {
  return DATA[t];
}

export const surfaceFinish = (t: CalenderingRollType) => get(t).surfaceFinish;
export const nipPressure = (t: CalenderingRollType) => get(t).nipPressure;
export const lineSpeed = (t: CalenderingRollType) => get(t).lineSpeed;
export const rollTemperature = (t: CalenderingRollType) => get(t).rollTemperature;
export const crCost = (t: CalenderingRollType) => get(t).crCost;
export const heated = (t: CalenderingRollType) => get(t).heated;
export const forPaper = (t: CalenderingRollType) => get(t).forPaper;
export const rollConfig = (t: CalenderingRollType) => get(t).rollConfig;
export const bestUse = (t: CalenderingRollType) => get(t).bestUse;
export const calenderingRollTypes = (): CalenderingRollType[] =>
  Object.keys(DATA) as CalenderingRollType[];
