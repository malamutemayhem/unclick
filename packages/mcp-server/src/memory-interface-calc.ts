export type MemoryInterface =
  | "ddr4_sdram"
  | "ddr5_sdram"
  | "lpddr5x_mobile"
  | "hbm3_stack"
  | "gddr6x_graphics";

const DATA: Record<MemoryInterface, {
  bandwidth: number; latency: number; powerDraw: number;
  density: number; ifCost: number; ecc: boolean;
  forAi: boolean; busWidth: string; bestUse: string;
}> = {
  ddr4_sdram: {
    bandwidth: 4, latency: 5, powerDraw: 5,
    density: 5, ifCost: 3, ecc: true,
    forAi: false, busWidth: "64bit_dimm_channel",
    bestUse: "server_general_purpose",
  },
  ddr5_sdram: {
    bandwidth: 6, latency: 6, powerDraw: 4,
    density: 7, ifCost: 5, ecc: true,
    forAi: false, busWidth: "32bit_dual_subchannel",
    bestUse: "next_gen_workstation",
  },
  lpddr5x_mobile: {
    bandwidth: 7, latency: 7, powerDraw: 2,
    density: 8, ifCost: 7, ecc: false,
    forAi: false, busWidth: "16bit_pop_package",
    bestUse: "flagship_smartphone",
  },
  hbm3_stack: {
    bandwidth: 10, latency: 9, powerDraw: 6,
    density: 10, ifCost: 10, ecc: true,
    forAi: true, busWidth: "1024bit_tsv_stack",
    bestUse: "ai_training_accelerator",
  },
  gddr6x_graphics: {
    bandwidth: 8, latency: 4, powerDraw: 8,
    density: 6, ifCost: 6, ecc: false,
    forAi: true, busWidth: "32bit_pam4_sgram",
    bestUse: "high_end_gpu_vram",
  },
};

const get = (t: MemoryInterface) => DATA[t];

export const bandwidth = (t: MemoryInterface) => get(t).bandwidth;
export const latency = (t: MemoryInterface) => get(t).latency;
export const powerDraw = (t: MemoryInterface) => get(t).powerDraw;
export const density = (t: MemoryInterface) => get(t).density;
export const ifCost = (t: MemoryInterface) => get(t).ifCost;
export const ecc = (t: MemoryInterface) => get(t).ecc;
export const forAi = (t: MemoryInterface) => get(t).forAi;
export const busWidth = (t: MemoryInterface) => get(t).busWidth;
export const bestUse = (t: MemoryInterface) => get(t).bestUse;
export const memoryInterfaces = (): MemoryInterface[] => Object.keys(DATA) as MemoryInterface[];
