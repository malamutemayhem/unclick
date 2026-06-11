export type NvlinkGen =
  | "nvlink_3_a100"
  | "nvlink_4_h100"
  | "nvlink_5_b200"
  | "nvlink_c2c"
  | "nvswitch_fabric";

const DATA: Record<NvlinkGen, {
  bandwidth: number; gpuCount: number; latency: number;
  powerEff: number; nvCost: number; switchRequired: boolean;
  forTraining: boolean; topology: string; bestUse: string;
}> = {
  nvlink_3_a100: {
    bandwidth: 5, gpuCount: 5, latency: 7,
    powerEff: 6, nvCost: 6, switchRequired: false,
    forTraining: true, topology: "12_link_600gbps",
    bestUse: "8gpu_dgx_a100",
  },
  nvlink_4_h100: {
    bandwidth: 7, gpuCount: 7, latency: 8,
    powerEff: 7, nvCost: 8, switchRequired: true,
    forTraining: true, topology: "18_link_900gbps",
    bestUse: "8gpu_dgx_h100",
  },
  nvlink_5_b200: {
    bandwidth: 9, gpuCount: 9, latency: 9,
    powerEff: 8, nvCost: 10, switchRequired: true,
    forTraining: true, topology: "18_link_1800gbps",
    bestUse: "72gpu_gb200_nvl72",
  },
  nvlink_c2c: {
    bandwidth: 8, gpuCount: 4, latency: 10,
    powerEff: 9, nvCost: 7, switchRequired: false,
    forTraining: true, topology: "chip_to_chip_coherent",
    bestUse: "grace_hopper_superchip",
  },
  nvswitch_fabric: {
    bandwidth: 10, gpuCount: 10, latency: 7,
    powerEff: 5, nvCost: 9, switchRequired: true,
    forTraining: true, topology: "full_bisection_switch",
    bestUse: "superpod_1024_gpu",
  },
};

const get = (t: NvlinkGen) => DATA[t];

export const bandwidth = (t: NvlinkGen) => get(t).bandwidth;
export const gpuCount = (t: NvlinkGen) => get(t).gpuCount;
export const latency = (t: NvlinkGen) => get(t).latency;
export const powerEff = (t: NvlinkGen) => get(t).powerEff;
export const nvCost = (t: NvlinkGen) => get(t).nvCost;
export const switchRequired = (t: NvlinkGen) => get(t).switchRequired;
export const forTraining = (t: NvlinkGen) => get(t).forTraining;
export const topology = (t: NvlinkGen) => get(t).topology;
export const bestUse = (t: NvlinkGen) => get(t).bestUse;
export const nvlinkGens = (): NvlinkGen[] => Object.keys(DATA) as NvlinkGen[];
