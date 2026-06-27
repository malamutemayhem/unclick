export type DcsDistributedType =
  | "traditional_dcs_large"
  | "hybrid_dcs_plc_mix"
  | "micro_dcs_skid_mount"
  | "cloud_connected_dcs"
  | "safety_integrated_dcs";

interface DcsDistributedData {
  scalability: number;
  redundancy: number;
  operatorInterface: number;
  integration: number;
  dcCost: number;
  cloudEnabled: boolean;
  forCriticalProcess: boolean;
  architecture: string;
  bestUse: string;
}

const DATA: Record<DcsDistributedType, DcsDistributedData> = {
  traditional_dcs_large: {
    scalability: 10, redundancy: 10, operatorInterface: 9, integration: 8, dcCost: 10,
    cloudEnabled: false, forCriticalProcess: true,
    architecture: "proprietary_controller_network_redundant_server_hmi",
    bestUse: "refinery_power_plant_large_continuous_process",
  },
  hybrid_dcs_plc_mix: {
    scalability: 8, redundancy: 8, operatorInterface: 8, integration: 9, dcCost: 7,
    cloudEnabled: false, forCriticalProcess: true,
    architecture: "dcs_supervisory_plc_field_control_unified_database",
    bestUse: "batch_plant_mixed_continuous_discrete_manufacturing",
  },
  micro_dcs_skid_mount: {
    scalability: 4, redundancy: 6, operatorInterface: 7, integration: 6, dcCost: 4,
    cloudEnabled: false, forCriticalProcess: false,
    architecture: "compact_controller_local_hmi_skid_package_unit",
    bestUse: "water_treatment_skid_compressor_station_small_plant",
  },
  cloud_connected_dcs: {
    scalability: 9, redundancy: 8, operatorInterface: 10, integration: 10, dcCost: 8,
    cloudEnabled: true, forCriticalProcess: false,
    architecture: "edge_controller_cloud_historian_remote_dashboard",
    bestUse: "multi_site_monitoring_digital_twin_predictive_ops",
  },
  safety_integrated_dcs: {
    scalability: 9, redundancy: 10, operatorInterface: 9, integration: 9, dcCost: 10,
    cloudEnabled: false, forCriticalProcess: true,
    architecture: "dcs_plus_sis_common_engineering_separate_logic",
    bestUse: "oil_gas_nuclear_integrated_control_and_safety",
  },
};

function get(t: DcsDistributedType): DcsDistributedData {
  return DATA[t];
}

export const scalability = (t: DcsDistributedType) => get(t).scalability;
export const redundancy = (t: DcsDistributedType) => get(t).redundancy;
export const operatorInterface = (t: DcsDistributedType) => get(t).operatorInterface;
export const integration = (t: DcsDistributedType) => get(t).integration;
export const dcCost = (t: DcsDistributedType) => get(t).dcCost;
export const cloudEnabled = (t: DcsDistributedType) => get(t).cloudEnabled;
export const forCriticalProcess = (t: DcsDistributedType) => get(t).forCriticalProcess;
export const architecture = (t: DcsDistributedType) => get(t).architecture;
export const bestUse = (t: DcsDistributedType) => get(t).bestUse;
export const dcsDistributedTypes = (): DcsDistributedType[] =>
  Object.keys(DATA) as DcsDistributedType[];
