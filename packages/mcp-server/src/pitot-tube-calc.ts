export type PitotTubeType =
  | "standard_l_shaped"
  | "averaging_multi_port"
  | "s_type_reverse"
  | "kiel_shielded_yaw"
  | "heated_anti_icing";

interface PitotTubeData {
  accuracy: number;
  pressureLoss: number;
  directionSensitivity: number;
  durability: number;
  ptCost: number;
  multiPoint: boolean;
  forDuct: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<PitotTubeType, PitotTubeData> = {
  standard_l_shaped: {
    accuracy: 7, pressureLoss: 10, directionSensitivity: 5, durability: 8, ptCost: 3,
    multiPoint: false, forDuct: false,
    sensing: "single_point_total_static_difference",
    bestUse: "laboratory_point_velocity_test",
  },
  averaging_multi_port: {
    accuracy: 9, pressureLoss: 9, directionSensitivity: 6, durability: 8, ptCost: 6,
    multiPoint: true, forDuct: true,
    sensing: "multi_port_averaging_annubar_style",
    bestUse: "hvac_duct_air_flow_measurement",
  },
  s_type_reverse: {
    accuracy: 6, pressureLoss: 10, directionSensitivity: 4, durability: 9, ptCost: 4,
    multiPoint: false, forDuct: false,
    sensing: "reverse_type_dirty_gas_stack",
    bestUse: "stack_emission_dirty_gas_testing",
  },
  kiel_shielded_yaw: {
    accuracy: 8, pressureLoss: 9, directionSensitivity: 10, durability: 7, ptCost: 7,
    multiPoint: false, forDuct: false,
    sensing: "shielded_tip_yaw_insensitive",
    bestUse: "turbulent_flow_variable_direction",
  },
  heated_anti_icing: {
    accuracy: 7, pressureLoss: 9, directionSensitivity: 6, durability: 8, ptCost: 8,
    multiPoint: true, forDuct: true,
    sensing: "heated_element_ice_prevention",
    bestUse: "outdoor_air_intake_cold_climate",
  },
};

function get(t: PitotTubeType): PitotTubeData {
  return DATA[t];
}

export const accuracy = (t: PitotTubeType) => get(t).accuracy;
export const pressureLoss = (t: PitotTubeType) => get(t).pressureLoss;
export const directionSensitivity = (t: PitotTubeType) => get(t).directionSensitivity;
export const durability = (t: PitotTubeType) => get(t).durability;
export const ptCost = (t: PitotTubeType) => get(t).ptCost;
export const multiPoint = (t: PitotTubeType) => get(t).multiPoint;
export const forDuct = (t: PitotTubeType) => get(t).forDuct;
export const sensing = (t: PitotTubeType) => get(t).sensing;
export const bestUse = (t: PitotTubeType) => get(t).bestUse;
export const pitotTubeTypes = (): PitotTubeType[] =>
  Object.keys(DATA) as PitotTubeType[];
