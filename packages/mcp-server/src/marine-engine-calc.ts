export type MarineEngineType =
  | "slow_speed_two_stroke"
  | "medium_speed_four_stroke"
  | "high_speed_diesel_planing"
  | "gas_turbine_codog"
  | "electric_battery_hybrid";

const DATA: Record<MarineEngineType, {
  power: number; efficiency: number; weight: number;
  maintenance: number; meCost: number; dualFuel: boolean;
  forMerchant: boolean; fuel: string; bestUse: string;
}> = {
  slow_speed_two_stroke: {
    power: 10, efficiency: 10, weight: 2,
    maintenance: 6, meCost: 5, dualFuel: true,
    forMerchant: true, fuel: "hfo_vlsfo_lng_dual",
    bestUse: "vlcc_container_ship_main_engine",
  },
  medium_speed_four_stroke: {
    power: 7, efficiency: 8, weight: 5,
    maintenance: 7, meCost: 3, dualFuel: true,
    forMerchant: true, fuel: "mdo_mgo_lng_genset",
    bestUse: "ferry_offshore_vessel_genset",
  },
  high_speed_diesel_planing: {
    power: 4, efficiency: 6, weight: 8,
    maintenance: 5, meCost: 2, dualFuel: false,
    forMerchant: false, fuel: "marine_diesel_mgo",
    bestUse: "patrol_boat_yacht_workboat",
  },
  gas_turbine_codog: {
    power: 9, efficiency: 5, weight: 9,
    maintenance: 4, meCost: 5, dualFuel: false,
    forMerchant: false, fuel: "aviation_kerosene_f76",
    bestUse: "naval_frigate_fast_attack_craft",
  },
  electric_battery_hybrid: {
    power: 3, efficiency: 9, weight: 6,
    maintenance: 9, meCost: 4, dualFuel: false,
    forMerchant: false, fuel: "lithium_battery_shore_charge",
    bestUse: "harbor_ferry_short_route_green",
  },
};

const get = (t: MarineEngineType) => DATA[t];

export const power = (t: MarineEngineType) => get(t).power;
export const efficiency = (t: MarineEngineType) => get(t).efficiency;
export const weight = (t: MarineEngineType) => get(t).weight;
export const maintenance = (t: MarineEngineType) => get(t).maintenance;
export const meCost = (t: MarineEngineType) => get(t).meCost;
export const dualFuel = (t: MarineEngineType) => get(t).dualFuel;
export const forMerchant = (t: MarineEngineType) => get(t).forMerchant;
export const fuel = (t: MarineEngineType) => get(t).fuel;
export const bestUse = (t: MarineEngineType) => get(t).bestUse;
export const marineEngineTypes = (): MarineEngineType[] => Object.keys(DATA) as MarineEngineType[];
