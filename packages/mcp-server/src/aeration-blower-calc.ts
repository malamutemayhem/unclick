export type AerationBlowerType =
  | "positive_displacement_lobe"
  | "multistage_centrifugal"
  | "single_stage_turbo"
  | "screw_compressor"
  | "high_speed_direct_drive";

interface AerationBlowerData {
  airFlow: number;
  efficiency: number;
  turndownRange: number;
  noiseLevel: number;
  abCost: number;
  oilFree: boolean;
  forLargePlant: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<AerationBlowerType, AerationBlowerData> = {
  positive_displacement_lobe: {
    airFlow: 6, efficiency: 6, turndownRange: 5, noiseLevel: 4, abCost: 4,
    oilFree: true, forLargePlant: false,
    drive: "tri_lobe_rotor_timing_gear_constant_volume_pulsating_flow",
    bestUse: "small_wastewater_plant_packaged_system_simple_reliable",
  },
  multistage_centrifugal: {
    airFlow: 9, efficiency: 8, turndownRange: 7, noiseLevel: 7, abCost: 8,
    oilFree: true, forLargePlant: true,
    drive: "multi_impeller_stage_intercooled_inlet_guide_vane_control",
    bestUse: "large_municipal_plant_high_flow_proven_technology_reliable",
  },
  single_stage_turbo: {
    airFlow: 8, efficiency: 10, turndownRange: 9, noiseLevel: 9, abCost: 9,
    oilFree: true, forLargePlant: true,
    drive: "high_speed_impeller_air_bearing_magnetic_bearing_vfd",
    bestUse: "medium_large_plant_energy_saving_variable_demand_aeration",
  },
  screw_compressor: {
    airFlow: 7, efficiency: 7, turndownRange: 8, noiseLevel: 6, abCost: 6,
    oilFree: false, forLargePlant: false,
    drive: "helical_screw_element_oil_injected_aftercooler_separator",
    bestUse: "industrial_plant_dual_purpose_process_air_aeration_backup",
  },
  high_speed_direct_drive: {
    airFlow: 10, efficiency: 10, turndownRange: 10, noiseLevel: 8, abCost: 10,
    oilFree: true, forLargePlant: true,
    drive: "permanent_magnet_motor_direct_coupled_active_magnetic_bear",
    bestUse: "premium_large_plant_maximum_efficiency_lowest_lifecycle_cost",
  },
};

function get(t: AerationBlowerType): AerationBlowerData {
  return DATA[t];
}

export const airFlow = (t: AerationBlowerType) => get(t).airFlow;
export const efficiency = (t: AerationBlowerType) => get(t).efficiency;
export const turndownRange = (t: AerationBlowerType) => get(t).turndownRange;
export const noiseLevel = (t: AerationBlowerType) => get(t).noiseLevel;
export const abCost = (t: AerationBlowerType) => get(t).abCost;
export const oilFree = (t: AerationBlowerType) => get(t).oilFree;
export const forLargePlant = (t: AerationBlowerType) => get(t).forLargePlant;
export const drive = (t: AerationBlowerType) => get(t).drive;
export const bestUse = (t: AerationBlowerType) => get(t).bestUse;
export const aerationBlowerTypes = (): AerationBlowerType[] =>
  Object.keys(DATA) as AerationBlowerType[];
