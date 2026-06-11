export type SnowMeltType =
  | "electric_cable_mat"
  | "hydronic_glycol_tube"
  | "infrared_overhead_radiant"
  | "geothermal_ground_loop"
  | "solar_thermal_hybrid";

interface SnowMeltData {
  meltRate: number;
  efficiency: number;
  installEase: number;
  operating: number;
  smCost: number;
  automatic: boolean;
  forDriveway: boolean;
  heat: string;
  bestUse: string;
}

const DATA: Record<SnowMeltType, SnowMeltData> = {
  electric_cable_mat: {
    meltRate: 7, efficiency: 6, installEase: 8, operating: 4, smCost: 5,
    automatic: true, forDriveway: true,
    heat: "resistance_cable_mat_embedded",
    bestUse: "residential_sidewalk_steps",
  },
  hydronic_glycol_tube: {
    meltRate: 9, efficiency: 8, installEase: 5, operating: 7, smCost: 7,
    automatic: true, forDriveway: true,
    heat: "pex_tube_glycol_boiler_loop",
    bestUse: "commercial_parking_ramp_deck",
  },
  infrared_overhead_radiant: {
    meltRate: 6, efficiency: 5, installEase: 9, operating: 5, smCost: 4,
    automatic: false, forDriveway: false,
    heat: "infrared_emitter_overhead_mount",
    bestUse: "loading_dock_entrance_canopy",
  },
  geothermal_ground_loop: {
    meltRate: 8, efficiency: 10, installEase: 3, operating: 9, smCost: 9,
    automatic: true, forDriveway: true,
    heat: "ground_source_loop_heat_exchange",
    bestUse: "bridge_deck_highway_overpass",
  },
  solar_thermal_hybrid: {
    meltRate: 5, efficiency: 9, installEase: 4, operating: 8, smCost: 8,
    automatic: true, forDriveway: false,
    heat: "solar_collector_tank_glycol_pex",
    bestUse: "eco_building_walkway_patio",
  },
};

function get(t: SnowMeltType): SnowMeltData {
  return DATA[t];
}

export const meltRate = (t: SnowMeltType) => get(t).meltRate;
export const efficiency = (t: SnowMeltType) => get(t).efficiency;
export const installEase = (t: SnowMeltType) => get(t).installEase;
export const operating = (t: SnowMeltType) => get(t).operating;
export const smCost = (t: SnowMeltType) => get(t).smCost;
export const automatic = (t: SnowMeltType) => get(t).automatic;
export const forDriveway = (t: SnowMeltType) => get(t).forDriveway;
export const heat = (t: SnowMeltType) => get(t).heat;
export const bestUse = (t: SnowMeltType) => get(t).bestUse;
export const snowMeltTypes = (): SnowMeltType[] =>
  Object.keys(DATA) as SnowMeltType[];
