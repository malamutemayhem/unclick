export type RdmaType =
  | "roce_v2"
  | "infiniband_hdr"
  | "infiniband_ndr"
  | "iwarp_tcp"
  | "ultra_ethernet";

const DATA: Record<RdmaType, {
  bandwidth: number; latency: number; cpuOffload: number;
  congestion: number; rdmaCost: number; lossless: boolean;
  forAiTraining: boolean; transport: string; bestUse: string;
}> = {
  roce_v2: {
    bandwidth: 7, latency: 8, cpuOffload: 8,
    congestion: 6, rdmaCost: 5, lossless: true,
    forAiTraining: true, transport: "udp_ecn_pfc",
    bestUse: "gpu_cluster_allreduce",
  },
  infiniband_hdr: {
    bandwidth: 7, latency: 9, cpuOffload: 9,
    congestion: 8, rdmaCost: 7, lossless: true,
    forAiTraining: true, transport: "ib_credit_flow",
    bestUse: "hpc_mpi_collective",
  },
  infiniband_ndr: {
    bandwidth: 9, latency: 9, cpuOffload: 9,
    congestion: 9, rdmaCost: 9, lossless: true,
    forAiTraining: true, transport: "ib_400g_sharp",
    bestUse: "large_llm_training",
  },
  iwarp_tcp: {
    bandwidth: 5, latency: 6, cpuOffload: 7,
    congestion: 8, rdmaCost: 4, lossless: false,
    forAiTraining: false, transport: "tcp_rdma_offload",
    bestUse: "storage_iscsi_nvmeof",
  },
  ultra_ethernet: {
    bandwidth: 10, latency: 8, cpuOffload: 9,
    congestion: 8, rdmaCost: 8, lossless: true,
    forAiTraining: true, transport: "uec_packet_spraying",
    bestUse: "next_gen_ai_fabric",
  },
};

const get = (t: RdmaType) => DATA[t];

export const bandwidth = (t: RdmaType) => get(t).bandwidth;
export const latency = (t: RdmaType) => get(t).latency;
export const cpuOffload = (t: RdmaType) => get(t).cpuOffload;
export const congestion = (t: RdmaType) => get(t).congestion;
export const rdmaCost = (t: RdmaType) => get(t).rdmaCost;
export const lossless = (t: RdmaType) => get(t).lossless;
export const forAiTraining = (t: RdmaType) => get(t).forAiTraining;
export const transport = (t: RdmaType) => get(t).transport;
export const bestUse = (t: RdmaType) => get(t).bestUse;
export const rdmaTypes = (): RdmaType[] => Object.keys(DATA) as RdmaType[];
