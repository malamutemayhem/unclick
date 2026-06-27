export type CalenderRollType =
  | "two_roll_sheet"
  | "three_roll_inverted_l"
  | "four_roll_z_config"
  | "four_roll_l_config"
  | "embossing_calender";

interface CalenderRollData {
  sheetSpeed: number;
  thicknessControl: number;
  surfaceFinish: number;
  rollWidth: number;
  crCost: number;
  heated: boolean;
  forFilm: boolean;
  rollConfig: string;
  bestUse: string;
}

const DATA: Record<CalenderRollType, CalenderRollData> = {
  two_roll_sheet: {
    sheetSpeed: 7, thicknessControl: 6, surfaceFinish: 6, rollWidth: 7, crCost: 5,
    heated: true, forFilm: false,
    rollConfig: "two_roll_nip_sheet_simple_gauge_control_rubber_compound_feed",
    bestUse: "rubber_sheet_stock_gasket_material_two_roll_simple_sheeting",
  },
  three_roll_inverted_l: {
    sheetSpeed: 8, thicknessControl: 8, surfaceFinish: 8, rollWidth: 8, crCost: 7,
    heated: true, forFilm: true,
    rollConfig: "three_roll_inverted_l_bank_nip_strip_sheet_pvc_film_accurate",
    bestUse: "pvc_film_sheet_flooring_vinyl_three_roll_inverted_l_calender",
  },
  four_roll_z_config: {
    sheetSpeed: 10, thicknessControl: 10, surfaceFinish: 9, rollWidth: 10, crCost: 9,
    heated: true, forFilm: true,
    rollConfig: "four_roll_z_config_precision_gauge_wide_web_high_speed_film",
    bestUse: "precision_pvc_film_wide_web_packaging_four_roll_z_high_speed",
  },
  four_roll_l_config: {
    sheetSpeed: 9, thicknessControl: 9, surfaceFinish: 9, rollWidth: 9, crCost: 8,
    heated: true, forFilm: true,
    rollConfig: "four_roll_l_config_rubber_compound_sheet_tire_conveyor_belt",
    bestUse: "rubber_compound_sheet_tire_component_conveyor_belt_l_calender",
  },
  embossing_calender: {
    sheetSpeed: 7, thicknessControl: 7, surfaceFinish: 10, rollWidth: 8, crCost: 7,
    heated: true, forFilm: false,
    rollConfig: "embossing_calender_engraved_roll_pattern_texture_surface_vinyl",
    bestUse: "textured_vinyl_wall_covering_embossed_sheet_decorative_pattern",
  },
};

function get(t: CalenderRollType): CalenderRollData {
  return DATA[t];
}

export const sheetSpeed = (t: CalenderRollType) => get(t).sheetSpeed;
export const thicknessControl = (t: CalenderRollType) => get(t).thicknessControl;
export const surfaceFinish = (t: CalenderRollType) => get(t).surfaceFinish;
export const rollWidth = (t: CalenderRollType) => get(t).rollWidth;
export const crCost = (t: CalenderRollType) => get(t).crCost;
export const heated = (t: CalenderRollType) => get(t).heated;
export const forFilm = (t: CalenderRollType) => get(t).forFilm;
export const rollConfig = (t: CalenderRollType) => get(t).rollConfig;
export const bestUse = (t: CalenderRollType) => get(t).bestUse;
export const calenderRollTypes = (): CalenderRollType[] =>
  Object.keys(DATA) as CalenderRollType[];
