export type SightGlassType =
  | "reflex_flat_glass"
  | "transparent_tubular"
  | "magnetic_level_gauge"
  | "bicolor_steam_boiler"
  | "camera_sight_remote";

interface SightGlassData {
  visibility: number;
  pressureRate: number;
  safety: number;
  maintenance: number;
  sgCost: number;
  nonContact: boolean;
  forHighPress: boolean;
  glass: string;
  bestUse: string;
}

const DATA: Record<SightGlassType, SightGlassData> = {
  reflex_flat_glass: {
    visibility: 7, pressureRate: 8, safety: 7, maintenance: 6, sgCost: 4,
    nonContact: false, forHighPress: true,
    glass: "borosilicate_flat_prism_reflex_groove",
    bestUse: "boiler_drum_high_pressure_steam_level",
  },
  transparent_tubular: {
    visibility: 9, pressureRate: 5, safety: 5, maintenance: 7, sgCost: 3,
    nonContact: false, forHighPress: false,
    glass: "borosilicate_tube_full_360_view",
    bestUse: "low_pressure_tank_visual_color_check",
  },
  magnetic_level_gauge: {
    visibility: 8, pressureRate: 9, safety: 9, maintenance: 8, sgCost: 7,
    nonContact: true, forHighPress: true,
    glass: "no_glass_magnetic_float_indicator_flag",
    bestUse: "hazardous_fluid_no_glass_safe_indicate",
  },
  bicolor_steam_boiler: {
    visibility: 6, pressureRate: 10, safety: 8, maintenance: 5, sgCost: 5,
    nonContact: false, forHighPress: true,
    glass: "dual_color_red_green_steam_water_prism",
    bestUse: "steam_boiler_drum_clear_interface_view",
  },
  camera_sight_remote: {
    visibility: 10, pressureRate: 7, safety: 10, maintenance: 4, sgCost: 8,
    nonContact: true, forHighPress: false,
    glass: "illuminated_camera_window_remote_display",
    bestUse: "remote_view_furnace_reactor_hazard_zone",
  },
};

function get(t: SightGlassType): SightGlassData {
  return DATA[t];
}

export const visibility = (t: SightGlassType) => get(t).visibility;
export const pressureRate = (t: SightGlassType) => get(t).pressureRate;
export const safety = (t: SightGlassType) => get(t).safety;
export const maintenance = (t: SightGlassType) => get(t).maintenance;
export const sgCost = (t: SightGlassType) => get(t).sgCost;
export const nonContact = (t: SightGlassType) => get(t).nonContact;
export const forHighPress = (t: SightGlassType) => get(t).forHighPress;
export const glass = (t: SightGlassType) => get(t).glass;
export const bestUse = (t: SightGlassType) => get(t).bestUse;
export const sightGlassTypes = (): SightGlassType[] =>
  Object.keys(DATA) as SightGlassType[];
