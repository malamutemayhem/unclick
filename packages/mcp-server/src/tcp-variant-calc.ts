export type TcpVariant =
  | "reno_classic_aimd"
  | "cubic_linux_default"
  | "bbr_model_based"
  | "vegas_delay_based"
  | "dctcp_ecn_datacenter";

const DATA: Record<TcpVariant, {
  throughput: number; fairness: number; latency: number;
  lossRecovery: number; tcCost: number; ecnAware: boolean;
  forWan: boolean; algorithm: string; bestUse: string;
}> = {
  reno_classic_aimd: {
    throughput: 4, fairness: 7, latency: 4,
    lossRecovery: 5, tcCost: 1, ecnAware: false,
    forWan: false, algorithm: "additive_increase_mult_decrease",
    bestUse: "baseline_reference_comparison",
  },
  cubic_linux_default: {
    throughput: 7, fairness: 8, latency: 5,
    lossRecovery: 7, tcCost: 2, ecnAware: false,
    forWan: true, algorithm: "cubic_function_window_growth",
    bestUse: "general_purpose_linux_server",
  },
  bbr_model_based: {
    throughput: 10, fairness: 5, latency: 10,
    lossRecovery: 9, tcCost: 4, ecnAware: false,
    forWan: true, algorithm: "bottleneck_bandwidth_rtt_probe",
    bestUse: "long_fat_pipe_cdn_delivery",
  },
  vegas_delay_based: {
    throughput: 6, fairness: 9, latency: 9,
    lossRecovery: 6, tcCost: 2, ecnAware: false,
    forWan: false, algorithm: "rtt_diff_congestion_estimate",
    bestUse: "low_latency_interactive_rpc",
  },
  dctcp_ecn_datacenter: {
    throughput: 9, fairness: 10, latency: 8,
    lossRecovery: 8, tcCost: 3, ecnAware: true,
    forWan: false, algorithm: "ecn_mark_proportional_reduce",
    bestUse: "datacenter_east_west_traffic",
  },
};

const get = (t: TcpVariant) => DATA[t];

export const throughput = (t: TcpVariant) => get(t).throughput;
export const fairness = (t: TcpVariant) => get(t).fairness;
export const latency = (t: TcpVariant) => get(t).latency;
export const lossRecovery = (t: TcpVariant) => get(t).lossRecovery;
export const tcCost = (t: TcpVariant) => get(t).tcCost;
export const ecnAware = (t: TcpVariant) => get(t).ecnAware;
export const forWan = (t: TcpVariant) => get(t).forWan;
export const algorithm = (t: TcpVariant) => get(t).algorithm;
export const bestUse = (t: TcpVariant) => get(t).bestUse;
export const tcpVariants = (): TcpVariant[] => Object.keys(DATA) as TcpVariant[];
