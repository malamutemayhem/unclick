export type DcsType =
  | "traditional_proprietary_dcs"
  | "pc_based_open_platform"
  | "safety_integrated_sis"
  | "hybrid_plc_dcs_pac"
  | "cloud_edge_distributed";

const DATA: Record<DcsType, {
  scalability: number; reliability: number; openness: number;
  latency: number; dcCost: number; redundant: boolean;
  forProcess: boolean; architecture: string; bestUse: string;
}> = {
  traditional_proprietary_dcs: {
    scalability: 8, reliability: 10, openness: 3,
    latency: 8, dcCost: 5, redundant: true,
    forProcess: true, architecture: "proprietary_controller_hmi_bus",
    bestUse: "large_refinery_continuous_process",
  },
  pc_based_open_platform: {
    scalability: 7, reliability: 7, openness: 9,
    latency: 6, dcCost: 3, redundant: false,
    forProcess: true, architecture: "windows_softlogic_opc_server",
    bestUse: "batch_process_flexible_recipe",
  },
  safety_integrated_sis: {
    scalability: 6, reliability: 10, openness: 4,
    latency: 9, dcCost: 5, redundant: true,
    forProcess: true, architecture: "tmr_voted_logic_sil3_certified",
    bestUse: "safety_critical_shutdown_esd",
  },
  hybrid_plc_dcs_pac: {
    scalability: 9, reliability: 8, openness: 7,
    latency: 7, dcCost: 3, redundant: true,
    forProcess: true, architecture: "pac_controller_unified_programming",
    bestUse: "mixed_discrete_process_plant",
  },
  cloud_edge_distributed: {
    scalability: 10, reliability: 7, openness: 10,
    latency: 4, dcCost: 2, redundant: false,
    forProcess: false, architecture: "edge_compute_cloud_analytics_mqtt",
    bestUse: "greenfield_iiot_digital_twin",
  },
};

const get = (t: DcsType) => DATA[t];

export const scalability = (t: DcsType) => get(t).scalability;
export const reliability = (t: DcsType) => get(t).reliability;
export const openness = (t: DcsType) => get(t).openness;
export const latency = (t: DcsType) => get(t).latency;
export const dcCost = (t: DcsType) => get(t).dcCost;
export const redundant = (t: DcsType) => get(t).redundant;
export const forProcess = (t: DcsType) => get(t).forProcess;
export const architecture = (t: DcsType) => get(t).architecture;
export const bestUse = (t: DcsType) => get(t).bestUse;
export const dcsTypes = (): DcsType[] => Object.keys(DATA) as DcsType[];
