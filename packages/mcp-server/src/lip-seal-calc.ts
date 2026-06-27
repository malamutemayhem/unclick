export type LipSealType =
  | "single_lip_radial"
  | "double_lip_dust"
  | "ptfe_lip_high_speed"
  | "spring_loaded_sc"
  | "cassette_seal_unit";

interface LipSealData {
  sealLife: number;
  speedLimit: number;
  pressureLimit: number;
  frictionTorque: number;
  lsCost_: number;
  dustExclusion: boolean;
  forHighSpeed: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<LipSealType, LipSealData> = {
  single_lip_radial: {
    sealLife: 7, speedLimit: 7, pressureLimit: 4, frictionTorque: 6, lsCost_: 2,
    dustExclusion: false, forHighSpeed: false,
    material: "nitrile_nbr_single_lip_garter_spring",
    bestUse: "general_purpose_gearbox_motor_shaft_seal",
  },
  double_lip_dust: {
    sealLife: 8, speedLimit: 6, pressureLimit: 4, frictionTorque: 5, lsCost_: 3,
    dustExclusion: true, forHighSpeed: false,
    material: "nitrile_double_lip_outer_dust_excluder",
    bestUse: "dusty_environment_agriculture_construction",
  },
  ptfe_lip_high_speed: {
    sealLife: 9, speedLimit: 10, pressureLimit: 6, frictionTorque: 9, lsCost_: 7,
    dustExclusion: false, forHighSpeed: true,
    material: "ptfe_lip_stainless_case_low_friction_wear",
    bestUse: "high_speed_spindle_compressor_dry_running",
  },
  spring_loaded_sc: {
    sealLife: 8, speedLimit: 8, pressureLimit: 7, frictionTorque: 7, lsCost_: 5,
    dustExclusion: true, forHighSpeed: true,
    material: "fkm_viton_spring_energized_lip_high_temp",
    bestUse: "automotive_crankshaft_high_temp_oil_seal",
  },
  cassette_seal_unit: {
    sealLife: 9, speedLimit: 7, pressureLimit: 5, frictionTorque: 6, lsCost_: 6,
    dustExclusion: true, forHighSpeed: false,
    material: "pre_assembled_cassette_metal_rubber_labyrinth",
    bestUse: "wheel_hub_agricultural_axle_heavy_equipment",
  },
};

function get(t: LipSealType): LipSealData {
  return DATA[t];
}

export const sealLife = (t: LipSealType) => get(t).sealLife;
export const speedLimit = (t: LipSealType) => get(t).speedLimit;
export const pressureLimit = (t: LipSealType) => get(t).pressureLimit;
export const frictionTorque = (t: LipSealType) => get(t).frictionTorque;
export const lsCost = (t: LipSealType) => get(t).lsCost_;
export const dustExclusion = (t: LipSealType) => get(t).dustExclusion;
export const forHighSpeed = (t: LipSealType) => get(t).forHighSpeed;
export const material = (t: LipSealType) => get(t).material;
export const bestUse = (t: LipSealType) => get(t).bestUse;
export const lipSealTypes = (): LipSealType[] =>
  Object.keys(DATA) as LipSealType[];
