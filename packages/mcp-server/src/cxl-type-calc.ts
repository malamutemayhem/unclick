export type CxlType =
  | "cxl_1_1_cache"
  | "cxl_2_0_memory"
  | "cxl_3_0_fabric"
  | "cxl_mem_expander"
  | "cxl_switch_pool";

const DATA: Record<CxlType, {
  bandwidth: number; latency: number; pooling: number;
  coherency: number; cxlCost: number; hotPlug: boolean;
  forDisaggregated: boolean; protocol: string; bestUse: string;
}> = {
  cxl_1_1_cache: {
    bandwidth: 5, latency: 8, pooling: 2,
    coherency: 8, cxlCost: 4, hotPlug: false,
    forDisaggregated: false, protocol: "pcie5_cache_io",
    bestUse: "accelerator_coherent_attach",
  },
  cxl_2_0_memory: {
    bandwidth: 7, latency: 7, pooling: 5,
    coherency: 9, cxlCost: 6, hotPlug: true,
    forDisaggregated: true, protocol: "pcie5_mem_hdm",
    bestUse: "memory_bandwidth_expand",
  },
  cxl_3_0_fabric: {
    bandwidth: 9, latency: 6, pooling: 9,
    coherency: 9, cxlCost: 9, hotPlug: true,
    forDisaggregated: true, protocol: "pcie6_multi_head",
    bestUse: "composable_rack_fabric",
  },
  cxl_mem_expander: {
    bandwidth: 7, latency: 7, pooling: 4,
    coherency: 7, cxlCost: 5, hotPlug: true,
    forDisaggregated: false, protocol: "type3_ddr5_bridge",
    bestUse: "dram_capacity_tier",
  },
  cxl_switch_pool: {
    bandwidth: 8, latency: 6, pooling: 10,
    coherency: 8, cxlCost: 8, hotPlug: true,
    forDisaggregated: true, protocol: "fabric_manager_switch",
    bestUse: "shared_memory_pool_dc",
  },
};

const get = (t: CxlType) => DATA[t];

export const bandwidth = (t: CxlType) => get(t).bandwidth;
export const latency = (t: CxlType) => get(t).latency;
export const pooling = (t: CxlType) => get(t).pooling;
export const coherency = (t: CxlType) => get(t).coherency;
export const cxlCost = (t: CxlType) => get(t).cxlCost;
export const hotPlug = (t: CxlType) => get(t).hotPlug;
export const forDisaggregated = (t: CxlType) => get(t).forDisaggregated;
export const protocol = (t: CxlType) => get(t).protocol;
export const bestUse = (t: CxlType) => get(t).bestUse;
export const cxlTypes = (): CxlType[] => Object.keys(DATA) as CxlType[];
