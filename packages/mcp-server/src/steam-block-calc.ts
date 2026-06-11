// steam-block-calc - steam blocking tool types

export type SteamBlock =
  | "garment_steamer_hand"
  | "steam_iron_press"
  | "steam_generator_pro"
  | "travel_steamer_compact"
  | "vertical_steamer_hang";

const DATA: Record<SteamBlock, {
  steamOutput: number; tempControl: number; portability: number; waterCapacity: number;
  cost: number; handheld: boolean; forDelicate: boolean; steamMethod: string; bestUse: string;
}> = {
  garment_steamer_hand:   { steamOutput: 7, tempControl: 6, portability: 8, waterCapacity: 6, cost: 5, handheld: true, forDelicate: true, steamMethod: "continuous_flow_steam", bestUse: "general_knit_steam" },
  steam_iron_press:       { steamOutput: 8, tempControl: 9, portability: 6, waterCapacity: 5, cost: 4, handheld: true, forDelicate: false, steamMethod: "burst_press_steam", bestUse: "flat_press_block" },
  steam_generator_pro:    { steamOutput: 10, tempControl: 10, portability: 3, waterCapacity: 10, cost: 9, handheld: false, forDelicate: false, steamMethod: "high_pressure_boiler", bestUse: "professional_volume_block" },
  travel_steamer_compact: { steamOutput: 5, tempControl: 4, portability: 10, waterCapacity: 3, cost: 3, handheld: true, forDelicate: true, steamMethod: "mini_tank_steam", bestUse: "travel_touch_up" },
  vertical_steamer_hang:  { steamOutput: 9, tempControl: 7, portability: 4, waterCapacity: 8, cost: 7, handheld: false, forDelicate: true, steamMethod: "upright_pole_steam", bestUse: "hanging_garment_steam" },
};

const get = (s: SteamBlock) => DATA[s];
export const steamOutput = (s: SteamBlock) => get(s).steamOutput;
export const tempControl = (s: SteamBlock) => get(s).tempControl;
export const portability = (s: SteamBlock) => get(s).portability;
export const waterCapacity = (s: SteamBlock) => get(s).waterCapacity;
export const steamBlockCost = (s: SteamBlock) => get(s).cost;
export const handheld = (s: SteamBlock) => get(s).handheld;
export const forDelicate = (s: SteamBlock) => get(s).forDelicate;
export const steamMethod = (s: SteamBlock) => get(s).steamMethod;
export const bestUse = (s: SteamBlock) => get(s).bestUse;
export const steamBlocks = (): SteamBlock[] => Object.keys(DATA) as SteamBlock[];
