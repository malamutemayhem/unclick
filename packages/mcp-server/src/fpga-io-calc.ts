export type FpgaIo =
  | "lvds_diff_pair"
  | "lvcmos_single"
  | "hstl_ddr"
  | "lvpecl_clock"
  | "mipi_dphy_csi";

const DATA: Record<FpgaIo, {
  dataRate: number; powerDraw: number; noiseMargin: number;
  pinCount: number; ioCost: number; differential: boolean;
  forMemory: boolean; voltage: string; bestUse: string;
}> = {
  lvds_diff_pair: {
    dataRate: 7, powerDraw: 4, noiseMargin: 9,
    pinCount: 6, ioCost: 5, differential: true,
    forMemory: false, voltage: "1v2_350mv_swing",
    bestUse: "fpga_to_fpga_link",
  },
  lvcmos_single: {
    dataRate: 3, powerDraw: 6, noiseMargin: 5,
    pinCount: 3, ioCost: 2, differential: false,
    forMemory: false, voltage: "3v3_or_1v8_cmos",
    bestUse: "gpio_led_control",
  },
  hstl_ddr: {
    dataRate: 8, powerDraw: 7, noiseMargin: 7,
    pinCount: 9, ioCost: 7, differential: true,
    forMemory: true, voltage: "1v5_sstl_vref",
    bestUse: "ddr4_memory_interface",
  },
  lvpecl_clock: {
    dataRate: 9, powerDraw: 8, noiseMargin: 8,
    pinCount: 5, ioCost: 6, differential: true,
    forMemory: false, voltage: "3v3_800mv_swing",
    bestUse: "low_jitter_clock_dist",
  },
  mipi_dphy_csi: {
    dataRate: 6, powerDraw: 3, noiseMargin: 6,
    pinCount: 7, ioCost: 4, differential: true,
    forMemory: false, voltage: "1v2_lp_200mv_hs",
    bestUse: "camera_sensor_capture",
  },
};

const get = (t: FpgaIo) => DATA[t];

export const dataRate = (t: FpgaIo) => get(t).dataRate;
export const powerDraw = (t: FpgaIo) => get(t).powerDraw;
export const noiseMargin = (t: FpgaIo) => get(t).noiseMargin;
export const pinCount = (t: FpgaIo) => get(t).pinCount;
export const ioCost = (t: FpgaIo) => get(t).ioCost;
export const differential = (t: FpgaIo) => get(t).differential;
export const forMemory = (t: FpgaIo) => get(t).forMemory;
export const voltage = (t: FpgaIo) => get(t).voltage;
export const bestUse = (t: FpgaIo) => get(t).bestUse;
export const fpgaIos = (): FpgaIo[] => Object.keys(DATA) as FpgaIo[];
