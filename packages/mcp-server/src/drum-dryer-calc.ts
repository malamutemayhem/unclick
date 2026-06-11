export type DrumDryerType =
  | "single_drum_atmospheric"
  | "double_drum_nip_feed"
  | "twin_drum_splash_feed"
  | "vacuum_drum_low_temp"
  | "internally_heated_rotary";

interface DrumDryerData {
  evapRate: number;
  filmControl: number;
  heatEfficiency: number;
  versatility: number;
  ddCost: number;
  continuous: boolean;
  forPaste: boolean;
  feed: string;
  bestUse: string;
}

const DATA: Record<DrumDryerType, DrumDryerData> = {
  single_drum_atmospheric: {
    evapRate: 7, filmControl: 7, heatEfficiency: 7, versatility: 8, ddCost: 5,
    continuous: true, forPaste: true,
    feed: "dip_roller_applicator_thin_film",
    bestUse: "cereal_flake_starch_slurry_dry",
  },
  double_drum_nip_feed: {
    evapRate: 9, filmControl: 9, heatEfficiency: 8, versatility: 7, ddCost: 7,
    continuous: true, forPaste: true,
    feed: "nip_gap_metered_both_drums",
    bestUse: "baby_food_potato_flake_uniform",
  },
  twin_drum_splash_feed: {
    evapRate: 8, filmControl: 6, heatEfficiency: 7, versatility: 6, ddCost: 6,
    continuous: true, forPaste: false,
    feed: "splash_pan_bottom_immerse_coat",
    bestUse: "chemical_salt_low_viscosity_liquid",
  },
  vacuum_drum_low_temp: {
    evapRate: 5, filmControl: 8, heatEfficiency: 6, versatility: 5, ddCost: 9,
    continuous: true, forPaste: true,
    feed: "dip_vacuum_chamber_sealed_drum",
    bestUse: "heat_sensitive_pharma_enzyme_dry",
  },
  internally_heated_rotary: {
    evapRate: 10, filmControl: 5, heatEfficiency: 9, versatility: 9, ddCost: 8,
    continuous: true, forPaste: false,
    feed: "tumble_cascade_internal_steam_tube",
    bestUse: "mineral_ore_bulk_granular_high_vol",
  },
};

function get(t: DrumDryerType): DrumDryerData {
  return DATA[t];
}

export const evapRate = (t: DrumDryerType) => get(t).evapRate;
export const filmControl = (t: DrumDryerType) => get(t).filmControl;
export const heatEfficiency = (t: DrumDryerType) => get(t).heatEfficiency;
export const versatility = (t: DrumDryerType) => get(t).versatility;
export const ddCost = (t: DrumDryerType) => get(t).ddCost;
export const continuous = (t: DrumDryerType) => get(t).continuous;
export const forPaste = (t: DrumDryerType) => get(t).forPaste;
export const feed = (t: DrumDryerType) => get(t).feed;
export const bestUse = (t: DrumDryerType) => get(t).bestUse;
export const drumDryerTypes = (): DrumDryerType[] =>
  Object.keys(DATA) as DrumDryerType[];
