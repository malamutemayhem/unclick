// silk-steam-calc - silk steaming equipment types

export type SilkSteam =
  | "stovetop_steamer_basic"
  | "electric_steamer_auto"
  | "professional_cabinet"
  | "bamboo_steamer_natural"
  | "pressure_steamer_fast";

const DATA: Record<SilkSteam, {
  steamEven: number; tempControl: number; capacity: number; setupEase: number;
  cost: number; electric: boolean; forProduction: boolean; steamSource: string; bestUse: string;
}> = {
  stovetop_steamer_basic:  { steamEven: 6, tempControl: 5, capacity: 5, setupEase: 7, cost: 3, electric: false, forProduction: false, steamSource: "boiling_water_pot", bestUse: "home_studio_steam" },
  electric_steamer_auto:   { steamEven: 8, tempControl: 9, capacity: 7, setupEase: 9, cost: 7, electric: true, forProduction: false, steamSource: "electric_element_tank", bestUse: "reliable_auto_steam" },
  professional_cabinet:    { steamEven: 10, tempControl: 10, capacity: 10, setupEase: 4, cost: 10, electric: true, forProduction: true, steamSource: "sealed_cabinet_boiler", bestUse: "production_batch_steam" },
  bamboo_steamer_natural:  { steamEven: 5, tempControl: 4, capacity: 4, setupEase: 8, cost: 2, electric: false, forProduction: false, steamSource: "bamboo_basket_steam", bestUse: "small_piece_eco_steam" },
  pressure_steamer_fast:   { steamEven: 9, tempControl: 7, capacity: 6, setupEase: 6, cost: 8, electric: true, forProduction: true, steamSource: "pressurized_steam_tank", bestUse: "fast_high_volume_steam" },
};

const get = (s: SilkSteam) => DATA[s];
export const steamEven = (s: SilkSteam) => get(s).steamEven;
export const tempControl = (s: SilkSteam) => get(s).tempControl;
export const capacity = (s: SilkSteam) => get(s).capacity;
export const setupEase = (s: SilkSteam) => get(s).setupEase;
export const steamCost = (s: SilkSteam) => get(s).cost;
export const electric = (s: SilkSteam) => get(s).electric;
export const forProduction = (s: SilkSteam) => get(s).forProduction;
export const steamSource = (s: SilkSteam) => get(s).steamSource;
export const bestUse = (s: SilkSteam) => get(s).bestUse;
export const silkSteams = (): SilkSteam[] => Object.keys(DATA) as SilkSteam[];
