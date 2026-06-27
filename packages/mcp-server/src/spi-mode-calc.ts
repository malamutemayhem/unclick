export type SpiMode =
  | "standard_single"
  | "dual_io"
  | "quad_io"
  | "octal_ddr"
  | "qspi_xip";

const DATA: Record<SpiMode, {
  throughput: number; pinCount: number; complexity: number;
  compatibility: number; spiCost: number; ddrCapable: boolean;
  forFlash: boolean; dataLines: string; bestUse: string;
}> = {
  standard_single: {
    throughput: 3, pinCount: 9, complexity: 2,
    compatibility: 10, spiCost: 1, ddrCapable: false,
    forFlash: false, dataLines: "mosi_miso_single",
    bestUse: "sensor_adc_readout",
  },
  dual_io: {
    throughput: 5, pinCount: 8, complexity: 4,
    compatibility: 7, spiCost: 2, ddrCapable: false,
    forFlash: true, dataLines: "bidirectional_2bit",
    bestUse: "nor_flash_fast_read",
  },
  quad_io: {
    throughput: 8, pinCount: 6, complexity: 6,
    compatibility: 6, spiCost: 3, ddrCapable: true,
    forFlash: true, dataLines: "bidirectional_4bit",
    bestUse: "boot_flash_firmware",
  },
  octal_ddr: {
    throughput: 10, pinCount: 3, complexity: 9,
    compatibility: 3, spiCost: 6, ddrCapable: true,
    forFlash: true, dataLines: "bidirectional_8bit_ddr",
    bestUse: "psram_hyperram_expand",
  },
  qspi_xip: {
    throughput: 7, pinCount: 6, complexity: 8,
    compatibility: 5, spiCost: 4, ddrCapable: true,
    forFlash: true, dataLines: "quad_execute_in_place",
    bestUse: "mcu_code_execute_flash",
  },
};

const get = (t: SpiMode) => DATA[t];

export const throughput = (t: SpiMode) => get(t).throughput;
export const pinCount = (t: SpiMode) => get(t).pinCount;
export const complexity = (t: SpiMode) => get(t).complexity;
export const compatibility = (t: SpiMode) => get(t).compatibility;
export const spiCost = (t: SpiMode) => get(t).spiCost;
export const ddrCapable = (t: SpiMode) => get(t).ddrCapable;
export const forFlash = (t: SpiMode) => get(t).forFlash;
export const dataLines = (t: SpiMode) => get(t).dataLines;
export const bestUse = (t: SpiMode) => get(t).bestUse;
export const spiModes = (): SpiMode[] => Object.keys(DATA) as SpiMode[];
