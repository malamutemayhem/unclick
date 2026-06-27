export type PasteurizerType =
  | "htst_plate"
  | "uht_direct"
  | "uht_indirect"
  | "batch_vat"
  | "tunnel_spray";

interface PasteurizerData {
  speed: number;
  shelfLife: number;
  flavorRetention: number;
  energyEfficiency: number;
  pCost: number;
  continuous: boolean;
  forDairy: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<PasteurizerType, PasteurizerData> = {
  htst_plate: {
    speed: 9, shelfLife: 6, flavorRetention: 9, energyEfficiency: 9, pCost: 7,
    continuous: true, forDairy: true,
    heating: "plate_heat_exchanger_72c_15s_rapid_heat_cool_regeneration",
    bestUse: "fresh_milk_juice_beer_liquid_egg_high_throughput_dairy",
  },
  uht_direct: {
    speed: 8, shelfLife: 10, flavorRetention: 8, energyEfficiency: 6, pCost: 9,
    continuous: true, forDairy: true,
    heating: "steam_injection_or_infusion_135c_2s_flash_cool_vacuum",
    bestUse: "shelf_stable_milk_cream_aseptic_fill_long_life_dairy",
  },
  uht_indirect: {
    speed: 8, shelfLife: 10, flavorRetention: 7, energyEfficiency: 8, pCost: 8,
    continuous: true, forDairy: true,
    heating: "tubular_or_plate_heat_exchanger_135c_2s_no_steam_contact",
    bestUse: "flavored_milk_soy_drink_juice_pudding_aseptic_beverage",
  },
  batch_vat: {
    speed: 3, shelfLife: 5, flavorRetention: 10, energyEfficiency: 4, pCost: 3,
    continuous: false, forDairy: true,
    heating: "jacketed_vat_63c_30min_slow_heat_gentle_agitation_cool",
    bestUse: "craft_cheese_milk_small_batch_artisan_dairy_ice_cream_mix",
  },
  tunnel_spray: {
    speed: 7, shelfLife: 7, flavorRetention: 8, energyEfficiency: 7, pCost: 6,
    continuous: true, forDairy: false,
    heating: "hot_water_spray_tunnel_packaged_product_container_in_out",
    bestUse: "bottled_beer_canned_food_packaged_beverage_post_fill_pasteurize",
  },
};

function get(t: PasteurizerType): PasteurizerData {
  return DATA[t];
}

export const speed = (t: PasteurizerType) => get(t).speed;
export const shelfLife = (t: PasteurizerType) => get(t).shelfLife;
export const flavorRetention = (t: PasteurizerType) => get(t).flavorRetention;
export const energyEfficiency = (t: PasteurizerType) => get(t).energyEfficiency;
export const pCost = (t: PasteurizerType) => get(t).pCost;
export const continuous = (t: PasteurizerType) => get(t).continuous;
export const forDairy = (t: PasteurizerType) => get(t).forDairy;
export const heating = (t: PasteurizerType) => get(t).heating;
export const bestUse = (t: PasteurizerType) => get(t).bestUse;
export const pasteurizerTypes = (): PasteurizerType[] =>
  Object.keys(DATA) as PasteurizerType[];
