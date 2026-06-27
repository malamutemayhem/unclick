export type UnitHeaterType =
  | "gas_fired_propeller"
  | "hot_water_hydronic"
  | "electric_fan_forced"
  | "steam_unit_heater"
  | "infrared_tube_radiant";

interface UnitHeaterData {
  output: number;
  efficiency: number;
  noise: number;
  durability: number;
  uhCost: number;
  vented: boolean;
  forWarehouse: boolean;
  fuel: string;
  bestUse: string;
}

const DATA: Record<UnitHeaterType, UnitHeaterData> = {
  gas_fired_propeller: {
    output: 8, efficiency: 8, noise: 5, durability: 8, uhCost: 5,
    vented: true, forWarehouse: true,
    fuel: "natural_gas_propane_direct",
    bestUse: "warehouse_garage_shop_heat",
  },
  hot_water_hydronic: {
    output: 7, efficiency: 7, noise: 7, durability: 9, uhCost: 4,
    vented: false, forWarehouse: false,
    fuel: "hot_water_from_boiler_plant",
    bestUse: "commercial_building_perimeter",
  },
  electric_fan_forced: {
    output: 5, efficiency: 10, noise: 6, durability: 8, uhCost: 3,
    vented: false, forWarehouse: false,
    fuel: "electric_resistance_element",
    bestUse: "small_space_no_gas_available",
  },
  steam_unit_heater: {
    output: 9, efficiency: 7, noise: 6, durability: 10, uhCost: 6,
    vented: false, forWarehouse: true,
    fuel: "low_pressure_steam_coil",
    bestUse: "industrial_plant_steam_avail",
  },
  infrared_tube_radiant: {
    output: 9, efficiency: 9, noise: 9, durability: 8, uhCost: 7,
    vented: true, forWarehouse: true,
    fuel: "gas_fired_radiant_tube_burner",
    bestUse: "high_bay_warehouse_spot_heat",
  },
};

function get(t: UnitHeaterType): UnitHeaterData {
  return DATA[t];
}

export const output = (t: UnitHeaterType) => get(t).output;
export const efficiency = (t: UnitHeaterType) => get(t).efficiency;
export const noise = (t: UnitHeaterType) => get(t).noise;
export const durability = (t: UnitHeaterType) => get(t).durability;
export const uhCost = (t: UnitHeaterType) => get(t).uhCost;
export const vented = (t: UnitHeaterType) => get(t).vented;
export const forWarehouse = (t: UnitHeaterType) => get(t).forWarehouse;
export const fuel = (t: UnitHeaterType) => get(t).fuel;
export const bestUse = (t: UnitHeaterType) => get(t).bestUse;
export const unitHeaterTypes = (): UnitHeaterType[] =>
  Object.keys(DATA) as UnitHeaterType[];
