export type PcieGen =
  | "pcie_3_0"
  | "pcie_4_0"
  | "pcie_5_0"
  | "pcie_6_0"
  | "pcie_7_0";

const DATA: Record<PcieGen, {
  bandwidth: number; latency: number; powerEff: number;
  compatibility: number; pcieCost: number; pamEncoding: boolean;
  forAi: boolean; encoding: string; bestUse: string;
}> = {
  pcie_3_0: {
    bandwidth: 3, latency: 7, powerEff: 8,
    compatibility: 10, pcieCost: 2, pamEncoding: false,
    forAi: false, encoding: "nrz_128b_130b",
    bestUse: "legacy_ssd_gpu",
  },
  pcie_4_0: {
    bandwidth: 5, latency: 7, powerEff: 7,
    compatibility: 9, pcieCost: 3, pamEncoding: false,
    forAi: false, encoding: "nrz_128b_130b",
    bestUse: "mainstream_nvme_ssd",
  },
  pcie_5_0: {
    bandwidth: 7, latency: 6, powerEff: 6,
    compatibility: 8, pcieCost: 5, pamEncoding: false,
    forAi: true, encoding: "nrz_128b_130b",
    bestUse: "gpu_nic_high_bw",
  },
  pcie_6_0: {
    bandwidth: 9, latency: 5, powerEff: 5,
    compatibility: 6, pcieCost: 7, pamEncoding: true,
    forAi: true, encoding: "pam4_flit_fec",
    bestUse: "ai_accelerator_connect",
  },
  pcie_7_0: {
    bandwidth: 10, latency: 5, powerEff: 5,
    compatibility: 4, pcieCost: 9, pamEncoding: true,
    forAi: true, encoding: "pam4_256gt_per_lane",
    bestUse: "next_gen_compute_fabric",
  },
};

const get = (t: PcieGen) => DATA[t];

export const bandwidth = (t: PcieGen) => get(t).bandwidth;
export const latency = (t: PcieGen) => get(t).latency;
export const powerEff = (t: PcieGen) => get(t).powerEff;
export const compatibility = (t: PcieGen) => get(t).compatibility;
export const pcieCost = (t: PcieGen) => get(t).pcieCost;
export const pamEncoding = (t: PcieGen) => get(t).pamEncoding;
export const forAi = (t: PcieGen) => get(t).forAi;
export const encoding = (t: PcieGen) => get(t).encoding;
export const bestUse = (t: PcieGen) => get(t).bestUse;
export const pcieGens = (): PcieGen[] => Object.keys(DATA) as PcieGen[];
