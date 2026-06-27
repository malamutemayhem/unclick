export type MicrogridType =
  | "campus_islanding_capable"
  | "military_resilient_base"
  | "community_solar_plus"
  | "industrial_chp_anchor"
  | "remote_diesel_hybrid";

interface MicrogridData {
  resilience: number;
  efficiency: number;
  renewable: number;
  complexity: number;
  mgCost: number;
  islanding: boolean;
  forRemote: boolean;
  anchor: string;
  bestUse: string;
}

const DATA: Record<MicrogridType, MicrogridData> = {
  campus_islanding_capable: {
    resilience: 9, efficiency: 8, renewable: 7, complexity: 8, mgCost: 8,
    islanding: true, forRemote: false,
    anchor: "solar_battery_genset_island",
    bestUse: "university_hospital_campus",
  },
  military_resilient_base: {
    resilience: 10, efficiency: 7, renewable: 5, complexity: 10, mgCost: 10,
    islanding: true, forRemote: true,
    anchor: "diesel_solar_battery_hardened",
    bestUse: "forward_operating_base_dod",
  },
  community_solar_plus: {
    resilience: 7, efficiency: 9, renewable: 10, complexity: 6, mgCost: 6,
    islanding: false, forRemote: false,
    anchor: "community_solar_shared_batt",
    bestUse: "neighborhood_cooperative_grid",
  },
  industrial_chp_anchor: {
    resilience: 8, efficiency: 10, renewable: 4, complexity: 7, mgCost: 7,
    islanding: true, forRemote: false,
    anchor: "chp_gas_turbine_heat_recover",
    bestUse: "factory_process_heat_power",
  },
  remote_diesel_hybrid: {
    resilience: 8, efficiency: 6, renewable: 6, complexity: 5, mgCost: 5,
    islanding: true, forRemote: true,
    anchor: "diesel_solar_wind_hybrid_ctrl",
    bestUse: "mining_camp_island_village",
  },
};

function get(t: MicrogridType): MicrogridData {
  return DATA[t];
}

export const resilience = (t: MicrogridType) => get(t).resilience;
export const efficiency = (t: MicrogridType) => get(t).efficiency;
export const renewable = (t: MicrogridType) => get(t).renewable;
export const complexity = (t: MicrogridType) => get(t).complexity;
export const mgCost = (t: MicrogridType) => get(t).mgCost;
export const islanding = (t: MicrogridType) => get(t).islanding;
export const forRemote = (t: MicrogridType) => get(t).forRemote;
export const anchor = (t: MicrogridType) => get(t).anchor;
export const bestUse = (t: MicrogridType) => get(t).bestUse;
export const microgridTypes = (): MicrogridType[] =>
  Object.keys(DATA) as MicrogridType[];
