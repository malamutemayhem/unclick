export type MediaMillType =
  | "bead_mill"
  | "sand_mill"
  | "basket_mill"
  | "agitator_ball"
  | "nano_mill";

interface MediaMillData {
  particleFineness: number;
  throughput: number;
  mediaRetention: number;
  tempControl: number;
  mmCost: number;
  continuous: boolean;
  forNano: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<MediaMillType, MediaMillData> = {
  bead_mill: {
    particleFineness: 9, throughput: 7, mediaRetention: 8, tempControl: 8, mmCost: 8,
    continuous: true, forNano: true,
    millConfig: "bead_mill_media_mill_zirconia_bead_disc_agitate_slurry_fine_grind",
    bestUse: "pharma_nano_bead_mill_media_mill_zirconia_sub_micron_disperse",
  },
  sand_mill: {
    particleFineness: 7, throughput: 8, mediaRetention: 6, tempControl: 6, mmCost: 5,
    continuous: true, forNano: false,
    millConfig: "sand_mill_media_mill_glass_bead_peristaltic_pump_recirculate",
    bestUse: "paint_grind_sand_mill_media_mill_glass_bead_pigment_disperse",
  },
  basket_mill: {
    particleFineness: 7, throughput: 6, mediaRetention: 9, tempControl: 7, mmCost: 6,
    continuous: false, forNano: false,
    millConfig: "basket_mill_media_mill_immerse_basket_in_tank_batch_grind_easy",
    bestUse: "ink_batch_basket_mill_media_mill_immerse_tank_easy_clean_switch",
  },
  agitator_ball: {
    particleFineness: 8, throughput: 8, mediaRetention: 7, tempControl: 7, mmCost: 7,
    continuous: true, forNano: false,
    millConfig: "agitator_ball_media_mill_pin_disc_stir_steel_ball_heavy_grind",
    bestUse: "mineral_slurry_agitator_ball_media_mill_heavy_duty_high_solids",
  },
  nano_mill: {
    particleFineness: 10, throughput: 4, mediaRetention: 9, tempControl: 9, mmCost: 10,
    continuous: true, forNano: true,
    millConfig: "nano_mill_media_mill_micro_bead_centrifugal_screen_sub_100nm",
    bestUse: "nanoparticle_nano_mill_media_mill_micro_bead_sub_100nm_uniform",
  },
};

function get(t: MediaMillType): MediaMillData {
  return DATA[t];
}

export const particleFineness = (t: MediaMillType) => get(t).particleFineness;
export const throughput = (t: MediaMillType) => get(t).throughput;
export const mediaRetention = (t: MediaMillType) => get(t).mediaRetention;
export const tempControl = (t: MediaMillType) => get(t).tempControl;
export const mmCost = (t: MediaMillType) => get(t).mmCost;
export const continuous = (t: MediaMillType) => get(t).continuous;
export const forNano = (t: MediaMillType) => get(t).forNano;
export const millConfig = (t: MediaMillType) => get(t).millConfig;
export const bestUse = (t: MediaMillType) => get(t).bestUse;
export const mediaMillTypes = (): MediaMillType[] =>
  Object.keys(DATA) as MediaMillType[];
