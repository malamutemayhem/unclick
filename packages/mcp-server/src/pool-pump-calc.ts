export type PoolPumpType =
  | "single_speed_standard"
  | "dual_speed_high_low"
  | "variable_speed_inverter"
  | "above_ground_self_prime"
  | "commercial_high_flow";

interface PoolPumpData {
  flow: number;
  efficiency: number;
  noise: number;
  longevity: number;
  ppCost: number;
  variableSpeed: boolean;
  forCommercial: boolean;
  motor: string;
  bestUse: string;
}

const DATA: Record<PoolPumpType, PoolPumpData> = {
  single_speed_standard: {
    flow: 6, efficiency: 4, noise: 4, longevity: 6, ppCost: 2,
    variableSpeed: false, forCommercial: false,
    motor: "single_speed_56j_frame_tefc",
    bestUse: "residential_pool_basic_circ",
  },
  dual_speed_high_low: {
    flow: 7, efficiency: 6, noise: 6, longevity: 7, ppCost: 4,
    variableSpeed: false, forCommercial: false,
    motor: "dual_speed_56j_high_low_wind",
    bestUse: "residential_pool_energy_save",
  },
  variable_speed_inverter: {
    flow: 8, efficiency: 10, noise: 9, longevity: 9, ppCost: 7,
    variableSpeed: true, forCommercial: false,
    motor: "ecm_permanent_magnet_inverter",
    bestUse: "residential_pool_code_comply",
  },
  above_ground_self_prime: {
    flow: 4, efficiency: 5, noise: 5, longevity: 5, ppCost: 1,
    variableSpeed: false, forCommercial: false,
    motor: "small_48y_frame_self_priming",
    bestUse: "above_ground_pool_spa_small",
  },
  commercial_high_flow: {
    flow: 10, efficiency: 7, noise: 3, longevity: 8, ppCost: 9,
    variableSpeed: true, forCommercial: true,
    motor: "three_phase_commercial_vfd",
    bestUse: "public_pool_water_park_large",
  },
};

function get(t: PoolPumpType): PoolPumpData {
  return DATA[t];
}

export const flow = (t: PoolPumpType) => get(t).flow;
export const efficiency = (t: PoolPumpType) => get(t).efficiency;
export const noise = (t: PoolPumpType) => get(t).noise;
export const longevity = (t: PoolPumpType) => get(t).longevity;
export const ppCost = (t: PoolPumpType) => get(t).ppCost;
export const variableSpeed = (t: PoolPumpType) => get(t).variableSpeed;
export const forCommercial = (t: PoolPumpType) => get(t).forCommercial;
export const motor = (t: PoolPumpType) => get(t).motor;
export const bestUse = (t: PoolPumpType) => get(t).bestUse;
export const poolPumpTypes = (): PoolPumpType[] =>
  Object.keys(DATA) as PoolPumpType[];
