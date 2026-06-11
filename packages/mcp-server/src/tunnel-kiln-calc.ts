export type TunnelKilnType =
  | "gas_fired_continuous"
  | "electric_element"
  | "wood_fired_traditional"
  | "fast_fire_roller"
  | "hydrogen_green";

interface TunnelKilnData {
  firingSpeed: number;
  temperatureUniformity: number;
  energyEfficiency: number;
  capacity: number;
  tkCost: number;
  continuous: boolean;
  forPorcelain: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<TunnelKilnType, TunnelKilnData> = {
  gas_fired_continuous: {
    firingSpeed: 8, temperatureUniformity: 8, energyEfficiency: 7, capacity: 10, tkCost: 8,
    continuous: true, forPorcelain: true,
    kilnConfig: "gas_burner_tunnel_car_continuous_fire_zone_cool_zone_push_thru",
    bestUse: "high_volume_brick_tile_sanitaryware_gas_tunnel_continuous_fire",
  },
  electric_element: {
    firingSpeed: 7, temperatureUniformity: 10, energyEfficiency: 8, capacity: 7, tkCost: 9,
    continuous: true, forPorcelain: true,
    kilnConfig: "electric_element_tunnel_precise_temp_zone_clean_atmosphere_fire",
    bestUse: "technical_ceramic_electronic_substrate_precise_electric_tunnel",
  },
  wood_fired_traditional: {
    firingSpeed: 3, temperatureUniformity: 4, energyEfficiency: 4, capacity: 5, tkCost: 4,
    continuous: false, forPorcelain: true,
    kilnConfig: "wood_fired_chamber_traditional_ash_glaze_atmospheric_reduction",
    bestUse: "artisan_pottery_stoneware_wood_ash_glaze_traditional_reduction",
  },
  fast_fire_roller: {
    firingSpeed: 10, temperatureUniformity: 9, energyEfficiency: 9, capacity: 9, tkCost: 10,
    continuous: true, forPorcelain: true,
    kilnConfig: "fast_fire_roller_hearth_flat_tile_rapid_cycle_gas_infrared",
    bestUse: "ceramic_floor_wall_tile_fast_fire_roller_hearth_high_volume",
  },
  hydrogen_green: {
    firingSpeed: 7, temperatureUniformity: 8, energyEfficiency: 10, capacity: 7, tkCost: 10,
    continuous: true, forPorcelain: false,
    kilnConfig: "hydrogen_fuel_green_kiln_zero_carbon_tunnel_pilot_technology",
    bestUse: "zero_carbon_brick_tile_hydrogen_fuel_green_kiln_pilot_program",
  },
};

function get(t: TunnelKilnType): TunnelKilnData {
  return DATA[t];
}

export const firingSpeed = (t: TunnelKilnType) => get(t).firingSpeed;
export const temperatureUniformity = (t: TunnelKilnType) => get(t).temperatureUniformity;
export const energyEfficiency = (t: TunnelKilnType) => get(t).energyEfficiency;
export const capacity = (t: TunnelKilnType) => get(t).capacity;
export const tkCost = (t: TunnelKilnType) => get(t).tkCost;
export const continuous = (t: TunnelKilnType) => get(t).continuous;
export const forPorcelain = (t: TunnelKilnType) => get(t).forPorcelain;
export const kilnConfig = (t: TunnelKilnType) => get(t).kilnConfig;
export const bestUse = (t: TunnelKilnType) => get(t).bestUse;
export const tunnelKilnTypes = (): TunnelKilnType[] =>
  Object.keys(DATA) as TunnelKilnType[];
