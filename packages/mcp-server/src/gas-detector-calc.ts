export type GasDetectorType =
  | "catalytic_bead"
  | "infrared_point"
  | "electrochemical_cell"
  | "photoionization"
  | "semiconductor_mos";

interface GasDetectorData {
  sensitivity: number;
  responseTime: number;
  sensorLife: number;
  gasRange: number;
  gdCost: number;
  intrinsicSafe: boolean;
  forToxic: boolean;
  sensingPrinciple: string;
  bestUse: string;
}

const DATA: Record<GasDetectorType, GasDetectorData> = {
  catalytic_bead: {
    sensitivity: 7, responseTime: 8, sensorLife: 6, gasRange: 6, gdCost: 5,
    intrinsicSafe: true, forToxic: false,
    sensingPrinciple: "heated_bead_catalytic_oxidation_resistance_change_lel_detect",
    bestUse: "oil_gas_refinery_confined_space_combustible_gas_lel_monitor",
  },
  infrared_point: {
    sensitivity: 9, responseTime: 9, sensorLife: 9, gasRange: 5, gdCost: 7,
    intrinsicSafe: true, forToxic: false,
    sensingPrinciple: "ndir_dual_beam_ir_absorption_hydrocarbon_co2_no_poison",
    bestUse: "offshore_platform_pipeline_methane_propane_fail_safe_detect",
  },
  electrochemical_cell: {
    sensitivity: 10, responseTime: 7, sensorLife: 5, gasRange: 8, gdCost: 4,
    intrinsicSafe: true, forToxic: true,
    sensingPrinciple: "liquid_electrolyte_electrode_oxidation_current_ppm_level",
    bestUse: "workplace_h2s_co_cl2_nh3_toxic_exposure_personal_monitor",
  },
  photoionization: {
    sensitivity: 10, responseTime: 10, sensorLife: 7, gasRange: 9, gdCost: 8,
    intrinsicSafe: true, forToxic: true,
    sensingPrinciple: "uv_lamp_ionize_voc_molecule_current_measure_ppb_broadband",
    bestUse: "hazmat_response_indoor_air_quality_voc_leak_detection_ppb",
  },
  semiconductor_mos: {
    sensitivity: 6, responseTime: 6, sensorLife: 8, gasRange: 7, gdCost: 3,
    intrinsicSafe: false, forToxic: false,
    sensingPrinciple: "metal_oxide_film_conductivity_change_heated_surface_react",
    bestUse: "residential_co_alarm_parking_garage_hvac_air_quality_low_cost",
  },
};

function get(t: GasDetectorType): GasDetectorData {
  return DATA[t];
}

export const sensitivity = (t: GasDetectorType) => get(t).sensitivity;
export const responseTime = (t: GasDetectorType) => get(t).responseTime;
export const sensorLife = (t: GasDetectorType) => get(t).sensorLife;
export const gasRange = (t: GasDetectorType) => get(t).gasRange;
export const gdCost = (t: GasDetectorType) => get(t).gdCost;
export const intrinsicSafe = (t: GasDetectorType) => get(t).intrinsicSafe;
export const forToxic = (t: GasDetectorType) => get(t).forToxic;
export const sensingPrinciple = (t: GasDetectorType) => get(t).sensingPrinciple;
export const bestUse = (t: GasDetectorType) => get(t).bestUse;
export const gasDetectorTypes = (): GasDetectorType[] =>
  Object.keys(DATA) as GasDetectorType[];
