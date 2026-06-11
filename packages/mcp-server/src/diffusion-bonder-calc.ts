export type DiffusionBonderType =
  | "hot_press_bond"
  | "vacuum_diffusion"
  | "hip_bond"
  | "spark_plasma"
  | "transient_liquid";

interface DiffusionBonderData {
  bondStrength: number;
  throughput: number;
  interfaceQuality: number;
  temperatureRange: number;
  dbCost: number;
  pressureAssist: boolean;
  forDissimilar: boolean;
  bonderConfig: string;
  bestUse: string;
}

const DATA: Record<DiffusionBonderType, DiffusionBonderData> = {
  hot_press_bond: {
    bondStrength: 8, throughput: 6, interfaceQuality: 8, temperatureRange: 7, dbCost: 6,
    pressureAssist: true, forDissimilar: false,
    bonderConfig: "hot_press_diffusion_bonder_uniaxial_load_furnace_plate_stack",
    bestUse: "laminate_plate_hot_press_diffusion_bonder_uniaxial_stack_bond",
  },
  vacuum_diffusion: {
    bondStrength: 9, throughput: 4, interfaceQuality: 10, temperatureRange: 9, dbCost: 9,
    pressureAssist: true, forDissimilar: true,
    bonderConfig: "vacuum_diffusion_bonder_chamber_evacuate_clean_interface_bond",
    bestUse: "titanium_joint_vacuum_diffusion_bonder_clean_interface_aero",
  },
  hip_bond: {
    bondStrength: 10, throughput: 3, interfaceQuality: 10, temperatureRange: 10, dbCost: 10,
    pressureAssist: true, forDissimilar: true,
    bonderConfig: "hip_diffusion_bonder_isostatic_pressure_gas_all_direction_bond",
    bestUse: "superalloy_repair_hip_diffusion_bonder_isostatic_pressure_bond",
  },
  spark_plasma: {
    bondStrength: 9, throughput: 5, interfaceQuality: 9, temperatureRange: 8, dbCost: 8,
    pressureAssist: true, forDissimilar: true,
    bonderConfig: "spark_plasma_diffusion_bonder_pulsed_dc_rapid_heat_sinter_bond",
    bestUse: "ceramic_metal_spark_plasma_diffusion_bonder_rapid_sinter_bond",
  },
  transient_liquid: {
    bondStrength: 8, throughput: 5, interfaceQuality: 8, temperatureRange: 7, dbCost: 7,
    pressureAssist: false, forDissimilar: true,
    bonderConfig: "transient_liquid_diffusion_bonder_interlayer_melt_isothermal",
    bestUse: "nickel_alloy_transient_liquid_diffusion_bonder_interlayer_melt",
  },
};

function get(t: DiffusionBonderType): DiffusionBonderData {
  return DATA[t];
}

export const bondStrength = (t: DiffusionBonderType) => get(t).bondStrength;
export const throughput = (t: DiffusionBonderType) => get(t).throughput;
export const interfaceQuality = (t: DiffusionBonderType) => get(t).interfaceQuality;
export const temperatureRange = (t: DiffusionBonderType) => get(t).temperatureRange;
export const dbCost = (t: DiffusionBonderType) => get(t).dbCost;
export const pressureAssist = (t: DiffusionBonderType) => get(t).pressureAssist;
export const forDissimilar = (t: DiffusionBonderType) => get(t).forDissimilar;
export const bonderConfig = (t: DiffusionBonderType) => get(t).bonderConfig;
export const bestUse = (t: DiffusionBonderType) => get(t).bestUse;
export const diffusionBonderTypes = (): DiffusionBonderType[] =>
  Object.keys(DATA) as DiffusionBonderType[];
