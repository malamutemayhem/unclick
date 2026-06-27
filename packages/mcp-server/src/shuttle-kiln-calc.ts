export type ShuttleKilnType =
  | "gas_fired_car"
  | "electric_box"
  | "top_hat_lift"
  | "bell_furnace"
  | "mobile_hearth";

interface ShuttleKilnData {
  firingFlexibility: number;
  temperatureMax: number;
  loadCapacity: number;
  energyUse: number;
  skCost: number;
  topLoading: boolean;
  forSpecialty: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<ShuttleKilnType, ShuttleKilnData> = {
  gas_fired_car: {
    firingFlexibility: 9, temperatureMax: 9, loadCapacity: 10, energyUse: 6, skCost: 8,
    topLoading: false, forSpecialty: false,
    kilnConfig: "gas_fired_shuttle_car_roll_in_out_batch_fire_large_load_kiln",
    bestUse: "large_batch_sanitaryware_refractories_gas_shuttle_car_kiln",
  },
  electric_box: {
    firingFlexibility: 8, temperatureMax: 8, loadCapacity: 5, energyUse: 7, skCost: 6,
    topLoading: false, forSpecialty: true,
    kilnConfig: "electric_box_kiln_clean_atmosphere_precise_temp_small_batch",
    bestUse: "small_batch_technical_ceramic_dental_lab_electric_box_kiln",
  },
  top_hat_lift: {
    firingFlexibility: 10, temperatureMax: 9, loadCapacity: 8, energyUse: 5, skCost: 9,
    topLoading: true, forSpecialty: true,
    kilnConfig: "top_hat_lift_off_kiln_overhead_crane_large_piece_specialty",
    bestUse: "large_specialty_piece_sculpture_kiln_furniture_top_hat_lift",
  },
  bell_furnace: {
    firingFlexibility: 7, temperatureMax: 10, loadCapacity: 7, energyUse: 7, skCost: 9,
    topLoading: true, forSpecialty: true,
    kilnConfig: "bell_furnace_lower_over_load_controlled_atmosphere_high_temp",
    bestUse: "controlled_atmosphere_sintering_metal_powder_bell_furnace_kiln",
  },
  mobile_hearth: {
    firingFlexibility: 8, temperatureMax: 8, loadCapacity: 9, energyUse: 6, skCost: 7,
    topLoading: false, forSpecialty: false,
    kilnConfig: "mobile_hearth_car_bottom_roll_out_heavy_load_refractory_batch",
    bestUse: "refractory_brick_heavy_load_car_bottom_mobile_hearth_batch",
  },
};

function get(t: ShuttleKilnType): ShuttleKilnData {
  return DATA[t];
}

export const firingFlexibility = (t: ShuttleKilnType) => get(t).firingFlexibility;
export const temperatureMax = (t: ShuttleKilnType) => get(t).temperatureMax;
export const loadCapacity = (t: ShuttleKilnType) => get(t).loadCapacity;
export const energyUse = (t: ShuttleKilnType) => get(t).energyUse;
export const skCost = (t: ShuttleKilnType) => get(t).skCost;
export const topLoading = (t: ShuttleKilnType) => get(t).topLoading;
export const forSpecialty = (t: ShuttleKilnType) => get(t).forSpecialty;
export const kilnConfig = (t: ShuttleKilnType) => get(t).kilnConfig;
export const bestUse = (t: ShuttleKilnType) => get(t).bestUse;
export const shuttleKilnTypes = (): ShuttleKilnType[] =>
  Object.keys(DATA) as ShuttleKilnType[];
