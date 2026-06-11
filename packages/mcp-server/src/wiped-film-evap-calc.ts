export type WipedFilmEvapType =
  | "vertical_falling_wfe"
  | "horizontal_thin_film"
  | "short_path_molecular"
  | "scraped_surface_cryst"
  | "agitated_conical_wfe";

interface WipedFilmEvapData {
  evapRate: number;
  residenceTime: number;
  heatSensitivity: number;
  viscosityRange: number;
  wfCost: number;
  molecular: boolean;
  forViscous: boolean;
  wiper: string;
  bestUse: string;
}

const DATA: Record<WipedFilmEvapType, WipedFilmEvapData> = {
  vertical_falling_wfe: {
    evapRate: 8, residenceTime: 7, heatSensitivity: 8, viscosityRange: 8, wfCost: 6,
    molecular: false, forViscous: true,
    wiper: "rigid_blade_wiper_vertical_wall_gravity_drain",
    bestUse: "polymer_resin_concentration_solvent_strip",
  },
  horizontal_thin_film: {
    evapRate: 7, residenceTime: 8, heatSensitivity: 8, viscosityRange: 9, wfCost: 7,
    molecular: false, forViscous: true,
    wiper: "horizontal_rotor_blade_conveying_discharge_end",
    bestUse: "food_paste_bitumen_high_viscosity_evaporation",
  },
  short_path_molecular: {
    evapRate: 6, residenceTime: 10, heatSensitivity: 10, viscosityRange: 7, wfCost: 9,
    molecular: true, forViscous: false,
    wiper: "internal_condenser_short_path_molecular_dist",
    bestUse: "essential_oil_vitamin_cbd_molecular_distill",
  },
  scraped_surface_cryst: {
    evapRate: 7, residenceTime: 6, heatSensitivity: 7, viscosityRange: 10, wfCost: 8,
    molecular: false, forViscous: true,
    wiper: "spring_loaded_scraper_blade_crystallizer_wall",
    bestUse: "wax_fat_chocolate_crystallization_cooling",
  },
  agitated_conical_wfe: {
    evapRate: 9, residenceTime: 7, heatSensitivity: 8, viscosityRange: 9, wfCost: 8,
    molecular: false, forViscous: true,
    wiper: "conical_vessel_helical_ribbon_agitator_vacuum",
    bestUse: "pharma_api_final_drying_solvent_evaporation",
  },
};

function get(t: WipedFilmEvapType): WipedFilmEvapData {
  return DATA[t];
}

export const evapRate = (t: WipedFilmEvapType) => get(t).evapRate;
export const residenceTime = (t: WipedFilmEvapType) => get(t).residenceTime;
export const heatSensitivity = (t: WipedFilmEvapType) => get(t).heatSensitivity;
export const viscosityRange = (t: WipedFilmEvapType) => get(t).viscosityRange;
export const wfCost = (t: WipedFilmEvapType) => get(t).wfCost;
export const molecular = (t: WipedFilmEvapType) => get(t).molecular;
export const forViscous = (t: WipedFilmEvapType) => get(t).forViscous;
export const wiper = (t: WipedFilmEvapType) => get(t).wiper;
export const bestUse = (t: WipedFilmEvapType) => get(t).bestUse;
export const wipedFilmEvapTypes = (): WipedFilmEvapType[] =>
  Object.keys(DATA) as WipedFilmEvapType[];
