export type BusProtocol =
  | "spi_full_duplex"
  | "i2c_two_wire"
  | "uart_async"
  | "i3c_mipi"
  | "qspi_quad";

const DATA: Record<BusProtocol, {
  throughput: number; pinCount: number; multiDevice: number;
  latency: number; busCost: number; hotJoin: boolean;
  forSensor: boolean; signaling: string; bestUse: string;
}> = {
  spi_full_duplex: {
    throughput: 8, pinCount: 3, multiDevice: 5,
    latency: 9, busCost: 3, hotJoin: false,
    forSensor: true, signaling: "clk_mosi_miso_cs",
    bestUse: "adc_dac_high_speed",
  },
  i2c_two_wire: {
    throughput: 4, pinCount: 9, multiDevice: 8,
    latency: 5, busCost: 2, hotJoin: false,
    forSensor: true, signaling: "sda_scl_open_drain",
    bestUse: "eeprom_sensor_hub",
  },
  uart_async: {
    throughput: 3, pinCount: 8, multiDevice: 2,
    latency: 6, busCost: 1, hotJoin: false,
    forSensor: false, signaling: "tx_rx_async_start",
    bestUse: "debug_console_gps",
  },
  i3c_mipi: {
    throughput: 7, pinCount: 9, multiDevice: 9,
    latency: 8, busCost: 5, hotJoin: true,
    forSensor: true, signaling: "sda_scl_push_pull",
    bestUse: "next_gen_sensor_bus",
  },
  qspi_quad: {
    throughput: 9, pinCount: 5, multiDevice: 3,
    latency: 9, busCost: 4, hotJoin: false,
    forSensor: false, signaling: "clk_4data_cs_quad",
    bestUse: "nor_flash_execute",
  },
};

const get = (t: BusProtocol) => DATA[t];

export const throughput = (t: BusProtocol) => get(t).throughput;
export const pinCount = (t: BusProtocol) => get(t).pinCount;
export const multiDevice = (t: BusProtocol) => get(t).multiDevice;
export const latency = (t: BusProtocol) => get(t).latency;
export const busCost = (t: BusProtocol) => get(t).busCost;
export const hotJoin = (t: BusProtocol) => get(t).hotJoin;
export const forSensor = (t: BusProtocol) => get(t).forSensor;
export const signaling = (t: BusProtocol) => get(t).signaling;
export const bestUse = (t: BusProtocol) => get(t).bestUse;
export const busProtocols = (): BusProtocol[] => Object.keys(DATA) as BusProtocol[];
