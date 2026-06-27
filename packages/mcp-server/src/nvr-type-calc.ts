export type NvrType =
  | "embedded_standalone_box"
  | "rack_mount_enterprise"
  | "cloud_hybrid_bridge"
  | "poe_switch_integrated"
  | "virtual_software_server";

interface NvrData {
  channels: number;
  storage: number;
  reliability: number;
  scalability: number;
  nrCost: number;
  redundant: boolean;
  forEnterprise: boolean;
  recording: string;
  bestUse: string;
}

const DATA: Record<NvrType, NvrData> = {
  embedded_standalone_box: {
    channels: 5, storage: 5, reliability: 8, scalability: 3, nrCost: 3,
    redundant: false, forEnterprise: false,
    recording: "local_hdd_h265_continuous",
    bestUse: "small_business_retail_shop",
  },
  rack_mount_enterprise: {
    channels: 10, storage: 10, reliability: 9, scalability: 9, nrCost: 8,
    redundant: true, forEnterprise: true,
    recording: "raid_array_h265_redundant",
    bestUse: "campus_data_center_large",
  },
  cloud_hybrid_bridge: {
    channels: 7, storage: 8, reliability: 8, scalability: 10, nrCost: 6,
    redundant: true, forEnterprise: false,
    recording: "cloud_edge_hybrid_offload",
    bestUse: "multi_site_remote_access",
  },
  poe_switch_integrated: {
    channels: 4, storage: 4, reliability: 7, scalability: 3, nrCost: 2,
    redundant: false, forEnterprise: false,
    recording: "built_in_poe_switch_local",
    bestUse: "small_home_office_simple",
  },
  virtual_software_server: {
    channels: 9, storage: 9, reliability: 8, scalability: 10, nrCost: 7,
    redundant: true, forEnterprise: true,
    recording: "vm_based_gpu_analytics_store",
    bestUse: "it_managed_virtualized_infra",
  },
};

function get(t: NvrType): NvrData {
  return DATA[t];
}

export const channels = (t: NvrType) => get(t).channels;
export const storage = (t: NvrType) => get(t).storage;
export const reliability = (t: NvrType) => get(t).reliability;
export const scalability = (t: NvrType) => get(t).scalability;
export const nrCost = (t: NvrType) => get(t).nrCost;
export const redundant = (t: NvrType) => get(t).redundant;
export const forEnterprise = (t: NvrType) => get(t).forEnterprise;
export const recording = (t: NvrType) => get(t).recording;
export const bestUse = (t: NvrType) => get(t).bestUse;
export const nvrTypes = (): NvrType[] =>
  Object.keys(DATA) as NvrType[];
