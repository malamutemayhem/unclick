export type GasSuppressionType =
  | "clean_agent_fm200"
  | "inert_gas_ig541"
  | "co2_total_flood"
  | "novec_1230_fk"
  | "aerosol_condensed";

interface GasSuppressionData {
  effectiveness: number;
  safetyMargin: number;
  envImpact: number;
  storageSpace: number;
  gsCost: number;
  occupiedArea: boolean;
  forElectrical: boolean;
  agent: string;
  bestUse: string;
}

const DATA: Record<GasSuppressionType, GasSuppressionData> = {
  clean_agent_fm200: {
    effectiveness: 8, safetyMargin: 8, envImpact: 5, storageSpace: 8, gsCost: 7,
    occupiedArea: true, forElectrical: true,
    agent: "hfc_227ea_heptafluoropropane_clean",
    bestUse: "server_room_data_center_telecom_switch",
  },
  inert_gas_ig541: {
    effectiveness: 8, safetyMargin: 10, envImpact: 10, storageSpace: 4, gsCost: 6,
    occupiedArea: true, forElectrical: true,
    agent: "nitrogen_argon_co2_blend_52_40_8",
    bestUse: "archive_museum_occupied_area_safe_breathe",
  },
  co2_total_flood: {
    effectiveness: 10, safetyMargin: 3, envImpact: 7, storageSpace: 7, gsCost: 4,
    occupiedArea: false, forElectrical: true,
    agent: "carbon_dioxide_high_pressure_cylinder",
    bestUse: "unmanned_engine_room_flammable_storage",
  },
  novec_1230_fk: {
    effectiveness: 8, safetyMargin: 9, envImpact: 9, storageSpace: 9, gsCost: 8,
    occupiedArea: true, forElectrical: true,
    agent: "fluoroketone_c6_low_gwp_liquid_store",
    bestUse: "data_center_critical_infra_low_gwp_clean",
  },
  aerosol_condensed: {
    effectiveness: 7, safetyMargin: 7, envImpact: 6, storageSpace: 10, gsCost: 5,
    occupiedArea: false, forElectrical: true,
    agent: "potassium_compound_aerosol_generator",
    bestUse: "small_enclosure_electrical_panel_cabinet",
  },
};

function get(t: GasSuppressionType): GasSuppressionData {
  return DATA[t];
}

export const effectiveness = (t: GasSuppressionType) => get(t).effectiveness;
export const safetyMargin = (t: GasSuppressionType) => get(t).safetyMargin;
export const envImpact = (t: GasSuppressionType) => get(t).envImpact;
export const storageSpace = (t: GasSuppressionType) => get(t).storageSpace;
export const gsCost = (t: GasSuppressionType) => get(t).gsCost;
export const occupiedArea = (t: GasSuppressionType) => get(t).occupiedArea;
export const forElectrical = (t: GasSuppressionType) => get(t).forElectrical;
export const agent = (t: GasSuppressionType) => get(t).agent;
export const bestUse = (t: GasSuppressionType) => get(t).bestUse;
export const gasSuppressionTypes = (): GasSuppressionType[] =>
  Object.keys(DATA) as GasSuppressionType[];
