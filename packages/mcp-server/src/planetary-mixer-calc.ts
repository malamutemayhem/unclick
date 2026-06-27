export type PlanetaryMixerType =
  | "single_planetary_standard"
  | "double_planetary_viscous"
  | "tri_shaft_disperse"
  | "vacuum_planetary_degas"
  | "heated_planetary_react";

interface PlanetaryMixerData {
  mixIntensity: number;
  viscosityRange: number;
  scraping: number;
  cleanability: number;
  plCost: number;
  multiShaft: boolean;
  forHighVisc: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<PlanetaryMixerType, PlanetaryMixerData> = {
  single_planetary_standard: {
    mixIntensity: 6, viscosityRange: 7, scraping: 7, cleanability: 7, plCost: 4,
    multiShaft: false, forHighVisc: false,
    blade: "single_blade_orbital_wall_scrape",
    bestUse: "bakery_dough_paste_cream_standard",
  },
  double_planetary_viscous: {
    mixIntensity: 9, viscosityRange: 10, scraping: 9, cleanability: 5, plCost: 7,
    multiShaft: true, forHighVisc: true,
    blade: "dual_blade_counter_orbit_high_torque",
    bestUse: "sealant_adhesive_battery_paste_viscous",
  },
  tri_shaft_disperse: {
    mixIntensity: 10, viscosityRange: 8, scraping: 8, cleanability: 4, plCost: 9,
    multiShaft: true, forHighVisc: true,
    blade: "anchor_plus_disperse_plus_rotor_stator",
    bestUse: "ink_coating_pigment_disperse_deagglom",
  },
  vacuum_planetary_degas: {
    mixIntensity: 8, viscosityRange: 9, scraping: 8, cleanability: 5, plCost: 8,
    multiShaft: false, forHighVisc: true,
    blade: "planetary_blade_vacuum_chamber_degas",
    bestUse: "silicone_potting_compound_bubble_free",
  },
  heated_planetary_react: {
    mixIntensity: 7, viscosityRange: 8, scraping: 7, cleanability: 4, plCost: 8,
    multiShaft: false, forHighVisc: true,
    blade: "jacketed_bowl_planetary_heated_react",
    bestUse: "polymer_reaction_hot_melt_compound",
  },
};

function get(t: PlanetaryMixerType): PlanetaryMixerData {
  return DATA[t];
}

export const mixIntensity = (t: PlanetaryMixerType) => get(t).mixIntensity;
export const viscosityRange = (t: PlanetaryMixerType) => get(t).viscosityRange;
export const scraping = (t: PlanetaryMixerType) => get(t).scraping;
export const cleanability = (t: PlanetaryMixerType) => get(t).cleanability;
export const plCost = (t: PlanetaryMixerType) => get(t).plCost;
export const multiShaft = (t: PlanetaryMixerType) => get(t).multiShaft;
export const forHighVisc = (t: PlanetaryMixerType) => get(t).forHighVisc;
export const blade = (t: PlanetaryMixerType) => get(t).blade;
export const bestUse = (t: PlanetaryMixerType) => get(t).bestUse;
export const planetaryMixerTypes = (): PlanetaryMixerType[] =>
  Object.keys(DATA) as PlanetaryMixerType[];
