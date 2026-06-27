export type FiberEnclosureType =
  | "wall_mount_patch_small"
  | "rack_mount_1u_slide"
  | "rack_mount_4u_high_density"
  | "outdoor_pedestal_nema"
  | "modular_cassette_mpo";

interface FiberEnclosureData {
  portDensity: number;
  accessibility: number;
  protection: number;
  scalability: number;
  feCost: number;
  lockable: boolean;
  forOutdoor: boolean;
  termination: string;
  bestUse: string;
}

const DATA: Record<FiberEnclosureType, FiberEnclosureData> = {
  wall_mount_patch_small: {
    portDensity: 4, accessibility: 7, protection: 6, scalability: 3, feCost: 3,
    lockable: true, forOutdoor: false,
    termination: "sc_lc_pigtail_splice_tray",
    bestUse: "small_office_telecom_closet",
  },
  rack_mount_1u_slide: {
    portDensity: 6, accessibility: 9, protection: 7, scalability: 6, feCost: 5,
    lockable: true, forOutdoor: false,
    termination: "lc_duplex_adapter_slide_tray",
    bestUse: "standard_idf_mdf_patch_bay",
  },
  rack_mount_4u_high_density: {
    portDensity: 10, accessibility: 8, protection: 8, scalability: 9, feCost: 8,
    lockable: true, forOutdoor: false,
    termination: "mpo_lc_breakout_high_count",
    bestUse: "data_center_core_distribution",
  },
  outdoor_pedestal_nema: {
    portDensity: 5, accessibility: 5, protection: 10, scalability: 4, feCost: 7,
    lockable: true, forOutdoor: true,
    termination: "sealed_splice_closure_aerial",
    bestUse: "outside_plant_campus_backbone",
  },
  modular_cassette_mpo: {
    portDensity: 9, accessibility: 10, protection: 7, scalability: 10, feCost: 9,
    lockable: false, forOutdoor: false,
    termination: "pre_terminated_mpo_cassette_snap",
    bestUse: "rapid_deploy_high_density_spine",
  },
};

function get(t: FiberEnclosureType): FiberEnclosureData {
  return DATA[t];
}

export const portDensity = (t: FiberEnclosureType) => get(t).portDensity;
export const accessibility = (t: FiberEnclosureType) => get(t).accessibility;
export const protection = (t: FiberEnclosureType) => get(t).protection;
export const scalability = (t: FiberEnclosureType) => get(t).scalability;
export const feCost = (t: FiberEnclosureType) => get(t).feCost;
export const lockable = (t: FiberEnclosureType) => get(t).lockable;
export const forOutdoor = (t: FiberEnclosureType) => get(t).forOutdoor;
export const termination = (t: FiberEnclosureType) => get(t).termination;
export const bestUse = (t: FiberEnclosureType) => get(t).bestUse;
export const fiberEnclosureTypes = (): FiberEnclosureType[] =>
  Object.keys(DATA) as FiberEnclosureType[];
