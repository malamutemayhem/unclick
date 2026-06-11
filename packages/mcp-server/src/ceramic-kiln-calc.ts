export type CeramicKilnType =
  | "shuttle_kiln"
  | "tunnel_kiln"
  | "roller_hearth"
  | "top_hat_kiln"
  | "rotary_kiln_ceramic";

interface CeramicKilnData {
  temperatureUniformity: number;
  throughput: number;
  energyEfficiency: number;
  firingRange: number;
  ckCost: number;
  continuous: boolean;
  forHighTemp: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<CeramicKilnType, CeramicKilnData> = {
  shuttle_kiln: {
    temperatureUniformity: 8, throughput: 5, energyEfficiency: 6, firingRange: 9, ckCost: 6,
    continuous: false, forHighTemp: true,
    kilnConfig: "shuttle_kiln_car_load_batch_fire_gas_electric_soak_cool_unload",
    bestUse: "studio_pottery_shuttle_kiln_batch_fire_flexible_temperature",
  },
  tunnel_kiln: {
    temperatureUniformity: 9, throughput: 10, energyEfficiency: 9, firingRange: 8, ckCost: 10,
    continuous: true, forHighTemp: true,
    kilnConfig: "tunnel_kiln_continuous_car_preheat_fire_cool_zone_high_volume",
    bestUse: "industrial_ceramic_tunnel_kiln_continuous_tile_brick_sanitaryware",
  },
  roller_hearth: {
    temperatureUniformity: 9, throughput: 10, energyEfficiency: 10, firingRange: 7, ckCost: 9,
    continuous: true, forHighTemp: false,
    kilnConfig: "roller_hearth_kiln_ceramic_roller_convey_flat_product_fast_fire",
    bestUse: "floor_tile_roller_hearth_kiln_fast_fire_flat_ceramic_high_speed",
  },
  top_hat_kiln: {
    temperatureUniformity: 7, throughput: 3, energyEfficiency: 5, firingRange: 10, ckCost: 4,
    continuous: false, forHighTemp: true,
    kilnConfig: "top_hat_kiln_lift_off_hood_load_stationary_hearth_batch_fire",
    bestUse: "art_ceramic_top_hat_kiln_large_sculpture_batch_flexible_fire",
  },
  rotary_kiln_ceramic: {
    temperatureUniformity: 7, throughput: 9, energyEfficiency: 7, firingRange: 8, ckCost: 8,
    continuous: true, forHighTemp: true,
    kilnConfig: "rotary_kiln_ceramic_inclined_cylinder_rotate_tumble_calcine",
    bestUse: "refractory_aggregate_rotary_kiln_calcine_powder_granule_bulk",
  },
};

function get(t: CeramicKilnType): CeramicKilnData {
  return DATA[t];
}

export const temperatureUniformity = (t: CeramicKilnType) => get(t).temperatureUniformity;
export const throughput = (t: CeramicKilnType) => get(t).throughput;
export const energyEfficiency = (t: CeramicKilnType) => get(t).energyEfficiency;
export const firingRange = (t: CeramicKilnType) => get(t).firingRange;
export const ckCost = (t: CeramicKilnType) => get(t).ckCost;
export const continuous = (t: CeramicKilnType) => get(t).continuous;
export const forHighTemp = (t: CeramicKilnType) => get(t).forHighTemp;
export const kilnConfig = (t: CeramicKilnType) => get(t).kilnConfig;
export const bestUse = (t: CeramicKilnType) => get(t).bestUse;
export const ceramicKilnTypes = (): CeramicKilnType[] =>
  Object.keys(DATA) as CeramicKilnType[];
