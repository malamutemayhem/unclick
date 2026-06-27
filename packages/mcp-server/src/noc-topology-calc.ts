export type NocTopology =
  | "mesh_2d_grid"
  | "ring_bidirect"
  | "torus_wrapped"
  | "crossbar_full"
  | "tree_fat_clos";

const DATA: Record<NocTopology, {
  bandwidth: number; latency: number; scalability: number;
  routingComplex: number; topoCost: number; deadlockFree: boolean;
  forManycore: boolean; routing: string; bestUse: string;
}> = {
  mesh_2d_grid: {
    bandwidth: 7, latency: 6, scalability: 9,
    routingComplex: 5, topoCost: 5, deadlockFree: true,
    forManycore: true, routing: "xy_dimension_order",
    bestUse: "gpu_streaming_multi",
  },
  ring_bidirect: {
    bandwidth: 4, latency: 5, scalability: 3,
    routingComplex: 2, topoCost: 2, deadlockFree: true,
    forManycore: false, routing: "shortest_path_ring",
    bestUse: "cpu_core_ring_bus",
  },
  torus_wrapped: {
    bandwidth: 8, latency: 8, scalability: 8,
    routingComplex: 7, topoCost: 7, deadlockFree: false,
    forManycore: true, routing: "adaptive_minimal",
    bestUse: "hpc_cluster_network",
  },
  crossbar_full: {
    bandwidth: 10, latency: 10, scalability: 2,
    routingComplex: 3, topoCost: 9, deadlockFree: true,
    forManycore: false, routing: "direct_port_select",
    bestUse: "switch_asic_fabric",
  },
  tree_fat_clos: {
    bandwidth: 9, latency: 7, scalability: 7,
    routingComplex: 6, topoCost: 8, deadlockFree: true,
    forManycore: true, routing: "valiant_load_balance",
    bestUse: "datacenter_leaf_spine",
  },
};

const get = (t: NocTopology) => DATA[t];

export const bandwidth = (t: NocTopology) => get(t).bandwidth;
export const latency = (t: NocTopology) => get(t).latency;
export const scalability = (t: NocTopology) => get(t).scalability;
export const routingComplex = (t: NocTopology) => get(t).routingComplex;
export const topoCost = (t: NocTopology) => get(t).topoCost;
export const deadlockFree = (t: NocTopology) => get(t).deadlockFree;
export const forManycore = (t: NocTopology) => get(t).forManycore;
export const routing = (t: NocTopology) => get(t).routing;
export const bestUse = (t: NocTopology) => get(t).bestUse;
export const nocTopologies = (): NocTopology[] => Object.keys(DATA) as NocTopology[];
