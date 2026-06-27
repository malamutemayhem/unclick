export type AirCurtainType =
  | "unheated_ambient_recirculate"
  | "electric_heated_commercial"
  | "hot_water_coil_industrial"
  | "gas_fired_warehouse"
  | "low_profile_retail";

interface AirCurtainData {
  airflow: number;
  heating: number;
  noise: number;
  coverage: number;
  acCost: number;
  heated: boolean;
  forIndustrial: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<AirCurtainType, AirCurtainData> = {
  unheated_ambient_recirculate: {
    airflow: 6, heating: 0, noise: 7, coverage: 6, acCost: 3,
    heated: false, forIndustrial: false,
    mounting: "surface_mount_horizontal_door",
    bestUse: "convenience_store_fly_barrier",
  },
  electric_heated_commercial: {
    airflow: 7, heating: 7, noise: 6, coverage: 7, acCost: 5,
    heated: true, forIndustrial: false,
    mounting: "recessed_ceiling_mount_flush",
    bestUse: "restaurant_retail_entrance",
  },
  hot_water_coil_industrial: {
    airflow: 9, heating: 9, noise: 4, coverage: 9, acCost: 8,
    heated: true, forIndustrial: true,
    mounting: "heavy_duty_bracket_industrial",
    bestUse: "warehouse_dock_door_heating",
  },
  gas_fired_warehouse: {
    airflow: 10, heating: 10, noise: 3, coverage: 10, acCost: 9,
    heated: true, forIndustrial: true,
    mounting: "floor_mounted_vertical_push",
    bestUse: "large_opening_cold_climate",
  },
  low_profile_retail: {
    airflow: 5, heating: 5, noise: 8, coverage: 5, acCost: 4,
    heated: true, forIndustrial: false,
    mounting: "slim_profile_concealed_above",
    bestUse: "boutique_lobby_glass_door",
  },
};

function get(t: AirCurtainType): AirCurtainData {
  return DATA[t];
}

export const airflow = (t: AirCurtainType) => get(t).airflow;
export const heating = (t: AirCurtainType) => get(t).heating;
export const noise = (t: AirCurtainType) => get(t).noise;
export const coverage = (t: AirCurtainType) => get(t).coverage;
export const acCost = (t: AirCurtainType) => get(t).acCost;
export const heated = (t: AirCurtainType) => get(t).heated;
export const forIndustrial = (t: AirCurtainType) => get(t).forIndustrial;
export const mounting = (t: AirCurtainType) => get(t).mounting;
export const bestUse = (t: AirCurtainType) => get(t).bestUse;
export const airCurtainTypes = (): AirCurtainType[] =>
  Object.keys(DATA) as AirCurtainType[];
