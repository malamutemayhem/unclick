export type CommercialOvenType =
  | "convection_electric"
  | "convection_gas"
  | "combi_steam_convection"
  | "deck_pizza_stone"
  | "conveyor_impingement";

interface CommercialOvenData {
  capacity: number;
  versatility: number;
  efficiency: number;
  speed: number;
  coCost: number;
  steamCapable: boolean;
  forHighVolume: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<CommercialOvenType, CommercialOvenData> = {
  convection_electric: {
    capacity: 6, versatility: 7, efficiency: 8, speed: 7, coCost: 4,
    steamCapable: false, forHighVolume: false,
    heating: "electric_element_fan_forced",
    bestUse: "bakery_cafe_general_baking",
  },
  convection_gas: {
    capacity: 7, versatility: 7, efficiency: 7, speed: 7, coCost: 5,
    steamCapable: false, forHighVolume: false,
    heating: "gas_burner_fan_forced_flue",
    bestUse: "restaurant_roasting_baking",
  },
  combi_steam_convection: {
    capacity: 8, versatility: 10, efficiency: 9, speed: 8, coCost: 9,
    steamCapable: true, forHighVolume: true,
    heating: "electric_steam_injection_combo",
    bestUse: "hotel_hospital_multi_method",
  },
  deck_pizza_stone: {
    capacity: 5, versatility: 4, efficiency: 6, speed: 6, coCost: 6,
    steamCapable: false, forHighVolume: false,
    heating: "gas_stone_deck_radiant_heat",
    bestUse: "pizzeria_artisan_bread_bakery",
  },
  conveyor_impingement: {
    capacity: 10, versatility: 3, efficiency: 7, speed: 10, coCost: 8,
    steamCapable: false, forHighVolume: true,
    heating: "gas_impingement_jet_conveyor",
    bestUse: "fast_food_pizza_chain_volume",
  },
};

function get(t: CommercialOvenType): CommercialOvenData {
  return DATA[t];
}

export const capacity = (t: CommercialOvenType) => get(t).capacity;
export const versatility = (t: CommercialOvenType) => get(t).versatility;
export const efficiency = (t: CommercialOvenType) => get(t).efficiency;
export const speed = (t: CommercialOvenType) => get(t).speed;
export const coCost = (t: CommercialOvenType) => get(t).coCost;
export const steamCapable = (t: CommercialOvenType) => get(t).steamCapable;
export const forHighVolume = (t: CommercialOvenType) => get(t).forHighVolume;
export const heating = (t: CommercialOvenType) => get(t).heating;
export const bestUse = (t: CommercialOvenType) => get(t).bestUse;
export const commercialOvenTypes = (): CommercialOvenType[] =>
  Object.keys(DATA) as CommercialOvenType[];
