export type NvmeConfig =
  | "nvme_pcie_gen4"
  | "nvme_pcie_gen5"
  | "nvme_of_tcp"
  | "nvme_of_rdma"
  | "zns_zoned_ns";

const DATA: Record<NvmeConfig, {
  seqRead: number; iops: number; latency: number;
  endurance: number; configCost: number; networked: boolean;
  forCloud: boolean; transport: string; bestUse: string;
}> = {
  nvme_pcie_gen4: {
    seqRead: 6, iops: 7, latency: 8,
    endurance: 7, configCost: 4, networked: false,
    forCloud: false, transport: "pcie_4_0_x4_lane",
    bestUse: "workstation_boot_drive",
  },
  nvme_pcie_gen5: {
    seqRead: 9, iops: 9, latency: 9,
    endurance: 7, configCost: 7, networked: false,
    forCloud: false, transport: "pcie_5_0_x4_lane",
    bestUse: "ai_training_checkpoint",
  },
  nvme_of_tcp: {
    seqRead: 5, iops: 5, latency: 4,
    endurance: 8, configCost: 6, networked: true,
    forCloud: true, transport: "tcp_ip_fabric_100g",
    bestUse: "disaggregated_storage",
  },
  nvme_of_rdma: {
    seqRead: 7, iops: 8, latency: 7,
    endurance: 8, configCost: 9, networked: true,
    forCloud: true, transport: "roce_v2_rdma_fabric",
    bestUse: "all_flash_array_backend",
  },
  zns_zoned_ns: {
    seqRead: 8, iops: 6, latency: 5,
    endurance: 10, configCost: 5, networked: false,
    forCloud: true, transport: "pcie_zoned_append",
    bestUse: "lsm_tree_database_engine",
  },
};

const get = (t: NvmeConfig) => DATA[t];

export const seqRead = (t: NvmeConfig) => get(t).seqRead;
export const iops = (t: NvmeConfig) => get(t).iops;
export const latency = (t: NvmeConfig) => get(t).latency;
export const endurance = (t: NvmeConfig) => get(t).endurance;
export const configCost = (t: NvmeConfig) => get(t).configCost;
export const networked = (t: NvmeConfig) => get(t).networked;
export const forCloud = (t: NvmeConfig) => get(t).forCloud;
export const transport = (t: NvmeConfig) => get(t).transport;
export const bestUse = (t: NvmeConfig) => get(t).bestUse;
export const nvmeConfigs = (): NvmeConfig[] => Object.keys(DATA) as NvmeConfig[];
