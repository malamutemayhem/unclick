export type AirClassifierType =
  | "gravitational_zigzag"
  | "centrifugal_turbo_wheel"
  | "static_cascade_louver"
  | "dynamic_rotor_cage"
  | "elbow_jet_inertial";

interface AirClassifierData {
  cutPoint: number;
  throughput: number;
  sharpness: number;
  versatility: number;
  acCost: number;
  fineCapable: boolean;
  forMineral: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<AirClassifierType, AirClassifierData> = {
  gravitational_zigzag: {
    cutPoint: 5, throughput: 8, sharpness: 6, versatility: 7, acCost: 3,
    fineCapable: false, forMineral: false,
    principle: "gravity_counterflow_air_zigzag_path",
    bestUse: "recycling_light_fraction_paper_film",
  },
  centrifugal_turbo_wheel: {
    cutPoint: 10, throughput: 7, sharpness: 10, versatility: 8, acCost: 8,
    fineCapable: true, forMineral: true,
    principle: "rotating_wheel_centrifugal_drag",
    bestUse: "cement_calcium_carbonate_fine_grind",
  },
  static_cascade_louver: {
    cutPoint: 4, throughput: 9, sharpness: 5, versatility: 6, acCost: 4,
    fineCapable: false, forMineral: false,
    principle: "louver_cascade_gravity_air_cross",
    bestUse: "grain_seed_chaff_coarse_separate",
  },
  dynamic_rotor_cage: {
    cutPoint: 9, throughput: 8, sharpness: 9, versatility: 9, acCost: 9,
    fineCapable: true, forMineral: true,
    principle: "high_speed_cage_rotor_centrifugal",
    bestUse: "powder_coating_pigment_ultra_fine",
  },
  elbow_jet_inertial: {
    cutPoint: 6, throughput: 10, sharpness: 7, versatility: 6, acCost: 5,
    fineCapable: false, forMineral: true,
    principle: "elbow_inertia_jet_momentum_split",
    bestUse: "flash_dryer_product_recycle_fines",
  },
};

function get(t: AirClassifierType): AirClassifierData {
  return DATA[t];
}

export const cutPoint = (t: AirClassifierType) => get(t).cutPoint;
export const throughput = (t: AirClassifierType) => get(t).throughput;
export const sharpness = (t: AirClassifierType) => get(t).sharpness;
export const versatility = (t: AirClassifierType) => get(t).versatility;
export const acCost = (t: AirClassifierType) => get(t).acCost;
export const fineCapable = (t: AirClassifierType) => get(t).fineCapable;
export const forMineral = (t: AirClassifierType) => get(t).forMineral;
export const principle = (t: AirClassifierType) => get(t).principle;
export const bestUse = (t: AirClassifierType) => get(t).bestUse;
export const airClassifierTypes = (): AirClassifierType[] =>
  Object.keys(DATA) as AirClassifierType[];
