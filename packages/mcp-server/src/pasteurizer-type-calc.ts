export type PasteurizerType =
  | "htst_plate_heat"
  | "uht_ultra_high_temp"
  | "batch_vat_low_temp"
  | "tunnel_spray_container"
  | "ohmic_electric_heat";

const DATA: Record<PasteurizerType, {
  throughput: number; shelfLife: number; nutrient: number;
  energy: number; pzCost: number; continuous: boolean;
  forDairy: boolean; heating: string; bestUse: string;
}> = {
  htst_plate_heat: {
    throughput: 9, shelfLife: 6, nutrient: 8,
    energy: 8, pzCost: 3, continuous: true,
    forDairy: true, heating: "plate_heat_exchanger_72c",
    bestUse: "fluid_milk_juice_high_volume",
  },
  uht_ultra_high_temp: {
    throughput: 8, shelfLife: 10, nutrient: 5,
    energy: 6, pzCost: 5, continuous: true,
    forDairy: true, heating: "direct_steam_injection_140c",
    bestUse: "aseptic_milk_cream_long_shelf",
  },
  batch_vat_low_temp: {
    throughput: 3, shelfLife: 5, nutrient: 9,
    energy: 5, pzCost: 1, continuous: false,
    forDairy: true, heating: "jacketed_vat_63c_30min",
    bestUse: "craft_cheese_small_dairy_batch",
  },
  tunnel_spray_container: {
    throughput: 7, shelfLife: 7, nutrient: 7,
    energy: 5, pzCost: 3, continuous: true,
    forDairy: false, heating: "hot_water_spray_tunnel",
    bestUse: "canned_bottled_beverage_post_fill",
  },
  ohmic_electric_heat: {
    throughput: 6, shelfLife: 8, nutrient: 8,
    energy: 9, pzCost: 4, continuous: true,
    forDairy: false, heating: "electric_current_volumetric",
    bestUse: "particulate_soup_sauce_chunks",
  },
};

const get = (t: PasteurizerType) => DATA[t];

export const throughput = (t: PasteurizerType) => get(t).throughput;
export const shelfLife = (t: PasteurizerType) => get(t).shelfLife;
export const nutrient = (t: PasteurizerType) => get(t).nutrient;
export const energy = (t: PasteurizerType) => get(t).energy;
export const pzCost = (t: PasteurizerType) => get(t).pzCost;
export const continuous = (t: PasteurizerType) => get(t).continuous;
export const forDairy = (t: PasteurizerType) => get(t).forDairy;
export const heating = (t: PasteurizerType) => get(t).heating;
export const bestUse = (t: PasteurizerType) => get(t).bestUse;
export const pasteurizerTypes = (): PasteurizerType[] => Object.keys(DATA) as PasteurizerType[];
