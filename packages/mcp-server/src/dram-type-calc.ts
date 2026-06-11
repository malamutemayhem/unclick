export type DramType =
  | "commodity_ddr"
  | "ecc_registered"
  | "lrdimm_buffered"
  | "nvdimm_persistent"
  | "hmc_hybrid_cube";

const DATA: Record<DramType, {
  capacity: number; reliability: number; bandwidth: number;
  latency: number; dramCost: number; persistent: boolean;
  forServer: boolean; form: string; bestUse: string;
}> = {
  commodity_ddr: {
    capacity: 5, reliability: 4, bandwidth: 5,
    latency: 7, dramCost: 2, persistent: false,
    forServer: false, form: "udimm_unbuffered",
    bestUse: "desktop_gaming_pc",
  },
  ecc_registered: {
    capacity: 7, reliability: 8, bandwidth: 6,
    latency: 6, dramCost: 5, persistent: false,
    forServer: true, form: "rdimm_registered",
    bestUse: "dual_socket_server",
  },
  lrdimm_buffered: {
    capacity: 10, reliability: 9, bandwidth: 7,
    latency: 5, dramCost: 8, persistent: false,
    forServer: true, form: "lrdimm_data_buffer",
    bestUse: "in_memory_database",
  },
  nvdimm_persistent: {
    capacity: 6, reliability: 7, bandwidth: 4,
    latency: 8, dramCost: 9, persistent: true,
    forServer: true, form: "nvdimm_n_flash_backed",
    bestUse: "write_ahead_log_cache",
  },
  hmc_hybrid_cube: {
    capacity: 4, reliability: 6, bandwidth: 10,
    latency: 9, dramCost: 10, persistent: false,
    forServer: false, form: "3d_tsv_logic_layer",
    bestUse: "network_packet_buffer",
  },
};

const get = (t: DramType) => DATA[t];

export const capacity = (t: DramType) => get(t).capacity;
export const reliability = (t: DramType) => get(t).reliability;
export const bandwidth = (t: DramType) => get(t).bandwidth;
export const latency = (t: DramType) => get(t).latency;
export const dramCost = (t: DramType) => get(t).dramCost;
export const persistent = (t: DramType) => get(t).persistent;
export const forServer = (t: DramType) => get(t).forServer;
export const form = (t: DramType) => get(t).form;
export const bestUse = (t: DramType) => get(t).bestUse;
export const dramTypes = (): DramType[] => Object.keys(DATA) as DramType[];
