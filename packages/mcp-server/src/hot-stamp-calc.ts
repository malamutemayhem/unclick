export type HotStampType =
  | "flat_die_foil"
  | "rotary_die_continuous"
  | "digital_foil_toner"
  | "silicone_roller_curved"
  | "combo_emboss_foil";

interface HotStampData {
  detail: number;
  speed: number;
  coverage: number;
  durability: number;
  hsCost: number;
  foilless: boolean;
  forCurved: boolean;
  foilType: string;
  bestUse: string;
}

const DATA: Record<HotStampType, HotStampData> = {
  flat_die_foil: {
    detail: 9, speed: 7, coverage: 7, durability: 9, hsCost: 6,
    foilless: false, forCurved: false,
    foilType: "metallic_pigment_holographic_roll",
    bestUse: "book_cover_certificate_luxury_box",
  },
  rotary_die_continuous: {
    detail: 8, speed: 10, coverage: 8, durability: 9, hsCost: 8,
    foilless: false, forCurved: false,
    foilType: "continuous_web_metallic_film",
    bestUse: "label_carton_high_volume_inline",
  },
  digital_foil_toner: {
    detail: 10, speed: 6, coverage: 6, durability: 7, hsCost: 7,
    foilless: true, forCurved: false,
    foilType: "toner_adhesion_foil_transfer",
    bestUse: "short_run_variable_data_foil",
  },
  silicone_roller_curved: {
    detail: 6, speed: 8, coverage: 9, durability: 8, hsCost: 5,
    foilless: false, forCurved: true,
    foilType: "conformable_silicone_carrier_foil",
    bestUse: "bottle_cap_tube_curved_surface",
  },
  combo_emboss_foil: {
    detail: 9, speed: 6, coverage: 7, durability: 10, hsCost: 9,
    foilless: false, forCurved: false,
    foilType: "multi_level_sculptured_brass_die",
    bestUse: "premium_packaging_wine_cosmetic",
  },
};

function get(t: HotStampType): HotStampData {
  return DATA[t];
}

export const detail = (t: HotStampType) => get(t).detail;
export const speed = (t: HotStampType) => get(t).speed;
export const coverage = (t: HotStampType) => get(t).coverage;
export const durability = (t: HotStampType) => get(t).durability;
export const hsCost = (t: HotStampType) => get(t).hsCost;
export const foilless = (t: HotStampType) => get(t).foilless;
export const forCurved = (t: HotStampType) => get(t).forCurved;
export const foilType = (t: HotStampType) => get(t).foilType;
export const bestUse = (t: HotStampType) => get(t).bestUse;
export const hotStampTypes = (): HotStampType[] =>
  Object.keys(DATA) as HotStampType[];
