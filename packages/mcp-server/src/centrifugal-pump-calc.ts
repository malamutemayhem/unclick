export type CentrifugalPumpType =
  | "end_suction_overhung"
  | "between_bearings_split"
  | "vertical_turbine_deep"
  | "mag_drive_sealless"
  | "submersible_wet_pit";

interface CentrifugalPumpData {
  efficiency: number;
  headRange: number;
  reliability: number;
  npshr: number;
  cpCost: number;
  sealless: boolean;
  forCorrosive: boolean;
  impellerType: string;
  bestUse: string;
}

const DATA: Record<CentrifugalPumpType, CentrifugalPumpData> = {
  end_suction_overhung: {
    efficiency: 7, headRange: 6, reliability: 7, npshr: 6, cpCost: 4,
    sealless: false, forCorrosive: false,
    impellerType: "enclosed_back_pullout_single_stage_overhung",
    bestUse: "general_process_water_transfer_hvac_booster",
  },
  between_bearings_split: {
    efficiency: 9, headRange: 9, reliability: 9, npshr: 8, cpCost: 7,
    sealless: false, forCorrosive: false,
    impellerType: "double_suction_axially_split_case_multistage",
    bestUse: "large_water_supply_power_plant_pipeline_duty",
  },
  vertical_turbine_deep: {
    efficiency: 8, headRange: 10, reliability: 8, npshr: 10, cpCost: 8,
    sealless: false, forCorrosive: false,
    impellerType: "multi_stage_enclosed_bowl_deep_well_column",
    bestUse: "deep_well_irrigation_municipal_water_intake",
  },
  mag_drive_sealless: {
    efficiency: 6, headRange: 5, reliability: 7, npshr: 6, cpCost: 8,
    sealless: true, forCorrosive: true,
    impellerType: "magnetic_coupled_enclosed_zero_emission_seal",
    bestUse: "toxic_corrosive_chemical_transfer_zero_leak",
  },
  submersible_wet_pit: {
    efficiency: 7, headRange: 5, reliability: 6, npshr: 10, cpCost: 5,
    sealless: false, forCorrosive: false,
    impellerType: "submersible_motor_vortex_or_channel_impeller",
    bestUse: "wastewater_lift_station_stormwater_flood_pump",
  },
};

function get(t: CentrifugalPumpType): CentrifugalPumpData {
  return DATA[t];
}

export const efficiency = (t: CentrifugalPumpType) => get(t).efficiency;
export const headRange = (t: CentrifugalPumpType) => get(t).headRange;
export const reliability = (t: CentrifugalPumpType) => get(t).reliability;
export const npshr = (t: CentrifugalPumpType) => get(t).npshr;
export const cpCost = (t: CentrifugalPumpType) => get(t).cpCost;
export const sealless = (t: CentrifugalPumpType) => get(t).sealless;
export const forCorrosive = (t: CentrifugalPumpType) => get(t).forCorrosive;
export const impellerType = (t: CentrifugalPumpType) => get(t).impellerType;
export const bestUse = (t: CentrifugalPumpType) => get(t).bestUse;
export const centrifugalPumpTypes = (): CentrifugalPumpType[] =>
  Object.keys(DATA) as CentrifugalPumpType[];
