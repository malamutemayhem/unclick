export type DpuSmartnic =
  | "nic_offload_basic"
  | "dpu_arm_cores"
  | "ipu_infrastructure"
  | "fpga_smartnic"
  | "asic_inline_crypto";

const DATA: Record<DpuSmartnic, {
  throughput: number; programmability: number; offloadDepth: number;
  powerDraw: number; dpuCost: number; hostless: boolean;
  forCloud: boolean; engine: string; bestUse: string;
}> = {
  nic_offload_basic: {
    throughput: 5, programmability: 3, offloadDepth: 4,
    powerDraw: 8, dpuCost: 3, hostless: false,
    forCloud: false, engine: "rdma_toe_hw_queue",
    bestUse: "basic_rdma_offload",
  },
  dpu_arm_cores: {
    throughput: 8, programmability: 9, offloadDepth: 8,
    powerDraw: 4, dpuCost: 8, hostless: true,
    forCloud: true, engine: "arm_n2_data_path",
    bestUse: "bare_metal_cloud_host",
  },
  ipu_infrastructure: {
    throughput: 8, programmability: 8, offloadDepth: 9,
    powerDraw: 4, dpuCost: 9, hostless: true,
    forCloud: true, engine: "xeon_d_infra_proc",
    bestUse: "hypervisor_offload",
  },
  fpga_smartnic: {
    throughput: 7, programmability: 10, offloadDepth: 7,
    powerDraw: 3, dpuCost: 7, hostless: false,
    forCloud: true, engine: "rtl_hls_pipeline",
    bestUse: "low_latency_trading",
  },
  asic_inline_crypto: {
    throughput: 9, programmability: 4, offloadDepth: 6,
    powerDraw: 7, dpuCost: 5, hostless: false,
    forCloud: true, engine: "fixed_ipsec_macsec",
    bestUse: "encrypted_400g_line",
  },
};

const get = (t: DpuSmartnic) => DATA[t];

export const throughput = (t: DpuSmartnic) => get(t).throughput;
export const programmability = (t: DpuSmartnic) => get(t).programmability;
export const offloadDepth = (t: DpuSmartnic) => get(t).offloadDepth;
export const powerDraw = (t: DpuSmartnic) => get(t).powerDraw;
export const dpuCost = (t: DpuSmartnic) => get(t).dpuCost;
export const hostless = (t: DpuSmartnic) => get(t).hostless;
export const forCloud = (t: DpuSmartnic) => get(t).forCloud;
export const engine = (t: DpuSmartnic) => get(t).engine;
export const bestUse = (t: DpuSmartnic) => get(t).bestUse;
export const dpuSmartnics = (): DpuSmartnic[] => Object.keys(DATA) as DpuSmartnic[];
