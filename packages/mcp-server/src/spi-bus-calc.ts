export type SpiBusType =
  | "standard_single"
  | "dual_spi_half"
  | "quad_spi_flash"
  | "octal_spi_high"
  | "multi_slave_daisy";

const DATA: Record<SpiBusType, {
  throughput: number; pinCount: number; complexity: number;
  distance: number; busCost: number; fullDuplex: boolean;
  forFlash: boolean; dataLines: string; bestUse: string;
}> = {
  standard_single: { throughput: 5, pinCount: 8, complexity: 3, distance: 4, busCost: 1, fullDuplex: true, forFlash: false, dataLines: "mosi_miso_single", bestUse: "sensor_adc_dac_link" },
  dual_spi_half: { throughput: 7, pinCount: 7, complexity: 5, distance: 3, busCost: 2, fullDuplex: false, forFlash: true, dataLines: "io0_io1_dual", bestUse: "fast_flash_read_write" },
  quad_spi_flash: { throughput: 9, pinCount: 6, complexity: 7, distance: 3, busCost: 3, fullDuplex: false, forFlash: true, dataLines: "io0_io1_io2_io3", bestUse: "xip_execute_in_place" },
  octal_spi_high: { throughput: 10, pinCount: 4, complexity: 9, distance: 2, busCost: 6, fullDuplex: false, forFlash: true, dataLines: "io0_through_io7", bestUse: "high_bandwidth_psram" },
  multi_slave_daisy: { throughput: 5, pinCount: 9, complexity: 6, distance: 5, busCost: 2, fullDuplex: true, forFlash: false, dataLines: "daisy_chain_shift", bestUse: "led_driver_chain_ctrl" },
};

const get = (t: SpiBusType) => DATA[t];

export const throughput = (t: SpiBusType) => get(t).throughput;
export const pinCount = (t: SpiBusType) => get(t).pinCount;
export const complexity = (t: SpiBusType) => get(t).complexity;
export const distance = (t: SpiBusType) => get(t).distance;
export const busCost = (t: SpiBusType) => get(t).busCost;
export const fullDuplex = (t: SpiBusType) => get(t).fullDuplex;
export const forFlash = (t: SpiBusType) => get(t).forFlash;
export const dataLines = (t: SpiBusType) => get(t).dataLines;
export const bestUse = (t: SpiBusType) => get(t).bestUse;
export const spiBuses = (): SpiBusType[] => Object.keys(DATA) as SpiBusType[];
