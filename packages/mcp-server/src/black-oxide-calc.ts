export type BlackOxideType =
  | "hot_alkaline"
  | "mid_temperature"
  | "room_temperature"
  | "hot_acid"
  | "steam_oxide";

interface BlackOxideData {
  corrosionProtection: number;
  adhesion: number;
  dimensionalChange: number;
  appearance: number;
  boCost: number;
  oilRequired: boolean;
  forFasteners: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<BlackOxideType, BlackOxideData> = {
  hot_alkaline: {
    corrosionProtection: 8, adhesion: 10, dimensionalChange: 9, appearance: 9, boCost: 5,
    oilRequired: true, forFasteners: true,
    process: "naoh_nano3_141c_immersion_magnetite_fe3o4_conversion_coat",
    bestUse: "gun_barrel_tool_fastener_gear_military_spec_mil_dtl_13924",
  },
  mid_temperature: {
    corrosionProtection: 7, adhesion: 8, dimensionalChange: 9, appearance: 8, boCost: 4,
    oilRequired: true, forFasteners: true,
    process: "proprietary_blend_100c_copper_selenium_compound_black_coat",
    bestUse: "general_hardware_bracket_hinge_moderate_appearance_low_heat",
  },
  room_temperature: {
    corrosionProtection: 5, adhesion: 6, dimensionalChange: 10, appearance: 7, boCost: 3,
    oilRequired: true, forFasteners: false,
    process: "copper_selenide_solution_ambient_dip_thin_deposit_touch_up",
    bestUse: "touch_up_repair_small_batch_prototype_in_shop_application",
  },
  hot_acid: {
    corrosionProtection: 7, adhesion: 9, dimensionalChange: 9, appearance: 8, boCost: 6,
    oilRequired: true, forFasteners: true,
    process: "phosphoric_acid_based_hot_immersion_stainless_compatible",
    bestUse: "stainless_steel_black_finish_surgical_instrument_marine",
  },
  steam_oxide: {
    corrosionProtection: 6, adhesion: 9, dimensionalChange: 9, appearance: 7, boCost: 4,
    oilRequired: false, forFasteners: true,
    process: "superheated_steam_540c_furnace_thick_fe3o4_powder_metal_seal",
    bestUse: "sintered_powder_metal_part_pore_seal_density_increase",
  },
};

function get(t: BlackOxideType): BlackOxideData {
  return DATA[t];
}

export const corrosionProtection = (t: BlackOxideType) => get(t).corrosionProtection;
export const adhesion = (t: BlackOxideType) => get(t).adhesion;
export const dimensionalChange = (t: BlackOxideType) => get(t).dimensionalChange;
export const appearance = (t: BlackOxideType) => get(t).appearance;
export const boCost = (t: BlackOxideType) => get(t).boCost;
export const oilRequired = (t: BlackOxideType) => get(t).oilRequired;
export const forFasteners = (t: BlackOxideType) => get(t).forFasteners;
export const process = (t: BlackOxideType) => get(t).process;
export const bestUse = (t: BlackOxideType) => get(t).bestUse;
export const blackOxideTypes = (): BlackOxideType[] =>
  Object.keys(DATA) as BlackOxideType[];
