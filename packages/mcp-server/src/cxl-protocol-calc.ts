export type CxlProtocol =
  | "cxl_type1_cache"
  | "cxl_type2_accel"
  | "cxl_type3_mem"
  | "cxl_switch_fabric"
  | "cxl_mem_pool";

const DATA: Record<CxlProtocol, {
  bandwidth: number; latency: number; coherency: number;
  scalability: number; protoCost: number; cacheCoherent: boolean;
  forMemExpand: boolean; transport: string; bestUse: string;
}> = {
  cxl_type1_cache: {
    bandwidth: 6, latency: 9, coherency: 10,
    scalability: 3, protoCost: 5, cacheCoherent: true,
    forMemExpand: false, transport: "cxl_io_cache_68b_flit",
    bestUse: "smartnic_host_coherent",
  },
  cxl_type2_accel: {
    bandwidth: 8, latency: 7, coherency: 9,
    scalability: 5, protoCost: 7, cacheCoherent: true,
    forMemExpand: false, transport: "cxl_io_cache_mem_flit",
    bestUse: "ai_accel_shared_mem",
  },
  cxl_type3_mem: {
    bandwidth: 7, latency: 6, coherency: 5,
    scalability: 8, protoCost: 4, cacheCoherent: false,
    forMemExpand: true, transport: "cxl_mem_256b_flit",
    bestUse: "dram_capacity_expansion",
  },
  cxl_switch_fabric: {
    bandwidth: 9, latency: 5, coherency: 6,
    scalability: 10, protoCost: 9, cacheCoherent: false,
    forMemExpand: true, transport: "cxl_3_0_fabric_port",
    bestUse: "composable_disaggregated",
  },
  cxl_mem_pool: {
    bandwidth: 8, latency: 4, coherency: 4,
    scalability: 9, protoCost: 8, cacheCoherent: false,
    forMemExpand: true, transport: "cxl_shared_pool_mgr",
    bestUse: "cloud_memory_tiering",
  },
};

const get = (t: CxlProtocol) => DATA[t];

export const bandwidth = (t: CxlProtocol) => get(t).bandwidth;
export const latency = (t: CxlProtocol) => get(t).latency;
export const coherency = (t: CxlProtocol) => get(t).coherency;
export const scalability = (t: CxlProtocol) => get(t).scalability;
export const protoCost = (t: CxlProtocol) => get(t).protoCost;
export const cacheCoherent = (t: CxlProtocol) => get(t).cacheCoherent;
export const forMemExpand = (t: CxlProtocol) => get(t).forMemExpand;
export const transport = (t: CxlProtocol) => get(t).transport;
export const bestUse = (t: CxlProtocol) => get(t).bestUse;
export const cxlProtocols = (): CxlProtocol[] => Object.keys(DATA) as CxlProtocol[];
