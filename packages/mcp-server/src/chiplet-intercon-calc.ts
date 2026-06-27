export type ChipletIntercon =
  | "ucie_standard"
  | "aib_intel"
  | "bunch_of_wires"
  | "lipincon_samsung"
  | "emib_bridge";

const DATA: Record<ChipletIntercon, {
  bandwidth: number; latency: number; energyPerBit: number;
  density: number; interconCost: number; openStandard: boolean;
  forHpc: boolean; packaging: string; bestUse: string;
}> = {
  ucie_standard: {
    bandwidth: 8, latency: 7, energyPerBit: 7,
    density: 8, interconCost: 6, openStandard: true,
    forHpc: true, packaging: "advanced_2_5d_bridge",
    bestUse: "multi_vendor_chiplet",
  },
  aib_intel: {
    bandwidth: 7, latency: 8, energyPerBit: 6,
    density: 7, interconCost: 7, openStandard: true,
    forHpc: true, packaging: "emib_or_foveros",
    bestUse: "fpga_accelerator_tile",
  },
  bunch_of_wires: {
    bandwidth: 10, latency: 9, energyPerBit: 9,
    density: 10, interconCost: 9, openStandard: false,
    forHpc: true, packaging: "tsmc_cowos_s",
    bestUse: "gpu_hbm_interposer",
  },
  lipincon_samsung: {
    bandwidth: 9, latency: 8, energyPerBit: 8,
    density: 9, interconCost: 8, openStandard: false,
    forHpc: true, packaging: "fan_out_rdl",
    bestUse: "mobile_soc_memory",
  },
  emib_bridge: {
    bandwidth: 6, latency: 6, energyPerBit: 5,
    density: 6, interconCost: 5, openStandard: false,
    forHpc: false, packaging: "embedded_multi_die",
    bestUse: "cpu_io_tile_connect",
  },
};

const get = (t: ChipletIntercon) => DATA[t];

export const bandwidth = (t: ChipletIntercon) => get(t).bandwidth;
export const latency = (t: ChipletIntercon) => get(t).latency;
export const energyPerBit = (t: ChipletIntercon) => get(t).energyPerBit;
export const density = (t: ChipletIntercon) => get(t).density;
export const interconCost = (t: ChipletIntercon) => get(t).interconCost;
export const openStandard = (t: ChipletIntercon) => get(t).openStandard;
export const forHpc = (t: ChipletIntercon) => get(t).forHpc;
export const packaging = (t: ChipletIntercon) => get(t).packaging;
export const bestUse = (t: ChipletIntercon) => get(t).bestUse;
export const chipletIntercons = (): ChipletIntercon[] => Object.keys(DATA) as ChipletIntercon[];
