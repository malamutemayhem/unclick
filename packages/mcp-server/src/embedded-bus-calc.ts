export type EmbeddedBus =
  | "spi_full_duplex"
  | "i2c_two_wire"
  | "uart_async_serial"
  | "i2s_audio_serial"
  | "qspi_quad_flash";

const DATA: Record<EmbeddedBus, {
  speed: number; pinCount: number; multiDrop: number;
  duplex: number; ebCost: number; clocked: boolean;
  forSensor: boolean; protocol: string; bestUse: string;
}> = {
  spi_full_duplex: {
    speed: 9, pinCount: 4, multiDrop: 6,
    duplex: 10, ebCost: 2, clocked: true,
    forSensor: true, protocol: "cpol_cpha_cs_master_slave",
    bestUse: "high_speed_adc_dac_stream",
  },
  i2c_two_wire: {
    speed: 5, pinCount: 10, multiDrop: 10,
    duplex: 3, ebCost: 1, clocked: true,
    forSensor: true, protocol: "7bit_addr_ack_nack_bus",
    bestUse: "sensor_hub_multi_device_poll",
  },
  uart_async_serial: {
    speed: 4, pinCount: 8, multiDrop: 3,
    duplex: 8, ebCost: 1, clocked: false,
    forSensor: false, protocol: "start_8n1_stop_async",
    bestUse: "debug_console_log_output",
  },
  i2s_audio_serial: {
    speed: 7, pinCount: 6, multiDrop: 5,
    duplex: 7, ebCost: 3, clocked: true,
    forSensor: false, protocol: "ws_sck_sd_left_right_tdm",
    bestUse: "codec_dac_audio_stream",
  },
  qspi_quad_flash: {
    speed: 10, pinCount: 5, multiDrop: 2,
    duplex: 5, ebCost: 4, clocked: true,
    forSensor: false, protocol: "quad_io_dtr_xip_memory_map",
    bestUse: "execute_in_place_nor_flash",
  },
};

const get = (t: EmbeddedBus) => DATA[t];

export const speed = (t: EmbeddedBus) => get(t).speed;
export const pinCount = (t: EmbeddedBus) => get(t).pinCount;
export const multiDrop = (t: EmbeddedBus) => get(t).multiDrop;
export const duplex = (t: EmbeddedBus) => get(t).duplex;
export const ebCost = (t: EmbeddedBus) => get(t).ebCost;
export const clocked = (t: EmbeddedBus) => get(t).clocked;
export const forSensor = (t: EmbeddedBus) => get(t).forSensor;
export const protocol = (t: EmbeddedBus) => get(t).protocol;
export const bestUse = (t: EmbeddedBus) => get(t).bestUse;
export const embeddedBuses = (): EmbeddedBus[] => Object.keys(DATA) as EmbeddedBus[];
