export type SpacecraftBus =
  | "smallsat_cubesat_frame"
  | "medium_geostat_platform"
  | "large_flagship_composite"
  | "micro_propulsive_module"
  | "modular_espa_ring";

const DATA: Record<SpacecraftBus, {
  payload: number; power: number; reliability: number;
  flexibility: number; sbCost: number; propulsive: boolean;
  forLeo: boolean; structure: string; bestUse: string;
}> = {
  smallsat_cubesat_frame: {
    payload: 2, power: 3, reliability: 5,
    flexibility: 8, sbCost: 1, propulsive: false,
    forLeo: true, structure: "aluminum_rail_pcb_stack",
    bestUse: "iot_constellation_rapid_deploy",
  },
  medium_geostat_platform: {
    payload: 7, power: 8, reliability: 9,
    flexibility: 5, sbCost: 4, propulsive: true,
    forLeo: false, structure: "honeycomb_panel_central_tube",
    bestUse: "telecom_satellite_geo_station",
  },
  large_flagship_composite: {
    payload: 10, power: 10, reliability: 10,
    flexibility: 3, sbCost: 5, propulsive: true,
    forLeo: false, structure: "composite_truss_deployable",
    bestUse: "deep_space_science_observatory",
  },
  micro_propulsive_module: {
    payload: 4, power: 5, reliability: 7,
    flexibility: 9, sbCost: 2, propulsive: true,
    forLeo: true, structure: "integrated_prop_avionics_box",
    bestUse: "orbital_transfer_rideshare_tug",
  },
  modular_espa_ring: {
    payload: 6, power: 6, reliability: 8,
    flexibility: 10, sbCost: 3, propulsive: false,
    forLeo: true, structure: "espa_port_modular_adapter",
    bestUse: "multi_manifest_rideshare_host",
  },
};

const get = (t: SpacecraftBus) => DATA[t];

export const payload = (t: SpacecraftBus) => get(t).payload;
export const power = (t: SpacecraftBus) => get(t).power;
export const reliability = (t: SpacecraftBus) => get(t).reliability;
export const flexibility = (t: SpacecraftBus) => get(t).flexibility;
export const sbCost = (t: SpacecraftBus) => get(t).sbCost;
export const propulsive = (t: SpacecraftBus) => get(t).propulsive;
export const forLeo = (t: SpacecraftBus) => get(t).forLeo;
export const structure = (t: SpacecraftBus) => get(t).structure;
export const bestUse = (t: SpacecraftBus) => get(t).bestUse;
export const spacecraftBuses = (): SpacecraftBus[] => Object.keys(DATA) as SpacecraftBus[];
