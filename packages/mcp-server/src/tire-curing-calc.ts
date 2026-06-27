export type TireCuringType =
  | "bladder_press"
  | "segmented_mold"
  | "two_piece_mold"
  | "autoclave_cure"
  | "continuous_cure";

interface TireCuringData {
  cureUniformity: number;
  throughput: number;
  moldPrecision: number;
  energyEfficiency: number;
  tcCost: number;
  automated: boolean;
  forPassenger: boolean;
  curingConfig: string;
  bestUse: string;
}

const DATA: Record<TireCuringType, TireCuringData> = {
  bladder_press: {
    cureUniformity: 9, throughput: 8, moldPrecision: 9, energyEfficiency: 7, tcCost: 8,
    automated: true, forPassenger: true,
    curingConfig: "bladder_press_tire_curing_inflatable_bladder_steam_heat_mold",
    bestUse: "passenger_tire_bladder_press_cure_standard_high_volume_uniform",
  },
  segmented_mold: {
    cureUniformity: 10, throughput: 9, moldPrecision: 10, energyEfficiency: 7, tcCost: 10,
    automated: true, forPassenger: true,
    curingConfig: "segmented_mold_tire_curing_radial_segment_open_close_precise",
    bestUse: "premium_tire_segmented_mold_cure_complex_tread_pattern_precise",
  },
  two_piece_mold: {
    cureUniformity: 7, throughput: 7, moldPrecision: 7, energyEfficiency: 7, tcCost: 5,
    automated: true, forPassenger: false,
    curingConfig: "two_piece_mold_tire_curing_upper_lower_half_clamp_steam_cure",
    bestUse: "bias_tire_two_piece_mold_cure_simple_tread_industrial_truck",
  },
  autoclave_cure: {
    cureUniformity: 8, throughput: 5, moldPrecision: 6, energyEfficiency: 5, tcCost: 6,
    automated: false, forPassenger: false,
    curingConfig: "autoclave_cure_tire_pressure_vessel_batch_steam_heat_large_tire",
    bestUse: "large_tire_autoclave_cure_aircraft_earthmover_specialty_oversize",
  },
  continuous_cure: {
    cureUniformity: 8, throughput: 10, moldPrecision: 8, energyEfficiency: 9, tcCost: 9,
    automated: true, forPassenger: false,
    curingConfig: "continuous_cure_tire_tunnel_conveyor_multi_station_nonstop",
    bestUse: "high_volume_tire_continuous_cure_tunnel_multi_station_nonstop",
  },
};

function get(t: TireCuringType): TireCuringData {
  return DATA[t];
}

export const cureUniformity = (t: TireCuringType) => get(t).cureUniformity;
export const throughput = (t: TireCuringType) => get(t).throughput;
export const moldPrecision = (t: TireCuringType) => get(t).moldPrecision;
export const energyEfficiency = (t: TireCuringType) => get(t).energyEfficiency;
export const tcCost = (t: TireCuringType) => get(t).tcCost;
export const automated = (t: TireCuringType) => get(t).automated;
export const forPassenger = (t: TireCuringType) => get(t).forPassenger;
export const curingConfig = (t: TireCuringType) => get(t).curingConfig;
export const bestUse = (t: TireCuringType) => get(t).bestUse;
export const tireCuringTypes = (): TireCuringType[] =>
  Object.keys(DATA) as TireCuringType[];
