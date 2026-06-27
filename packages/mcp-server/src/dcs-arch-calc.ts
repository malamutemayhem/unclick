export type DcsArch =
  | "centralized_plc_rack"
  | "distributed_rio_node"
  | "pac_hybrid_controller"
  | "edge_fog_compute"
  | "cloud_scada_saas";

const DATA: Record<DcsArch, {
  scalability: number; reliability: number; latency: number;
  flexibility: number; dcCost: number; redundant: boolean;
  forCritical: boolean; topology: string; bestUse: string;
}> = {
  centralized_plc_rack: {
    scalability: 4, reliability: 7, latency: 9,
    flexibility: 4, dcCost: 3, redundant: false,
    forCritical: false, topology: "star_backplane_bus",
    bestUse: "small_batch_packaging_line",
  },
  distributed_rio_node: {
    scalability: 8, reliability: 9, latency: 7,
    flexibility: 7, dcCost: 6, redundant: true,
    forCritical: true, topology: "ring_redundant_network",
    bestUse: "refinery_unit_area_control",
  },
  pac_hybrid_controller: {
    scalability: 7, reliability: 8, latency: 8,
    flexibility: 9, dcCost: 5, redundant: true,
    forCritical: true, topology: "mesh_deterministic_ethernet",
    bestUse: "water_treatment_multi_loop",
  },
  edge_fog_compute: {
    scalability: 9, reliability: 6, latency: 6,
    flexibility: 10, dcCost: 4, redundant: false,
    forCritical: false, topology: "hierarchical_edge_cloud",
    bestUse: "predictive_maintenance_analytics",
  },
  cloud_scada_saas: {
    scalability: 10, reliability: 5, latency: 3,
    flexibility: 8, dcCost: 7, redundant: false,
    forCritical: false, topology: "mqtt_broker_cloud_ingest",
    bestUse: "multi_site_fleet_monitoring",
  },
};

const get = (t: DcsArch) => DATA[t];

export const scalability = (t: DcsArch) => get(t).scalability;
export const reliability = (t: DcsArch) => get(t).reliability;
export const latency = (t: DcsArch) => get(t).latency;
export const flexibility = (t: DcsArch) => get(t).flexibility;
export const dcCost = (t: DcsArch) => get(t).dcCost;
export const redundant = (t: DcsArch) => get(t).redundant;
export const forCritical = (t: DcsArch) => get(t).forCritical;
export const topology = (t: DcsArch) => get(t).topology;
export const bestUse = (t: DcsArch) => get(t).bestUse;
export const dcsArchs = (): DcsArch[] => Object.keys(DATA) as DcsArch[];
