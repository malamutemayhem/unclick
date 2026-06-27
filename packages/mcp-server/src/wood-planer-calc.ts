export type WoodPlanerType =
  | "thickness_single"
  | "jointer_planer"
  | "moulder_four_side"
  | "spiral_cutterhead"
  | "wide_belt_sander";

interface WoodPlanerData {
  speed: number;
  surfaceFinish: number;
  capacityWidth: number;
  profileRange: number;
  wpCost: number;
  multiSide: boolean;
  forProfile: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<WoodPlanerType, WoodPlanerData> = {
  thickness_single: {
    speed: 7, surfaceFinish: 7, capacityWidth: 7, profileRange: 2, wpCost: 4,
    multiSide: false, forProfile: false,
    cutting: "single_cutterhead_top_feed_roller_thickness_reduction",
    bestUse: "small_shop_board_thickness_s2s_dimension_lumber_prep",
  },
  jointer_planer: {
    speed: 6, surfaceFinish: 8, capacityWidth: 6, profileRange: 2, wpCost: 5,
    multiSide: false, forProfile: false,
    cutting: "combined_jointer_and_thickness_planer_flat_face_then_thick",
    bestUse: "cabinet_shop_face_jointing_and_thicknessing_combined_unit",
  },
  moulder_four_side: {
    speed: 9, surfaceFinish: 8, capacityWidth: 5, profileRange: 10, wpCost: 9,
    multiSide: true, forProfile: true,
    cutting: "four_spindle_heads_top_bottom_left_right_profile_knife",
    bestUse: "moulding_trim_flooring_siding_profile_shape_four_side",
  },
  spiral_cutterhead: {
    speed: 8, surfaceFinish: 10, capacityWidth: 8, profileRange: 2, wpCost: 7,
    multiSide: false, forProfile: false,
    cutting: "helical_carbide_insert_cutterhead_shearing_cut_low_noise",
    bestUse: "figured_hardwood_tearout_prone_species_premium_surface",
  },
  wide_belt_sander: {
    speed: 10, surfaceFinish: 9, capacityWidth: 10, profileRange: 3, wpCost: 8,
    multiSide: false, forProfile: false,
    cutting: "abrasive_belt_contact_drum_calibration_finish_sand_wide",
    bestUse: "panel_calibration_veneer_sanding_wide_board_finish_prep",
  },
};

function get(t: WoodPlanerType): WoodPlanerData {
  return DATA[t];
}

export const speed = (t: WoodPlanerType) => get(t).speed;
export const surfaceFinish = (t: WoodPlanerType) => get(t).surfaceFinish;
export const capacityWidth = (t: WoodPlanerType) => get(t).capacityWidth;
export const profileRange = (t: WoodPlanerType) => get(t).profileRange;
export const wpCost = (t: WoodPlanerType) => get(t).wpCost;
export const multiSide = (t: WoodPlanerType) => get(t).multiSide;
export const forProfile = (t: WoodPlanerType) => get(t).forProfile;
export const cutting = (t: WoodPlanerType) => get(t).cutting;
export const bestUse = (t: WoodPlanerType) => get(t).bestUse;
export const woodPlanerTypes = (): WoodPlanerType[] =>
  Object.keys(DATA) as WoodPlanerType[];
