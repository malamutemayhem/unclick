export type DdrGen =
  | "ddr4_3200"
  | "ddr5_6400"
  | "lpddr5_6400"
  | "lpddr5x_8533"
  | "gddr6x_21gbps";

const DATA: Record<DdrGen, {
  bandwidth: number; latency: number; powerDraw: number;
  density: number; ddrCost: number; onDieEcc: boolean;
  forMobile: boolean; interface_: string; bestUse: string;
}> = {
  ddr4_3200: {
    bandwidth: 4, latency: 7, powerDraw: 5,
    density: 5, ddrCost: 3, onDieEcc: false,
    forMobile: false, interface_: "64bit_1v2_ddr",
    bestUse: "mainstream_desktop_server",
  },
  ddr5_6400: {
    bandwidth: 7, latency: 6, powerDraw: 6,
    density: 8, ddrCost: 5, onDieEcc: true,
    forMobile: false, interface_: "32bit_x2_1v1",
    bestUse: "high_perf_server_workstation",
  },
  lpddr5_6400: {
    bandwidth: 7, latency: 6, powerDraw: 8,
    density: 8, ddrCost: 6, onDieEcc: true,
    forMobile: true, interface_: "16bit_x4_0v5",
    bestUse: "flagship_smartphone",
  },
  lpddr5x_8533: {
    bandwidth: 9, latency: 6, powerDraw: 9,
    density: 9, ddrCost: 8, onDieEcc: true,
    forMobile: true, interface_: "16bit_x4_dvfsc",
    bestUse: "on_device_ai_phone",
  },
  gddr6x_21gbps: {
    bandwidth: 10, latency: 5, powerDraw: 3,
    density: 6, ddrCost: 7, onDieEcc: false,
    forMobile: false, interface_: "32bit_pam4_1v35",
    bestUse: "gpu_gaming_graphics",
  },
};

const get = (t: DdrGen) => DATA[t];

export const bandwidth = (t: DdrGen) => get(t).bandwidth;
export const latency = (t: DdrGen) => get(t).latency;
export const powerDraw = (t: DdrGen) => get(t).powerDraw;
export const density = (t: DdrGen) => get(t).density;
export const ddrCost = (t: DdrGen) => get(t).ddrCost;
export const onDieEcc = (t: DdrGen) => get(t).onDieEcc;
export const forMobile = (t: DdrGen) => get(t).forMobile;
export const interface_ = (t: DdrGen) => get(t).interface_;
export const bestUse = (t: DdrGen) => get(t).bestUse;
export const ddrGens = (): DdrGen[] => Object.keys(DATA) as DdrGen[];
