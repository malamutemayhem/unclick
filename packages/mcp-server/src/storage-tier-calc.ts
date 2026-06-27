export type StorageTier =
  | "nvme_u2_ssd"
  | "sata_ssd_2_5"
  | "hdd_nearline_18tb"
  | "persistent_mem_pmem"
  | "nvme_edsff_e3";

const DATA: Record<StorageTier, {
  iops: number; throughput: number; latency: number;
  density: number; storCost: number; hotSwap: boolean;
  forDatabase: boolean; interface_: string; bestUse: string;
}> = {
  nvme_u2_ssd: {
    iops: 9, throughput: 9, latency: 9,
    density: 7, storCost: 7, hotSwap: true,
    forDatabase: true, interface_: "pcie4_nvme_u2",
    bestUse: "oltp_primary_tier",
  },
  sata_ssd_2_5: {
    iops: 5, throughput: 5, latency: 7,
    density: 6, storCost: 4, hotSwap: true,
    forDatabase: true, interface_: "sata3_6gbps_2_5in",
    bestUse: "read_cache_warm_tier",
  },
  hdd_nearline_18tb: {
    iops: 2, throughput: 3, latency: 2,
    density: 10, storCost: 1, hotSwap: true,
    forDatabase: false, interface_: "sas_12g_3_5in",
    bestUse: "cold_archive_backup",
  },
  persistent_mem_pmem: {
    iops: 10, throughput: 8, latency: 10,
    density: 4, storCost: 9, hotSwap: false,
    forDatabase: true, interface_: "dimm_ddr_interleaved",
    bestUse: "in_memory_db_tier0",
  },
  nvme_edsff_e3: {
    iops: 9, throughput: 9, latency: 9,
    density: 9, storCost: 8, hotSwap: true,
    forDatabase: true, interface_: "pcie5_edsff_e3_s",
    bestUse: "composable_jbof_pool",
  },
};

const get = (t: StorageTier) => DATA[t];

export const iops = (t: StorageTier) => get(t).iops;
export const throughput = (t: StorageTier) => get(t).throughput;
export const latency = (t: StorageTier) => get(t).latency;
export const density = (t: StorageTier) => get(t).density;
export const storCost = (t: StorageTier) => get(t).storCost;
export const hotSwap = (t: StorageTier) => get(t).hotSwap;
export const forDatabase = (t: StorageTier) => get(t).forDatabase;
export const interface_ = (t: StorageTier) => get(t).interface_;
export const bestUse = (t: StorageTier) => get(t).bestUse;
export const storageTiers = (): StorageTier[] => Object.keys(DATA) as StorageTier[];
