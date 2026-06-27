export type IceStorageType =
  | "internal_melt_coil"
  | "external_melt_ice_on_coil"
  | "encapsulated_ball_container"
  | "ice_slurry_harvester"
  | "eutectic_salt_plate";

interface IceStorageData {
  capacity: number;
  efficiency: number;
  discharge: number;
  footprint: number;
  isCost: number;
  partialStorage: boolean;
  forPeakShave: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<IceStorageType, IceStorageData> = {
  internal_melt_coil: {
    capacity: 7, efficiency: 8, discharge: 7, footprint: 7, isCost: 6,
    partialStorage: true, forPeakShave: true,
    medium: "glycol_coil_internal_melt_tank",
    bestUse: "office_building_demand_shift",
  },
  external_melt_ice_on_coil: {
    capacity: 8, efficiency: 7, discharge: 9, footprint: 6, isCost: 5,
    partialStorage: true, forPeakShave: true,
    medium: "steel_coil_external_melt_tank",
    bestUse: "industrial_process_cooling_shift",
  },
  encapsulated_ball_container: {
    capacity: 9, efficiency: 8, discharge: 8, footprint: 8, isCost: 7,
    partialStorage: true, forPeakShave: true,
    medium: "spherical_capsule_phase_change",
    bestUse: "district_cooling_large_campus",
  },
  ice_slurry_harvester: {
    capacity: 10, efficiency: 6, discharge: 10, footprint: 5, isCost: 9,
    partialStorage: false, forPeakShave: false,
    medium: "scraped_surface_ice_crystal_pump",
    bestUse: "food_processing_rapid_chill",
  },
  eutectic_salt_plate: {
    capacity: 6, efficiency: 9, discharge: 6, footprint: 9, isCost: 4,
    partialStorage: false, forPeakShave: true,
    medium: "salt_hydrate_plate_modular_rack",
    bestUse: "cold_chain_transport_backup",
  },
};

function get(t: IceStorageType): IceStorageData {
  return DATA[t];
}

export const capacity = (t: IceStorageType) => get(t).capacity;
export const efficiency = (t: IceStorageType) => get(t).efficiency;
export const discharge = (t: IceStorageType) => get(t).discharge;
export const footprint = (t: IceStorageType) => get(t).footprint;
export const isCost = (t: IceStorageType) => get(t).isCost;
export const partialStorage = (t: IceStorageType) => get(t).partialStorage;
export const forPeakShave = (t: IceStorageType) => get(t).forPeakShave;
export const medium = (t: IceStorageType) => get(t).medium;
export const bestUse = (t: IceStorageType) => get(t).bestUse;
export const iceStorageTypes = (): IceStorageType[] =>
  Object.keys(DATA) as IceStorageType[];
