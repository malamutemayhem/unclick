export type ConformalCoaterType =
  | "spray_coat"
  | "dip_coat"
  | "selective_coat"
  | "vapor_deposition"
  | "curtain_coat";

interface ConformalCoaterData {
  coatUniformity: number;
  throughput: number;
  edgeCoverage: number;
  thicknessControl: number;
  ccCost_: number;
  selective: boolean;
  forHighRel: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<ConformalCoaterType, ConformalCoaterData> = {
  spray_coat: {
    coatUniformity: 7, throughput: 8, edgeCoverage: 7, thicknessControl: 7, ccCost_: 5,
    selective: false, forHighRel: false,
    coaterConfig: "spray_conformal_coater_airless_nozzle_atomize_coat_pcba_surface",
    bestUse: "general_electronics_spray_conformal_coat_pcb_moisture_protect",
  },
  dip_coat: {
    coatUniformity: 8, throughput: 7, edgeCoverage: 9, thicknessControl: 5, ccCost_: 4,
    selective: false, forHighRel: false,
    coaterConfig: "dip_conformal_coater_tank_immerse_pcba_drain_cure_full_cover",
    bestUse: "batch_electronics_dip_conformal_coat_full_coverage_simple_process",
  },
  selective_coat: {
    coatUniformity: 9, throughput: 7, edgeCoverage: 8, thicknessControl: 9, ccCost_: 8,
    selective: true, forHighRel: true,
    coaterConfig: "selective_conformal_coater_needle_valve_programmable_path_coat",
    bestUse: "automotive_selective_conformal_coat_avoid_connector_precise",
  },
  vapor_deposition: {
    coatUniformity: 10, throughput: 5, edgeCoverage: 10, thicknessControl: 10, ccCost_: 10,
    selective: false, forHighRel: true,
    coaterConfig: "vapor_deposition_conformal_coater_parylene_vacuum_chamber_thin",
    bestUse: "medical_aerospace_parylene_vapor_conformal_coat_ultra_thin",
  },
  curtain_coat: {
    coatUniformity: 8, throughput: 9, edgeCoverage: 7, thicknessControl: 7, ccCost_: 6,
    selective: false, forHighRel: false,
    coaterConfig: "curtain_conformal_coater_gravity_flow_sheet_coat_flat_pcba_fast",
    bestUse: "high_volume_curtain_conformal_coat_flat_board_fast_throughput",
  },
};

function get(t: ConformalCoaterType): ConformalCoaterData {
  return DATA[t];
}

export const coatUniformity = (t: ConformalCoaterType) => get(t).coatUniformity;
export const throughput = (t: ConformalCoaterType) => get(t).throughput;
export const edgeCoverage = (t: ConformalCoaterType) => get(t).edgeCoverage;
export const thicknessControl = (t: ConformalCoaterType) => get(t).thicknessControl;
export const ccCost_ = (t: ConformalCoaterType) => get(t).ccCost_;
export const selective = (t: ConformalCoaterType) => get(t).selective;
export const forHighRel = (t: ConformalCoaterType) => get(t).forHighRel;
export const coaterConfig = (t: ConformalCoaterType) => get(t).coaterConfig;
export const bestUse = (t: ConformalCoaterType) => get(t).bestUse;
export const conformalCoaterTypes = (): ConformalCoaterType[] =>
  Object.keys(DATA) as ConformalCoaterType[];
