export type VacuumDryerType =
  | "conical_tumble_vacuum"
  | "paddle_agitated_vacuum"
  | "shelf_tray_vacuum"
  | "belt_vacuum_continuous"
  | "microwave_vacuum_hybrid";

interface VacuumDryerData {
  dryingRate: number;
  heatSensitivity: number;
  solventRecovery: number;
  mixQuality: number;
  vdCost: number;
  agitated: boolean;
  forSolvent: boolean;
  vessel: string;
  bestUse: string;
}

const DATA: Record<VacuumDryerType, VacuumDryerData> = {
  conical_tumble_vacuum: {
    dryingRate: 7, heatSensitivity: 9, solventRecovery: 9, mixQuality: 8, vdCost: 6,
    agitated: true, forSolvent: true,
    vessel: "conical_vessel_tumbling_rotation_vacuum_jacket",
    bestUse: "pharmaceutical_api_solvent_wet_cake_drying",
  },
  paddle_agitated_vacuum: {
    dryingRate: 8, heatSensitivity: 8, solventRecovery: 9, mixQuality: 9, vdCost: 7,
    agitated: true, forSolvent: true,
    vessel: "horizontal_jacketed_vessel_paddle_agitator",
    bestUse: "chemical_dye_pigment_paste_agitated_vacuum",
  },
  shelf_tray_vacuum: {
    dryingRate: 5, heatSensitivity: 10, solventRecovery: 8, mixQuality: 3, vdCost: 5,
    agitated: false, forSolvent: false,
    vessel: "heated_shelf_tray_stack_static_vacuum_chamber",
    bestUse: "lab_pharma_small_batch_heat_sensitive_static",
  },
  belt_vacuum_continuous: {
    dryingRate: 9, heatSensitivity: 8, solventRecovery: 8, mixQuality: 5, vdCost: 8,
    agitated: false, forSolvent: true,
    vessel: "continuous_belt_conveyor_vacuum_chamber_multi",
    bestUse: "food_extract_continuous_low_temp_vacuum_belt",
  },
  microwave_vacuum_hybrid: {
    dryingRate: 10, heatSensitivity: 9, solventRecovery: 9, mixQuality: 7, vdCost: 9,
    agitated: true, forSolvent: true,
    vessel: "microwave_cavity_vacuum_vessel_volumetric_heat",
    bestUse: "high_value_pharma_botanical_rapid_uniform_dry",
  },
};

function get(t: VacuumDryerType): VacuumDryerData {
  return DATA[t];
}

export const dryingRate = (t: VacuumDryerType) => get(t).dryingRate;
export const heatSensitivity = (t: VacuumDryerType) => get(t).heatSensitivity;
export const solventRecovery = (t: VacuumDryerType) => get(t).solventRecovery;
export const mixQuality = (t: VacuumDryerType) => get(t).mixQuality;
export const vdCost = (t: VacuumDryerType) => get(t).vdCost;
export const agitated = (t: VacuumDryerType) => get(t).agitated;
export const forSolvent = (t: VacuumDryerType) => get(t).forSolvent;
export const vessel = (t: VacuumDryerType) => get(t).vessel;
export const bestUse = (t: VacuumDryerType) => get(t).bestUse;
export const vacuumDryerTypes = (): VacuumDryerType[] =>
  Object.keys(DATA) as VacuumDryerType[];
