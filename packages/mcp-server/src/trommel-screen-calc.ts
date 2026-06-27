export type TrommelScreenType =
  | "rotary_drum_municipal"
  | "scrubber_trommel_wash"
  | "star_screen_disc"
  | "grizzly_vibrating_bar"
  | "banana_screen_multi_slope";

interface TrommelScreenData {
  throughput: number;
  efficiency: number;
  durability: number;
  blinding: number;
  tsCost: number;
  selfCleaning: boolean;
  forWaste: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<TrommelScreenType, TrommelScreenData> = {
  rotary_drum_municipal: {
    throughput: 8, efficiency: 7, durability: 8, blinding: 8, tsCost: 6,
    selfCleaning: true, forWaste: true,
    media: "perforated_plate_drum_rotation",
    bestUse: "msw_compost_soil_screen_classify",
  },
  scrubber_trommel_wash: {
    throughput: 7, efficiency: 8, durability: 9, blinding: 9, tsCost: 8,
    selfCleaning: true, forWaste: false,
    media: "rubber_lined_drum_spray_bar_wash",
    bestUse: "alluvial_gold_gravel_clay_scrub",
  },
  star_screen_disc: {
    throughput: 9, efficiency: 9, durability: 7, blinding: 10, tsCost: 7,
    selfCleaning: true, forWaste: true,
    media: "rubber_star_disc_rotating_shaft",
    bestUse: "wood_chip_biomass_waste_oversize",
  },
  grizzly_vibrating_bar: {
    throughput: 10, efficiency: 6, durability: 10, blinding: 7, tsCost: 4,
    selfCleaning: false, forWaste: false,
    media: "manganese_steel_bar_vibrating_frame",
    bestUse: "quarry_scalp_rock_crusher_feed",
  },
  banana_screen_multi_slope: {
    throughput: 10, efficiency: 9, durability: 8, blinding: 6, tsCost: 8,
    selfCleaning: false, forWaste: false,
    media: "polyurethane_panel_multi_angle_deck",
    bestUse: "mineral_process_coal_dewater_screen",
  },
};

function get(t: TrommelScreenType): TrommelScreenData {
  return DATA[t];
}

export const throughput = (t: TrommelScreenType) => get(t).throughput;
export const efficiency = (t: TrommelScreenType) => get(t).efficiency;
export const durability = (t: TrommelScreenType) => get(t).durability;
export const blinding = (t: TrommelScreenType) => get(t).blinding;
export const tsCost = (t: TrommelScreenType) => get(t).tsCost;
export const selfCleaning = (t: TrommelScreenType) => get(t).selfCleaning;
export const forWaste = (t: TrommelScreenType) => get(t).forWaste;
export const media = (t: TrommelScreenType) => get(t).media;
export const bestUse = (t: TrommelScreenType) => get(t).bestUse;
export const trommelScreenTypes = (): TrommelScreenType[] =>
  Object.keys(DATA) as TrommelScreenType[];
