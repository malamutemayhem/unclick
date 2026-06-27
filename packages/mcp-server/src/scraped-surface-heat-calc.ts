export type ScrapedSurfaceHeatType =
  | "votator_thin_film"
  | "contherm_concentric"
  | "terlotherm_rotating"
  | "crystallizer_scraped"
  | "aseptic_scraped_sterile";

interface ScrapedSurfaceHeatData {
  heatTransfer: number;
  viscosityRange: number;
  foulingResist: number;
  precision: number;
  ssCost: number;
  continuous: boolean;
  forViscous: boolean;
  scraper: string;
  bestUse: string;
}

const DATA: Record<ScrapedSurfaceHeatType, ScrapedSurfaceHeatData> = {
  votator_thin_film: {
    heatTransfer: 9, viscosityRange: 10, foulingResist: 9, precision: 7, ssCost: 8,
    continuous: true, forViscous: true,
    scraper: "spring_loaded_blade_mutator_shaft",
    bestUse: "margarine_shortening_fat_crystallize",
  },
  contherm_concentric: {
    heatTransfer: 8, viscosityRange: 9, foulingResist: 8, precision: 8, ssCost: 7,
    continuous: true, forViscous: true,
    scraper: "fixed_blade_concentric_annulus_rotate",
    bestUse: "sauce_puree_baby_food_heat_cool",
  },
  terlotherm_rotating: {
    heatTransfer: 7, viscosityRange: 8, foulingResist: 10, precision: 6, ssCost: 6,
    continuous: true, forViscous: true,
    scraper: "rotating_outer_cylinder_inner_stationary",
    bestUse: "starch_paste_heavy_fouling_slurry",
  },
  crystallizer_scraped: {
    heatTransfer: 7, viscosityRange: 7, foulingResist: 10, precision: 9, ssCost: 9,
    continuous: true, forViscous: false,
    scraper: "close_clearance_blade_crystal_prevent",
    bestUse: "wax_dewax_lube_oil_crystal_control",
  },
  aseptic_scraped_sterile: {
    heatTransfer: 9, viscosityRange: 9, foulingResist: 8, precision: 10, ssCost: 10,
    continuous: true, forViscous: true,
    scraper: "sanitary_blade_cip_sip_sterile_seal",
    bestUse: "uht_dairy_aseptic_particle_gentle",
  },
};

function get(t: ScrapedSurfaceHeatType): ScrapedSurfaceHeatData {
  return DATA[t];
}

export const heatTransfer = (t: ScrapedSurfaceHeatType) => get(t).heatTransfer;
export const viscosityRange = (t: ScrapedSurfaceHeatType) => get(t).viscosityRange;
export const foulingResist = (t: ScrapedSurfaceHeatType) => get(t).foulingResist;
export const precision = (t: ScrapedSurfaceHeatType) => get(t).precision;
export const ssCost = (t: ScrapedSurfaceHeatType) => get(t).ssCost;
export const continuous = (t: ScrapedSurfaceHeatType) => get(t).continuous;
export const forViscous = (t: ScrapedSurfaceHeatType) => get(t).forViscous;
export const scraper = (t: ScrapedSurfaceHeatType) => get(t).scraper;
export const bestUse = (t: ScrapedSurfaceHeatType) => get(t).bestUse;
export const scrapedSurfaceHeatTypes = (): ScrapedSurfaceHeatType[] =>
  Object.keys(DATA) as ScrapedSurfaceHeatType[];
